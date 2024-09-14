"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const palletController_1 = require("../controllers/palletController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = express_1.default.Router();
router.post('/', (0, authMiddleware_1.authorizeRole)(['manager', 'production_leader']), palletController_1.createPallet);
router.get('/', (0, authMiddleware_1.authorizeRole)(['manager', 'production_leader', 'quality_inspector']), palletController_1.getPallets);
router.get('/:id', (0, authMiddleware_1.authorizeRole)(['manager', 'production_leader', 'quality_inspector']), palletController_1.getPalletById);
router.put('/:id', (0, authMiddleware_1.authorizeRole)(['manager', 'production_leader']), palletController_1.updatePallet);
router.delete('/:id', (0, authMiddleware_1.authorizeRole)(['manager']), palletController_1.deletePallet);
router.post('/scan', (0, authMiddleware_1.authorizeRole)(['quality_inspector', 'forklift_driver']), palletController_1.scanPallet);
router.get('/job-order/:jobOrderId', (0, authMiddleware_1.authorizeRole)(['manager', 'production_leader']), palletController_1.getPalletsByJobOrder);
exports.default = router;
