import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const LANGUAGES = [
  { code: 'uz', name: "O'zbek", flag: '🇺🇿' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
];

try {
  for (const lang of LANGUAGES) {
    const existing = await prisma.language.findUnique({ where: { code: lang.code } });
    if (existing) {
      console.log(`⏭  ${lang.code} mavjud (id=${existing.id})`);
    } else {
      const created = await prisma.language.create({ data: lang });
      console.log(`✅  ${lang.code} qo'shildi (id=${created.id})`);
    }
  }

  const all = await prisma.language.findMany();
  console.log('\nBarcha tillar:', JSON.stringify(all, null, 2));
} finally {
  await prisma.$disconnect();
}
