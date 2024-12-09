import { getUsers } from '@/src/services/users/userServiceServer';
import SkeletonTable from '../skeletons/SkeletonTable';
import UserTableContent from './UserTableContent';
import LoadingErrorCacther from '../temp-middleware-solution/LoadingErrorCatcher';

export default async function UsersTable() {
    try {
        
        const users = await getUsers(); // Obtiene datos en el servidor
        return <UserTableContent users={users} />;
    } catch (error) {
        return <LoadingErrorCacther><SkeletonTable rows={5} columns={4} /></LoadingErrorCacther>
    }
}