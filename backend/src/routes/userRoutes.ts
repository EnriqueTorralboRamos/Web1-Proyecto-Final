import { Router } from 'express';
import { createUser, deleteUser, recoverUser, updateUser } from '../controllers/userController';
import { authenticateToken, canEditUser, isAdmin} from '../middleware/authMiddleware';

const router = Router();

router.route('/')
.post(createUser)
.put( authenticateToken,canEditUser, updateUser);

router.route('/:id')
.delete( authenticateToken,isAdmin, deleteUser);//Solo un admin puede eliminar usuarios

router.route('/:id/recover')
.put( authenticateToken,isAdmin, recoverUser);//Solo un admin puede recuperar usuarios
export default router;
