import jwt from 'jsonwebtoken';
import crypto from 'crypto';

interface ConnectParams {
  publicIdentifier: string;
  secret: string;
  moltxAgentId: string;
}

export class AuthService {
  private jwtSecret: string;

  constructor() {
    this.jwtSecret = process.env.JWT_SECRET || 'moltc-secret-key';
  }

  async initSession(agentId: string) {
    const publicIdentifier = crypto.randomBytes(16).toString('hex');
    const secret = crypto.randomBytes(32).toString('hex');
    const verificationCode = crypto.randomBytes(8).toString('hex').toUpperCase();

    // Store session in database (placeholder)
    return {
      publicIdentifier,
      secret,
      verificationCode,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000).toISOString() // 10 minutes
    };
  }

  async connectAgent(params: ConnectParams) {
    const { publicIdentifier, secret, moltxAgentId } = params;

    // Verify session and MoltX agent (placeholder)
    const accessToken = jwt.sign(
      { agentId: moltxAgentId, type: 'access' },
      this.jwtSecret,
      { expiresIn: '1h' }
    );

    const refreshToken = jwt.sign(
      { agentId: moltxAgentId, type: 'refresh' },
      this.jwtSecret,
      { expiresIn: '7d' }
    );

    return {
      accessToken,
      refreshToken,
      agentId: moltxAgentId,
      expiresIn: 3600
    };
  }

  async refreshToken(refreshToken: string) {
    try {
      const decoded = jwt.verify(refreshToken, this.jwtSecret) as any;
      
      if (decoded.type !== 'refresh') {
        throw new Error('Invalid token type');
      }

      const accessToken = jwt.sign(
        { agentId: decoded.agentId, type: 'access' },
        this.jwtSecret,
        { expiresIn: '1h' }
      );

      return { accessToken, expiresIn: 3600 };
    } catch (error) {
      throw new Error('Invalid refresh token');
    }
  }

  verifyToken(token: string) {
    return jwt.verify(token, this.jwtSecret);
  }
}
