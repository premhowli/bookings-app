import { useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback, useMemo, useRef, useState } from 'react';
import { Alert } from 'react-native';
import { Region } from 'react-native-maps';
import { useCreateBooking, useProperty, usePropertyBookings } from '../../../services/api';
import { useStore } from '../../../store/useStore';

export function usePropertyDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: property, isLoading } = useProperty(id as string);
  const { data: bookings } = usePropertyBookings(id as string);
  const [selectedRange, setSelectedRange] = useState<{ start: string; end: string } | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef(null);
  const router = useRouter();
  const user = useStore((state) => state.user);
  const createBooking = useCreateBooking();
 // or use theme

  // Get all confirmed dates for this property
  const confirmedDates = useMemo(() => {
    if (!bookings) return new Set<string>();
    const dates = new Set<string>();
    bookings.forEach((b) => {
      if (b.status === 'confirmed') {
        let current = new Date(b.checkIn);
        const end = new Date(b.checkOut);
        while (current <= end) {
          dates.add(current.toISOString().split('T')[0]);
          current.setDate(current.getDate() + 1);
        }
      }
    });
    return dates;
  }, [bookings]);

  const markedDates = useMemo(() => {
    const dates: Record<string, any> = {};
    // Mark confirmed dates as disabled and greyed out
    confirmedDates.forEach((date) => {
      dates[date] = { disabled: true, disableTouchEvent: true };
    });
    if (selectedRange) {
      const { start, end } = selectedRange;
      const endDate = new Date(end);
      let current = new Date(start);
      while (current <= endDate) {
        const dateStr = current.toISOString().split('T')[0];
        if (confirmedDates.has(dateStr)) {
          current.setDate(current.getDate() + 1);
          continue;
        }
        if (dateStr === start && dateStr === end) {
          dates[dateStr] = { startingDay: true, endingDay: true, color: '#2563eb', textColor: '#fff' };
        } else if (dateStr === start) {
          dates[dateStr] = { startingDay: true, color: '#2563eb', textColor: '#fff' };
        } else if (dateStr === end) {
          dates[dateStr] = { endingDay: true, color: '#2563eb', textColor: '#fff' };
        } else {
          dates[dateStr] = { color: '#2563eb', textColor: '#fff' };
        }
        current.setDate(current.getDate() + 1);
      }
    }
    return dates;
  }, [selectedRange, confirmedDates]);

  const handleDayPress = (day: { dateString: string }) => {
    if (confirmedDates.has(day.dateString)) return;
    if (!selectedRange) {
      setSelectedRange({ start: day.dateString, end: day.dateString });
    } else {
      setSelectedRange((prev) =>
        prev && day.dateString < prev.start
          ? { start: day.dateString, end: prev.end }
          : { start: prev.start, end: day.dateString }
      );
    }
  };

  const marker = property?.location?.coordinates || null;
  const region: Region | undefined = marker
    ? {
        latitude: marker.latitude,
        longitude: marker.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }
    : undefined;

  const handleBook = useCallback(() => {
    if (!user) {
      router.push('/profile');
      return;
    }
    if (!selectedRange || !property) {
      Alert.alert('Please select a date range to book.');
      return;
    }
    // Ensure at least 1 day gap between start and end
    const start = new Date(selectedRange.start);
    const end = new Date(selectedRange.end);
    const diffDays = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);
    if (diffDays < 1) {
      Alert.alert('Invalid date range', 'Please select at least a 1-day stay.');
      return;
    }
    createBooking.mutate(
      {
        booking: {
          propertyId: property.id,
          userId: user.id,
          checkIn: selectedRange.start,
          checkOut: selectedRange.end,
          status: Math.random() < 0.5 ? 'pending' : 'confirmed',
        },
        user,
      },
      {
        onSuccess: () => {
          router.push('/bookings');
        },
        onError: (error: any) => {
          Alert.alert('Booking failed', error?.message || 'An error occurred.');
        },
      }
    );
  }, [user, router, selectedRange, property, createBooking]);

  const onScroll = (event: any) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / event.nativeEvent.layoutMeasurement.width);
    setActiveIndex(index);
  };

  return {
    property,
    isLoading,
    selectedRange,
    activeIndex,
    scrollRef,
    markedDates,
    handleDayPress,
    marker,
    region,
    handleBook,
    onScroll,
  };
} 