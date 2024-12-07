import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  console.log('Middleware ejecutándose en la ruta:', request.nextUrl.pathname);
  // Obtener el token desde las cookies
  const token = request.cookies.get('authToken');
  if (request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  // Si no hay token y el usuario intenta acceder a una página protegida se redirige a la página de login
  const protectedRoutes = ['/programs', '/dashboard', '/admin','/'];
  if (!token && protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route))) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Permitir el acceso en otros casos
  return NextResponse.next();
}
