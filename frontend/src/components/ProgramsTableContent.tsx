'use client';

import Link from 'next/link';
import Table from './Table';
import { CgDetailsMore } from 'react-icons/cg';

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
  return (
    <Table
      columns={[ 'Nombre', 'Inicio', 'Fin', 'Estado','Más Info']}
      data={programs}
      renderRow={(program) => (
        <>
          <td>{program.name}</td>
          <td>{new Date(program.startDate).toLocaleDateString()}</td>
          <td>{new Date(program.endDate).toLocaleDateString()}</td>
          <td>{program.status}</td>
          <td className='items-center'><Link href={`/admin/programs/${program._id}`}><CgDetailsMore /></Link></td>
        </>
      )}
    />
  );
}
