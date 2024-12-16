import { Router } from 'express';
import { createUser, deleteUser, getUserById, getUsers, recoverUser, updateUser,searchUsers } from '../controllers/userController';
import { authenticateToken, canAccessUser, isAdmin} from '../middleware/authMiddleware';


const router = Router();

router.route('/search')
.get( authenticateToken,isAdmin, searchUsers); // solo admin puede ver todos los usuarios

router.route('/')
.get( authenticateToken, isAdmin, getUsers)
.post(createUser)
.put( authenticateToken,canAccessUser, updateUser);

router.route('/:id')
.get( authenticateToken,canAccessUser, getUserById)
.delete( authenticateToken,isAdmin, deleteUser);//Solo un admin puede eliminar usuarios

router.route('/:id/recover')
.put( authenticateToken,isAdmin, recoverUser);//Solo un admin puede recuperar usuarios
export default router;
