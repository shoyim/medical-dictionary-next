import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const EMAIL = 'admin@medterm.uz';
const PASSWORD = 'admin123';
const NAME = 'Admin';

try {
  const existing = await prisma.user.findUnique({ where: { email: EMAIL } });
  if (existing) {
    // Update password
    const hash = await bcrypt.hash(PASSWORD, 10);
    await prisma.user.update({ where: { email: EMAIL }, data: { password: hash, name: NAME } });
    console.log(`✅ Admin yangilandi: ${EMAIL}`);
  } else {
    const hash = await bcrypt.hash(PASSWORD, 10);
    const user = await prisma.user.create({ data: { name: NAME, email: EMAIL, password: hash } });
    console.log(`✅ Admin yaratildi: ${EMAIL} (id=${user.id})`);
  }
} finally {
  await prisma.$disconnect();
}
