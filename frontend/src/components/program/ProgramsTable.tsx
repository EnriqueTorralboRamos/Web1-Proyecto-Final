import ProgramsTableContent from './ProgramsTableContent';
import { getPrograms } from '../../services/program/programServiceServer';
import SkeletonTable from '../skeletons/SkeletonTable';
import LoadingErrorCacther from '../temp-middleware-solution/LoadingErrorCatcher';
import {ISearchProgramParams} from '../../interfaces/ISearchProgramParams';
interface ProgramsTableProps {
    filters: ISearchProgramParams;
    };
  

export default async function ProgramsTable(
    { filters }: Readonly<ProgramsTableProps>

) {
    try {
        
        const programs = await getPrograms({ ...filters, page: filters.page?.toString() }); // Obtiene datos en el servidor
        return <ProgramsTableContent programs={programs} />;
    } catch (error) {
        console.log('Error al cargar los programas:', error);
        
        return <LoadingErrorCacther><SkeletonTable rows={5} columns={4} /></LoadingErrorCacther>
        
    }
}
