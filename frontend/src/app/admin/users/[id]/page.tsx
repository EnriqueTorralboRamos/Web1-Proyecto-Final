import LoadingErrorCacther from '@/src/components/temp-middleware-solution/LoadingErrorCatcher';
import { Suspense } from 'react';
import UserDetails from '@/src/components/users/UserDetails';
import UserProgramDetails from '@/src/components/users/UserProgramDetails';
import { getProgramByUserId } from '@/src/services/program/programServiceServer';
import SkeletonUserForm from '@/src/components/skeletons/UserFormSkeleton';

export default async function ProgramDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const userPrograms = await getProgramByUserId(id);
    return (
      <div className="container mx-auto mt-10">
        <Suspense fallback={<LoadingErrorCacther><SkeletonUserForm /></LoadingErrorCacther>}>
  
          <UserDetails userId={id} />
        </Suspense>
        <Suspense fallback={<></>}>
          <UserProgramDetails programs={userPrograms} userId={id} />
        </Suspense>
        
      </div>
    );
  }