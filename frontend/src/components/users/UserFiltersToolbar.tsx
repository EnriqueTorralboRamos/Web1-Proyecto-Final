'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { useState } from 'react';
import { UserRoles } from '@/src/constants/userRoles';

export default function AdvancedUserSearch() {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  // Estados locales para los filtros
  const [filters, setFilters] = useState({
    name: searchParams.get('name') ?? '',
    email: searchParams.get('email') ?? '',
    role: searchParams.get('role') ?? '',
    deleted: searchParams.get('deleted') ?? '',
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
      email: '',
      role: '',
      deleted: '',
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

            {/* Filtro por Correo Electrónico */}
            <div className="flex flex-col">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Correo Electrónico
            </label>
            <input
                id="email"
                className="block w-full rounded-md border border-gray-300 py-1 px-2 text-sm"
                placeholder="Buscar por correo"
                value={filters.email}
                onChange={(e) => handleSearch('email', e.target.value)}
            />
            </div>

            {/* Filtro por Rol */}
            <div className="flex flex-col">
                <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                    Rol
                </label>
                <select
                    id="role"
                    className="block w-full rounded-md border border-gray-300 py-1 px-2 text-sm"
                    value={filters.role}
                    onChange={(e) => handleSearch('role', e.target.value)}
                >
                    <option value="">Todos</option>
                    <option value={UserRoles.Admin}>Admin</option>
                    <option value={UserRoles.User}>User</option>
                </select>
            </div>
            {/* Filtro por Eliminado */}
            <div className="flex flex-col">
                <label htmlFor="deleted" className="block text-sm font-medium text-gray-700">
                    Eliminado
                </label>
                <select
                    id="deleted"
                    className="block w-full rounded-md border border-gray-300 py-1 px-2 text-sm"
                    value={filters.deleted}
                    onChange={(e) => handleSearch('deleted', e.target.value)}
                >
                    <option value="">Todos</option>
                    <option value="true">Eliminados</option>
                </select>
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
