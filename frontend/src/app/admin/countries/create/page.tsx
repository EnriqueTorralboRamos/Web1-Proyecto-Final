import LoadingErrorCacther from '@/src/components/temp-middleware-solution/LoadingErrorCatcher';
import { Suspense } from 'react';
import ProgramFormSkeleton from '@/src/components/skeletons/ProgramFormSkeleton';
import CountryForm from '@/src/components/country/CountryForm';

export default function CreateProgramPage() {
  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Crear Nuevo Programa</h1>
      <Suspense fallback={<LoadingErrorCacther><ProgramFormSkeleton /></LoadingErrorCacther>}>
        <CountryForm />
      </Suspense>
    </div>
  );
}
