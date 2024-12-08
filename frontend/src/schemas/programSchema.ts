import { z } from 'zod';

export const programSchema = z.object({
  name: z.string().min(1, { message: 'El nombre del programa es obligatorio' }),
  country: z.string().min(1, { message: 'El país es obligatorio' }),
  participants: z
    .string()
    .optional()
    .refine((val) => !val || val.split(',').every((id) => id.trim().length > 0), {
      message: 'Los IDs de participantes deben ser válidos',
    }),
  startDate: z.string().min(1, { message: 'La fecha de inicio es obligatoria' }),
  endDate: z.string().min(1, { message: 'La fecha de fin es obligatoria' }),
});
