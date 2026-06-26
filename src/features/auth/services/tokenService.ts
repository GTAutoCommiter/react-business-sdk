import { AuthStrategy } from '../types';

export class TokenService {
  constructor(private strategy: AuthStrategy) {}

  async refreshToken() {
    return this.strategy.refreshToken();
  }
}
