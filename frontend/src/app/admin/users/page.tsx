import SkeletonTable from "@/src/components/skeletons/SkeletonTable";
import UsersTable from "@/src/components/users/UserTable";
import { Suspense } from "react";


export default function AdminUsersPage() {
    return (
        <div className="container mx-auto mt-10">
        <h1 className="text-2xl font-bold mb-4">Usuarios</h1>
        <Suspense fallback={<SkeletonTable rows={5} columns={4} />}>
            <UsersTable />
        </Suspense>

        </div>
    );
}