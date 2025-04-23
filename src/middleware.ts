import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verify } from 'jsonwebtoken';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  // Rutas públicas que no requieren autenticación
  const publicPaths = ['/', '/appointments', '/login'];
  
  // Si es una ruta pública, permitir el acceso
  if (publicPaths.includes(pathname)) {
    return NextResponse.next();
  }

  // Si no hay token y la ruta no es pública, redirigir a login
  if (!token && !publicPaths.includes(pathname)) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Si hay token y está en /login, redirigir a dashboard
  if (token && pathname === '/login') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Verificar el token para rutas protegidas
  if (token && !publicPaths.includes(pathname)) {
    try {
      verify(token, process.env.JWT_SECRET || 'your-secret-key');
      return NextResponse.next();
    } catch (error) {
      // Si el token es inválido, redirigir a login
      const response = NextResponse.redirect(new URL('/login', request.url));
      response.cookies.delete('token');
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/appointments']
}; 