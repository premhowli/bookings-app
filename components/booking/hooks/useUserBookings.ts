import { useRouter } from 'expo-router';
import { useMemo } from 'react';
import { useBookings, useProperties } from '../../../services/api';
import { useStore } from '../../../store/useStore';
import { Property } from '../../../types';

export function useUserBookings() {
  const router = useRouter();
  const user = useStore((state) => state.user);
  const { data: bookings, isLoading } = useBookings(user ? String(user.id) : '');
  const { data: allProperties } = useProperties();

  const propertyMap = useMemo(() => {
    const map = new Map<string, Property>();
    allProperties?.forEach((p) => map.set(p.id, p));
    return map;
  }, [allProperties]);

  return {
    router,
    user,
    bookings,
    isLoading,
    propertyMap,
  };
} 