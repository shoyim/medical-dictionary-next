import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

try {
  const tr = await prisma.medicalTermTranslation.deleteMany();
  const tm = await prisma.medicalTerm.deleteMany();
  console.log(`✅ O'chirildi: ${tm.count} term, ${tr.count} translation`);
} finally {
  await prisma.$disconnect();
}
