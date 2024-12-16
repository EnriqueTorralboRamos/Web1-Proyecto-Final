import { z } from "zod";

export const countrySchema = z.object({
    name: z.string().min(1, 'El nombre es obligatorio'),
    code: z.string().min(1, 'El código es obligatorio'),
    population: z.number().int().min(1, 'La población debe ser mayor a 0'),
    language: z.string().min(1, 'El idioma es obligatorio'),
});