import Country from "../models/Country";


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

export const deleteCountry = async (_id: string) => {
    const country = await Country.findByIdAndDelete(_id);
    if(!country) {
        throw new Error('País no encontrado');
    }
}

export const getCountry = async (_id: string) => {
    const country = await Country.findById(_id);
    if(!country) {
        throw new Error('País no encontrado');
    }
    return country;
}

export const getCountries = async () => {
    return await Country.find();
}