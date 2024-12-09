import axiosServerInstance from "../axiosServerInstance";

export const getUsers = async () => {
  const response = await axiosServerInstance.get('/users'); // Ajusta la ruta según tu backend
  return response.data;
}