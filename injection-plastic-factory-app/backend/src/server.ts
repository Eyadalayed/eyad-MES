import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';
import jobOrderRoutes from './routes/jobOrderRoutes';
import palletRoutes from './routes/palletRoutes';
import { errorHandler } from './middlewares/errorMiddleware';
import { authenticateToken } from './middlewares/authMiddleware';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes that don't require authentication
app.use('/api/users', userRoutes);

// Authentication middleware
app.use(authenticateToken);

// Routes that require authentication
app.use('/api/job-orders', jobOrderRoutes);
app.use('/api/pallets', palletRoutes);

// Error handling middleware
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;