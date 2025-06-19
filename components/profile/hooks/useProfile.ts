import { useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import { useUser } from '../../../services/api';
import { useStore } from '../../../store/useStore';

export function useProfile() {
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setUser);
  const { data: apiUser, isLoading } = useUser();
  const queryClient = useQueryClient();

  const handleLogin = useCallback(() => {
    if (apiUser) setUser({
      id: apiUser.id,
      name: apiUser.name,
      email: apiUser.email,
      avatar: apiUser.avatar,
    });
  }, [apiUser, setUser]);

  const handleLogout = useCallback(() => {
    setUser(null);
  }, [setUser]);

  const invalidateUser = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ['user'] });
  }, [queryClient]);

  return {
    user,
    apiUser,
    isLoading,
    handleLogin,
    handleLogout,
    invalidateUser,
  };
} 