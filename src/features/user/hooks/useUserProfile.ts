import { useState, useEffect } from 'react';
import { useSDKContext } from '../../../core/context/SDKContext';
import { UserService } from '../services/userService';
import { UserProfile } from '../types';

export function useUserProfile(userId: string) {
  const { httpClient } = useSDKContext();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!userId) return;
    
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const userService = new UserService(httpClient);
        const data = await userService.getUserProfile(userId);
        setProfile(data);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProfile();
  }, [httpClient, userId]);

  return { profile, loading, error };
}
