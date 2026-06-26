import { useState, useEffect } from 'react';
import { useSDKContext } from '../../../core/context/SDKContext';
import { FeatureFlagService } from '../services/featureFlagService';

export function useFeatureFlag(flagKey: string) {
  const { httpClient } = useSDKContext();
  const [enabled, setEnabled] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkFlag = async () => {
      setLoading(true);
      try {
        const service = new FeatureFlagService(httpClient);
        const flags = await service.getFeatureFlags();
        const flag = flags.find(f => f.key === flagKey);
        setEnabled(flag ? flag.enabled : false);
      } catch {
        setEnabled(false);
      } finally {
        setLoading(false);
      }
    };
    checkFlag();
  }, [httpClient, flagKey]);

  return { enabled, loading };
}
