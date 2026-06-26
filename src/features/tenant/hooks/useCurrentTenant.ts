import { useState, useEffect } from 'react';
import { useSDKContext } from '../../../core/context/SDKContext';
import { TenantService } from '../services/tenantService';
import { Tenant } from '../types';

export function useCurrentTenant() {
  const { httpClient } = useSDKContext();
  const [tenant, setTenant] = useState<Tenant | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchTenant = async () => {
      setLoading(true);
      try {
        const service = new TenantService(httpClient);
        const data = await service.getCurrentTenant();
        setTenant(data);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTenant();
  }, [httpClient]);

  return { tenant, loading, error };
}
