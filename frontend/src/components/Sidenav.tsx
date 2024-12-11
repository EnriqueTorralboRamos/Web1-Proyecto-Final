'use client'; // Necesario para manejar eventos en el cliente

import Cookies from 'js-cookie';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { BiWorld } from 'react-icons/bi';
import { FaHome, FaList, FaSignInAlt, FaSignOutAlt, FaUsers } from 'react-icons/fa';

export default function Sidenav() {
  const router = useRouter();


  const handleLogout = () => {
    Cookies.remove('authToken'); // Elimina el token de autenticación
    router.push('/login'); // Redirige al usuario al login
  };

  return (
    <div className={`"flex h-full flex-row md:flex-col  px-3 py-10 md:px-2"`}>
        <nav className="flex flex-row md:flex-col h-full flex-grow mt-4 space-y-2">
            <Link 
                href="/admin"
                className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
                >
                <FaHome className="mr-2" /> <div className="hidden md:block">Inicio</div>
            </Link>
            <Link
                className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
                href="/admin/programs"
            >
                <FaList className="mr-2" /> <div className="hidden md:block">Programas</div>
            </Link>
            <Link
                className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
                href="/admin/countries"
            >
                <BiWorld  className="mr-2" /> <div className="hidden md:block">Paises</div>
            </Link>
            <Link
              className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
                href="/admin/users"
            > <FaUsers className="mr-2" /> <div className="hidden md:block">Usuarios</div>
            </Link>
            <div className="flex-grow"></div>
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
