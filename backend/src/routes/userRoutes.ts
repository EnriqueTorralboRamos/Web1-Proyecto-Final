import { Router } from 'express';
import { createUser, deleteUser, updateUser } from '../controllers/userController';
import { authenticateToken, canEditUser, isAdmin} from '../middleware/authMiddleware';

const router = Router();

router.route('/')
.post(createUser)
.put( authenticateToken,canEditUser, updateUser);

router.route('/:id')
.delete( authenticateToken,isAdmin, deleteUser);//Solo un admin puede eliminar usuarios

export default router;
