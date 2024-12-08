import { getCountries } from "../services/country/countryServiceServer";
import CountryTableContent from "./CountryTableContent";
import SkeletonTable from "./SkeletonTable";

export default async function CountryTable() {
    try {
        
        const countries = await getCountries(); // Obtiene datos en el servidor
        return <CountryTableContent countries={countries} />;
    } catch (error) {
        return <SkeletonTable rows={5} columns={4} />
    }
}