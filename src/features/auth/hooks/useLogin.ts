import { useAuthContext } from '../providers/AuthProvider';
import { useAsync } from '../../../shared/hooks/useAsync';
import { LoginParams } from '../types';

export function useLogin() {
  const { authService, setAuth } = useAuthContext();
  const { execute, isLoading, error } = useAsync(async (params: LoginParams) => {
    const result = await authService.login(params);
    setAuth(result.token, result.user);
    return result;
  });

  return {
    login: execute,
    isLoading,
    error,
  };
}
