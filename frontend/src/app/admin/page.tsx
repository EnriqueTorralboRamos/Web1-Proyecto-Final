import { FaUsers, FaList, FaGlobe } from "react-icons/fa";
import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div className="flex h-screen">

      {/* Contenido principal */}
      <main className="flex-1 bg-gray-100 p-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">¡Bienvenido Administrador!</h1>
          <p className="text-gray-600">
            Aquí puedes gestionar usuarios, programas y países de manera eficiente.
          </p>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              href="/admin/users"
              className="bg-white shadow-md rounded-md p-4 flex flex-col items-center justify-center hover:bg-blue-100"
            >
              <FaUsers className="text-blue-500 text-4xl mb-2" />
              <span className="text-gray-800">Usuarios</span>
            </Link>
            <Link
              href="/admin/programs"
              className="bg-white shadow-md rounded-md p-4 flex flex-col items-center justify-center hover:bg-blue-100"
            >
              <FaList className="text-green-500 text-4xl mb-2" />
              <span className="text-gray-800">Programas</span>
            </Link>
            <Link
              href="/admin/countries"
              className="bg-white shadow-md rounded-md p-4 flex flex-col items-center justify-center hover:bg-blue-100"
            >
              <FaGlobe className="text-yellow-500 text-4xl mb-2" />
              <span className="text-gray-800">Países</span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
