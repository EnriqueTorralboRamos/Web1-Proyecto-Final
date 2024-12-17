'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getUserById } from '@/src/services/users/userServiceClient';
import SkeletonUserForm from '@/src/components/skeletons/UserFormSkeleton';

export default function UserProfile({ userId }: { userId: string }) {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUserById(userId);
        setUser(userData);
      } catch (err) {
        console.error('Error al obtener el usuario:', err);
        setError('No se encontró el usuario.');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  if (loading) {
    return <SkeletonUserForm />;
  }

  if (error) {
    return <div className="text-red-500 text-center mt-4">{error}</div>;
  }

  return (
    <div className="container mx-auto mt-6 max-w-md">
      <h2 className="text-lg font-bold mb-4 text-center">Detalles del Usuario</h2>
      <div className="space-y-4 bg-white p-4 rounded-md shadow-md border border-gray-300">
        <div>
          <label className="block text-xs font-medium text-gray-700">Nombre</label>
          <p className="mt-1 px-2 py-1 border border-gray-300 rounded-md bg-gray-100 text-sm truncate">
            {user.name}
          </p>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700">Correo Electrónico</label>
          <p className="mt-1 px-2 py-1 border border-gray-300 rounded-md bg-gray-100 text-sm truncate">
            {user.email}
          </p>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700">Rol</label>
          <p className="mt-1 px-2 py-1 border border-gray-300 rounded-md bg-gray-100 text-sm truncate">
            {user.role}
          </p>
        </div>
      </div>

      <div className="flex justify-center gap-2 items-center mt-4">
        <Link
          href={'/admin/users'}
          className="w-full sm:w-auto bg-blue-600 text-white py-1 px-3 rounded-md text-sm hover:bg-blue-700"
        >
          Volver
        </Link>
        <Link
          href={`/admin/users/${userId}/edit`}
          className="w-full sm:w-auto bg-gray-600 text-white py-1 px-3 rounded-md text-sm hover:bg-gray-700"
        >
          Editar
        </Link>
      </div>
    </div>
  );
}
