import { Router } from 'express';
import { createUser, updateUser } from '../controllers/userController';
import { authenticateToken, canEditUser} from '../middleware/authMiddleware';

const router = Router();

router.route('/')
.post(createUser)
.put( authenticateToken,canEditUser, updateUser);

export default router;
