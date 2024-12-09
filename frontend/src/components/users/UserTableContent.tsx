'use client';

import Table from "../Table";

interface User{
    _id: string;
    name: string;
    email: string;
    role: string;
}
export default function UsersTableContent({ users }: { readonly users: ReadonlyArray<User> }) {
    return (
        <Table
            columns={['Nombre', 'Email', 'Rol']}
            data={users}
            renderRow={(user) => (
                <>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                </>
            )}
        />
    );
}