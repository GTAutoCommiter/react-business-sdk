import { useAuthContext } from '../providers/AuthProvider';
import { useAsync } from '../../../shared/hooks/useAsync';

export function useLogout() {
  const { authService, clearAuth } = useAuthContext();
  const { execute, isLoading, error } = useAsync(async () => {
    await authService.logout();
    clearAuth();
  });

  return {
    logout: execute,
    isLoading,
    error,
  };
}
