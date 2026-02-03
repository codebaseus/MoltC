import express from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import { authRoutes } from './routes/auth';
import { tradeRoutes } from './routes/trade';
import { leaderboardRoutes } from './routes/leaderboard';
import { errorHandler } from './utils/errorHandler';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API Routes
app.use('/api/v1/agent/auth', authRoutes);
app.use('/api/v1', tradeRoutes);
app.use('/api/v1', leaderboardRoutes);

// Serve landing page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Moltc server running on port ${PORT}`);
  console.log(`📊 Dashboard: http://localhost:${PORT}`);
});

export default app;
