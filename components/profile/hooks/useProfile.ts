import { useCallback } from 'react';
import { useUser } from '../../../services/api';
import { useStore } from '../../../store/useStore';

export function useProfile() {
  const { data: apiUser, isLoading } = useUser();
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setUser);

  const handleLogin = useCallback(() => {
    if (apiUser) {
      setUser(apiUser);
    }
  }, [apiUser, setUser]);

  const handleLogout = useCallback(() => {
    setUser(null);
  }, [setUser]);

  const invalidateUser = useCallback(() => {
    // Implement logic to refresh user data if needed
  }, []);

  return {
    user,
    apiUser,
    isLoading,
    handleLogin,
    handleLogout,
    invalidateUser,
  };
} 