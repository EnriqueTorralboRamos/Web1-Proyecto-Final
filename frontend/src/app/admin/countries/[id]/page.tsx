import CountryDetails from '@/src/components/country/CountryDetails';
import { Suspense } from 'react';
import LoadingErrorCatcher from '@/src/components/temp-middleware-solution/LoadingErrorCatcher';
import SkeletonCountryForm from '@/src/components/skeletons/CountryFormSkeleton';

export default async function CountryDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <div className="container mx-auto mt-10">
      <Suspense fallback={<LoadingErrorCatcher><SkeletonCountryForm /></LoadingErrorCatcher>}>

        <CountryDetails countryId={id} />
      </Suspense>
      
      
    </div>
  );
}