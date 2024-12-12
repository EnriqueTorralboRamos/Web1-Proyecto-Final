import { getCountries } from "../../services/country/countryServiceServer";
import CountryTableContent from "./CountryTableContent";
import SkeletonTable from "../skeletons/SkeletonTable";
import LoadingErrorCacther from "../temp-middleware-solution/LoadingErrorCatcher";

export default async function CountryTable() {
    try {
        
        const countries = await getCountries(); // Obtiene datos en el servidor
        return <CountryTableContent countries={countries} />;
    } catch (error) {
        console.log('Error al cargar los países:', error);
        
        return <LoadingErrorCacther><SkeletonTable rows={5} columns={4} /></LoadingErrorCacther>
    }
}