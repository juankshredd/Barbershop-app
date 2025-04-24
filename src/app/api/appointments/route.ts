import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Validar fecha y hora
    const selectedDate = new Date(data.date);
    const selectedTime = data.time.split(':');
    selectedDate.setHours(parseInt(selectedTime[0]), parseInt(selectedTime[1]));
    
    const now = new Date();
    
    if (selectedDate < now) {
      return NextResponse.json(
        { error: 'No se pueden crear citas en fechas u horas pasadas' },
        { status: 400 }
      );
    }

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
      orderBy: {
        date: 'asc'
      }
    });

    return NextResponse.json(appointments);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    return NextResponse.json(
      { error: 'Error al obtener las citas' },
      { status: 500 }
    );
  }
} 