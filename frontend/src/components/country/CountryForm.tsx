'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import Link from 'next/link';
import { createCountry } from '@/src/services/country/countryServiceClient';
import { countrySchema } from '@/src/schemas/countrySchema';

// Esquema Zod para validación

interface CountryFormProps {
    initialData?: {
        name: string;
        code: string;
        population: number;
        language: string;
    };
    onSubmit?: (values: {
        name: string;
        code: string;
        population: number;
        language: string;
    }) => Promise<void>;
}

export default function CountryForm({
    initialData = {  name: '', code: '', population: 0, language: '' },
    onSubmit,
}: Readonly<CountryFormProps>) {
    const router = useRouter();
    const [formData, setFormData] = useState(initialData);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [success, setSuccess] = useState(false);
    const [globalError, setGlobalError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: id === 'population' ? Number(value) : value, // Convertir a número si es población
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        console.log('handleSubmit',formData);
        
        e.preventDefault();
        setErrors({});
        setSuccess(false);
        setGlobalError(null);

        try {
            // Validar datos con Zod
            countrySchema.parse(formData);

            // Enviar datos a la API
            if(onSubmit){
                await onSubmit(formData);
            }else{
                await createCountry(formData);
            }
            setSuccess(true);
            setFormData(initialData);
            router.push('/admin/countries');
        } catch (error: any) {
            console.log('Error',error);
            
            if (error instanceof z.ZodError) {
                console.log('ZodError',error.errors);
                
                setErrors(error.errors.reduce((acc, err) => ({ ...acc, [err.path[0]]: err.message }), {}));
            } else {
                setGlobalError(error.message);
                console.log('Error',error.message);                
            }
        }
    };
    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {success && <p className="text-green-500">Operación exitosa.</p>}
            {globalError && <p className="text-red-500">{globalError}</p>}

            <div>
                <label className="block text-sm font-medium text-gray-700">Nombre</label>
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
                <label className="block text-sm font-medium text-gray-700">Código</label>
                <input
                    id="code"
                    type="text"
                    value={formData.code}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                {errors.code && <p className="text-red-500">{errors.code}</p>}
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Población</label>
                <input
                    id="population"
                    type="text" // Use "text" to allow formatted values
                    value={formData.population.toLocaleString('es-ES')} // Display the value with separators
                    onChange={(e) => {
                        // Remove dots and update the raw numeric value
                        const rawValue = e.target.value.replace(/\./g, '').replace(/,/g, '');
                        if (/^\d*$/.test(rawValue)) { // Ensure only numeric input
                            setFormData((prev) => ({
                                ...prev,
                                population: rawValue === '' ? 0 : Number(rawValue), // Update the numeric value
                            }));
                        }
                    }}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                {errors.language && <p className="text-red-500">{errors.language}</p>}
            </div>
            <div className="flex gap-4 items-center mt-6">
                <Link
                    href={'/admin/countries'}
                    className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                    Volver
                </Link>
                <button
                    type="submit"
                    className=" w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    {onSubmit ? 'Guardar Cambios' : 'Crear Programa'}
                </button>
            </div>
        </form>
    );
}
