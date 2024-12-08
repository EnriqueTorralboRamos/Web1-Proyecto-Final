'use client';

import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  user: {
    id: string;
    email: string;
    role: string;
  };
  iat: number;
  exp: number;
}

export default function AdminProtection({ children }: { readonly children: React.ReactNode }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get('authToken');

    if (!token) {
      // Redirigir a la página de login si no hay token
      router.push('/login');
      return;
    }

    try {
      // Decodifica el token para obtener el rol del usuario
      const payload = jwtDecode<DecodedToken>(token);
      
      const currentTime = Math.floor(Date.now() / 1000);
      if (payload.exp < currentTime) {
        console.error('Token expirado');
        router.push('/login'); // Redirige al login si el token expiró
        return;
      }

      const userRole = payload.user.role;

      if (userRole === 'USER') {
        router.push('/users'); // Redirige a la página de usuario
        return;
      } else if (userRole !== 'ADMIN') {
        router.push('/login'); // Si no es admin ni user, redirige al login
        return;
      }

      setLoading(false); // Usuario válido, puede acceder
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      router.push('/login'); // Si el token es inválido, redirigir al login
    }
  }, [router]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  return <>{children}</>;
}
