import ProgramsTableContent from './ProgramsTableContent';
import { getPrograms } from '../../services/program/programServiceServer';
import SkeletonTable from '../skeletons/SkeletonTable';
import LoadingErrorCacther from '../temp-middleware-solution/LoadingErrorCatcher';

export default async function ProgramsTable() {
    try {
        
        const programs = await getPrograms(); // Obtiene datos en el servidor
        return <ProgramsTableContent programs={programs} />;
    } catch (error) {
        return <LoadingErrorCacther><SkeletonTable rows={5} columns={4} /></LoadingErrorCacther>
        
    }
}
