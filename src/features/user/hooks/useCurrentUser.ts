import { useState, useEffect } from 'react';
import { useSDKContext } from '../../../core/context/SDKContext';
import { UserService } from '../services/userService';
import { UserProfile } from '../types';

export function useCurrentUser() {
  const { httpClient } = useSDKContext();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const userService = new UserService(httpClient);
        const data = await userService.getCurrentUser();
        setUser(data);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUser();
  }, [httpClient]);

  return { user, loading, error };
}
