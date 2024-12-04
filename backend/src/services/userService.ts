import bcrypt from 'bcrypt';
import User from '../models/User';
import mongoose from 'mongoose';

export const createUser = async (name: string, email: string, password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ name, email, password: hashedPassword });
  return await newUser.save();
};

export const updateUser = async (
  _id: string,
  name?: string,
  email?: string,
  password?: string
) => {
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    throw new Error('ID inválido');
  }

  const user = await User.findById(_id);
  if (!user) {
    throw new Error('Usuario no encontrado');
  }

  if (name) user.name = name;
  if (email) user.email = email;
  if (password) user.password = await bcrypt.hash(password, 10);

  return await user.save();
};
