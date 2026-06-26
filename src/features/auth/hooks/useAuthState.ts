import { useAuthContext } from '../providers/AuthProvider';

export function useAuthState() {
  const { isAuthenticated, user, token, isLoading } = useAuthContext();
  return { isAuthenticated, user, token, isLoading };
}
