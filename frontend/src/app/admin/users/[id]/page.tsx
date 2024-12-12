/*'use client';

import {useRouter} from 'next/navigation';

export default function Page() {
    const router = useRouter();
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-background text-foreground">
            <h1 className="text-4xl">AUN EN DESARROLLO</h1>
            <h2 className="text-2xl">Proximamente...</h2>
            <button onClick={()=>{router.push('/admin')}} className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5">
           volver
          </button>
        </div>
    );
}*/

import ProgramDetails from '@/src/components/program/ProgramDetails';
import ProgramFormSkeleton from '@/src/components/skeletons/ProgramFormSkeleton';
import LoadingErrorCacther from '@/src/components/temp-middleware-solution/LoadingErrorCatcher';
import { Suspense } from 'react';
import UserDetails from '@/src/components/users/UserDetails';

export default async function ProgramDetailsPage({ params }: Readonly<{ params: { id: string } }>) {
    const { id } = await Promise.resolve(params);
    return (
      <div className="container mx-auto mt-10">
        <Suspense fallback={<LoadingErrorCacther><ProgramFormSkeleton /></LoadingErrorCacther>}>
  
          <UserDetails userId={id} />
        </Suspense>
        
        
      </div>
    );
  }