import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

try {
  const languages = await prisma.language.findMany();
  console.log('Languages:', JSON.stringify(languages, null, 2));

  const termCount = await prisma.medicalTerm.count();
  console.log('Total terms in DB:', termCount);

  const translationCount = await prisma.medicalTermTranslation.count();
  console.log('Total translations in DB:', translationCount);

  // Sample 3 terms with translations
  const sample = await prisma.medicalTerm.findMany({
    take: 3,
    include: { translations: { include: { language: true } } },
  });
  console.log('\nSample terms:');
  for (const t of sample) {
    console.log(`  Term #${t.id}:`);
    for (const tr of t.translations) {
      console.log(`    [${tr.language.code}] name: "${tr.name.slice(0, 60)}..."`);
    }
  }
} finally {
  await prisma.$disconnect();
}
