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
    <div className="container mx-auto mt-10">
        <h2 className="text-xl font-bold mb-4 text-center">Detalles del Usuario</h2>
      <div className="space-y-6 bg-white p-6 rounded-md shadow-md border border-gray-300">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nombre</label>
          <p className="mt-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-100">{user.name}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
          <p className="mt-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-100">{user.email}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Rol</label>
          <p className="mt-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-100">{user.role}</p>
        </div>
      </div>

      <div className="flex gap-4 items-center mt-6">
        <Link
          href={'/admin/users'}
          className="w-full sm:w-auto bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Volver
        </Link>
        <Link
          href={`/admin/users/${userId}/edit`}
          className="w-full sm:w-auto bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          Editar
        </Link>
      </div>
    </div>
  );
}
