import { Request, Response } from 'express';
import User from '../models/User';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

export const createUser = async (req: Request, res: Response) => {
  try {
    
    const { name, email, password } = req.body;    
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email,password: hashedPassword });
    console.log(newUser);
    
    await newUser.save();
    
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear el usuario' });
  }
};
export const updateUser = async (req: Request, res: Response) => {
  try {
    console.log('Cuerpo de la solicitud:', req.body);
    
    const { _id, name, email, password } = req.body;
    // const userIdFromToken = req.user?.id;
    // if (!userIdFromToken) {
    //   res.status(401).json({ message: 'Usuario no autorizado' });
    //   return 
    // }
    const objectId = mongoose.Types.ObjectId.isValid(_id) ? _id : null;
    if (!objectId) {      
      res.status(400).json({ message: 'ID inválido' });
      return 
    }
    const user = await User.findById(objectId);
    if (!user) {
      res.status(404).json({ message: 'Usuario no encontrado' });
      return 
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (password) user.password = await bcrypt.hash(password, 10);

    await user.save();

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar el usuario' });
  }
};
