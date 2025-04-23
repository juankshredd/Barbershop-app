import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const appointment = await prisma.appointment.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        date: new Date(data.date),
        time: data.time,
        service: data.service,
      },
    });

    return NextResponse.json({ message: 'Cita creada exitosamente', appointment });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Error al crear la cita' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const appointments = await prisma.appointment.findMany({
      orderBy: { date: 'asc' },
    });
    return NextResponse.json(appointments);
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener las citas' }, { status: 500 });
  }
} 