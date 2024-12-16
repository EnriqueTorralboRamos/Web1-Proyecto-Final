'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation'; // Usa useParams en lugar de acceder a params directamente
import LoadingErrorCacther from '@/src/components/temp-middleware-solution/LoadingErrorCatcher';
import CountryForm from '@/src/components/country/CountryForm';
import { updateCountry , getCountryById} from '@/src/services/country/countryServiceClient';
import SkeletonCountryForm from '@/src/components/skeletons/CountryFormSkeleton';

export default function EditCountryPague(){
    const {id} = useParams() 
    const router =useRouter();
    const [country,setCountry] =useState<{
        name: string;
        code: string;
        population: number;
        language: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return; // Asegúrate de que `id` está disponible antes de proceder

    const fetchCountry = async () => {
      try {
        const data = await getCountryById(Array.isArray(id) ? id[0] : id);
        setCountry({
          name: data.name,
          code: data.code,
          population: data.population,
          language: data.language,
        });
      } catch (err) {
        console.error('Error al cargar el país:', err);
        setError('No se pudo cargar el país.');
      } finally {
        setLoading(false);
      }
    }
    fetchCountry();
  }, [id]);

  const handleSubmit = async (values: {
      name: string;
      code: string;
      population: number;
      language: string;
    }) => {
      try {
        if (id) {
          await updateCountry(Array.isArray(id) ? id[0] : id, { ...values });
          router.push('/admin/countries');
        } else {
          setError('ID del país no está disponible.');
      }
    } catch (err) {
      console.error('Error al actualizar el país:', err);
      setError('No se pudo actualizar el país.');
    }
  }
  if (loading) return <LoadingErrorCacther><SkeletonCountryForm /></LoadingErrorCacther>;
  if (error) return <LoadingErrorCacther><div><p className="text-red-500">{error}</p><SkeletonCountryForm /></div></LoadingErrorCacther>;
  return(
    <div className="container mx-auto mt-10">
          <h1 className="text-2xl font-bold mb-4">Editar País</h1>
          {country && <CountryForm initialData={country} onSubmit={handleSubmit} />}
      </div>
  )
}