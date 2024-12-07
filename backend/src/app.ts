import express from 'express';
import userRoutes from './routes/userRoutes';
import authRoutes from './routes/authRoutes';
import countryRoutes from './routes/countryRoutes';
import programRoutes from './routes/programRoutes';
import cors from 'cors';

const app = express();
console.log('Frontend URL:', process.env.FRONTEND_URL);
// Configurar CORS para permitir solicitudes desde el frontend
app.use(cors({
  origin: (origin, callback) => {
    console.log('Origen recibido en CORS:', origin); // Depuración
    if (!origin || origin === "http://localhost:3000") {
      callback(null, true); // Permitir el origen
    } else {
      callback(new Error('No permitido por CORS')); // Bloquear otros orígenes
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
  credentials: true, // Permitir cookies o credenciales
}));
//para debuggear
app.use((req, res, next) => {
    console.log(`Solicitud recibida en app.ts: ${req.method} ${req.url}`);
    next();
  });
  

app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/country', countryRoutes);
app.use('/api/programs',programRoutes);

export default app;
