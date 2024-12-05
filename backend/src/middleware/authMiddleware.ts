import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import UserRoles from '../enum/userRoles';

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  console.log('Middleware ejecutado');

  const token = req.headers['authorization']?.split(' ')[1]; // Obtener token del encabezado Authorization
  if (!token) {
    console.log('Token no proporcionado');
    res.status(401).json({ message: 'Token requerido' });
    return
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = decoded as jwt.JwtPayload;
    console.log('Token válido:', decoded);
    next(); // Pasar al siguiente middleware o controlador
  } catch (error) {
    console.log('Error al verificar el token:', error);
    res.status(403).json({ message: 'Token inválido o expirado' });
    return
  }
};

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.user?.role !== 'admin') {
    console.log('Usuario no autorizado');
    res.status(403).json({ message: 'Usuario no autorizado' });
    return
  }

  console.log('Usuario autorizado');
  next();
};

export const canEditUser = (req: Request, res: Response, next: NextFunction) => {
  const currentUser = req.user; // Asegúrate de que el middleware de autenticación ya haya cargado `req.user`
  const { id } = req.params; // ID del usuario a editar

  if (!currentUser) {
    return res.status(401).json({ message: 'Usuario no autenticado' });
  }

  if (currentUser.role === UserRoles.Admin || currentUser.id === id) {
    return next(); // Permitir si es admin o está editando su propio usuario
  }

  return res.status(403).json({ message: 'No tienes permiso para editar este usuario' });
};