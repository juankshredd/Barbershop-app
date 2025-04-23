'use client';

import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
      <div className="w-full max-w-[400px] bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            BarberJKTestApp
          </h1>
          <h3 className="text-gray-600 dark:text-gray-400">Created by Juan Bohorquez</h3>
        </div>
        
        <div className="space-y-4 mt-8">
          <button
            onClick={() => router.push('/appointments')}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-xl text-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Agendar Cita
          </button>
          
          <button
            onClick={() => router.push('/view-appointments')}
            className="w-full bg-green-600 text-white py-3 px-6 rounded-xl text-lg font-semibold hover:bg-green-700 transition-colors"
          >
            Ver Citas
          </button>
          
          <button
            onClick={() => router.push('/login')}
            className="w-full bg-gray-700 text-white py-3 px-6 rounded-xl text-lg font-semibold hover:bg-gray-600 transition-colors"
          >
            Iniciar Sesión
          </button>
        </div>
      </div>
    </div>
  );
}
