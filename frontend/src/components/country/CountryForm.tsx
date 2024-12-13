'use client';

import { useState } from 'react';
import { useRouter } from 'next/router';
import { z } from 'zod';
import Link from 'next/link';
import { createUser } from '@/src/services/users/userServiceClient';
import { UserRoles } from '@/src/constants/userRoles';
import { Language } from '@mui/icons-material';
import { createCountry } from '@/src/services/country/countryServiceClient';

// Esquema Zod para validación
const countrySchema = z.object({
    name: z.string().min(1, 'El nombre es obligatorio'),
    code: z.string().min(1, 'El código es obligatorio'),
    population: z.number().int().min(1, 'La población debe ser mayor a 0'),
    Language: z.string().min(1, 'El idioma es obligatorio'),
});
interface CountryFormProps {
    initialData?: {
        _id: string;
        name: string;
        code: string;
        population: number;
        language: string;
    };
    onSubmit?: (values: {
        _id: string;
        name: string;
        code: string;
        population: number;
        language: string;
    }) => Promise<void>;
}

export default function CountryForm({
    initialData = { _id: '', name: '', code: '', population: 0, language: '' },
    onSubmit,
}: Readonly<CountryFormProps>) {
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
            countrySchema.parse(formData);

            // Enviar datos a la API
            if(onSubmit){
                await onSubmit?.(formData);
            }else{
                await createCountry(formData);
            }
            setSuccess(true);
            router.push('/admin/countries');
        } catch (error: any) {
            if (error instanceof z.ZodError) {
                setErrors(error.errors.reduce((acc, err) => ({ ...acc, [err.path[0]]: err.message }), {}));
            } else {
                setGlobalError(error.message);
            }
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            {success && <p className="text-green-500">Operación exitosa.</p>}
            {globalError && <p className="text-red-500">{globalError}</p>}

            <div>
                <label className="block text-sm font-medium text-gray-700">Nombre</label>
                <input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                />
                {errors.name && <p className="text-red-500">{errors.name}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Código</label>
                <input
                    id="code"
                    type="text"
                    value={formData.code}
                    onChange={handleChange}
                    className="mt-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                />
                {errors.code && <p className="text-red-500">{errors.code}</p>}
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Población</label>
                <input
                    id="population"
                    type="number"
                    value={formData.population}
                    onChange={handleChange}
                    className="mt-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                />
                {errors.population && <p className="text-red-500">{errors.population}</p>}
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Idioma</label>
                <input
                    id="language"
                    type="text"
                    value={formData.language}
                    onChange={handleChange}
                    className="mt-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                />
                {errors.language && <p className="text-red-500">{errors.language}</p>}
            </div>
            <div className="flex gap-4 items-center mt-6">
                <Link
                    href={'/admin/countries'}
                    className="w-full sm:w-auto bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    Volver
                </Link>
                <button
                    type="submit"
                    className="w-full sm:w-auto bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    Guardar
                </button>
            </div>
        </form>
    );
}
