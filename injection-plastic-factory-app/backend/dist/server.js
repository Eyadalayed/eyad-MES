"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const jobOrderRoutes_1 = __importDefault(require("./routes/jobOrderRoutes"));
const palletRoutes_1 = __importDefault(require("./routes/palletRoutes"));
const errorMiddleware_1 = require("./middlewares/errorMiddleware");
const authMiddleware_1 = require("./middlewares/authMiddleware");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Debugging middleware (remove in production)
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    console.log('Headers:', req.headers);
    console.log('Body:', req.body);
    next();
});
// Routes that don't require authentication
app.use('/api/users', userRoutes_1.default);
// Authentication middleware
app.use(authMiddleware_1.authenticateToken);
// Routes that require authentication
app.use('/api/job-orders', jobOrderRoutes_1.default);
app.use('/api/pallets', palletRoutes_1.default);
// Health check route
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'Server is running' });
});
// Error handling middleware
app.use(errorMiddleware_1.errorHandler);
// 404 handler
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
exports.default = app;
