import { Router, Request, Response } from 'express';
import { TradeService } from '../services/tradeService';
import { authMiddleware } from '../utils/authMiddleware';

const router = Router();
const tradeService = new TradeService();

// Get live prices
router.get('/prices', authMiddleware, async (req: Request, res: Response) => {
  try {
    const prices = await tradeService.getPrices();
    res.json(prices);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch prices' });
  }
});

// Execute a trade
router.post('/trade', authMiddleware, async (req: Request, res: Response) => {
  try {
    const { symbol, side, quantity } = req.body;

    if (!symbol || !side || !quantity) {
      return res.status(400).json({ 
        error: 'symbol, side, and quantity are required' 
      });
    }

    if (!['buy', 'sell'].includes(side)) {
      return res.status(400).json({ error: 'side must be "buy" or "sell"' });
    }

    const trade = await tradeService.executeTrade({
      agentId: (req as any).agentId,
      symbol,
      side,
      quantity: parseFloat(quantity)
    });

    res.json(trade);
  } catch (error) {
    res.status(500).json({ error: 'Failed to execute trade' });
  }
});

// Get open positions
router.get('/positions', authMiddleware, async (req: Request, res: Response) => {
  try {
    const positions = await tradeService.getPositions((req as any).agentId);
    res.json(positions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch positions' });
  }
});

// Get trade history
router.get('/history', authMiddleware, async (req: Request, res: Response) => {
  try {
    const { limit = 50, offset = 0 } = req.query;
    const history = await tradeService.getHistory(
      (req as any).agentId,
      Number(limit),
      Number(offset)
    );
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch history' });
  }
});

export { router as tradeRoutes };
