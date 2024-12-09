import ProgramDetails from '@/src/components/program/ProgramDetails';
import ProgramFormSkeleton from '@/src/components/skeletons/ProgramFormSkeleton';
import LoadingErrorCacther from '@/src/components/temp-middleware-solution/LoadingErrorCatcher';
import Link from 'next/link';
import { Suspense } from 'react';

export default function ProgramDetailsPage({ params }: Readonly<{ params: { id: string } }>) {
  return (
    <div className="container mx-auto mt-10">
      <Suspense fallback={<LoadingErrorCacther><ProgramFormSkeleton /></LoadingErrorCacther>}>

        <ProgramDetails programId={params.id} />
      </Suspense>
      
      
    </div>
  );
}
