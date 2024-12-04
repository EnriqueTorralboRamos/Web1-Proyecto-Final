import { Router } from 'express';
import { login } from '../controllers/authController';


const router = Router();

// Ruta para login
router.post('/login', login);
export default router;