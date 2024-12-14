'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createProgram } from '@/src/services/program/programServiceClient';
import { programSchema } from '../../schemas/programSchema';
import { z } from 'zod';
import CountrySelect from '@/src/components/country/CountrySelect';
import ParticipantSelect from '@/src/components/program/ParticipantAutocomplete';
import Link from 'next/link';
import { format } from 'date-fns';

interface ProgramFormProps {
  initialData?: {
    name: string;
    country: string;
    participants: string[];
    startDate: string;
    endDate: string;
  };
  onSubmit?: (values: {
    name: string;
    country: string;
    participants: string[];
    startDate: string;
    endDate: string;
  }) => Promise<void>;
}

export default function ProgramForm(
  {initialData= { name: '', country: '', participants: [], startDate: '', endDate: '' }, onSubmit,}: Readonly<ProgramFormProps>,
) {
  const router = useRouter();
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);
  const [globalError, setGlobalError] = useState<string | null>(null); 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleCountrySelect = (countryId: string) => {
    setFormData((prev) => ({ ...prev, country: countryId }));
  };

  const handleParticipantsSelect = (selectedIds: string[]) => {
    setFormData((prev) => ({ ...prev, participants: selectedIds }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    setSuccess(false);
    setGlobalError(null); 

    try {
      // Validar datos con Zod
      const dataToValidate = {
        ...formData,
        participants: formData.participants.join(','), // Convertir array a string
      };
      programSchema.parse(dataToValidate);

      // Enviar datos a la API
      if (onSubmit) {
        await onSubmit(formData);
      } else {
        // Si no, crear un nuevo programa por defecto
        await createProgram({ ...formData, countryId: formData.country });
      }

      setSuccess(true);
      setFormData(initialData);

      router.push('/admin/programs'); // Redirige a la lista de programas
    }  catch (err: any) {
      if (err instanceof z.ZodError) {
        // Manejar errores de validación de Zod
        const fieldErrors: Record<string, string> = {};
        err.errors.forEach((error) => {
          if (error.path[0]) {
            fieldErrors[error.path[0] as string] = error.message;
          }
        });
        setErrors(fieldErrors);
      } else if (err.response) {
        // Capturar errores del backend y mostrarlos
        const backendErrors = err.response.data.errors;
        if (backendErrors && typeof backendErrors === 'object') {
          // Si el backend envía errores específicos para campos
          setErrors(backendErrors);
        } else {
          // Mostrar mensaje global si no hay errores específicos
          setGlobalError(err.response.data.message || 'Ocurrió un error inesperado en el servidor.');
        }
      } else {
        // Errores generales (como problemas de red)
        setGlobalError(err.message || 'Ocurrió un error inesperado.');
        console.error('Error:', err.message);
      }
    }

  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {success && <p className="text-green-500">Programa creado exitosamente.</p>}
      {globalError && <p className="text-red-500">{globalError}</p>} {/* Mensaje de error global */}

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Nombre del Programa *
        </label>
        <input
          id="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
        {errors.name && <p className="text-red-500">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="country" className="block text-sm font-medium text-gray-700">
          País *
        </label>
          <CountrySelect onSelect={handleCountrySelect} initialValue={formData.country}/>        
        {errors.country && <p className="text-red-500">{errors.country}</p>}
      </div>

      <div>
        <ParticipantSelect onSelect={handleParticipantsSelect} initialParticipants={formData.participants} />
        {errors.participants && <p className="text-red-500">{errors.participants}</p>}
      </div>

      <div>
        <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
          Fecha de Inicio *
        </label>
        <input
          id="startDate"
          type="date"
          value={
            formData.startDate
              ? format(new Date(formData.startDate), 'yyyy-MM-dd') // Formatea solo si existe una fecha
              : '' // Deja el campo vacío si no hay fecha
          }
          onChange={(e) => {
            setFormData((prev) => ({
              ...prev,
              startDate: e.target.value, // Almacena la fecha en formato ISO (yyyy-MM-dd)
            }));
          }}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
        {errors.startDate && <p className="text-red-500">{errors.startDate}</p>}
      </div>

      <div>
        <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
          Fecha de Fin *
        </label>
        <input
          id="endDate"
          type="date"
          value={
            formData.endDate
              ? format(new Date(formData.endDate), 'yyyy-MM-dd') // Formatea solo si existe una fecha
              : '' // Deja el campo vacío si no hay fecha
          }
          onChange={(e) => {
            setFormData((prev) => ({
              ...prev,
              endDate: e.target.value, // Almacena la fecha en formato ISO (yyyy-MM-dd)
            }));
          }}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
        {errors.endDate && <p className="text-red-500">{errors.endDate}</p>}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        {onSubmit ? 'Guardar Cambios' : 'Crear Programa'}
      </button>
      <button>
        <Link href="/admin/programs" className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
          Cancelar
        </Link>
      </button>
    </form>
  );
}
