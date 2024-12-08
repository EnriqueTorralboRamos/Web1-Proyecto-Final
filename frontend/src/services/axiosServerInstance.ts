import axios from 'axios';
import { cookies } from 'next/headers';

const axiosServerInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  timeout: 5000, // Tiempo límite opcional
});

// Interceptor para agregar el token en el servidor
axiosServerInstance.interceptors.request.use(
  async (config) => {
    const cookieStore = await cookies(); // Devuelve un ReadonlyRequestCookies
    const authToken = cookieStore.get('authToken'); // Obtén la cookie por su clave
    

    if (authToken) {
      config.headers = config.headers || {};
      config.headers['Authorization'] = `Bearer ${authToken.value}`; // Accede al valor
    }

    return config;
  },
  (error) => {
    return Promise.reject(new Error(error.message));
  }
);

export default axiosServerInstance;
