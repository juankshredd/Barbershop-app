'use client';

import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-8">
          BarberJKTestApp
        </h1>
      </div>
      
      <div className="space-y-4">
        <button
          onClick={() => router.push('/appointments')}
          className="w-64 bg-blue-600 text-white py-3 px-6 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Agendar Cita
        </button>
        
        <button
          onClick={() => router.push('/login')}
          className="w-64 bg-gray-700 text-white py-3 px-6 rounded-lg text-lg font-semibold hover:bg-gray-600 transition-colors"
        >
          Iniciar Sesión
        </button>
      </div>
    </div>
  );
}
