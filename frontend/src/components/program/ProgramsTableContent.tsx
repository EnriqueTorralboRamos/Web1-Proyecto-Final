'use client';

import Link from 'next/link';
import Table from '../Table';
import { CgDetailsMore } from 'react-icons/cg';
import ProgramStatus from '@/src/constants/programStatus';
import { useState } from "react";
import { deleteProgram } from '@/src/services/program/programServiceClient';
import { MdDeleteOutline } from "react-icons/md";


interface Program {
    _id: string;
    name: string;
    country: { name: string }; // Si necesitas mostrar el país
    participants: string[]; // Array de IDs de participantes
    startDate: string;
    endDate: string;
    status: string;
}

export default function ProgramsTableContent({ programs }: { readonly programs: ReadonlyArray<Program> }) {
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [programsState, setProgramsState] = useState(programs);

  const status = (program: Program) => { // Función para obtener el estado del programa
    if (program.status === ProgramStatus.PENDING) return 'Pendiente';
    if (program.status === ProgramStatus.ONGOING) return 'En progreso';
    if (program.status === ProgramStatus.COMPLETED) return 'Finalizado';
    return 'Desconocido';
  }
  const handleDelete = (id: string,name:string) => async () => {
    if(confirm(`¿Estás seguro de que deseas eliminar este país? ${name}`)) {
        setLoadingId(id);
        setError(null);
        try {
            await deleteProgram(id);
            
            setProgramsState(programs.filter((program) => program._id !== id));
        } catch (error:any) {
            console.error('Error al eliminar el programa ',error);
            setError(error.response?.data?.message || 'Error al eliminar el programa');
        } finally {
            setLoadingId(null);
        }
    }
};
  return (
    <Table
      columns={[ 'Nombre', 'Inicio', 'Fin', 'Estado','Más Info']}
      data={programs}
      renderRow={(program) => (
        <>
          <td>{program.name}</td>
          <td>{new Date(program.startDate).toLocaleDateString()}</td>
          <td>{new Date(program.endDate).toLocaleDateString()}</td>
          <td>{status(program)}</td>
          <td className="text-center flex justify-center items-center gap-4">
            {/* Enlace al detalle */}
            <Link href={`/admin/programs/${program._id}`}>
              <CgDetailsMore className="cursor-pointer text-lg hover:text-blue-600" />
            </Link>

            {/* Botón de eliminar */}
            <MdDeleteOutline
              onClick={() => handleDelete(program._id, program.name)}
              className={`cursor-pointer ${
                loadingId === program._id ? 'text-gray-400' : 'hover:text-red-500'
              }`}
            />
          </td>
        </>
      )}
    />
  );
}
