import Link from 'next/link';
import RegisterForm from './registerForm';

export default function RegisterPage() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <RegisterForm />
        <p className="text-center mt-4 text-sm text-gray-600">
            ¿Ya tienes cuenta?{' '}
            <Link
              href="/login" // Ajusta la ruta a tu página de registro
              className="text-blue-500 hover:text-blue-700 font-medium"
            >
              Ingresa sesión aquí
            </Link>
        </p>
      </div>
    </div>
  );
}