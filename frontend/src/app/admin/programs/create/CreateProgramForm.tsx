'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createProgram } from '@/src/services/programServiceClient';
import { programSchema } from '../../../../schemas/programSchema';
import { z } from 'zod';

export default function CreateProgramForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    country: '',
    participants: '',
    startDate: '',
    endDate: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    setSuccess(false);

    try {
      // Validar datos con Zod
      programSchema.parse(formData);

      // Enviar datos a la API
      await createProgram({
        name: formData.name,
        countryId: formData.country,
        participants: formData.participants
          ? formData.participants.split(',')
          : [],
        startDate: formData.startDate,
        endDate: formData.endDate,
      });

      setSuccess(true);
      setFormData({ name: '', country: '', participants: '', startDate: '', endDate: '' });

      router.push('/admin/programs'); // Redirige a la lista de programas
    } catch (err: any) {
      if (err instanceof z.ZodError) {
        // Manejar errores de validación de Zod
        const fieldErrors: Record<string, string> = {};
        err.errors.forEach((error) => {
          if (error.path[0]) {
            fieldErrors[error.path[0] as string] = error.message;
          }
        });
        setErrors(fieldErrors);
      } else {
        // Manejar errores de la API
        setErrors(err.response?.data?.message || 'Ocurrió un error inesperado en el servidor.');
        console.error('Error en la API:', err.response || err.message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {success && <p className="text-green-500">Programa creado con éxito.</p>}

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
        <input
          id="country"
          type="text"
          value={formData.country}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
        {errors.country && <p className="text-red-500">{errors.country}</p>}
      </div>

      <div>
        <label htmlFor="participants" className="block text-sm font-medium text-gray-700">
          Participantes (IDs separados por comas)
        </label>
        <input
          id="participants"
          type="text"
          value={formData.participants}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
        {errors.participants && <p className="text-red-500">{errors.participants}</p>}
      </div>

      <div>
        <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
          Fecha de Inicio *
        </label>
        <input
          id="startDate"
          type="date"
          value={formData.startDate}
          onChange={handleChange}
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
          value={formData.endDate}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
        {errors.endDate && <p className="text-red-500">{errors.endDate}</p>}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Crear Programa
      </button>
    </form>
  );
}
