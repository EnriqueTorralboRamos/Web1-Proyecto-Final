'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import SkeletonPermissionCheck from '../skeletons/SkeletonPermissionCheck';
import axiosInstance from '@/src/services/axiosInstance'; // Importa tu instancia global de Axios
import { UserRoles } from '@/src/constants/userRoles';

export default function AdminProtectedRoute({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAdminAccess = async () => {
      try {
        // Realiza la llamada a la API usando Axios
        const response = await axiosInstance.get('/auth/check-admin');

        if (response.status === 200) {
          const { role } = response.data;
          if (role === UserRoles.Admin) {
            setIsAdmin(true);
          } else {
            throw new Error('No autorizado');
          }
        } else {
          throw new Error('Error en la respuesta');
        }
      } catch (error) {
        console.error('Error al verificar el acceso de administrador:', (error as any).message);
        router.replace('/users'); // Redirige a /users si no es admin o hay un error
      } finally {
        setIsLoading(false);
      }
    };

    checkAdminAccess();
  }, [router]);

  if (isLoading) {
    return <SkeletonPermissionCheck />; // Muestra el skeleton mientras verifica el acceso
  }

  if (!isAdmin) {
    return null; // Evita mostrar el contenido si no es admin
  }

  return <>{children}</>;
}
