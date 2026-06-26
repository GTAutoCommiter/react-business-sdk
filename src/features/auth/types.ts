export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  [key: string]: any;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: UserProfile | null;
  token: string | null;
  isLoading: boolean;
}

export interface LoginParams {
  username?: string;
  password?: string;
  code?: string;
  [key: string]: any;
}

export interface AuthResult {
  token: string;
  refreshToken?: string;
  user: UserProfile;
}

export interface AuthStrategy {
  login(params: LoginParams): Promise<AuthResult>;
  logout(): Promise<void>;
  refreshToken(): Promise<string>;
  handleCallback?(callbackUrl: string): Promise<AuthResult>;
}
