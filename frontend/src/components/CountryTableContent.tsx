'use client';
import Table from "./Table";

interface ICountry {
    name: string;
    code: string; //codigo ISO del pais
    population: number;
    language: string;
}

export default function CountryTableContent({ countries }: { readonly countries: ReadonlyArray<ICountry> }) {
    return (
        <Table
            columns={['Nombre', 'Código', 'Población', 'Idioma']}
            data={countries}
            renderRow={(country) => (
                <>
                    <td>{country.name}</td>
                    <td>{country.code}</td>
                    <td>{country.population}</td>
                    <td>{country.language}</td>
                </>
            )}
        />
    );
}