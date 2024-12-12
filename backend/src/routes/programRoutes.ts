import { Router } from 'express';
import {
  createProgram,
  getPrograms,
  getProgramById,
  updateProgram,
  deleteProgram,
  addParticipant,
  removeParticipant,
  searchPrograms,
  getByParticipant
} from '../controllers/programController';
import { authenticateToken, isAdmin, canAccessUser } from '../middleware/authMiddleware';

const router = Router();

router.route('/search')
.get(authenticateToken, searchPrograms); // Permitir que cualquier usuario vea los programas

router.route('/participants')
.post(authenticateToken, isAdmin, addParticipant) // Solo admin puede añadir participantes
.delete(authenticateToken, isAdmin, removeParticipant); // Admin puede eliminar participantes

router.route('/participants/:id')
.get(authenticateToken, canAccessUser, getByParticipant ); // Permitir que cualquier usuario vea los programas

router.route('/:id')
.get(authenticateToken, getProgramById) // Permitir que cualquier usuario vea detalles del programa
.put(authenticateToken, isAdmin, updateProgram) // Solo admin puede actualizar programas
.delete(authenticateToken, isAdmin, deleteProgram); // Solo admin puede eliminar programas

router.route('/')
  .get(authenticateToken, getPrograms) // Permitir que cualquier usuario vea los programas
  .post(authenticateToken, isAdmin, createProgram); // Solo admin puede crear programas

export default router;
