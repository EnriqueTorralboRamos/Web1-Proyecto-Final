import ProgramDetails from '@/src/components/ProgramDetails';

export default function ProgramDetailsPage({ params }: Readonly<{ params: { id: string } }>) {
  return (
    <div className="container mx-auto mt-10">
      <ProgramDetails programId={params.id} />
    </div>
  );
}
