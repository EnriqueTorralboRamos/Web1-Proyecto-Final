'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import SkeletonPermissionCheck from '../skeletons/SkeletonPermissionCheck'; // Reutilizamos el skeleton creado

export default function AdminProtectedRoute({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAdminAccess = async () => {
      try {
        // Simula una llamada al backend o verificación de token
        const response = await fetch('/api/auth/check-admin', {
          method: 'GET',
          credentials: 'include', // Si usas cookies para autenticación
        });

        if (response.ok) {
          const data = await response.json();
          setIsAdmin(data.role === 'admin'); // Verifica si el rol es 'admin'
        } else {
          setIsAdmin(false);
        }
      } catch (error) {
        console.error('Error al verificar el acceso de administrador:', error);
        setIsAdmin(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAdminAccess();
  }, []);

  if (isLoading) {
    return <SkeletonPermissionCheck />;
  }

  if (!isAdmin) {
    router.replace('/users'); // Redirige a la página de inicio de sesión o acceso denegado
    return null;
  }

  return <>{children}</>;
}
