'use client'; // Necesario para manejar eventos en el cliente

import Cookies from 'js-cookie';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { BiWorld } from 'react-icons/bi';
import { FaHome, FaList, FaSignOutAlt, FaUsers } from 'react-icons/fa';

export default function Sidenav() {
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove('authToken'); // Elimina el token de autenticación
    router.push('/login'); // Redirige al usuario al login
  };

  return (
    <div
      className={
        "flex flex-col md:flex-row md:h-full md:w-auto md:shadow-md md:bg-white md:px-2 md:py-10 md:static fixed bottom-0 w-full bg-white shadow-md z-50"
      }
    >
      <nav className="flex flex-row md:flex-col justify-around md:justify-start items-center gap-2 md:gap-4 px-2 md:px-3 py-2 md:py-4">
        <Link
          href="/admin"
          className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
        >
          <FaHome className="mr-2" /> <div className="hidden md:block">Inicio</div>
        </Link>
        <Link
          href="/admin/programs"
          className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
        >
          <FaList className="mr-2" /> <div className="hidden md:block">Programas</div>
        </Link>
        <Link
          href="/admin/countries"
          className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
        >
          <BiWorld className="mr-2" /> <div className="hidden md:block">Paises</div>
        </Link>
        <Link
          href="/admin/users"
          className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
        >
          <FaUsers className="mr-2" /> <div className="hidden md:block">Usuarios</div>
        </Link>
        <div className="flex-grow"></div>

        <button
          className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-red-100 hover:text-red-600 md:flex-none md:justify-start md:p-2 md:px-3"
          onClick={handleLogout}
        >
          <FaSignOutAlt className="w-6" />
          <div className="hidden md:block">Cerrar Sesión</div>
        </button>
      </nav>
    </div>
  );
}
