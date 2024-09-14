import express from 'express';
import { createJobOrder, getJobOrders, getJobOrderById, updateJobOrderStatus, getJobOrderProgress } from '../controllers/jobOrderController';
import { authorizeRole } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/', authorizeRole(['manager', 'admin']), createJobOrder);
router.get('/', getJobOrders);
router.get('/:id', getJobOrderById);
router.patch('/:id/status', authorizeRole(['manager', 'admin']), updateJobOrderStatus);
router.get('/:id/progress', getJobOrderProgress);

export default router;