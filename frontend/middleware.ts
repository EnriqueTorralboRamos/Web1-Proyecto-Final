import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('authToken')?.value;

  // Si no hay token y la ruta es protegida, redirigir al login
  const protectedRoutes = ['/programs', '/admin'];
  if (!token && protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route))) {
    console.warn('No token found, redirecting to login');
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/programs/:path*', '/admin/:path*'], // Rutas protegidas
};
