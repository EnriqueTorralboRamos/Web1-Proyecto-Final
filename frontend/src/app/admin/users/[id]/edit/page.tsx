'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation'; // Usa useParams en lugar de acceder a params directamente
import UserForm from '@/src/components/users/UserForm';
import { updateUser, getUserById } from '@/src/services/users/userServiceClient';
import LoadingErrorCacther from '@/src/components/temp-middleware-solution/LoadingErrorCatcher';
import SkeletonUserForm from '@/src/components/skeletons/UserFormSkeleton';

export default function EditUserPage() {
  const { id } = useParams(); // Desempaqueta params.id correctamente
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return; // Asegúrate de que `id` está disponible antes de proceder

    const fetchUser = async () => {
      try {
        const data = await getUserById(Array.isArray(id) ? id[0] : id);
        setUser({
          _id: data._id,
          name: data.name,
          email: data.email,
          role: data.role,
          password: data.password,
        });
      } catch (err) {
        console.error('Error al cargar el usuario:', err);
        setError('No se pudo cargar el usuario.');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const handleSubmit = async (values: {
    _id: string;
    name: string;
    email: string;
    role: string;
    password?: string;
  }) => {
    try {
      if (id) {
        await updateUser( { ...values });
        router.push('/admin/users');
      } else {
        setError('ID del usuario no está disponible.');
      }
    } catch (err) {
      console.error('Error al actualizar el usuario:', err);
      setError('No se pudo actualizar el usuario.');
    }
  };
  if (loading) return <LoadingErrorCacther><SkeletonUserForm /></LoadingErrorCacther>;
  if (error) return <LoadingErrorCacther><div><p className="text-red-500">{error}</p><SkeletonUserForm /></div></LoadingErrorCacther>;

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Editar Programa</h1>
      {user && <UserForm initialData={user} onSubmit={handleSubmit} />}
    </div>
        
  );
}