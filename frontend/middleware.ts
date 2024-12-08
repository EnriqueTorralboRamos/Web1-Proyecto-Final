import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
// import jwt from 'jsonwebtoken';
// import { UserRoles } from './src/constants/userRoles';

// const secretKey = process.env.JWT_SECRET ?? 'secretKey';

// interface DecodedToken {
//   user: {
//     id: string;
//     email: string;
//     role: string;
//   };
//   iat: number;
//   exp: number;
// }

// export async function middleware(request: NextRequest) {
//   console.log('Middleware ejecutándose en la ruta:', request.nextUrl.pathname);
//   // Obtener el token desde las cookies
//   const token = request.cookies.get('authToken')?.value;
//   if (request.nextUrl.pathname === '/') {
//     return NextResponse.redirect(new URL('/login', request.url));
//   }
//   // Si no hay token y el usuario intenta acceder a una página protegida se redirige a la página de login
//   const protectedRoutes = [ '/users', '/admin','/'];
//   if (!token && protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route))) {
//     console.log('No hay token, redirigiendo a /login');
//     return NextResponse.redirect(new URL('/login', request.url));
//   }
//   if(token){
//     try {
//       // Decodificar el token
      
//       const decodedToken = jwt.verify(token, secretKey) as DecodedToken;

//       // Redirigir a `/users` si el usuario intenta acceder a una ruta de admin sin permisos
//       if (
//         decodedToken.user.role !== UserRoles.Admin &&
//         request.nextUrl.pathname.startsWith('/admin')
//       ) {
//         console.log('Acceso denegado. Redirigiendo a /users');
//         return NextResponse.redirect(new URL('/users', request.url));
//       }
//     } catch (error) {
//       console.error('Token inválido:', error);
//       // Si el token es inválido, redirigir al login
//       return NextResponse.redirect(new URL('/login', request.url));
//     }
//   }
//   // Permitir el acceso en otros casos
//   return NextResponse.next();
// }
// export const config = {
//   matcher: ['/admin/:path*', '/users/:path*'], // Rutas protegidas
// };
export function middleware(request: NextRequest) {
  console.log('Middleware ejecutándose en la ruta:', request.nextUrl.pathname);
  return NextResponse.next();
}

export const config = {
  matcher: ['/:path*'], // Proteger todas las rutas
};