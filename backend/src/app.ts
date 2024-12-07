import express from 'express';
import userRoutes from './routes/userRoutes';
import authRoutes from './routes/authRoutes';
import countryRoutes from './routes/countryRoutes';
import programRoutes from './routes/programRoutes';

const app = express();
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
