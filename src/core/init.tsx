import React from 'react';
import { SDKConfig } from './config/SDKConfig';
import { createConfig } from './config/createConfig';
import { createHttpClient } from './http/client';
import { SDKProvider } from './provider/SDKProvider';

export function createSDK(rawConfig: SDKConfig) {
  const config = createConfig(rawConfig);
  const httpClient = createHttpClient(config);

  const contextValue = {
    config,
    httpClient,
  };

  const Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
      <SDKProvider value={contextValue}>
        {children}
      </SDKProvider>
    );
  };

  return {
    Provider,
    config,
    httpClient,
  };
}
