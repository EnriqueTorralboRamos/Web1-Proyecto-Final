'use client';

import Link from 'next/link';
import Table from '../Table';
import { CgDetailsMore } from 'react-icons/cg';
import ProgramStatus from '@/src/constants/programStatus';
import { useState } from "react";
import { deleteProgram } from '@/src/services/program/programServiceClient';
import { MdDeleteOutline } from "react-icons/md";
import { useRouter } from 'next/navigation';
import { CiEdit } from "react-icons/ci";



export default function ProgramsTableContent({ programs }: { readonly programs: ReadonlyArray<Program> }) {
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();


  const status = (program: Program) => { // Función para obtener el estado del programa
    if (program.status === ProgramStatus.PENDING) return 'Pendiente';
    if (program.status === ProgramStatus.ONGOING) return 'En progreso';
    if (program.status === ProgramStatus.COMPLETED) return 'Finalizado';
    return 'Desconocido';
  }
  const handleDelete = (id: string,name:string) => async () => {
    if(confirm(`¿Estás seguro de que deseas eliminar este programa? ${name}`)) {
        setLoadingId(id);
        setError(null);
        try {
            await deleteProgram(id);
            
        } catch (error:any) {
            console.error('Error al eliminar el programa ',error);
            setError(error.response?.data?.message || 'Error al eliminar el programa');
        } finally {
            setLoadingId(null);
            router.refresh();

            
        }
    }
  };
  return (
    <div>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <Table
      columns={[ 'Nombre', 'Pais', 'Inicio', 'Fin', 'Estado','Más Info']}
      data={programs}
      renderRow={(program) => (
        <>
          <td className='px-6  md:text-base text-sm max-w-[300px] lg:max-w-[200px] xl:max-w-[150px] truncate'>{program.name}</td>
          <td className='px-6  md:text-base text-sm'>{program.country?.name}</td>
          <td className='px-6  md:text-base text-sm'>{new Date(program.startDate).toLocaleDateString()}</td>
          <td className='px-6  md:text-base text-sm'>{new Date(program.endDate).toLocaleDateString()}</td>
          <td className='px-6  md:text-base text-sm'>{status(program)}</td>
          <td className="text-center flex justify-left items-center gap-4 px-6 ">
            {/* Enlace al detalle */}
            <Link href={`/admin/programs/${program._id}`}>
              <CgDetailsMore className="cursor-pointer text-lg hover:text-blue-600" />
            </Link>

            {/* Enlace a editar */}
            <Link href={`/admin/programs/${program._id}/edit`}>
              <CiEdit  className="cursor-pointer text-lg hover:text-blue-600" />
            </Link>

            {/* Botón de eliminar */}
            <MdDeleteOutline
              onClick={handleDelete(program._id, program.name)}
              className={`cursor-pointer ${
                loadingId === program._id ? 'text-gray-400' : 'hover:text-red-500'
              }`}
            />
          </td>
        </>
      )}
    />
    </div>
    
  );
}
