import CountryTable from '@/src/components/country/CountryTable';
import SkeletonTable from '@/src/components/skeletons/SkeletonTable';
import Link from 'next/link';
import { Suspense } from 'react';
import SearchTools from '@/src/components/country/CountryFiltersToolbar';
import { ISearchCountriesParams } from '@/src/interfaces/ISearchCountryParams';

export default async function CountriesPage(props: Readonly<{
  searchParams?: Promise<ISearchCountriesParams>;
}>) {
  const searchParams = await props.searchParams;
  const name = searchParams?.name ?? '';
  const code = searchParams?.code ?? '';
  const populationMin = searchParams?.populationMin ?? 0;
  const populationMax = searchParams?.populationMax ?? 0;
  const language = searchParams?.language ?? '';
  const page = searchParams?.page ?? 1;

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-2xl font-bold">Listado de Paises</h1>
        <Link
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          href="/admin/countries/create"
        >
          Añadir País
        </Link>
      </div>
      <SearchTools />
      <Suspense fallback={<SkeletonTable rows={5} columns={4} />}>
        <CountryTable
          filters={{ name, code, populationMin,populationMax, language, page }}
        />
      </Suspense>
    </div>
  );
}
