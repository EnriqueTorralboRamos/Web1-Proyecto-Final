'use client';

import Table from "../Table";
import Link from 'next/link';
import { CgDetailsMore } from 'react-icons/cg';
import { MdDeleteOutline } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { deleteUser, recoverUser} from '@/src/services/users/userServiceClient';


interface User{
    _id: string;
    name: string;
    email: string;
    role: string;
}
interface UserTableContentProps {
    readonly users: ReadonlyArray<User>;
    deleted?: string; // Añadir esta propiedad
  }

export default function UsersTableContent({ users,deleted }: Readonly<UserTableContentProps>) {
    const [loadingId, setLoadingId] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const router = useRouter();
    const handleDelete = (id: string,name:string) => async () => {
        if(confirm(`¿Estás seguro de que deseas eliminar este usuario? ${name}`)) {
            setLoadingId(id);
            setError(null);
            setSuccess(null);
            try {
                await deleteUser(id);
                setSuccess('Usuario eliminado correctamente');
                setTimeout(() => setSuccess(null), 3000);
            } catch (error:any) {
                console.error('Error al eliminar el usuario ',error);
                setError(error.response?.data?.message || 'Error al eliminar el programa');
            } finally {
                setLoadingId(null);
                router.refresh();
    
                
            }
        }
    };

    const handleRecover = (id: string,name:string) => async () => {
        if(confirm(`¿Estás seguro de que deseas recuperar este usuario? ${name}`)) {
            setLoadingId(id);
            setError(null);
            try {
                await recoverUser(id);
                setSuccess('Usuario recuperado correctamente');
                setTimeout(() => setSuccess(null), 3000);
                
            } catch (error:any) {
                console.error('Error al recuperar el usuario ',error);
                setError(error.response?.data?.message || 'Error al recuperar el programa');
            } finally {
                setLoadingId(null);
                router.refresh();
    
                
            }
        }
    }

    return (
        <div>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {success && <p className="text-green-500 mb-4">{success}</p>} {/* Mensaje de éxito */}
            <Table
                columns={['Nombre', 'Email', 'Rol', `Mas Info`]}
                data={users}
                renderRow={(user) => (
                    <>
                        <td className='px-6  md:text-base text-sm max-w-[300px] lg:max-w-[200px] xl:max-w-[150px] truncate'>{user.name}</td>
                        <td className='px-6  md:text-base text-sm '>{user.email}</td>
                        <td className='px-6  md:text-base text-sm '>{user.role}</td>
                        <td className="text-center flex justify-left items-center gap-4 px-6 py-1 ">
                            {deleted === 'true'?(
                                <button
                                onClick={handleRecover(user._id, user.name)}
                                className="bg-cyan-500 text-sm text-white py-1 px-1 rounded-md hover:bg-cyan-600"
                            >
                                Recuperar
                            </button>
                            ):(
                                <>
                                    {/* Enlace al detalle */}
                                    <Link href={`/admin/users/${user._id}`}>
                                    <CgDetailsMore className="cursor-pointer text-lg hover:text-blue-600" />
                                    </Link>

                                    {/* Enlace a editar */}
                                    <Link href={`/admin/users/${user._id}/edit`}>
                                    <CiEdit  className="cursor-pointer text-lg hover:text-blue-600" />
                                    </Link>

                                    {/* Botón de eliminar */}
                                    <MdDeleteOutline
                                    onClick={handleDelete(user._id, user.name)}
                                    className={`cursor-pointer ${
                                        loadingId === user._id ? 'text-gray-400' : 'hover:text-red-500'
                                    }`}
                                    />
                                </>
                            )
                        }
                            
                        </td>
                    </>
                )}
            />
        </div>
    );
}