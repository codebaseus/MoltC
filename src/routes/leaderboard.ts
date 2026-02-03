import { Router, Request, Response } from 'express';
import { LeaderboardService } from '../services/leaderboardService';

const router = Router();
const leaderboardService = new LeaderboardService();

// Get top agents leaderboard
router.get('/leaderboard', async (req: Request, res: Response) => {
  try {
    const { period = '7d', limit = 10 } = req.query;
    
    const validPeriods = ['24h', '7d', '30d', 'all'];
    if (!validPeriods.includes(period as string)) {
      return res.status(400).json({ 
        error: 'Invalid period. Use: 24h, 7d, 30d, or all' 
      });
    }

    const leaderboard = await leaderboardService.getTopAgents(
      period as string,
      Number(limit)
    );
    
    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});

// Get agent details
router.get('/agents/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const agent = await leaderboardService.getAgentDetails(id);
    
    if (!agent) {
      return res.status(404).json({ error: 'Agent not found' });
    }
    
    res.json(agent);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch agent details' });
  }
});

// Copy trade an agent
router.post('/agents/:id/copy', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { allocation, maxDrawdown } = req.body;

    const copyConfig = await leaderboardService.enableCopyTrading({
      targetAgentId: id,
      allocation: allocation || 0.1,
      maxDrawdown: maxDrawdown || 0.2
    });

    res.json(copyConfig);
  } catch (error) {
    res.status(500).json({ error: 'Failed to enable copy trading' });
  }
});

export { router as leaderboardRoutes };
