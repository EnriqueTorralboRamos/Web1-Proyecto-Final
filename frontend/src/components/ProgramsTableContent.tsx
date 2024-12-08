'use client';

import Table from './Table';

interface Program {
    id: string;
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
      columns={['ID', 'Nombre', 'Descripción', 'Inicio', 'Fin', 'Estado']}
      data={programs}
      renderRow={(program) => (
        <>
          <td>{program.id}</td>
          <td>{program.name}</td>
          <td>{new Date(program.startDate).toLocaleDateString()}</td>
          <td>{new Date(program.endDate).toLocaleDateString()}</td>
          <td>{program.status}</td>
        </>
      )}
    />
  );
}
