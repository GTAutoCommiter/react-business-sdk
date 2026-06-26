import { SDKConfig, defaultConfig } from './SDKConfig';

export function createConfig(config: SDKConfig): SDKConfig {
  return {
    ...defaultConfig,
    ...config,
    headers: {
      ...defaultConfig.headers,
      ...config.headers,
    },
  };
}
