import { Router } from 'express';
import { login } from '../controllers/authControler';


const router = Router();

// Ruta para login
router.post('/login', login);
export default router;