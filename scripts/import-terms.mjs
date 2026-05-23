/**
 * Excel (ru.xlsx, eng.xlsx, document.xlsx) → Neon PostgreSQL import.
 *
 * Moslashtirish usullari (priority):
 *  1. Latin kalit  (от лат. X / from Latin X / lotinchadan X)
 *  2. 5 belgilik prefix kalit  (RU uchun kirill→lotin transliteratsiya + au/av korreksiya)
 */

import xlsx from 'xlsx';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// ─── Kirill → Lotin transliteratsiya ────────────────────────────────────────
const CYR = {
  а:'a',б:'b',в:'v',г:'g',д:'d',е:'e',ё:'e',ж:'zh',з:'z',и:'i',й:'j',
  к:'k',л:'l',м:'m',н:'n',о:'o',п:'p',р:'r',с:'s',т:'t',у:'u',ф:'f',
  х:'kh',ц:'ts',ч:'ch',ш:'sh',щ:'shch',ъ:'',ы:'y',ь:'',э:'e',ю:'yu',я:'ya',
};
function translit(s) {
  return s.toLowerCase().split('').map(c => CYR[c] ?? c).join('');
}

// ─── Birinchi so'zdan 5 belgili kalit ────────────────────────────────────────
const VOWELS = new Set('aeiou');
function prefixKey(name, lang) {
  const fw = name.split(/[\s,;(–\-]/)[0].toLowerCase();
  let n = (lang === 'ru') ? translit(fw) : fw;
  n = n.replace(/[^a-z]/g, '');

  // RU: "авт" → "aut", "авс" → "aus" (Автономный→autonomous, Австралия→australia)
  if (lang === 'ru') {
    n = n.replace(/^av([^aeiou])/, 'au$1');
  }
  return n.slice(0, 5);
}

// ─── Latin kalit ─────────────────────────────────────────────────────────────
function latinKey(text) {
  const m = text.match(
    /(?:от\s+лат\.|from\s+latin|lotinchadan)\s+([a-zA-Z][a-zA-Z\-]+)/i
  );
  return m ? m[1].toLowerCase() : null;
}

// ─── Yacheyani bir nechta terminlarga bo'lish ────────────────────────────────
function splitCell(raw) {
  const text = String(raw).replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  // Split on \n followed by uppercase Latin or Cyrillic (new term start)
  return text.split(/\n(?=[A-ZА-ЯЁO'][a-zа-яёa-zA-ZА-ЯЁ])/).map(p => p.replace(/\s+/g, ' ').trim()).filter(Boolean);
}

// ─── Qatorni parse qilish ────────────────────────────────────────────────────
function parseRow(raw) {
  const text = String(raw).replace(/\s+/g, ' ').trim();
  let nameEnd = text.indexOf('(');
  if (nameEnd === -1) {
    const d = text.search(/ [–\-] /);
    nameEnd = d !== -1 ? d : text.length;
  }
  return { name: text.slice(0, nameEnd).trim(), description: text };
}

// ─── Excel o'qish ────────────────────────────────────────────────────────────
function readExcel(filename, lang) {
  const wb = xlsx.readFile(filename);
  const ws = wb.Sheets[wb.SheetNames[0]];
  const rows = xlsx.utils.sheet_to_json(ws, { header: 1 });
  return rows
    .flatMap(r => {
      const cell = Array.isArray(r) ? r[0] : Object.values(r)[0];
      if (!cell || !String(cell).trim()) return [];
      // Split cell into individual terms if it contains multiple
      return splitCell(cell).map(part => {
        const parsed = parseRow(part);
        return {
          ...parsed,
          lang,
          latKey: latinKey(parsed.description),
          pfxKey: prefixKey(parsed.name, lang),
        };
      });
    })
    .filter(Boolean);
}

// ─── Terminlarni birlashtirish ────────────────────────────────────────────────
function mergeAll(ruRows, enRows, uzRows) {
  const used = { ru: new Set(), en: new Set(), uz: new Set() };
  const groups = [];

  // Indekslar
  const buildMap = (rows, keyFn) => {
    const map = new Map();
    for (const r of rows) {
      const k = keyFn(r);
      if (k && !map.has(k)) map.set(k, r);
    }
    return map;
  };

  const ruLat = buildMap(ruRows, r => r.latKey);
  const enLat = buildMap(enRows, r => r.latKey);
  const uzLat = buildMap(uzRows, r => r.latKey);

  const ruPfx = buildMap(ruRows, r => r.pfxKey);
  const enPfx = buildMap(enRows, r => r.pfxKey);
  const uzPfx = buildMap(uzRows, r => r.pfxKey);

  // Barcha kalitlar
  const allLatKeys = new Set([...ruLat.keys(), ...enLat.keys(), ...uzLat.keys()]);
  const allPfxKeys = new Set([...ruPfx.keys(), ...enPfx.keys(), ...uzPfx.keys()]);

  const mark = (r) => { if (r) used[r.lang].add(r); };
  const isUsed = (r) => !r || used[r.lang].has(r);

  // Faza 1: Latin kalit
  for (const lat of allLatKeys) {
    const ru = ruLat.get(lat);
    const en = enLat.get(lat);
    const uz = uzLat.get(lat);
    if (!ru && !en && !uz) continue;
    // Allaqachon ishlatilganlarni o'tkazib yubor
    if ((ru && isUsed(ru)) || (en && isUsed(en)) || (uz && isUsed(uz))) continue;
    mark(ru); mark(en); mark(uz);
    groups.push({ ru, en, uz, via: `lat:${lat}` });
  }

  // Faza 2: Prefix kalit (faqat ishlatilmagan qatorlar)
  for (const pfx of allPfxKeys) {
    if (!pfx || pfx.length < 3) continue;
    const ru = ruPfx.get(pfx);
    const en = enPfx.get(pfx);
    const uz = uzPfx.get(pfx);

    const ruOk = ru && !isUsed(ru);
    const enOk = en && !isUsed(en);
    const uzOk = uz && !isUsed(uz);

    // Hech bo'lmasa 1 ta yangi bo'lishi kerak
    if (!ruOk && !enOk && !uzOk) continue;
    // Hech bo'lmasa 1 ta mavjud bo'lishi kerak
    if (!ruOk && !enOk && !uzOk) continue;

    mark(ruOk ? ru : undefined);
    mark(enOk ? en : undefined);
    mark(uzOk ? uz : undefined);

    groups.push({
      ru: ruOk ? ru : undefined,
      en: enOk ? en : undefined,
      uz: uzOk ? uz : undefined,
      via: `pfx:${pfx}`,
    });
  }

  // Qolgan yagona terminlar
  for (const r of ruRows.filter(r => !isUsed(r)))
    groups.push({ ru: r, en: undefined, uz: undefined, via: 'solo' });
  for (const r of enRows.filter(r => !isUsed(r)))
    groups.push({ ru: undefined, en: r, uz: undefined, via: 'solo' });
  for (const r of uzRows.filter(r => !isUsed(r)))
    groups.push({ ru: undefined, en: undefined, uz: r, via: 'solo' });

  return groups;
}

// ─── Asosiy ──────────────────────────────────────────────────────────────────
async function main() {
  console.log('📖 Fayllar o\'qilmoqda...');
  const ruRows = readExcel('ru.xlsx',       'ru');
  const enRows = readExcel('eng.xlsx',      'en');
  const uzRows = readExcel('document.xlsx', 'uz');
  console.log(`  RU:${ruRows.length}  EN:${enRows.length}  UZ:${uzRows.length}`);

  // Til ID lari
  const langs = await prisma.language.findMany();
  const lid   = Object.fromEntries(langs.map(l => [l.code, l.id]));
  console.log('  Til IDlari:', lid);

  // Birlashtirish
  console.log('\n🔗 Birlashtirilyapti...');
  const groups = mergeAll(ruRows, enRows, uzRows);
  const cnt3 = groups.filter(g => g.ru && g.en && g.uz).length;
  const cnt2 = groups.filter(g => [g.ru,g.en,g.uz].filter(Boolean).length===2).length;
  const cnt1 = groups.filter(g => [g.ru,g.en,g.uz].filter(Boolean).length===1).length;
  console.log(`  3 tilda: ${cnt3} | 2 tilda: ${cnt2} | 1 tilda: ${cnt1} | Jami: ${groups.length}`);

  // Bazaga yozish (transaction YO'Q — bitta-bitta)
  console.log('\n💾 Bazaga yozilmoqda...');
  let ok = 0, err = 0;

  for (let i = 0; i < groups.length; i++) {
    const g = groups[i];
    const translations = [
      g.ru && { language_id: lid.ru, name: g.ru.name.slice(0,255), description: g.ru.description },
      g.en && { language_id: lid.en, name: g.en.name.slice(0,255), description: g.en.description },
      g.uz && { language_id: lid.uz, name: g.uz.name.slice(0,255), description: g.uz.description },
    ].filter(Boolean);

    if (!translations.length) continue;

    try {
      await prisma.medicalTerm.create({
        data: { translations: { create: translations } },
      });
      ok++;
    } catch (e) {
      err++;
      if (err <= 3) console.error(`\n  ⚠ [${i}]`, e.message.slice(0, 120));
    }

    if ((i + 1) % 100 === 0 || i === groups.length - 1) {
      process.stdout.write(`\r  ${i+1}/${groups.length} (✅${ok} ❌${err})`);
    }
  }

  // Natija
  const total   = await prisma.medicalTerm.count();
  const totalTr = await prisma.medicalTermTranslation.count();
  console.log(`\n\n✅ Yakunlandi!  term:${total}  tarjima:${totalTr}`);
}

main()
  .catch(e => { console.error('\n❌', e.message); process.exit(1); })
  .finally(() => prisma.$disconnect());
