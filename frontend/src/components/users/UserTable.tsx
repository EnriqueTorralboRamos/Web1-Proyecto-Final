import { getUsers } from '@/src/services/users/userServiceServer';
import SkeletonTable from '../skeletons/SkeletonTable';
import UserTableContent from './UserTableContent';
import LoadingErrorCacther from '../temp-middleware-solution/LoadingErrorCatcher';
import { ISearchUserParams } from '@/src/interfaces/ISearchUserParams';
interface UsersTableProps {
    filters: ISearchUserParams; 
}
export default async function UsersTable({ filters }: Readonly<UsersTableProps>) {
    try {        
        const users = await getUsers({...filters,page:filters.page?.toString()}); // Obtiene datos en el servidor
        return <UserTableContent users={users} deleted={filters.deleted}/>;
    } catch (error) {
        console.log('Error al cargar los usuarios:', error);
        
        return <LoadingErrorCacther><SkeletonTable rows={5} columns={4} /></LoadingErrorCacther>
    }
}