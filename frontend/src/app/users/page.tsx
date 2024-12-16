'use client';

import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import UserProgramDetails from '@/src/components/users/UserProgramDetails';
import SkeletonUserForm from '@/src/components/skeletons/UserFormSkeleton';
import LoadingErrorCacther from '@/src/components/temp-middleware-solution/LoadingErrorCatcher';
import { getProgramByUserId } from '@/src/services/program/programServiceClient';
import UserProfile from '@/src/components/users/UserProfile';
import { useRouter } from 'next/navigation';

export default function UserPage() {
  const [userId, setUserId] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null); // Para el nombre del usuario
  const [userPrograms, setUserPrograms] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();


  useEffect(() => {
    const authToken = Cookies.get('authToken');
    if (!authToken) {
      setError('No estás autenticado. Por favor, inicia sesión.');
      setLoading(false);
      return;
    }

    try {
      const decodedToken = parseJWT(authToken); // Decodifica el JWT para obtener el ID y nombre del usuario
      setUserId(decodedToken.user.id);
      setUserName(decodedToken.user.email); // Asigna el nombre del usuario

      const fetchUserPrograms = async (id: string) => {
        try {
          const programs = await getProgramByUserId(id);
          setUserPrograms(programs);
        } catch (err) {
          console.error('Error al cargar programas del usuario:', err);
          setError('No tienes permiso para acceder a esta información.');
        } finally {
          setLoading(false);
        }
      };

      fetchUserPrograms(decodedToken.user.id);
    } catch (err) {
      console.error('Error al decodificar el token:', err);
      setError('Token inválido. Por favor, inicia sesión de nuevo.');
      setLoading(false);
    }
  }, []);

  // Mostrar skeleton mientras se carga la información
  if (loading) {
    return <SkeletonUserForm />;
  }

  // Mostrar mensaje de error si hay un problema
  if (error) {
    return (
      <LoadingErrorCacther>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-500 mb-4">Error al cargar la información</h1>
          <p className="text-gray-700">{error}</p>
        </div>
      </LoadingErrorCacther>
    );
  }

  // Renderizar los datos si están disponibles
  return (
    <div className="container mx-auto mt-10">
      {/* Encabezado fijo */}
      <div className="flex justify-between items-center bg-white p-4 shadow-md fixed top-0 left-0 w-full z-10">
        <h1 className="text-2xl font-bold text-gray-700">
          Bienvenido, {userName || 'Usuario'}
        </h1>
        <button
          onClick={() => {
            Cookies.remove('authToken')
            router.push('/login');
          }}
          className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none"
        >
          Logout
        </button>
      </div>

      {/* Contenido debajo del encabezado */}
      <div className="mt-20"> {/* Espacio para evitar que se solape con el encabezado */}
        {userId && (
          <div>
            <UserProfile userId={userId} />
            {userPrograms && (
              <UserProgramDetails
                programs={userPrograms}
                userId={userId}
                url="/users"
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// Decodificar un JWT para extraer el payload (incluyendo el ID del usuario)
function parseJWT(token: string) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map((c) => `%${c.charCodeAt(0).toString(16).padStart(2, '0')}`)
      .join('')
  );
  return JSON.parse(jsonPayload);
}
