import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// FlagsAPI: https://flagsapi.com/{CODE}/flat/64.png
const FLAGS = {
  uz: 'https://flagsapi.com/UZ/flat/64.png',
  ru: 'https://flagsapi.com/RU/flat/64.png',
  en: 'https://flagsapi.com/GB/flat/64.png',
};

try {
  for (const [code, flag] of Object.entries(FLAGS)) {
    const result = await prisma.language.updateMany({ where: { code }, data: { flag } });
    console.log(`✅ ${code} → ${flag} (${result.count} ta)`);
  }
  const all = await prisma.language.findMany();
  console.log('\nBarcha tillar:', all.map(l => `${l.code}: ${l.flag}`).join('\n'));
} finally {
  await prisma.$disconnect();
}
