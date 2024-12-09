import { Request, Response } from 'express';
import * as countryService from '../services/countryService';

export const createCountry = async (req: Request, res: Response) => {
    try {
        const { name, code, population, language } = req.body;

        // Validar entrada
        if (!name) {
            res.status(400).json({ message: 'El nombre del país es requerido' });
            return 
        }

        const newCountry = await countryService.createCountry(name, code, population, language);
        res.status(201).json(newCountry);
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ message: error.message || 'Error al crear el país' });
    }
};

export const updateCountry = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, code, population, language } = req.body;

        const updatedCountry = await countryService.updateCountry(id, name, code, population, language);
        res.status(200).json(updatedCountry);
    } catch (error: any) {
        console.error(error);
        if (error.message === 'País no encontrado') {
            res.status(404).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Error al actualizar el país' });
        }
    }
};

export const deleteCountry = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await countryService.deleteCountry(id);
        res.sendStatus(204);
    } catch (error: any) {
        console.error(error);
        if (error.message === 'País no encontrado') {
            res.status(404).json({ message: error.message });
        } else if (error.message === 'No se puede eliminar el país porque existen programas asociados') {
            res.status(400).json({ message: error.message });
        }else {
            res.status(500).json({ message: 'Error al eliminar el país' });
        }
    }
};

export const getCountry = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const country = await countryService.getCountry(id);
        res.status(200).json(country);
    } catch (error: any) {
        console.error(error);
        if (error.message === 'País no encontrado') {
            res.status(404).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Error al obtener el país' });
        }
    }
};

export const getCountries = async (req: Request, res: Response) => {
    try {
        const countries = await countryService.getCountries();
        res.status(200).json(countries);
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los países' });
    }
};
