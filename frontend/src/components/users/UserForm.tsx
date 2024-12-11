'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import Link from 'next/link';
import { createUser } from '@/src/services/users/userServiceClient';
import { UserRoles } from '@/src/constants/userRoles';

// Esquema Zod para validación
const userSchema = z.object({
  name: z.string().min(1, 'El nombre es obligatorio'),
  email: z.string().email('Debe ser un correo válido'),
  password: z.string().optional(),
  role: z.string().min(1, 'El rol es obligatorio'),
});

interface UserFormProps {
  initialData?: {
    _id: string;
    name: string;
    email: string;
    password?: string;
    role: string;
  };
  onSubmit?: (values: {
    _id: string
    name: string;
    email: string;
    password?: string;
    role: string;
  }) => Promise<void>;
}

export default function UserForm({
  initialData = { _id:'', name: '', email: '', password: '', role: '' },
  onSubmit,
}: Readonly<UserFormProps>) {
  const router = useRouter();
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);
  const [globalError, setGlobalError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    setSuccess(false);
    setGlobalError(null);

    try {
      // Validar datos con Zod
      userSchema.parse(formData);

      // Enviar datos a la API
      if (onSubmit) {
        await onSubmit(formData);
      } else {
        // Crear usuario si no se proporciona una función de envío
        await createUser(formData);
      }

      setSuccess(true);
      setFormData(initialData);
      router.push('/admin/users'); // Redirige a la lista de usuarios
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
      } else if (err.response) {
        // Capturar errores del backend y mostrarlos
        setGlobalError(err.response.data.message || 'Ocurrió un error inesperado en el servidor.');
      } else {
        // Errores generales
        setGlobalError(err.message || 'Ocurrió un error inesperado.');
        console.error('Error:', err.message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {success && <p className="text-green-500">Operación exitosa.</p>}
      {globalError && <p className="text-red-500">{globalError}</p>}

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Nombre *
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
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Correo Electrónico *
        </label>
        <input
          id="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
        {errors.email && <p className="text-red-500">{errors.email}</p>}
      </div>
      
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Contraseña 
        </label>
        <input
          id="password"
          type="password"
          placeholder='Dejar en blanco para no cambiar'
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
        {errors.password && <p className="text-red-500">{errors.password}</p>}
      </div>

      <div>
        <label htmlFor="role" className="block text-sm font-medium text-gray-700">
          Rol *
        </label>
        <select
          id="role"
          value={formData.role}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        >
          <option value="">Selecciona un rol</option>
          <option value={UserRoles.Admin}>Admin</option>
          <option value={UserRoles.User}>User</option>
        </select>
        {errors.role && <p className="text-red-500">{errors.role}</p>}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        {onSubmit ? 'Guardar Cambios' : 'Crear Usuario'}
      </button>
      <button>
        <Link
          href="/admin/users"
          className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          Cancelar
        </Link>
      </button>
    </form>
  );
}
