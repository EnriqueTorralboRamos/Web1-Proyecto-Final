import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

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
