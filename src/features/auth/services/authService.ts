import { AuthStrategy, LoginParams } from '../types';

export function createAuthService(strategy: AuthStrategy) {
  return {
    login: (params: LoginParams) => strategy.login(params),
    logout: () => strategy.logout(),
  };
}
