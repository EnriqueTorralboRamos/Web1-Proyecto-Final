# **Sistema de Movilidad Internacional - Frontend**

Este proyecto contiene la implementación del frontend del Sistema de Movilidad Internacional, desarrollado con **Next.js 15**, utilizando React, TypeScript, y TailwindCSS.

---
## **Instalación y Configuración**
1. Clonar el repositorio:
   ```bash
   git clone <URL-del-repositorio>
   ```
2. Instalar dependencias:
   ```bash
   npm install
   ```
3. Crear un archivo `.env` basado en `example.env` y completar las variables necesarias.
    ```
    NEXT_PUBLIC_BACKEND_URL=http://localhost:$PUERTO/api
    JWT_SECRET=tu_secreto
    ```
4. Iniciar el front:
    - En modo desarrollo:
        ```bash
        npm run dev
        ```
    - Para produccion:
        ```bash
        npm run build
        ```
        ```bash
        npm start
        ```
---

## **Particularidades de Next.js**

### **Componentes de Servidor vs Cliente**
En **Next.js**, los componentes pueden ejecutarse en el servidor o en el cliente:

- **Componentes de servidor:**
  - Pueden acceder a datos del servidor directamente.
  - Ejemplo: `getUsers` en `UserTable.tsx`.
  - **Restricción:** No pueden usar hooks como `useEffect`.

- **Componentes cliente:** ```'use client'```
  - Manejan eventos y estados interactivos.
  - Ejemplo: `UserTableContent`.
  - **Restricción:** No pueden usar funciones del lado del servidor directamente.

### **División en `services` para cliente y servidor**
En la carpeta `services`, cada módulo tiene un archivo separado para cliente y servidor, como `programServiceClient.ts` y `programServiceServer.ts`.

**Motivo:**
- Evitar conflictos entre el cliente y el servidor.
- Asegurar que las funciones del servidor no se utilicen en el cliente.

---

## **Descripción de los Directorios Principales**

### **app/**
La carpeta `app` contiene las rutas y páginas principales de la aplicación, usando la estructura del enrutamiento de Next.js 15.

- **admin/**: Rutas de administración del sistema.
  - **countries/**: Maneja la gestión de países (crear, editar, listar y ver detalles del país).
  - **programs/**: Gestión de programas con páginas para:
    - Crear programas: `/admin/programs/create`
    - Editar programas: `/admin/programs/[id]/edit`
    - Listar programas: `/admin/programs`
    - Ver detalles de programas: `/admin/programs/[id]`
  - **users/**: Gestión de usuarios (similar a `programs` y `countries`).
  - **/**: Página de bienvenida del administrador.

- **login/** y **register/**: Autenticación y registro de usuarios.

### **components/**
Contiene componentes reutilizables organizados en subcarpetas:
- **country/**: Componentes relacionados con países.
- **program/**: Componentes para programas (detalles, formularios, filtros, etc.).
- **skeletons/**: Componentes para el "loading state".
- **temp-middleware-solution/**: Soluciones temporales para el manejo de middleware.
- **users/**: Componentes de usuario.
- **Sidenav.tsx** y **Table.tsx**: Componentes globales para la navegación y tablas.

### **services/**
Contiene lógica de comunicación con el backend, organizada por recursos (`country`, `program`, `users`).

### **interfaces/**
Define las interfaces TypeScript para un tipado fuerte de datos.

### **schemas/**
Define los esquemas de validación usando **Zod**.

### **constants/**
Contiene constantes globales, como estados de programas (`programStatus.ts`) y roles de usuario (`userRoles.ts`).

---

## **Estructura del Proyecto**

### **Administración (/admin)**
La vista de administración está diseñada para gestionar recursos como **programas**, **países**, y **usuarios**. Incluye acciones como crear, editar, listar y ver detalles.

Rutas principales:

- `/admin/`: Pagina de bienvenida.
- `/admin/programs`: Gestión de programas.
- `/admin/countries`: Gestión de países.
- `/admin/users`: Gestión de usuarios.

### **Usuarios (/users)**
La vista de usuario está orientada a mostrar los programas asociados a un usuario específico.

Rutas principales:

- `/users` : Informacion sobre el usuario que inicio sesion
- `/users/countries/[id]`: Detalles de un país relacionado con el usuario.
- `/users/programs/[id]`: Detalles de un programa específico relacionado con el usuario.

---
## **Comportamiento de cada vista de gestion**
Las vistas de gestion tienen la misma organizacion, aqui la de programs de ejemplo:

### programs/: Gestión de programas con páginas para:
- ### Listar programas: ``/admin/programs``
    Renderiza un listado de programas con filtros y opciones para crear un nuevo programa.
    
    Se obtienen parametros para enviar a los componentes de filtros y los que cargan la informacion de la tabla
    ```tsx
        export default async function ProgramsPage(props: Readonly<{
        searchParams?: Promise<ISearchProgramParams>;
        }>) {
        const searchParams = await props.searchParams;
        const name = searchParams?.name ?? '';
        const status = searchParams?.status ?? '';
        const country = searchParams?.country ?? '';
        const startDate = searchParams?.startDate ?? '';
        const endDate = searchParams?.endDate ?? '';
        const page = searchParams?.page ?? 1;

    ```

    **Componentes utilizados:**
    - `ProgramsTable`: Renderiza la tabla de programas obtenidos del servidor usando filtros dinámicos.
    - `SearchTools`: Proporciona los filtros de búsqueda (nombre, estado, país, fechas).
    - `SkeletonTable`: Muestra un esqueleto mientras los datos se cargan.

    **Código relevante:**

    ```tsx
    <Suspense fallback={<SkeletonTable rows={5} columns={4} />}>
    <ProgramsTable filters={{ name, status, country, startDate, endDate, page }} />
    </Suspense>
    ```
- ### Crear programas: ``/admin/programs/create``
    Proporciona un formulario para la creación de un programa.

    **Componentes utilizados:**
    - `ProgramForm`: Renderiza los campos necesarios para crear un programa.
    - `Suspense`: Muestra un `Skeleton` mientras se carga el formulario.

    **Código relevante:**
    ```tsx
    <Suspense fallback={<LoadingErrorCacther><ProgramFormSkeleton /></LoadingErrorCacther>}>
    <ProgramForm />
    </Suspense>
    ```
- ### Editar programas: ``/admin/programs/[id]/edit``
    Proporciona un formulario prellenado para editar un programa existente.

    **Componentes utilizados:**
    - `ProgramForm`: Renderiza los campos con datos iniciales.
    - `useParams`: Obtiene el ID del programa desde la URL.
    - `Suspense`: Maneja los estados de carga con `Skeletons`.

    **Código relevante:**
    ```tsx
    if (loading) return <LoadingErrorCacther><ProgramFormSkeleton /></LoadingErrorCacther>;
    if (error) return <LoadingErrorCacther><div><p className="text-red-500">{error}</p><ProgramFormSkeleton /></div></LoadingErrorCacther>;
    <ProgramForm initialData={program} onSubmit={handleSubmit} />
    ```

- ### Ver detalles de programas: ``/admin/programs/[id]``
    Muestra los detalles de un programa específico.

    **Componentes utilizados:**
    - `ProgramDetails`: Renderiza la información completa del programa (nombre, país, fechas, estado, participantes).
    - `Suspense`: Muestra un `Skeleton` mientras se cargan los detalles.

    **Código relevante:**
    ```tsx
    <Suspense fallback={<LoadingErrorCacther><ProgramFormSkeleton /></LoadingErrorCacther>}>
    <ProgramDetails programId={id} />
    </Suspense>
    ```
---


## **Uso de `Suspense` y Skeletons**

### **Suspense**
Se utiliza el componente `Suspense` de React para manejar el estado de carga mientras se obtienen datos del servidor.

**Ventajas:**
- Permite mostrar un `Skeleton` mientras se cargan los datos.
- Mejora la experiencia del usuario al evitar tiempos de espera prolongados.

**Ejemplo:**
```tsx
<Suspense fallback={<SkeletonTable rows={5} columns={4} />}>
  <UserTable filters={filters} />
</Suspense>
```

### **Skeletons**
Los componentes de tipo Skeleton, como `SkeletonTable`, proporcionan una representación visual mientras los datos reales se cargan.

**Ejemplo:**
```tsx
// src/components/skeletons/SkeletonTable.tsx
export default function SkeletonTable({ rows = 5, columns = 4 }: { rows?: number; columns?: number }) {
    return (
      <div className="mt-6 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              {Array.from({ length: columns }).map((_, idx) => (
                <th key={idx} className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                  <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {Array.from({ length: rows }).map((_, rowIdx) => (
              <tr key={rowIdx}>
                {Array.from({ length: columns }).map((_, colIdx) => (
                  <td key={colIdx} className="px-4 py-2">
                    <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
```

---


## **Componentes Destacados**

### **1. UserProgramDetails**
Muestra los programas en los que un usuario está inscrito. Incluye opciones para ver más detalles del programa o eliminar al usuario del mismo.

**Características clave:**
- Usa enlaces para navegar a detalles del programa.
- Muestra fechas y el país asociado al programa.
- Permite eliminar al participante del programa.

**Código relevante:**
```tsx
    'use client';

    import ...

    interface Program {_id: string; ...}

    interface UserProgramDetailsProps { programs?: Program[]; userId: string;url: string;
    }

    export default function UserProgramDetails({ programs=[], userId ,url}: <UserProgramDetailsProps>) {
    //use states

    
    const handleRemoveParticipant = async (programId:string) => {
        //logica de eliminar participante
    };

    return (
        <div>
        {programs.length>0 && <h2>Programas en los que participa</h2>}
        {error && <p>{error}</p>}
        {successMessage && <p>{successMessage}</p>}

        <div>
            {programs.map((program) => (
            <div>
                <label >Nombre del Programa</label>
                <label>País</label>            
                <label>Fecha de Inicio</label>
                <label>Fecha de Fin</label>
                <Link>Más Detalles</Link>
                <button>Eliminar Participante</button>
            </div>
            ))}
        </div>
        </div>
    );
    }

```

---

### **2. UserTable**
Muestra una tabla de usuarios obtenida desde el servidor, permitiendo filtrado y paginación.

**Características clave:**
- Usa `Suspense` para cargar datos.
- Delegación a `UserTableContent` para renderizado.
- Es un componente de servidor para obtener datos directamente del backend.

**Código relevante:**
```tsx
import ...
interface UsersTableProps {
    filters: ISearchUserParams; 
}
export default async function UsersTable({ filters }:<UsersTableProps>) {
    try {        
        const users = await getUsers({...filters,page:filters.page?.toString()}); 
        // Obtiene datos en el servidor
        return <UserTableContent users={users} deleted={filters.deleted}/>;
    } catch (error) {
        console.log('Error al cargar los usuarios:', error);        
        return <LoadingErrorCacther><SkeletonTable rows={5} columns={4} /></LoadingErrorCacther>
    }
}
```

---

### **3. UserTableContent**
Renderiza filas individuales en la tabla de usuarios. Incluye opciones para ver detalles, editar o eliminar usuarios.

**Características clave:**
- Componente cliente para manejar eventos interactivos como eliminación o recuperación.
- Uso de estados locales para errores y mensajes de éxito.

**Código relevante:**
```tsx
    'use client';

    import ...


    interface User{ _id:string, ...  }
    interface UserTableContentProps {users: <User>; deleted?: string; }

    export default function UsersTableContent({ users,deleted }: Readonly<UserTableContentProps>) {
        //Use Sates...
        const router = useRouter();
        const handleDelete = (id: string,name:string) => async () => {
            //logica de handleDelete
        };

        const handleRecover = (id: string,name:string) => async () => {
            //logica para recuperar usuario
        }

        return (
            <div>
                {/* Mensaje de error */}
                {/* Mensaje de éxito */}
                <Table
                    columns={['Nombre', 'Email', 'Rol', `Mas Info`]}
                    data={users}
                    renderRow={(user) => (
                        <>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>
                                {deleted === 'true'?(
                                {/* Boton de recuperar usuario */}
                                ):(
                                    <>
                                        {/* Enlace al detalle */}
                                        {/* Enlace a editar */}                                        
                                        {/* Botón de eliminar */}
                                        
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
```

---


## **Conclusión**
Este sistema aprovecha las capacidades avanzadas de **Next.js** y React para construir una aplicación eficiente, modular y con una excelente experiencia de usuario.
