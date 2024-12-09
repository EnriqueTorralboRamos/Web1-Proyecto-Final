// src/components/ProgramDetailsServer.tsx
import { getProgramById } from '@/src/services/program/programServiceServer';
import { format } from 'date-fns';
import Link from 'next/link';

export default async function ProgramDetailsServer({ programId }: { programId: string }) {
  const program = await getProgramById(programId);

  if (!program) {
    return <div>No se encontró el programa.</div>;
  }

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6 text-gray-700">Detalles del Programa</h1>
      <div className="space-y-6 bg-white p-6 rounded-md shadow-md border border-gray-300">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nombre del Programa</label>
          <p className="mt-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-100">{program.name}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">País</label>
          <p className="mt-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-100">
            {program.country?.name || 'N/A'}
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Fecha de Inicio</label>
          <p className="mt-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-100">
            {format(new Date(program.startDate), 'dd/MM/yyyy')}
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Fecha de Fin</label>
          <p className="mt-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-100">
            {format(new Date(program.endDate), 'dd/MM/yyyy')}
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Estado</label>
          <p className="mt-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-100">{program.status}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Participantes</label>
          <ul className="mt-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-100">
            {program.participants.length > 0 ? (
              program.participants.map((participant: any) => (
                <li key={participant._id} className="list-disc list-inside">
                  {participant.name} ({participant.email})
                </li>
              ))
            ) : (
              <p>No hay participantes inscritos.</p>
            )}
          </ul>
        </div>
      </div>

      <div className="flex gap-4 items-center mt-6">
        <Link
          href={'/admin/programs'}
          className="w-full sm:w-auto bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Volver
        </Link>
        <Link
          href={`/admin/programs/${programId}/edit`}
          className="w-full sm:w-auto bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          Editar
        </Link>
      </div>
    </div>
  );
}
