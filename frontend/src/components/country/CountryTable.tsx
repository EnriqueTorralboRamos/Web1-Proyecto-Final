import { getCountries } from "../../services/country/countryServiceServer";
import CountryTableContent from "./CountryTableContent";
import SkeletonTable from "../skeletons/SkeletonTable";
import LoadingErrorCacther from "../temp-middleware-solution/LoadingErrorCatcher";
import { ISearchCountriesParams } from "../../interfaces/ISearchCountryParams";

interface CountryTableProps {
    filters: ISearchCountriesParams;
}

export default async function CountryTable(
    { filters }: Readonly<CountryTableProps>
) {
    try {
        
        const countries = await getCountries({
            ...filters,
            page: filters.page?.toString(),
            population: filters.populationMin?.toString(),
            populationMin: filters.populationMin?.toString(),
            populationMax: filters.populationMax?.toString(),
        }); // Obtiene datos en el servidor
        return <CountryTableContent countries={countries} />;
    } catch (error) {
        console.log('Error al cargar los países:', error);
        
        return <LoadingErrorCacther><SkeletonTable rows={5} columns={4} /></LoadingErrorCacther>
    }
}