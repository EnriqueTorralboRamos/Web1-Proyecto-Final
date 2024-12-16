'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { useState } from 'react';

export default function AdvancedSearchCountry() {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  // Estados locales para los filtros
  const [filters, setFilters] = useState({
    name: searchParams.get('name') ?? '',
    populationMin: searchParams.get('populationMin') ?? '',
    populationMax: searchParams.get('populationMax') ?? '',
    language: searchParams.get('language') ?? '',
  });

  // Función debounced para actualizar la URL
  const debouncedUpdateSearch = useDebouncedCallback((updatedFilters: Partial<typeof filters>) => {
    const params = new URLSearchParams();

    Object.entries(updatedFilters).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      }
    });

    replace(`${pathname}?${params.toString()}`);
  }, 500);

  const handleSearch = (field: keyof typeof filters, value: string) => {
    const updatedFilters = { ...filters, [field]: value };
    setFilters(updatedFilters); // Actualiza el estado local
    debouncedUpdateSearch(updatedFilters); // Actualiza la URL después de un retraso
  };

  const handleDeleteFilters = () => {
    setFilters({
      name: '',
      populationMin: '',
      populationMax: '',
      language: '',
    });
    replace(pathname); // Reinicia la URL
  };

  return (
    <div className="flex flex-wrap items-end gap-5">
      {/* Contenedor para los filtros */}
      <div className="flex flex-wrap gap-5 flex-1">
        {/* Filtro por Nombre */}
        <div className="flex flex-col">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Nombre
          </label>
          <input
            id="name"
            className="block w-full rounded-md border border-gray-300 py-1 px-2 text-sm"
            placeholder="Buscar por nombre"
            value={filters.name}
            onChange={(e) => handleSearch('name', e.target.value)}
          />
        </div>

        {/* Filtro por Población Mínima */}
        <div className="flex flex-col">
          <label htmlFor="populationMin" className="block text-sm font-medium text-gray-700">
            Población Mínima
          </label>
          <input
            id="populationMin"
            type="text" // esta en "text" para permitir el formato
            className="block w-full rounded-md border border-gray-300 py-1 px-2 text-sm"
            placeholder="Mínimo"
            value={
                filters.populationMin
                ? Number(filters.populationMin).toLocaleString('es-ES') // Formatea con puntos
                : '' // Campo vacío si no hay valor
            }
            onChange={(e) => {
                const rawValue = e.target.value.replace(/\./g, ''); // Elimina puntos para obtener el valor numérico
                if (/^\d*$/.test(rawValue)) { // Permitir solo números
                handleSearch('populationMin', rawValue); // Actualiza el valor numérico sin formato
                }
            }}
            />
        </div>

        {/* Filtro por Población Máxima */}
        <div className="flex flex-col">
          <label htmlFor="populationMax" className="block text-sm font-medium text-gray-700">
            Población Máxima
          </label>
          <input
            id="populationMax"
            type="text" // Cambiar a "text" para permitir el formato
            className="block w-full rounded-md border border-gray-300 py-1 px-2 text-sm"
            placeholder="Mínimo"
            value={
                filters.populationMax
                ? Number(filters.populationMax).toLocaleString('es-ES') // Formatea con puntos
                : '' // Campo vacío si no hay valor
            }
            onChange={(e) => {
                const rawValue = e.target.value.replace(/\./g, ''); // Elimina puntos para obtener el valor numérico
                if (/^\d*$/.test(rawValue)) { // Permitir solo números
                handleSearch('populationMax', rawValue); // Actualiza el valor numérico sin formato
                }
            }}
            />
        </div>

        {/* Filtro por Idioma */}
        <div className="flex flex-col">
          <label htmlFor="language" className="block text-sm font-medium text-gray-700">
            Idioma
          </label>
          <input
            id="language"
            className="block w-full rounded-md border border-gray-300 py-1 px-2 text-sm"
            placeholder="Buscar por idioma"
            value={filters.language}
            onChange={(e) => handleSearch('language', e.target.value)}
          />
        </div>
      </div>

      {/* Borrar filtros */}
      <div className="flex justify-end w-full sm:w-auto">
        <button
          className="bg-red-500 text-white py-1 px-2 rounded-md disabled:opacity-50"
          onClick={handleDeleteFilters}
          disabled={!Object.values(filters).some((filter) => filter)} // Botón deshabilitado si no hay filtros activos
        >
          Borrar Filtros
        </button>
      </div>
    </div>
  );
}
