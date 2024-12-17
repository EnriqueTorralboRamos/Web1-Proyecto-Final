# **Documentación del Backend - Sistema de Movilidad Internacional**

## **Índice**
1. Introducción
2. Requisitos Previos
3. Instalación y Configuración
4. Arquitectura del Proyecto
5. Descripción de los Módulos
   - Configuración (`config`)
   - Controladores (`controllers`)
   - Modelos (`models`)
   - Rutas (`routes`)
   - Servicios (`services`)
   - Middleware
6. Variables de Entorno
7. Comandos Disponibles
8. Dependencias
9. Endpoints
10. Referencias

---

## **1. Introducción**
El backend del Sistema de Movilidad Internacional es una aplicación desarrollada con Node.js, TypeScript y Mongoose para gestionar programas de movilidad, usuarios y países. Proporciona una API REST que permite realizar operaciones CRUD y autenticación segura.

---

## **2. Requisitos Previos**
- Node.js (v16 o superior)
- npm (v8 o superior)
- MongoDB (Base de datos)

---

## **3. Instalación y Configuración**
1. Clonar el repositorio:
   ```bash
   git clone <URL-del-repositorio>
   ```
2. Instalar dependencias:
   ```bash
   npm install
   ```
3. Crear un archivo `.env` basado en `example.env` y completar las variables necesarias.
4. Iniciar el servidor:
   ```bash
   npx ts-node src/server.ts
   ```

---

## **4. Arquitectura del Proyecto**
La estructura del proyecto es modular para facilitar el mantenimiento y la escalabilidad. A continuación, se describe la estructura principal:

```plaintext
src/
├── config/          # Configuración de la base de datos y otros servicios
├── controllers/     # Lógica para manejar las solicitudes HTTP
├── enum/            # Enumeraciones para roles y estados
├── helpers/         # Funciones auxiliares reutilizables
├── middleware/      # Middleware para validación y autenticación
├── models/          # Definición de esquemas de MongoDB
├── routes/          # Definición de endpoints de la API
├── services/        # Lógica de negocio
├── types/           # Extensiones de tipos para TypeScript
├── app.ts           # Configuración principal de la aplicación
└── server.ts        # Punto de entrada del servidor
```

---

## **5. Descripción de los Módulos**

### **Config (`config`)**
- **db.ts**: Configuración de la conexión con MongoDB.
- **mongoose.ts**: Se creo este archivo para evitar usar diferentes versiones de mongoose.

### **Controladores (`controllers`)**
Los controladores manejan la lógica para responder a las solicitudes HTTP:
- **authController.ts**: Manejo de inicio de sesión.
- **countryController.ts**: CRUD de países.
- **programController.ts**: CRUD de programas de movilidad.
- **userController.ts**: CRUD de usuarios.

#### Nota sobre la Función `search`:
En los controladores, se ha añadido una función `search` para permitir filtrajes avanzados. Esta implementación tiene como objetivo facilitar la integración con el frontend, proporcionando endpoints que aceptan parámetros dinámicos para realizar búsquedas y filtrados personalizados. 

Por ejemplo, en `programController.ts`, el método `search` permite buscar programas en función de parámetros como estado, país, fechas, entre otros. Esto mejora la experiencia del usuario final al ofrecer resultados más específicos y relevantes de forma eficiente.

---

### **Modelos (`models`)**
Define los esquemas de MongoDB utilizando Mongoose:
- **Country.ts**: Esquema para países.
- **Program.ts**: Esquema para programas de movilidad.
- **User.ts**: Esquema para usuarios.

### **Rutas (`routes`)**
Define los endpoints disponibles:
- **authRoutes.ts**
- **countryRoutes.ts**
- **programRoutes.ts**
- **userRoutes.ts**

### **Servicios (`services`)**
Implementan la lógica de negocio reutilizable para cada módulo:
- **authService.ts**
- **countryService.ts**
- **programService.ts**
- **userService.ts**

### **Middleware**
- **authMiddleware.ts**: Middleware para la validación de JWT y autorización.

#### Detalles del Middleware:
- **Función `authenticateToken`**: Valida el token JWT incluido en las cabeceras de las solicitudes.
  - **Descripción**: Extrae el token de la cabecera `Authorization` y lo verifica utilizando la clave secreta definida en las variables de entorno.
  - **Uso**: Añadido como middleware en rutas que requieren autenticación.
  

- **Función `authorizeAdmin`**: Verifica si el usuario autenticado tiene privilegios de administrador.
  - **Descripción**: Comprueba el rol del usuario en el objeto `req.user`.
  - **Uso**: Añadido como middleware en rutas restringidas para administradores.
- **Función `canAccessUser`**: Verifica si el usuario autenticado tiene permiso para acceder a los datos de otro usuario específico.
  - **Descripción**: Compara el `id` del usuario autenticado con el `id` del usuario objetivo en la solicitud. Este middleware es útil para restringir el acceso a datos sensibles entre usuarios.
  - **Uso**: Añadido como middleware en rutas que involucran operaciones sobre usuarios específicos.

- **Ejemplo**:
    ```javascript
        router.route('/')
        .get( authenticateToken, isAdmin, getUsers) // solo el admin puede obtener usuarios
        .put( authenticateToken,canAccessUser, updateUser); //Admin edita todos, User a si mismo
    ```

---

## **6. Variables de Entorno**
Las variables necesarias para el funcionamiento del proyecto están definidas en un archivo `.env`. Ejemplo:
```env
MONGOOSE_URL=mongodb://localhost:27017/sistemamovilidad
JWT_SECRET=tu_secreto
FRONTEND_URL=3000
PORT=5000
```

---

## **7. Dependencias**
El proyecto utiliza las siguientes dependencias clave:
- **bcrypt**: Para hashear contraseñas.
- **dotenv**: Para manejar variables de entorno.
- **express**: Framework para el servidor HTTP.
- **jsonwebtoken**: Para la gestión de tokens de autenticación.
- **mongoose**: ODM para MongoDB.

Las dependencias completas están listadas en el archivo `package.json`.

---

## **8. Endpoints**

### **Rutas de Autenticación (`/api/auth`)**
1. **POST `/api/auth/login`**
   - Inicia sesión con credenciales de usuario (email y contraseña) y devuelve un token de autenticación.
   
2. **GET `/api/auth/check-admin`**
   - Verifica si el usuario autenticado tiene rol de administrador. Requiere autenticación y autorización de administrador.

### **Rutas de Usuarios (`/api/users`)**
1. **GET `/api/users`**
   - Lista todos los usuarios (solo accesible para administradores).

2. **POST `/api/users`**
   - Crea un nuevo usuario.

3. **PUT `/api/users`**
   - Actualiza un usuario existente. Requiere autenticación y permiso sobre el usuario.

4. **GET `/api/users/:id`**
   - Obtiene los detalles de un usuario específico por ID. Requiere autenticación y permiso sobre el usuario.

5. **DELETE `/api/users/:id`**
   - Elimina un usuario por ID. Solo accesible para administradores.

6. **PUT `/api/users/:id/recover`**
   - Recupera un usuario eliminado por ID. Solo accesible para administradores.

7. **GET `/api/users/search`**
   - Busca usuarios por filtros específicos (nombre, email, rol, estado). Solo accesible para administradores.

### **Rutas de Países (`/api/country`)**
1. **GET `/api/country`**
   - Lista todos los países. Requiere autenticación.

2. **POST `/api/country`**
   - Crea un nuevo país. Solo accesible para administradores.

3. **GET `/api/country/:id`**
   - Obtiene los detalles de un país por ID. Requiere autenticación.

4. **PUT `/api/country/:id`**
   - Actualiza un país por ID. Solo accesible para administradores.

5. **DELETE `/api/country/:id`**
   - Elimina un país por ID. Solo accesible para administradores.

6. **GET `/api/country/search`**
   - Busca países por filtros específicos (nombre, código, población mínima/máxima, idioma). Requiere autenticación.

### **Rutas de Programas (`/api/programs`)**
1. **GET `/api/programs`**
   - Lista todos los programas disponibles. Requiere autenticación.

2. **POST `/api/programs`**
   - Crea un nuevo programa. Solo accesible para administradores.

3. **GET `/api/programs/:id`**
   - Obtiene los detalles de un programa por ID. Requiere autenticación.

4. **PUT `/api/programs/:id`**
   - Actualiza un programa por ID. Solo accesible para administradores.

5. **DELETE `/api/programs/:id`**
   - Elimina un programa por ID. Solo accesible para administradores.

6. **GET `/api/programs/search`**
   - Busca programas por filtros específicos (nombre, estado, país, fechas). Requiere autenticación.

7. **POST `/api/programs/participants`**
   - Añade un participante a un programa. Solo accesible para administradores.

8. **DELETE `/api/programs/participants`**
   - Elimina un participante de un programa. Solo accesible para administradores.

9. **GET `/api/programs/participants/:id`**
   - Obtiene programas asociados a un participante específico. Requiere autenticación y permisos adecuados.

---

## **9. Referencias**
- [Node.js Documentation](https://nodejs.org/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Mongoose Documentation](https://mongoosejs.com/)
