import express from 'express';
import { getDashboardData } from '../controllers/dashboardController';
import { authorizeRole } from '../middlewares/authMiddleware';

const router = express.Router();

router.get('/', authorizeRole(['manager', 'admin']), getDashboardData);

export default router;