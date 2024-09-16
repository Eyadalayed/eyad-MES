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
exports.performQualityCheck = exports.updatePalletStatus = exports.getPalletById = exports.getPallets = exports.createPallet = void 0;
const database_1 = __importDefault(require("../database"));
const qrCodeGenerator_1 = require("../utils/qrCodeGenerator");
const createPallet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { job_order_id } = req.body;
    try {
        const qrCode = yield (0, qrCodeGenerator_1.generateQRCode)(`JO${job_order_id}-${Date.now()}`);
        const [result] = yield database_1.default.query('INSERT INTO pallets (job_order_id, status, qr_code) VALUES (?, "Produced", ?)', [job_order_id, qrCode]);
        res.status(201).json({
            message: 'Pallet created successfully',
            id: result.insertId,
            qr_code: qrCode
        });
    }
    catch (error) {
        console.error('Error creating pallet:', error);
        res.status(500).json({ message: 'Error creating pallet', error: error.message });
    }
});
exports.createPallet = createPallet;
const getPallets = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [pallets] = yield database_1.default.query('SELECT * FROM pallets');
        res.json(pallets);
    }
    catch (error) {
        console.error('Error fetching pallets:', error);
        res.status(500).json({ message: 'Error fetching pallets', error: error.message });
    }
});
exports.getPallets = getPallets;
const getPalletById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const [pallets] = yield database_1.default.query('SELECT * FROM pallets WHERE id = ?', [id]);
        if (pallets.length === 0) {
            return res.status(404).json({ message: 'Pallet not found' });
        }
        res.json(pallets[0]);
    }
    catch (error) {
        console.error('Error fetching pallet:', error);
        res.status(500).json({ message: 'Error fetching pallet', error: error.message });
    }
});
exports.getPalletById = getPalletById;
const updatePalletStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { status } = req.body;
    try {
        yield database_1.default.query('UPDATE pallets SET status = ? WHERE id = ?', [status, id]);
        res.json({ message: 'Pallet status updated successfully' });
    }
    catch (error) {
        console.error('Error updating pallet status:', error);
        res.status(500).json({ message: 'Error updating pallet status', error: error.message });
    }
});
exports.updatePalletStatus = updatePalletStatus;
const performQualityCheck = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { result, notes } = req.body;
    try {
        yield database_1.default.query('UPDATE pallets SET status = ?, quality_check_result = ?, quality_check_notes = ? WHERE id = ?', [result === 'Pass' ? 'Quality Checked' : 'Failed Quality Check', result, notes, id]);
        res.json({ message: 'Quality check performed successfully' });
    }
    catch (error) {
        console.error('Error performing quality check:', error);
        res.status(500).json({ message: 'Error performing quality check', error: error.message });
    }
});
exports.performQualityCheck = performQualityCheck;
