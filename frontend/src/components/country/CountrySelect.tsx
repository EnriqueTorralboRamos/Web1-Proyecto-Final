'use client';

import { useEffect, useState } from 'react';
import { getCountries } from '@/src/services/country/countryServiceClient';
import clsx from 'clsx';

interface CountrySelectProps {
  onSelect: (countryId: string) => void;
  initialValue?: string; // ID inicial del país
  className?: string; // Clases CSS adicionales
  clsxB?: boolean; // Clases CSS adicionales
}

export default function CountrySelect({ 
  onSelect,
  initialValue='',
  className,
  clsxB
}: Readonly<CountrySelectProps>) {
  const [countries, setCountries] = useState<{ _id: string; name: string }[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState(initialValue);

  useEffect(() => {
    async function fetchCountries() {
      try {
        const response = await getCountries();
        setCountries(response);
        if (initialValue) {
          onSelect(initialValue);
        }
      } catch (error) {
        console.error('Error al cargar los países:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchCountries();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedCountry(value);
    onSelect(value);
  };

  if (loading) {
    return <p>Cargando países...</p>;
  }

  if (!countries) {
    return <p>Error al cargar países.</p>;
  }
  let defaultClassName = "mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm";
  if (className) {
    defaultClassName = clsxB ? clsx(
      "mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm",
      className) : className;
  }
  
  
    

  return (
    <select
      value={selectedCountry}
      onChange={handleChange}
      className={ defaultClassName }
      >
      <option value="">Selecciona un país</option>
      {countries.map((country) => (
        <option key={country._id} value={country._id}>
          {country.name}
        </option>
      ))}
    </select>
  );
}
