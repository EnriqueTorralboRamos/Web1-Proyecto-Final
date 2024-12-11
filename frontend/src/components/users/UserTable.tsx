import { getUsers } from '@/src/services/users/userServiceServer';
import SkeletonTable from '../skeletons/SkeletonTable';
import UserTableContent from './UserTableContent';
import LoadingErrorCacther from '../temp-middleware-solution/LoadingErrorCatcher';
import { ISearchUserParams } from '@/src/constants/searchUserParams';
interface UsersTableProps {
    filters: ISearchUserParams; 
}
export default async function UsersTable({ filters }: Readonly<UsersTableProps>) {
    try {        
        const users = await getUsers({...filters,page:filters.page?.toString()}); // Obtiene datos en el servidor
        return <UserTableContent users={users} deleted={filters.deleted}/>;
    } catch (error) {
        return <LoadingErrorCacther><SkeletonTable rows={5} columns={4} /></LoadingErrorCacther>
    }
}