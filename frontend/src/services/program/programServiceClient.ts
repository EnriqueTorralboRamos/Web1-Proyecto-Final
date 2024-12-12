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
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error al crear el programa:', error);
      throw new Error(error.message || 'Error al crear el programa');
      
    }
  }
}

export async function getProgramById(programId: string) {
  try {
    const response = await axiosInstance.get(`/programs/${programId}`);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error al obtener el programa:', error);
      throw new Error(error.message || 'Error al obtener el programa');
      
    }
  }
}
export const updateProgram = async (id: string, data: ProgramPayload) => {
  const response = await axiosInstance.put(`/programs/${id}`, data);
  return response.data;
};
export const deleteProgram = async (id: string) => {
  const response = await axiosInstance.delete(`/programs/${id}`);
  return response.data;
}

export const removeParticipantFromProgram = async (programId: string, userId: string) => {
  const response = await axiosInstance.delete(`/programs/participants`,{data:{programId,userId}});
  return response.data;
}