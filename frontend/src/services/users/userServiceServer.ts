import axiosServerInstance from "../axiosServerInstance";

export const getUsers = async (filters: Record<string, string | undefined>) => {
  const response = await axiosServerInstance.get('/users/search',{params:filters}); // Ajusta la ruta según tu backend
  return response.data;
}

export const getUserById = async (userId: string) => {
  const response = await axiosServerInstance.get(`/users/${userId}`); // Ajusta la ruta según tu backend
  return response.data;
}
