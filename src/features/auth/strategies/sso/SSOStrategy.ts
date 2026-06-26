import { HttpClient } from '../../../../core/http/types';
import { AuthResult, AuthStrategy, LoginParams } from '../../types';

export class SSOStrategy implements AuthStrategy {
  constructor(private httpClient: HttpClient) {}

  async login(params: LoginParams): Promise<AuthResult> {
    // 假设的 SSO 登录 API
    return this.httpClient.post<AuthResult>('/api/auth/sso/login', params);
  }

  async logout(): Promise<void> {
    await this.httpClient.post('/api/auth/logout');
  }

  async refreshToken(): Promise<string> {
    const res = await this.httpClient.post<{ token: string }>('/api/auth/refresh');
    return res.token;
  }
}
