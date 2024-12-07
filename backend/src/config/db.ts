import mongoose from '../config/mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGOOSE_URL as string, {
    });
    console.log('MongoDB conectado...');
  } catch (error) {
    console.error('Error conectando a MongoDB', error);
    process.exit(1);
  }
};

export default connectDB;
