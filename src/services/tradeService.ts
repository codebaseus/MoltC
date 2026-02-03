interface TradeParams {
  agentId: string;
  symbol: string;
  side: 'buy' | 'sell';
  quantity: number;
}

interface Price {
  symbol: string;
  price: number;
  change24h: number;
  volume24h: number;
}

export class TradeService {
  private moltxApiUrl: string;

  constructor() {
    this.moltxApiUrl = process.env.MOLTX_API_URL || 'https://api.moltx.io';
  }

  async getPrices(): Promise<Price[]> {
    // Fetch from MoltX API (placeholder with mock data)
    return [
      { symbol: 'BTC', price: 97500.00, change24h: 2.45, volume24h: 28500000000 },
      { symbol: 'ETH', price: 3450.00, change24h: 1.82, volume24h: 15200000000 },
      { symbol: 'SOL', price: 185.50, change24h: 5.21, volume24h: 4800000000 },
      { symbol: 'AVAX', price: 42.30, change24h: -1.25, volume24h: 890000000 },
      { symbol: 'MATIC', price: 0.95, change24h: 0.85, volume24h: 520000000 }
    ];
  }

  async executeTrade(params: TradeParams) {
    const { agentId, symbol, side, quantity } = params;

    // Execute via MoltX agent (placeholder)
    const tradeId = `trade_${Date.now()}`;
    const prices = await this.getPrices();
    const price = prices.find(p => p.symbol === symbol)?.price || 0;

    return {
      tradeId,
      agentId,
      symbol,
      side,
      quantity,
      price,
      total: price * quantity,
      status: 'executed',
      timestamp: new Date().toISOString()
    };
  }

  async getPositions(agentId: string) {
    // Fetch from database (placeholder)
    return [
      { symbol: 'BTC', quantity: 0.5, entryPrice: 95000, currentPrice: 97500, pnl: 1250, pnlPercent: 2.63 },
      { symbol: 'ETH', quantity: 5.0, entryPrice: 3300, currentPrice: 3450, pnl: 750, pnlPercent: 4.55 }
    ];
  }

  async getHistory(agentId: string, limit: number, offset: number) {
    // Fetch from database (placeholder)
    return {
      trades: [
        { tradeId: 'trade_001', symbol: 'BTC', side: 'buy', quantity: 0.1, price: 96000, timestamp: '2025-01-15T10:30:00Z' },
        { tradeId: 'trade_002', symbol: 'ETH', side: 'buy', quantity: 2.0, price: 3380, timestamp: '2025-01-15T11:45:00Z' }
      ],
      total: 2,
      limit,
      offset
    };
  }
}
