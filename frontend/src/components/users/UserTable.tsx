import { getUsers } from '@/src/services/users/userServiceServer';
import SkeletonTable from '../SkeletonTable';
import UserTableContent from './UserTableContent';

export default async function UsersTable() {
    try {
        
        const users = await getUsers(); // Obtiene datos en el servidor
        return <UserTableContent users={users} />;
    } catch (error) {
        return <SkeletonTable rows={5} columns={4} />
    }
}