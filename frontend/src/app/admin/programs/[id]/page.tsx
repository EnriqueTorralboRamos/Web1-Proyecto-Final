import ProgramDetails from '@/src/components/ProgramDetails';
import Link from 'next/link';

export default function ProgramDetailsPage({ params }: Readonly<{ params: { id: string } }>) {
  return (
    <div className="container mx-auto mt-10">
      <ProgramDetails programId={params.id} />
      <Link href={'/admin/programs'}>Volver</Link>
    </div>
  );
}
