import { Router } from 'express';
import { login, register } from '../controllers/authController';
import { authenticateToken, isAdmin } from '../middleware/authMiddleware';


const router = Router();

// Ruta para login
router.post('/login', login);
//ruta para verificar si el usuario es admin
router.get('/check-admin',authenticateToken, isAdmin, (req, res) => {
    res.json({ role: req.user?.role });

});
//ruta para registrar
router.post('/register', register);
export default router;