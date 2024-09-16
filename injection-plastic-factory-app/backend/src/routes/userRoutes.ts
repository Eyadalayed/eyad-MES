import express from 'express';
import { register, login, logout, getAllUsers, updateUserRole, deleteUser } from '../controllers/userController';
import { authenticateToken, isAdmin } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', authenticateToken, logout);

// Admin routes
router.get('/', authenticateToken, isAdmin, getAllUsers);
router.put('/:id/role', authenticateToken, isAdmin, updateUserRole);
router.delete('/:id', authenticateToken, isAdmin, deleteUser);

export default router;