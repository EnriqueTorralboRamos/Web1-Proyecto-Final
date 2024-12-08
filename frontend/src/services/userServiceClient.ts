import axiosInstance from './axiosInstance';

export const getParticipants = async () => {
  const response = await axiosInstance.get('/users'); // Ajusta la ruta según tu backend
  return response.data.filter((user: any) => user.role === 'USER'); // Filtra por rol
};
