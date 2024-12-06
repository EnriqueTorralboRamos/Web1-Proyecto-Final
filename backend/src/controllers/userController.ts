import { Request, Response } from 'express';
import * as userService from '../services/userService';

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;
    const newUser = await userService.createUser(name, email, password,role);
    res.status(201).json(newUser);
  } catch (error: any) {
    console.error(error);
    if (error.message.startsWith('El email')) {
      res.status(400).json({ message: error.message });
    } else{
      res.status(500).json({ message: error.message || 'Error al crear el usuario' });
    }
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { _id, name, email, password, role} = req.body; //obtiene los datos del body
    const updatedUser = await userService.updateUser(_id, name, email, password, role);
    res.status(200).json(updatedUser);
  } catch (error: any) {
    console.error(error);
    if (error.message === 'ID inválido' || error.message.startsWith('El email') || error.message.startsWith('La contraseña')) {
      res.status(400).json({ message: error.message });
    } else if (error.message === 'Usuario no encontrado') {
      res.status(404).json({ message: error.message });
    }else if (error.message.startsWith('El email')) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Error al actualizar el usuario' });
    }
  }
};
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;  //obtiene el id del url
    await userService.deleteUser(id);
    res.sendStatus(204);
  } catch (error: any) {
    console.error(error);
    if (error.message === 'ID inválido') {
      res.status(400).json({ message: error.message });
    } else if (error.message === 'Usuario no encontrado') {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Error al eliminar el usuario' });
    }
  }
}
