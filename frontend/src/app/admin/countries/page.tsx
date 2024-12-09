import CountryTable from '@/src/components/country/CountryTable';
import SkeletonTable from '@/src/components/SkeletonTable';
import { Suspense } from 'react';

export default function CountriesPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Listado de Países</h1>
      <Suspense fallback={<SkeletonTable rows={5} columns={4} />}>
        <CountryTable/>
      </Suspense>
    </div>
  );
}
