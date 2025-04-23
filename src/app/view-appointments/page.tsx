'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Appointment {
  id: number;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  service: string;
}

export default function ViewAppointments() {
  const router = useRouter();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch('/api/appointments');
        if (!response.ok) {
          throw new Error('Error al cargar las citas');
        }
        const data = await response.json();
        setAppointments(data);
      } catch (error) {
        setError('Error al cargar las citas');
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12 px-4 flex items-center justify-center">
        <div className="text-gray-900 dark:text-white">Cargando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Citas Programadas
              </h1>
              <button
                onClick={() => router.push('/')}
                className="px-4 py-2 bg-gray-700 text-white rounded-xl hover:bg-gray-600 transition-colors"
              >
                Volver
              </button>
            </div>
          </div>

          {error ? (
            <div className="p-6 text-red-600 dark:text-red-400">{error}</div>
          ) : (
            <div className="relative overflow-hidden rounded-b-xl">
              <div 
                className="max-h-[600px] overflow-y-auto" 
                style={{
                  scrollbarWidth: 'thin',
                  scrollbarColor: 'rgb(156 163 175) transparent'
                }}
              >
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-900 sticky top-0 z-10">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Nombre
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Servicio
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Fecha
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Hora
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Contacto
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {appointments.map((appointment) => (
                      <tr key={appointment.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {appointment.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {appointment.service}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {new Date(appointment.date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {appointment.time}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          <div>{appointment.email}</div>
                          <div>{appointment.phone}</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 