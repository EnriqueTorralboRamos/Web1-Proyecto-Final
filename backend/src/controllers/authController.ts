import { Request, Response } from 'express';
import * as authService from '../services/authService';

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password} = req.body;
    
    // Llamar al servicio de autenticación
    const { token } = await authService.authenticateUser(email, password);
    
    res.status(200).json({ token });
  } catch (error: any) {
    console.error(error);

    if (error.message === 'Usuario no encontrado' || error.message === 'Contraseña incorrecta') {
      res.status(401).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Error al loguear el usuario' });
    }
  }
};
