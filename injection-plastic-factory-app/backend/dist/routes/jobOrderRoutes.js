"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jobOrderController_1 = require("../controllers/jobOrderController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = express_1.default.Router();
router.post('/', (0, authMiddleware_1.authorizeRole)(['manager', 'admin']), jobOrderController_1.createJobOrder);
router.get('/', jobOrderController_1.getJobOrders);
router.get('/:id', jobOrderController_1.getJobOrderById);
router.patch('/:id/status', (0, authMiddleware_1.authorizeRole)(['manager', 'admin']), jobOrderController_1.updateJobOrderStatus);
router.get('/:id/progress', jobOrderController_1.getJobOrderProgress);
exports.default = router;
