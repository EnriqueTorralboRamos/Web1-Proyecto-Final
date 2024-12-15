import Link from 'next/link';
import LoginForm from './LoginForm';
import React from 'react';


export default function LoginPage() {


  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">Iniciar Sesión</h1>
        <LoginForm />
        <p className="text-center mt-4 text-sm text-gray-600">
          ¿No tienes cuenta?{' '}
          <Link
            href="/register" // Ajusta la ruta a tu página de registro
            className="text-blue-500 hover:text-blue-700 font-medium"
          >
            Regístrate aquí
          </Link>
        </p>
      </div>
    </div>
  );
}