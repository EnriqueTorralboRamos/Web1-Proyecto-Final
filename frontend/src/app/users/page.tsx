'use client';

import Cookies from 'js-cookie';
import {useRouter} from 'next/navigation';

export default function Page() {
    const router = useRouter();
    const handleLogout = () => {
        Cookies.remove('authToken'); // Elimina el token de autenticación
        router.push('/login'); // Redirige al usuario al login
      };
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-background text-foreground">
            <h1 className="text-4xl">AUN EN DESARROLLO</h1>
            <h2 className="text-2xl">Proximamente...</h2>
            <button onClick={handleLogout} className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5">
           Log out
          </button>
        </div>
    );
}