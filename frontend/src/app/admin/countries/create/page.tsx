import LoadingErrorCacther from '@/src/components/temp-middleware-solution/LoadingErrorCatcher';
import { Suspense } from 'react';
import CountryForm from '@/src/components/country/CountryForm';
import SkeletonCountryForm from '@/src/components/skeletons/CountryFormSkeleton';

export default function CreateProgramPage() {
  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Crear Nuevo Programa</h1>
      <Suspense fallback={<LoadingErrorCacther><SkeletonCountryForm /></LoadingErrorCacther>}>
        <CountryForm />
      </Suspense>
    </div>
  );
}
