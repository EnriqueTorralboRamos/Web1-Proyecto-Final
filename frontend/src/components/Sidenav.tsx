'use client'; // Necesario para manejar eventos en el cliente

import { useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { FaHome, FaList, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';

export default function Sidenav() {
  const [isOpen, setIsOpen] = useState(true); // Estado para colapsar o expandir
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path); // Navega a la ruta
  };

  const handleLogout = () => {
    Cookies.remove('authToken'); // Elimina el token de autenticación
    console.log('Token eliminado, redirigiendo a login...');
    router.push('/login'); // Redirige al usuario al login
  };

  return (
    <div className={`"flex h-full flex-col px-3 py-4 md:px-2"`}>
      {/* Botón para colapsar */}
      {/* <button
        className="p-2 text-gray-400 hover:text-white focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? '<' : '>'}
      </button> */}

      {/* Navegación */}
        <nav className="mt-4 space-y-2">
            <button
                className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
                onClick={() => handleNavigation('/admin')}
            >
                <FaHome className="mr-2" /> <div className="hidden md:block">Inicio</div>
            </button>
            <button
                className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
                onClick={() => handleNavigation('/admin/programs')}
            >
                <FaList className="mr-2" /> <div className="hidden md:block">Programas</div>
            </button>
            <button
                className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
                onClick={() => handleNavigation('/login')}
            >
                <FaSignInAlt className="mr-2" /> <div className="hidden md:block">Login</div>
            </button>
            <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
            <button
              className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
              onClick={handleLogout}
            >
              <FaSignOutAlt className="w-6" />
              <div className="hidden md:block">Sign Out</div>
            </button>
        </nav>
    </div>
  );
}
