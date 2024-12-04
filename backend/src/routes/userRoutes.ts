import { Router } from 'express';
import { createUser, updateUser } from '../controllers/userController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();

router.route('/')
.post(createUser)
.put( authenticateToken, updateUser);

export default router;
