import mongoose, { Schema, Document } from 'mongoose';
import UserRoles from '../enum/userRoles';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: UserRoles;
  deletedAt?: Date|null;

}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: Object.values(UserRoles), default: UserRoles.User },
  deletedAt: { type: Date, default: null } // Campo para soft delete
});

export default mongoose.model<IUser>('User', UserSchema);
