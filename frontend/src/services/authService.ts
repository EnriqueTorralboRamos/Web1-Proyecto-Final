import axiosInstance from './axiosInstance';

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export const login = async (data: LoginData) => {
  const response = await axiosInstance.post('/auth/login', data);
  return response.data; // Devuelve el token u otros datos de respuesta
};

export const register = async (data: RegisterData) => {
  const response = await axiosInstance.post('/users', data);
  return response.data; // Devuelve datos relacionados con el registro
};
