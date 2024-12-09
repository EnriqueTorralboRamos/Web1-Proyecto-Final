'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation'; // Usa useParams en lugar de acceder a params directamente
import ProgramForm from '@/src/app/admin/programs/create/CreateProgramForm';
import { updateProgram, getProgramById } from '@/src/services/program/programServiceClient';
import ProgramFormSkeleton from '@/src/components/skeletons/ProgramFormSkeleton';
import LoadingErrorCacther from '@/src/components/temp-middleware-solution/LoadingErrorCatcher';

export default function EditProgramPage() {
  const { id } = useParams(); // Desempaqueta params.id correctamente
  const router = useRouter();
  const [program, setProgram] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return; // Asegúrate de que `id` está disponible antes de proceder

    const fetchProgram = async () => {
      try {
        const data = await getProgramById(Array.isArray(id) ? id[0] : id);
        setProgram({
          name: data.name,
          country: data.country._id,
          participants: data.participants.map((p: any) => p._id),
          startDate: data.startDate,
          endDate: data.endDate,
        });
      } catch (err) {
        console.error('Error al cargar el programa:', err);
        setError('No se pudo cargar el programa.');
      } finally {
        setLoading(false);
      }
    };

    fetchProgram();
  }, [id]);

  const handleSubmit = async (values: {
    name: string;
    country: string;
    participants: string[];
    startDate: string;
    endDate: string;
  }) => {
    try {
      if (id) {
        await updateProgram(Array.isArray(id) ? id[0] : id, values);
      } else {
        setError('ID del programa no está disponible.');
      }
      router.push('/admin/programs');
    } catch (err) {
      console.error('Error al actualizar el programa:', err);
      setError('No se pudo actualizar el programa.');
    }
  };

  if (loading) return <LoadingErrorCacther><ProgramFormSkeleton /></LoadingErrorCacther>;
  if (error) return <LoadingErrorCacther><div><p className="text-red-500">{error}</p><ProgramFormSkeleton /></div></LoadingErrorCacther>;

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Editar Programa</h1>
      {program &&<ProgramForm initialData={program} onSubmit={handleSubmit} />}
    </div>
  );
}
