import connectDB from './config/db';
import dotenv from 'dotenv';
import app from './app';

dotenv.config();
connectDB();


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
