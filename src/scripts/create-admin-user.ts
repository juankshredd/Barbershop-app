import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  try {
    const password = await bcrypt.hash('admin123', 10);
    const user = await prisma.user.upsert({
      where: { email: 'admin@barberjktest.com' },
      update: {},
      create: {
        email: 'admin@barberjktest.com',
        password: password,
        name: 'Administrador',
        role: 'ADMIN',
      },
    });
    console.log('Usuario administrador creado:', user);
  } catch (error) {
    console.error('Error creando usuario administrador:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main(); 