'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getProgramById } from '@/src/services/programServiceClient';

export default function ProgramDetails({ programId }: { readonly programId: string }) {
  const [program, setProgram] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProgramDetails = async () => {
      try {
        const data = await getProgramById(programId);
        setProgram(data);
      } catch (error) {
        console.error('Error al obtener los detalles del programa:', error);
        router.push('/admin/programs'); // Redirigir si hay error
      } finally {
        setLoading(false);
      }
    };

    fetchProgramDetails();
  }, [programId, router]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (!program) {
    return <div>No se encontró el programa.</div>;
  }

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">{program.name}</h1>
      <p><strong>País:</strong> {program.country?.name || 'N/A'}</p>
      <p><strong>Fecha de Inicio:</strong> {new Date(program.startDate).toLocaleDateString()}</p>
      <p><strong>Fecha de Fin:</strong> {new Date(program.endDate).toLocaleDateString()}</p>
      <p><strong>Estado:</strong> {program.status}</p>
      <div>
        <strong>Participantes:</strong>
        <ul>
          {program.participants.length > 0 ? (
            program.participants.map((participant: any) => (
              <li key={participant._id}>
                {participant.name} ({participant.email})
              </li>
            ))
          ) : (
            <p>No hay participantes inscritos.</p>
          )}
        </ul>
      </div>
    </div>
  );
}
