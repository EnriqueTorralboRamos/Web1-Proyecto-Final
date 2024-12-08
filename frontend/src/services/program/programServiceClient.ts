import axiosInstance from '../axiosInstance';

export interface ProgramPayload {
  name: string;
  countryId: string;
  participants?: string[];
  startDate: string;
  endDate: string;
}

export async function createProgram(payload: ProgramPayload) {
  try {    
    const response = await axiosInstance.post('/programs', payload);
    return response.data; // Devuelve el programa creado
  } catch (error: any) {
    console.error('Error al crear el programa:', error);
    throw new Error(error.response?.data?.message || 'Error al crear el programa');
  }
}

export async function getProgramById(programId: string) {
  try {
    const response = await axiosInstance.get(`/programs/${programId}`);
    return response.data;
  } catch (error: any) {
    console.error('Error al obtener el programa:', error);
    throw new Error(error.response?.data?.message || 'Error al obtener el programa');
  }
}