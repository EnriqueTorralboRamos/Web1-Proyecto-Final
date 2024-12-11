import axiosInstance from '../axiosInstance';

export interface UserPayload {
  name: string;
  email: string;
  role: string;
}

export const getParticipants = async () => {
  const response = await axiosInstance.get('/users'); // Ajusta la ruta según tu backend
  return response.data.filter((user: any) => user.role === 'USER'); // Filtra por rol
};

export const createUser = async (payload: UserPayload) => {
  try {
    const response = await axiosInstance.post('/users', payload);
    return response.data;
  } catch (error: any) {
    console.error('Error al crear el programa:', error);
    throw new Error(error.response?.data?.message || 'Error al crear el programa');
  }
}

export async function getUserById(userId: string) {
  try {
    const response = await axiosInstance.get(`/users/${userId}`);
    return response.data;
  } catch (error: any) {
    console.error('Error al obtener el usuario:', error);
    throw new Error(error.response?.data?.message || 'Error al obtener el usuario');
  }
}

export const updateUser = async ( payload: UserPayload) => {
  console.log(payload);
  const response = await axiosInstance.put(`/users`, payload);
  return response.data;
};

export const deleteUser = async (id: string) => {
  const response = await axiosInstance.delete(`/users/${id}`);
  return response.data;
}

export const recoverUser = async (id: string) => {
  const response = await axiosInstance.put(`/users/${id}/recover`);
  return response.data;
}
