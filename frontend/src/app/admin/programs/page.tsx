import { Suspense } from 'react';
import SkeletonTable from '@/src/components/SkeletonTable';
import ProgramsTable from '@/src/components/ProgramsTable';
import Link from 'next/link';

export default function ProgramsPage() {
  return (
    <div className="container mx-auto p-4 mt-5">
      <div className='flex items-center justify-between '>
        <h1 className="text-2xl font-bold ">Listado de Programas</h1>
        <Link className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700" href='/admin/programs/create'>Crear programa</Link>
      </div>

      <Suspense fallback={<SkeletonTable rows={5} columns={4} />}>
        {/* ProgramsTable maneja la lógica de datos */}
        <ProgramsTable />
      </Suspense>
    </div>
  );
}
