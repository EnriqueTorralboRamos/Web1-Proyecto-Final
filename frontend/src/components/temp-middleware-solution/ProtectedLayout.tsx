'use client';

import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

interface PrivateRouteProps {
  children: React.ReactNode;
  role?: string; // Rol requerido para la página
}

export default function PrivateRoute({ children, role }: Readonly<PrivateRouteProps>) {
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null); // null indica que está cargando
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get('authToken');

    if (!token) {
      // Si no hay token, redirige al login
      router.push('/login');
      return;
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1])); // Decodifica el token JWT
      const userRole = payload.user.role;

      if (role && userRole !== role) {
        // Si el rol no coincide, redirige
        router.push('/'); // Cambia a la página que corresponda
        return;
      }

      setIsAuthorized(true); // Usuario autorizado
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      router.push('/login'); // Token inválido
    }
  }, [role, router]);

  if (isAuthorized === null) {
    // Muestra un loader mientras verificamos
    return <div>Cargando...</div>;
  }

  if (!isAuthorized) {
    // En caso de que la autorización falle (solo para seguridad extra)
    return null;
  }

  // Renderiza los hijos si está autorizado
  return <>{children}</>;
}
