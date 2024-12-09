import axiosServerInstance from '../axiosServerInstance';

export const getPrograms = async () => {
  const response = await axiosServerInstance.get('/programs');
  return response.data; // Devuelve la lista de programas
};
export async function getProgramById(programId: string) {
  try {
    const response = await axiosServerInstance.get(`/programs/${programId}`);
    return response.data;
  } catch (error: any) {
    console.error('Error al obtener el programa:', error);
    throw new Error(error.response?.data?.message || 'Error al obtener el programa');
  }
}