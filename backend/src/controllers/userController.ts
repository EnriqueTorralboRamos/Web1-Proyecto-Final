import { Request, Response } from 'express';
import User from '../models/User';
import bcrypt from 'bcrypt';

export const createUser = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, hashedPassword });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el usuario' });
  }
};
