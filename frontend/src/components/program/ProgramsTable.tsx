import ProgramsTableContent from './ProgramsTableContent';
import { getPrograms } from '../../services/program/programServiceServer';
import SkeletonTable from '../skeletons/SkeletonTable';
import LoadingErrorCacther from '../temp-middleware-solution/LoadingErrorCatcher';

interface ProgramsTableProps {
    filters: {
      name?: string;
      status?: string;
      country?: string;
      startDate?: string;
      endDate?: string;
      page?: number;
    };
  }

export default async function ProgramsTable(
    { filters }: Readonly<ProgramsTableProps>

) {
    try {
        
        const programs = await getPrograms({ ...filters, page: filters.page?.toString() }); // Obtiene datos en el servidor
        return <ProgramsTableContent programs={programs} />;
    } catch (error) {
        return <LoadingErrorCacther><SkeletonTable rows={5} columns={4} /></LoadingErrorCacther>
        
    }
}
