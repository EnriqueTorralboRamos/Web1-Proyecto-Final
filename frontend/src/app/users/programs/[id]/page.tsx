import ProgramDetails from '@/src/components/program/ProgramDetails';
import ProgramFormSkeleton from '@/src/components/skeletons/ProgramFormSkeleton';
import LoadingErrorCacther from '@/src/components/temp-middleware-solution/LoadingErrorCatcher';
import { Suspense } from 'react';

export default async function ProgramDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <div className="container mx-auto mt-10">
      <Suspense fallback={<LoadingErrorCacther><ProgramFormSkeleton /></LoadingErrorCacther>}>

        <ProgramDetails programId={id} />
      </Suspense>
      
      
    </div>
  );
}
