export interface AuthStrategyConfig {
  type: 'sso' | 'oauth' | 'oidc' | 'saml';
  clientId?: string;
  issuer?: string;
  redirectUri?: string;
  loginUrl?: string;
  logoutUrl?: string;
  refreshTokenUrl?: string;
}

export interface SDKConfig {
  baseURL: string;
  timeout?: number;
  auth: AuthStrategyConfig;
  tenantId?: string;
  headers?: Record<string, string>;
}

export const defaultConfig: Partial<SDKConfig> = {
  timeout: 10000,
};
