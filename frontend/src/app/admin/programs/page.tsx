import { Suspense } from 'react';
import SkeletonTable from '@/src/components/skeletons/SkeletonTable';
import ProgramsTable from '@/src/components/program/ProgramsTable';
import Link from 'next/link';
import SearchTools from '@/src/components/program/ProgramFiltersToolbar';
import { ISearchProgramParams } from '@/src/constants/searchProgramParams';

export default async function ProgramsPage(props: Readonly<{
  searchParams?: Promise<ISearchProgramParams>;
}>) {
  const searchParams = await props.searchParams;
  const name = searchParams?.name ?? '';
  const status = searchParams?.status ?? '';
  const country = searchParams?.country ?? '';
  const startDate = searchParams?.startDate ?? '';
  const endDate = searchParams?.endDate ?? '';
  const page = searchParams?.page ?? 1;

  return (
    <div className="container mx-auto p-4 mt-5">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-2xl font-bold">Listado de Programas</h1>
        <Link
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          href="/admin/programs/create"
        >
          Crear programa
        </Link>
      </div>
      <SearchTools />
      <Suspense fallback={<SkeletonTable rows={5} columns={4} />}>
        <ProgramsTable
          filters={{ name, status, country, startDate, endDate, page }}
        />
      </Suspense>
    </div>
  );
}

