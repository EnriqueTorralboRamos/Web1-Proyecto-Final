import axiosServerInstance from "../axiosServerInstance";

export const getUsers = async (filters: Record<string, string | undefined>) => {
  const response = await axiosServerInstance.get('/users/search',{params:filters}); // Ajusta la ruta según tu backend
  console.log(response.data);
  return response.data;
}
