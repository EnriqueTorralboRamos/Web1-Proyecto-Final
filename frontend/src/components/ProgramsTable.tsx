import ProgramsTableContent from './ProgramsTableContent';
import { getPrograms } from '../services/programServiceServer';
import SkeletonTable from './SkeletonTable';

export default async function ProgramsTable() {
    try {
        
        const programs = await getPrograms(); // Obtiene datos en el servidor
        return <ProgramsTableContent programs={programs} />;
    } catch (error) {
        return <SkeletonTable rows={5} columns={4} />
    }
}
