import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User';

export const authenticateUser = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Usuario no encontrado');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Contraseña incorrecta');
  }

  // Generar el token
  const payload = { user: { id: user.id, email: user.email } };
  const token = jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: '1h' });

  return { token, user };
};
