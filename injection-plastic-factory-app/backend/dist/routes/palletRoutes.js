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
router.get('/', palletController_1.getPallets);
router.get('/:id', palletController_1.getPalletById);
router.patch('/:id/status', (0, authMiddleware_1.authorizeRole)(['manager', 'production_leader', 'quality_inspector']), palletController_1.updatePalletStatus);
router.post('/:id/quality-check', (0, authMiddleware_1.authorizeRole)(['quality_inspector']), palletController_1.performQualityCheck);
exports.default = router;
