import LoadingErrorCacther from '@/src/components/temp-middleware-solution/LoadingErrorCatcher';
import UserForm from '@/src/components/users/UserForm';
import { Suspense } from 'react';
import SkeletonUserForm from '@/src/components/skeletons/UserFormSkeleton';

export default function CreateUserPage() {
  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Crear Nuevo Usuario</h1>
      <Suspense fallback={<LoadingErrorCacther><SkeletonUserForm /></LoadingErrorCacther>}>
        <UserForm />
      </Suspense>
    </div>
  );
}