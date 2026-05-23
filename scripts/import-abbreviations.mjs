import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const RAW = `ACS (Antibody-combining site) – Antitelokombinatsiya joyi
ADCC (Antibody-dependent cellular cytotoxicity) – Antitelozavisimuy hujayra tsitotoksikligi
AFP (Alpha-fetoprotein) – Alfa-fetoprotein
AICD (Activation-induced cell death) – Aktivatsiya induktsiyalangan hujayra o'limi
AIDS (Acquired immunodeficiency syndrome) – Olingan immunodefitsit sindromi
ALG (Antilymphocyte globulin) – Antilymfotsitar globulin
ALS (Anti-lymphocyte serum) – Antilymfotsitar serum
APC (Antigen-presenting cell) – Antigenni taqdim etuvchi hujayra
B (Basophil) – Bazofil
B lymphocyte (Bursa-derived lymphocyte) – B-limfotsit
BALT (Bronchus-associated lymphoreticular tissue) – Bronx bilan bog'liq limforetikulyar to'qima
BCG (Bacillus Calmette-Guerin) – Batsilla Kalmet-Gyeren
CFU-S (Splenic colony-forming unit) – Spleen koloniyaga aylantiruvchi birlik
CGD (Chronic granulomatous disease) – Xronik granulomatoz kasalligi
CID (Combined immunodeficiency) – Kombinatsiyalangan immunodefitsit
CMC (Complement-mediated cytotoxicity) – Komplement tomonidan boshqariladigan tsitotoksiklik
CMI (T-cell mediated immunity) – T-hujayralar tomonidan boshqariladigan immunitet
CMIS (Common mucosal immune system) – Umumiy shilliq qavat immun tizimi
CML (Chronic myeloid leukemia) – Xronik miyeloid leykemiya
CMLs (Cell-mediated lympholysis) – Hujayralar tomonidan boshqariladigan limfolitik jarayon
CMV (Cytomegalovirus) – Tsitomegalovirus
CR (Complement receptor) – Komplement reseptori
CTL (cytotoxic T lymphocyte) – Tsitotoksik T-limfotsit
DTH (Delayed-type hypersensitivity) – Kechiktirilgan turdagi gipersezuvchanlik
EBV (Epstein-Barr virus) – Epstein-Barr virusi
EC (Endothelial cell) – Endotelial hujayra
ECM (Extracellular matrix) – Hujayradan tashqaridagi matritsa
EDN (Eosinophil-derived neurotoxin) – Eozinofillardan kelib chiqqan neyrotoksin
ELISA (Enzyme-linked immunosorbent assay) – Imunofermentativ tahlil
ER (Endoplasmic reticulum) – Endoplazmatik retikulum
ES cell (Embryonic stem cell) – Embrional stem hujayra
F (Fibroblast) – Fibroblast
Fab (Antigen-binding fragment (monovalent)) – Antigen bog'lovchi frakment (monovalent)
F(ab)2 (Antigen-binding fragment (bivalent)) – Antigen bog'lovchi frakment (bivalen)
GAG (Glycosaminoglycan) – Glikozaminoglikan
GALT (Gut-associated lymphoid tissues) – Ichak bilan bog'liq limfoid to'qima
GC (Germinal center) – Germinal markazi
GCP (Granulocyte chemoattractant factor) – Granulotsitlar uchun xemoattraktsion faktor
G-CSF (Granulocyte colony-stimulating factor) – Granulotsit koloniyalari stimulyatsiya qiluvchi faktor
GL (Germline) – Zarodish liniyasi
HAS (Human serum albumin) – Inson serum albumini
HAV (Hepatitis A virus) – Gepatit A virusi
HBV (Hepatitis B virus) – Gepatit B virusi
HCV (Hepatitis C virus) – Gepatit C virusi
HIV (Human immunodeficiency virus) – Inson immunodefitsiti virusi
HHV (Human herpes virus) – Inson gerpes virusi
HLA (Human leukocyte antigen) – Inson leykotsit antigeni
HPV (Human papilloma virus) – Inson papiloma virusi
HSV (Herpes simplex virus) – Oddiy gerpes virusi
IFN (IF) (Interferon) – Interferon
Ig (Immunoglobulin) – Immunoglobulin
IL (Interleukin) – Interleykin
IL-1R (Interleukin-1R) – Interleykin-1 reseptori
Ir (Immune response) – Immun javobi
Ir-gene (Immune response gene) – Immun javobi geni
LC (Langerhans cell) – Langerhans hujayrasi
LCA (Leukocyte common antigen) – Leykotsit umumiy antigeni
LN (Lymph node) – Limfa tuguni
MALT (Mucosa-associated lymphoid tissues) – Shilliq qavatga bog'liq limfoid to'qima
MC (Mast cell) – Tuchli hujayra
MCL (Metallochloranthen) – Metallokloranthen
M-CSF (Macrophage colony-stimulating factor) – Makrofag koloniyasi stimulyatsiya qiluvchi faktor
MHC (Major histocompatibility complex) – Asosiy gisto-kompativlik kompleksi
MIF (Migratory (macrophage) inhibitor factor) – Migratsiyani to'xtatadigan (makrofag) factor
M (Macrophage) – Makrofag
N (Neutrophil) – Neytrofil
NK (Natural killer) – Tabiiq killer
PBL (Peripheral blood lymphocyte) – Periferal qon limfotsiti
PBP (Platelet basic protein) – Trombosit asosiy proteini
PCR (Polymerase chain reaction) – Polimeraza zanjir reaktsiyasi
PCNA (Proliferating-cell nuclear antigen) – Proliferatsiyalanadigan hujayra yadrosi antigeni
PCTL (Precursor cytotoxic T lymphocyte) – Prekursor tsitotoksik T-limfotsiti
PG (Prostaglandin) – Prostaglandin
IPHSC (Pluripotent hemopoietic stem cell) – Polipotent qoni hosil qiluvchi stem hujayra
PLN (Peripheral lymph node) – Periferal limfa tuguni
PMN (Polymorphonuclear cell) – Polimorfonuklear hujayra
RC (Reticular cell) – Retikulyar hujayra
TxA2 (Thromboxane) – Tromboksan`;

function parse(raw) {
  const seen = new Set();
  return raw.split('\n')
    .map(l => l.trim())
    .filter(Boolean)
    .map(line => {
      const sep = line.indexOf(' – ');
      if (sep === -1) return null;
      const title = line.slice(0, sep).trim();
      const description = line.slice(sep + 3).trim();
      return { title, description };
    })
    .filter(Boolean)
    .filter(({ title }) => {
      if (seen.has(title)) return false;
      seen.add(title);
      return true;
    });
}

const entries = parse(RAW);
console.log(`📋 ${entries.length} ta qisqartma topildi`);

let ok = 0, skip = 0;
for (const entry of entries) {
  const existing = await prisma.abbreviations.findFirst({ where: { title: entry.title } });
  if (existing) { skip++; continue; }
  await prisma.abbreviations.create({ data: entry });
  ok++;
}

const total = await prisma.abbreviations.count();
console.log(`✅ Qo'shildi: ${ok} | O'tkazildi (mavjud): ${skip} | Jami bazada: ${total}`);
await prisma.$disconnect();
