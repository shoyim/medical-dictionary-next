import xlsx from 'xlsx';

function parseRow(text) {
  const raw = String(text).replace(/\s+/g, ' ').trim();
  let nameEnd = raw.indexOf('(');
  if (nameEnd === -1) {
    const d = raw.search(/ [–\-] /);
    nameEnd = d !== -1 ? d : raw.length;
  }
  return { name: raw.slice(0, nameEnd).trim(), description: raw };
}

function extractLatin(text) {
  const m = text.match(/(?:от\s+лат\.|from\s+latin|lotinchadan)\s+([a-zA-Z][a-zA-Z\-]+)/i);
  return m ? m[1].toLowerCase() : null;
}

function normalize(name) {
  return name.toLowerCase()
    .replace(/ё/g, 'е')
    .replace(/[^a-zа-яё\s\-]/gi, '')
    .replace(/\s+/g, ' ')
    .trim();
}

const files = [
  { file: 'ru.xlsx', lang: 'ru' },
  { file: 'eng.xlsx', lang: 'en' },
  { file: 'document.xlsx', lang: 'uz' },
];

const data = {};
for (const { file, lang } of files) {
  const wb = xlsx.readFile(file);
  const ws = wb.Sheets[wb.SheetNames[0]];
  const rows = xlsx.utils.sheet_to_json(ws, { header: 1 });
  data[lang] = rows.map(r => {
    const cell = Array.isArray(r) ? r[0] : Object.values(r)[0];
    if (!cell) return null;
    const p = parseRow(cell);
    return { ...p, latin: extractLatin(p.description), key: normalize(p.name) };
  }).filter(Boolean);
}

// Show rows 0-15 for each lang
console.log('\nFirst 15 rows comparison:\n');
for (let i = 0; i < 15; i++) {
  const ru = data.ru[i];
  const en = data.en[i];
  const uz = data.uz[i];
  console.log(`[${i}]`);
  console.log(`  RU: "${ru?.name}" (latin: ${ru?.latin ?? '-'})`);
  console.log(`  EN: "${en?.name}" (latin: ${en?.latin ?? '-'})`);
  console.log(`  UZ: "${uz?.name}" (latin: ${uz?.latin ?? '-'})`);
}

// Build latin map statistics
const latinMap = new Map();
for (const [lang, rows] of Object.entries(data)) {
  for (const row of rows) {
    if (row.latin) {
      if (!latinMap.has(row.latin)) latinMap.set(row.latin, {});
      latinMap.get(row.latin)[lang] = row;
    }
  }
}

let all3 = 0, two = 0, one = 0;
for (const v of latinMap.values()) {
  const c = Object.keys(v).length;
  if (c === 3) all3++;
  else if (c === 2) two++;
  else one++;
}
console.log(`\nLatin key matching:`);
console.log(`  3 tilda mos: ${all3}`);
console.log(`  2 tilda mos: ${two}`);
console.log(`  Faqat 1 tilda: ${one}`);
console.log(`  Jami unique latin keys: ${latinMap.size}`);
console.log(`\nTotal rows — RU: ${data.ru.length}, EN: ${data.en.length}, UZ: ${data.uz.length}`);
