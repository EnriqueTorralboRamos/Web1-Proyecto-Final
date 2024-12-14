import Country from "../models/Country";
import Program from "../models/Program";


interface SearchCountriesParams {
    name?: string;
    code?: string;
    populationMin?: number;
    populationMax?: number;
    language?: string;
}

export const searchCountries = async (filters: SearchCountriesParams) => {
    const query: any = {};

    if (filters.name) {
        query.name = { $regex: filters.name, $options: 'i' };
    }
    if (filters.code) {
        query.code = filters.code;
    }
    if (filters.populationMin && filters.populationMax) {
        query.population = { $gte: filters.populationMin, $lte: filters.populationMax };
    } else if (filters.populationMin) {
        query.population = { $gte: filters.populationMin };
    } else if (filters.populationMax) {
        query.population = { $lte: filters.populationMax };
    }
    if (filters.language) {
        query.language = filters.language;
    }

    return await Country.find(query);
}

export const createCountry = async (
    name: string, 
    code: string, 
    population: number, 
    language: string
) => {
    const existingCountry = await Country.findOne({ name });
    if (existingCountry) {
        throw new Error('El país ya existe con este nombre');
    }
    const newCountry = new Country({ name, code, population, language });
    return await newCountry.save();
}

export const updateCountry = async (
    _id: string,
    name?: string,
    code?: string,
    population?: number,
    language?: string
) => {
    const country = await Country.findByIdAndUpdate(
        _id,
        { name, code, population, language },
        { new: true, runValidators: true } // Devuelve el documento actualizado y aplica validaciones
    );
    if(!country) {
        throw new Error('País no encontrado');
    }
    if(name) country.name = name;
    if(code) country.code = code;
    if(population) country.population = population;
    if(language) country.language = language;
    return await country.save();
}

export const deleteCountry = async (countryId: string) => {
    const existingPrograms = await Program.find({ country: countryId });
  if (existingPrograms.length > 0) {
    throw new Error('No se puede eliminar el país porque existen programas asociados');
  }
    const country = await Country.findByIdAndDelete(countryId);
    if(!country) {
        throw new Error('País no encontrado');
    }
}

export const getCountry = async (countryId: string) => {
    const country = await Country.findById(countryId);
    if(!country) {
        throw new Error('País no encontrado');
    }
    return country;
}

export const getCountries = async () => {
    return await Country.find();
}