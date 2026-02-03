import { Router, Request, Response } from 'express';
import { AuthService } from '../services/authService';

const router = Router();
const authService = new AuthService();

// Initialize authentication session
router.post('/init', async (req: Request, res: Response) => {
  try {
    const { agentId } = req.body;
    
    if (!agentId) {
      return res.status(400).json({ error: 'agentId is required' });
    }

    const session = await authService.initSession(agentId);
    res.json(session);
  } catch (error) {
    res.status(500).json({ error: 'Failed to initialize auth session' });
  }
});

// Complete agent connection
router.post('/connect', async (req: Request, res: Response) => {
  try {
    const { publicIdentifier, secret, moltxAgentId } = req.body;

    if (!publicIdentifier || !secret || !moltxAgentId) {
      return res.status(400).json({ 
        error: 'publicIdentifier, secret, and moltxAgentId are required' 
      });
    }

    const connection = await authService.connectAgent({
      publicIdentifier,
      secret,
      moltxAgentId
    });

    res.json(connection);
  } catch (error) {
    res.status(500).json({ error: 'Failed to connect agent' });
  }
});

// Refresh JWT token
router.post('/refresh', async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;
    const tokens = await authService.refreshToken(refreshToken);
    res.json(tokens);
  } catch (error) {
    res.status(401).json({ error: 'Invalid refresh token' });
  }
});

export { router as authRoutes };
