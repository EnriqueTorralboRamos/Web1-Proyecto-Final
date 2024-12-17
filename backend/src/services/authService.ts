import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import UserRoles from '../enum/userRoles';
import { createUser, findOneUserActive } from './userService';

export const authenticateUser = async (email: string, password: string
) => {
  const user = await findOneUserActive({ email });
  if (!user) {   
    throw new Error('Usuario no encontrado');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Contraseña incorrecta');
  }
  if(!user.role) {
    user.role = UserRoles.User;
  }

// Generar el token
const payload = { user: { id: user.id, email: user.email,role:user.role} };
  const token = jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: '1h' });

  return { token, user };
};

export const registerUser = async (name: string, email: string, password: string, role: UserRoles) => {
  return await createUser(name, email, password, UserRoles.User);

};
