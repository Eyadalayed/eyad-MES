"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDashboardData = void 0;
const database_1 = __importDefault(require("../database"));
const getDashboardData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [totalJobOrders] = yield database_1.default.query('SELECT COUNT(*) as count FROM job_orders');
        const [completedJobOrders] = yield database_1.default.query('SELECT COUNT(*) as count FROM job_orders WHERE status = "Completed"');
        const [totalPallets] = yield database_1.default.query('SELECT COUNT(*) as count FROM pallets');
        const [palletsInWarehouse] = yield database_1.default.query('SELECT COUNT(*) as count FROM pallets WHERE status = "In Warehouse"');
        const [qualityCheckPasses] = yield database_1.default.query('SELECT COUNT(*) as count FROM pallets WHERE quality_check_result = "Pass"');
        const dashboardData = {
            totalJobOrders: totalJobOrders[0].count,
            completedJobOrders: completedJobOrders[0].count,
            totalPallets: totalPallets[0].count,
            palletsInWarehouse: palletsInWarehouse[0].count,
            qualityCheckPassRate: (qualityCheckPasses[0].count / totalPallets[0].count) * 100
        };
        res.json(dashboardData);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching dashboard data', error });
    }
});
exports.getDashboardData = getDashboardData;
