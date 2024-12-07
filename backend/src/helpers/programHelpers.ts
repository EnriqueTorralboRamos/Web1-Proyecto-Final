import ProgramStatus from '../enum/programStatus';

/**
 * Calcula el estado del programa basado en las fechas.
 * @param startDate Fecha de inicio del programa
 * @param endDate Fecha de finalización del programa
 * @returns El estado calculado del programa
 */
export const calculateProgramStatus = (startDate: Date, endDate: Date): ProgramStatus => {
  const now = new Date();

  if (now >= new Date(startDate) && now <= new Date(endDate)) {
    return ProgramStatus.ONGOING; // En curso
  } else if (now > new Date(endDate)) {
    return ProgramStatus.COMPLETED; // Finalizado
  } else {
    return ProgramStatus.PENDING; // Pendiente
  }
};
