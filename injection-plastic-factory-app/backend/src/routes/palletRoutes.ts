import express from 'express';
import { createPallet, getPallets, getPalletById, updatePalletStatus, performQualityCheck } from '../controllers/palletController';
import { authorizeRole } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/', authorizeRole(['manager', 'production_leader', 'admin']), createPallet);
router.get('/', getPallets);
router.get('/:id', getPalletById);
router.patch('/:id/status', authorizeRole(['manager', 'production_leader', 'quality_inspector', 'admin']), updatePalletStatus);
router.post('/:id/quality-check', authorizeRole(['quality_inspector', 'admin']), performQualityCheck);

export default router;