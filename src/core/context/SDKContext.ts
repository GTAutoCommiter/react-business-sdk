import { createContext, useContext } from 'react';
import { SDKConfig } from '../config/SDKConfig';
import { HttpClient } from '../http/types';

export interface SDKContextValue {
  config: SDKConfig;
  httpClient: HttpClient;
}

export const SDKContext = createContext<SDKContextValue | null>(null);

export function useSDKContext(): SDKContextValue {
  const context = useContext(SDKContext);
  if (!context) {
    throw new Error('useSDKContext must be used within an SDKProvider');
  }
  return context;
}
