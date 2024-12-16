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

export default function LoadingErrorCacther({ children }: { readonly children: React.ReactNode }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const handleLogout = () => {
    Cookies.remove('authToken'); // Elimina el token de autenticación
    router.push('/login'); // Redirige al usuario al login
  };


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
        handleLogout();
        return;
      }     

      setLoading(false); // Usuario válido, puede acceder
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      handleLogout() // Si el token es inválido, redirigir al login
    }
  }, [router]);

  if (loading) {
    return <>{children}</>;
  }

  return <>{children}</>;
}
