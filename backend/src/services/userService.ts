import bcrypt from 'bcrypt';
import mongoose from '../config/mongoose';
import UserRoles from '../enum/userRoles';
import User,{ IUser } from '../models/User';


interface IUserFilter {
  name?: string;
  email?: string;
  role?: string;
  deleted?: string;
}

export const searchUsers = async (filters: IUserFilter) => {
  const query: any = {};
  
  if (filters.name) {
    query.name = { $regex: filters.name, $options: 'i' };
  }
  if (filters.email) {
    query.email = { $regex: filters.email, $options: 'i' };
  }
  if (filters.role) {
    query.role = filters.role;
  }
  if (filters.deleted === 'true') {    
    return await User.find({ ...query, deletedAt: { $ne: null } });
  }
  return await findUserActive(query);
}

export const findUserActive = async (filter: object) => {  //soft delete
  // Busca usuarios activos según el filtro recibido
  return await User.find({ ...filter, deletedAt: null });
};
export const findOneUserActive = async (filter: object) => { //soft delete
  // Busca usuarios según el filtro recibido
  return await User.findOne({ ...filter, deletedAt: null });
}

export const createUser = async (name: string, email: string, password: string, role: UserRoles) => {
  await validateEmailUniqueness(email);
  validatePassword(password);
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    name, 
    email, 
    password: hashedPassword,
    role: role || UserRoles.Admin
  });
  return await newUser.save();
};

export const updateUser = async (
  _id: string,
  name?: string,
  email?: string,
  password?: string,
  role?: UserRoles
) => {
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    throw new Error('ID inválido');
  }

  const user = await findOneUserActive({ _id });
  if (!user) {
    throw new Error('Usuario no encontrado');
  }
  if (email) {
    await validateEmailUniqueness(email, _id);
  }
  if (password) {
    validatePassword(password);
  }
  
  if(!user.role) user.role = UserRoles.User;
  if (role) user.role = role;
  if (name) user.name = name;
  if (email) user.email = email;
  if (password) user.password = await bcrypt.hash(password, 10);

  return await user.save();
};

const validateEmailUniqueness=async(email: string, userEditerId?:string): Promise<void> => {
    if (!email) {
      throw new Error('El email es requerido');
    }
    const existingUser = await User.findOne({ email });
    
    if ((!userEditerId &&existingUser) ||(existingUser && (existingUser._id as mongoose.Types.ObjectId).toString() !== userEditerId)) {
      throw new Error(`El email '${email}' ya está en uso.`);
    }
  }


const validatePassword = (password: string): void => { 
  if (password.length < 6) {
    throw new Error('La contraseña debe tener al menos 6 caracteres');
  }
};

export const deleteUser = async (userId: string) => {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new Error('ID inválido');
  }
  const user = await findOneUserActive({ _id: userId });
  if (!user) {
    throw new Error('Usuario no encontrado');
  }
  user.deletedAt = new Date();
  await user.save();
}

export const recoverUser = async (userId: string):Promise<void> => {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new Error('ID inválido');
  }
  const user = await User.findOne({ _id: userId, deletedAt: { $ne: null } }); // Busca solo entre usuarios eliminados
  if (!user) {
    throw new Error('Usuario no encontrado');
  }
  user.deletedAt = null;
  await user.save();
}

export const getUsers = async (): Promise<IUser[]> => {  
  return await findUserActive({});
}
export const getUserById = async (userId: string): Promise<IUser> => {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new Error('ID inválido');
  }
  const user = await findOneUserActive({ _id: userId });
  if (!user) {
    throw new Error('Usuario no encontrado');
  }
  return user;
}

