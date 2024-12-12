'use client';
import { MdDeleteOutline } from "react-icons/md";
import Table from "../Table";
import { deleteCountry } from "../../services/country/countryServiceClient";
import { useState } from "react";

interface ICountry {
    _id: string;
    name: string;
    code: string; //codigo ISO del pais
    population: number;
    language: string;
}

export default function CountryTableContent({ countries }: { readonly countries: ReadonlyArray<ICountry> }) {
    const [countriesState, setCountriesState] = useState(countries);
    const [loadingId, setLoadingId] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleDelete = (id: string,name:string) => async () => {
        if(confirm(`¿Estás seguro de que deseas eliminar este país? ${name}`)) {
            setLoadingId(id);
            setError(null);
            try {
                await deleteCountry(id);
                
                setCountriesState(countries.filter((country) => country._id !== id));
            } catch (error:any) {
                console.error('Error al eliminar el pais',error);
                setError(error.response?.data?.message || 'Error al eliminar el pais');
            } finally {
                setLoadingId(null);
            }
        }
    };
    return (
        <div>
        {/* Mostrar el mensaje de error si existe */}
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <Table
            columns={['Nombre', 'Código', 'Población', 'Idioma','']}
            data={countriesState}
            renderRow={(country) => (
                <>
                    <td className='px-6  md:text-base text-sm max-w-[300px] lg:max-w-[200px] xl:max-w-[150px] truncate'>{country.name}</td>
                    <td className='px-6  md:text-base text-sm'>{country.code}</td>
                    <td className='px-6  md:text-base text-sm'>{country.population ? country.population.toLocaleString('es-ES') : 'N/A'}</td>
                    <td className='px-6  md:text-base text-sm'>{country.language}</td>
                    <td className="text-center flex justify-left items-center gap-4 px-6"><MdDeleteOutline onClick={handleDelete(country._id,country.name)}
                        className={`cursor-pointer ${
                            loadingId === country._id ? 'text-gray-400' : 'hover:text-red-500'
                        }`}
                    /></td>
                </>
            )}
        />
    </div>
    );
}