import axios from 'axios';
import Cookies from 'js-cookie';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL, // URL base del backend
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para añadir el token en las solicitudes
axiosInstance.interceptors.request.use((config) => {
  const token = Cookies.get('authToken'); // Leer el token de las cookies
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default axiosInstance;