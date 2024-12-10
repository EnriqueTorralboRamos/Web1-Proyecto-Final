'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { useState } from 'react';
import ProgramStatus from '@/src/constants/programStatus';
import CountrySelect from '@/src/components/country/CountrySelect';

export default function AdvancedSearch() {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  // Estados locales para los filtros
  const [filters, setFilters] = useState({
    name: searchParams.get('name') ?? '',
    status: searchParams.get('status') ?? '',
    country: searchParams.get('country') ?? '',
    startDate: searchParams.get('startDate') ?? '',
    endDate: searchParams.get('endDate') ?? '',
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
      status: '',
      country: '',
      startDate: '',
      endDate: '',
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

        {/* Filtro por Estado */}
        <div className="flex flex-col">
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">
            Estado
          </label>
          <select
            id="status"
            className="block w-full rounded-md border border-gray-300 py-1 px-2 text-sm"
            value={filters.status}
            onChange={(e) => handleSearch('status', e.target.value)}
          >
            <option value="">Todos</option>
            <option value={ProgramStatus.PENDING}>Pendiente</option>
            <option value={ProgramStatus.ONGOING}>Iniciado</option>
            <option value={ProgramStatus.COMPLETED}>Completado</option>
          </select>
        </div>

        {/* Filtro por País */}
        <div className="flex flex-col">
          <label htmlFor="country" className="block text-sm font-medium text-gray-700">
            País
          </label>
          <CountrySelect
            className="block w-full rounded-md border border-gray-300 py-1 px-2 text-sm"
            initialValue={filters.country}
            onSelect={(countryId) => handleSearch('country', countryId)}
          />
        </div>

        {/* Filtro por Fecha de Inicio */}
        <div className="flex flex-col">
          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
            Fecha Inicio
          </label>
          <input
            id="startDate"
            type="date"
            className="block w-full rounded-md border border-gray-300 py-1 px-2 text-sm"
            value={filters.startDate}
            onChange={(e) => handleSearch('startDate', e.target.value)}
          />
        </div>

        {/* Filtro por Fecha de Fin */}
        <div className="flex flex-col">
          <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
            Fecha Fin
          </label>
          <input
            id="endDate"
            type="date"
            className="block w-full rounded-md border border-gray-300 py-1 px-2 text-sm"
            value={filters.endDate}
            onChange={(e) => handleSearch('endDate', e.target.value)}
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
