export interface ISearchCountriesParams {
    name?: string;
    code?: string;
    populationMin: number;
    language?: string;
    populationMax?: number;
    page?: number;
}