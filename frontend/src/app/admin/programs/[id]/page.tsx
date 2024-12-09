import ProgramDetails from '@/src/components/program/ProgramDetails';
import Link from 'next/link';
import { Suspense } from 'react';

export default function ProgramDetailsPage({ params }: Readonly<{ params: { id: string } }>) {
  return (
    <div className="container mx-auto mt-10">
      <Suspense fallback={<div>cargando...</div>}>

        <ProgramDetails programId={params.id} />
      </Suspense>
      
      
    </div>
  );
}
