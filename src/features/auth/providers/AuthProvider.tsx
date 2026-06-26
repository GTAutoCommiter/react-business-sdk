import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { AuthState, UserProfile, AuthStrategy } from '../types';
import { storage } from '../../../shared/utils/storage';
import { AUTH_CONSTANTS } from '../constants';
import { useSDKContext } from '../../../core/context/SDKContext';
import { SSOStrategy } from '../strategies/sso';
import { createAuthService } from '../services/authService';

interface AuthContextValue extends AuthState {
  setAuth: (token: string, user: UserProfile) => void;
  clearAuth: () => void;
  authService: ReturnType<typeof createAuthService>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { httpClient, config } = useSDKContext();
  
  // 初始化策略
  const strategy: AuthStrategy = useMemo(() => {
    if (config.auth.type === 'sso') {
      return new SSOStrategy(httpClient, config.auth);
    }
    // TODO: 支持其他策略
    return new SSOStrategy(httpClient, config.auth);
  }, [config.auth, httpClient]);

  const authService = useMemo(() => createAuthService(strategy), [strategy]);

  const [authState, setAuthState] = useState<AuthState>(() => {
    const token = storage.get<string>(AUTH_CONSTANTS.TOKEN_KEY);
    // 这里简单处理，实际应解析 token 还原用户信息或通过 API 获取
    return {
      isAuthenticated: !!token,
      token: token || null,
      user: null,
      isLoading: false,
    };
  });

  const setAuth = (token: string, user: UserProfile) => {
    storage.set(AUTH_CONSTANTS.TOKEN_KEY, token);
    setAuthState({
      isAuthenticated: true,
      token,
      user,
      isLoading: false,
    });
  };

  const clearAuth = () => {
    storage.remove(AUTH_CONSTANTS.TOKEN_KEY);
    setAuthState({
      isAuthenticated: false,
      token: null,
      user: null,
      isLoading: false,
    });
  };

  return (
    <AuthContext.Provider value={{ ...authState, setAuth, clearAuth, authService }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuthContext must be used within AuthProvider');
  return ctx;
}
