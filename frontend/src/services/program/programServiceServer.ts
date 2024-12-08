import axiosServerInstance from '../axiosServerInstance';

export const getPrograms = async () => {
  const response = await axiosServerInstance.get('/programs');
  return response.data; // Devuelve la lista de programas
};
