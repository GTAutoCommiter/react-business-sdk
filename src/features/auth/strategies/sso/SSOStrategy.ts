import { HttpClient } from '../../../../core/http/types';
import { AuthResult, AuthStrategy, LoginParams } from '../../types';
import { AuthStrategyConfig } from '../../../../core/config/SDKConfig';

export class SSOStrategy implements AuthStrategy {
  private config: AuthStrategyConfig;

  constructor(private httpClient: HttpClient, config?: AuthStrategyConfig) {
    this.config = config || { type: 'sso' };
  }

  async login(params: LoginParams): Promise<AuthResult> {
    const url = this.config.loginUrl || '/api/auth/sso/login';
    return this.httpClient.post<AuthResult>(url, params);
  }

  async logout(): Promise<void> {
    const url = this.config.logoutUrl || '/api/auth/logout';
    await this.httpClient.post(url);
  }

  async refreshToken(): Promise<string> {
    const url = this.config.refreshTokenUrl || '/api/auth/refresh';
    const res = await this.httpClient.post<{ token: string }>(url);
    return res.token;
  }
}
