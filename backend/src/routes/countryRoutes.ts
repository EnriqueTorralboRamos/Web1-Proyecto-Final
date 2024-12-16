import { Router } from 'express';
import { 
    createCountry, 
    updateCountry, 
    deleteCountry, 
    getCountry, 
    getCountries, 
    searchCountries
} from '../controllers/countryController';
import { authenticateToken, isAdmin } from '../middleware/authMiddleware';

const router = Router();

// Rutas para países
router.route('/search')
.get(authenticateToken, searchCountries); // Permitir que cualquier usuario vea los países (autenticado)

router.route('/')
    .get(authenticateToken, getCountries) // Listar todos los países (autenticado)
    .post(authenticateToken, isAdmin, createCountry); // Crear un nuevo país (solo admin)

router.route('/:id')
    .get(authenticateToken, getCountry) // Obtener un país por su ID (autenticado)
    .put(authenticateToken, isAdmin, updateCountry) // Actualizar un país (solo admin)
    .delete(authenticateToken, isAdmin, deleteCountry); // Eliminar un país (solo admin)

export default router;
