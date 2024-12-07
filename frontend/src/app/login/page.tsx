import LoginForm from './LoginForm';
import React from 'react';


export default function LoginPage() {


  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">Iniciar Sesión</h1>
        <LoginForm />
      </div>
    </div>
  );
}