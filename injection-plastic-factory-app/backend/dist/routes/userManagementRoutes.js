"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userManagementController_1 = require("../controllers/userManagementController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const roles_1 = require("../utils/roles");
const router = express_1.default.Router();
router.get('/', authMiddleware_1.authenticateToken, (0, authMiddleware_1.authorizeRole)([roles_1.USER_ROLES.MANAGER]), userManagementController_1.getAllUsers);
router.patch('/:id/role', authMiddleware_1.authenticateToken, (0, authMiddleware_1.authorizeRole)([roles_1.USER_ROLES.MANAGER]), userManagementController_1.updateUserRole);
router.post('/', authMiddleware_1.authenticateToken, (0, authMiddleware_1.authorizeRole)([roles_1.USER_ROLES.MANAGER]), userManagementController_1.createUser);
router.delete('/:id', authMiddleware_1.authenticateToken, (0, authMiddleware_1.authorizeRole)([roles_1.USER_ROLES.MANAGER]), userManagementController_1.deleteUser);
exports.default = router;
