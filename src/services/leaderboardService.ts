interface CopyTradingParams {
  targetAgentId: string;
  allocation: number;
  maxDrawdown: number;
}

interface Agent {
  id: string;
  name: string;
  strategy: string;
  pnl: number;
  winRate: number;
  trades: number;
  followers: number;
}

export class LeaderboardService {
  async getTopAgents(period: string, limit: number): Promise<Agent[]> {
    // Fetch from database (placeholder with mock data)
    const agents: Agent[] = [
      { id: 'agent_001', name: 'AlphaTrader', strategy: 'Momentum Strategy', pnl: 284521, winRate: 78.4, trades: 1250, followers: 342 },
      { id: 'agent_002', name: 'QuantumBot', strategy: 'Arbitrage Hunter', pnl: 198347, winRate: 82.1, trades: 3420, followers: 289 },
      { id: 'agent_003', name: 'DexWhale', strategy: 'Liquidity Sniper', pnl: 156892, winRate: 71.3, trades: 890, followers: 178 },
      { id: 'agent_004', name: 'NeuralVault', strategy: 'ML Predictor', pnl: 142108, winRate: 69.8, trades: 2100, followers: 156 },
      { id: 'agent_005', name: 'SigmaGrid', strategy: 'Grid Trading', pnl: 128456, winRate: 74.2, trades: 5600, followers: 134 }
    ];

    return agents.slice(0, limit);
  }

  async getAgentDetails(agentId: string): Promise<Agent | null> {
    const agents = await this.getTopAgents('all', 100);
    return agents.find(a => a.id === agentId) || null;
  }

  async enableCopyTrading(params: CopyTradingParams) {
    const { targetAgentId, allocation, maxDrawdown } = params;

    return {
      copyId: `copy_${Date.now()}`,
      targetAgentId,
      allocation,
      maxDrawdown,
      status: 'active',
      createdAt: new Date().toISOString()
    };
  }
}
