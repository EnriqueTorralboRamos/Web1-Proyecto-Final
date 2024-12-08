'use client';

import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

export default function AdminProtection({ children }: { children: React.ReactNode }) {
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
      const payload = JSON.parse(atob(token.split('.')[1])); // Decodifica la parte del token JWT que contiene los datos
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
