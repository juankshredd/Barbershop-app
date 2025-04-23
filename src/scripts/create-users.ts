import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  try {
    // Crear usuario administrador
    const adminPassword = await bcrypt.hash('admin123', 10);
    const admin = await prisma.user.upsert({
      where: { email: 'admin@barberjktest.com' },
      update: {},
      create: {
        email: 'admin@barberjktest.com',
        password: adminPassword,
        name: 'Administrador',
        role: 'ADMIN',
      },
    });

    // Crear usuario normal
    const userPassword = await bcrypt.hash('test123', 10);
    const user = await prisma.user.upsert({
      where: { email: 'test@example.com' },
      update: {},
      create: {
        email: 'test@example.com',
        password: userPassword,
        name: 'Usuario de Prueba',
        role: 'USER',
      },
    });

    console.log('Usuarios creados exitosamente:');
    console.log('Admin:', admin);
    console.log('User:', user);
  } catch (error) {
    console.error('Error creando usuarios:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main(); 