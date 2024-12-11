import SkeletonTable from "@/src/components/skeletons/SkeletonTable";
import UsersTable from "@/src/components/users/UserTable";
import { Suspense } from "react";
import Link from 'next/link';
import SearchTools from '@/src/components/users/UserFiltersToolbar';
import { ISearchUserParams } from '@/src/constants/searchUserParams';


export default async function AdminUsersPage(props: Readonly<{
    searchParams?: Promise<ISearchUserParams>;
}>
) {
    const searchParams = await props.searchParams;
    const name = searchParams?.name ?? '';
    const email = searchParams?.email ?? '';
    const role = searchParams?.role ?? '';
    const page = searchParams?.page ?? 1;
    const deleted = searchParams?.deleted ?? '';

    return (
        <div className="container mx-auto mt-10">
            <div className="flex items-center justify-between mb-2">
                <h1 className="text-2xl font-bold mb-4">Usuarios</h1>
                <Link
                className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                href="/admin/users/create"
                >
                Crear Usuario
                </Link>
            </div>
            <SearchTools />
            <Suspense fallback={<SkeletonTable rows={5} columns={4} />}>
                <UsersTable filters= {{name,email,role,page,deleted}}/>
            </Suspense>

        </div>
    );
}