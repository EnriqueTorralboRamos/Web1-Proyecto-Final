'use client';

import { useState } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import { removeParticipantFromProgram } from '@/src/services/program/programServiceClient';

interface Program {
  _id: string;
  name: string;
  country: { name: string };
  startDate: string;
  endDate: string;
}

interface UserProgramDetailsProps {
  programs?: Program[];
  userId: string;
}

export default function UserProgramDetails({ programs=[], userId }: Readonly<UserProgramDetailsProps>) {
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<string | null>(null);

  
  const handleRemoveParticipant = async (programId:string) => {
    if (confirm('¿Estás seguro de que deseas eliminar al participante de este programa?')) {
      setLoading(programId);
      setError(null);
      setSuccessMessage(null);

      try {
        await removeParticipantFromProgram(programId, userId);
        setSuccessMessage('El participante fue eliminado exitosamente del programa.');
      } catch (err: any) {
        setError(err.response?.data?.message || 'Error al eliminar al participante del programa.');
      } finally {
        setLoading(null);
      }
    }
  };

  return (
    <div className="container mx-auto mt-10">
    {programs.length>0 && <h2 className="text-xl font-bold mb-4 text-center">Programas en los que participa</h2>}

    {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
    {successMessage && <p className="text-green-500 mb-4 text-center">{successMessage}</p>}

    <div
        className={`grid gap-6 gap-y-12 px-4 ${
        programs.length === 1
            ? 'grid-cols-1 justify-items-center'
            : programs.length === 2
            ? 'grid-cols-2 justify-items-center'
            : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
        }`}
    >
        {programs.map((program) => (
        <div
            key={program._id}
            className="bg-white p-4 rounded-md shadow-md border border-gray-300 w-full max-w-sm"
        >
            <div>
            <label className="block text-sm font-medium text-gray-700">Nombre del Programa</label>
            <p className="mt-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-100 overflow-hidden text-ellipsis whitespace-nowrap">
                {program.name}
            </p>
            </div>

            <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">País</label>
            <p className="mt-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-100">
                {program.country?.name || 'N/A'}
            </p>
            </div>

            <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">Fecha de Inicio</label>
            <p className="mt-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-100">
                {program.startDate ? format(new Date(program.startDate), 'dd/MM/yyyy') : 'No disponible'}
            </p>
            </div>

            <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">Fecha de Fin</label>
            <p className="mt-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-100">
                {program.endDate ? format(new Date(program.endDate), 'dd/MM/yyyy') : 'No disponible'}
            </p>
            </div>

            <div className="flex gap-4 items-center mt-6">
            <Link
                href={`/admin/programs/${program._id}`}
                className="w-full sm:w-auto bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
                Más Detalles
            </Link>
            <button
                onClick={() => handleRemoveParticipant(program._id)}
                disabled={loading === program._id}
                className="w-full sm:w-auto bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50"
            >
                {loading === program._id ? 'Eliminando...' : 'Eliminar Participante'}
            </button>
            </div>
        </div>
        ))}
    </div>
    </div>


  );
}
