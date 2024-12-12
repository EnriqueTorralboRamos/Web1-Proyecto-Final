import ProgramFormSkeleton from '@/src/components/skeletons/ProgramFormSkeleton';
import LoadingErrorCacther from '@/src/components/temp-middleware-solution/LoadingErrorCatcher';
import { Suspense } from 'react';
import UserDetails from '@/src/components/users/UserDetails';
import UserProgramDetails from '@/src/components/users/UserProgramDetails';
import { getProgramByUserId } from '@/src/services/program/programServiceServer';

export default async function ProgramDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const userPrograms = await getProgramByUserId(id);
    return (
      <div className="container mx-auto mt-10">
        <Suspense fallback={<LoadingErrorCacther><ProgramFormSkeleton /></LoadingErrorCacther>}>
  
          <UserDetails userId={id} />
        </Suspense>
        <Suspense fallback={<></>}>
          <UserProgramDetails programs={userPrograms} userId={id} />
        </Suspense>
        
      </div>
    );
  }