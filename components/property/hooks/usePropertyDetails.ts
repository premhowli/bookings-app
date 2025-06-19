import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Dimensions, ScrollView } from 'react-native';
import { useScreenTransition } from '../../../hooks/useScreenTransition';
import { useCreateBooking, useProperty, usePropertyBookings } from '../../../services/api';
import { useStore } from '../../../store/useStore';

const { width: screenWidth } = Dimensions.get('window');

export function usePropertyDetails() {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();
  const router = useRouter();
  const { user } = useStore();
  const { data: property, isLoading } = useProperty(id as string);
  const { data: propertyBookings } = usePropertyBookings(id as string);
  const createBooking = useCreateBooking();
  const { backgroundColor } = useScreenTransition();
  const [selectedRange, setSelectedRange] = useState<{ startDate: string | null; endDate: string | null }>({
    startDate: null,
    endDate: null,
  });
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<ScrollView | null>(null);

  useEffect(() => {
    if (property) {
      navigation.setOptions({ 
        title: property.title,
        headerBackTitle: 'Back',
        headerBackTitleVisible: true,
        headerShown: true,
      });
    }
  }, [property, navigation]);

  const confirmedBookings = useMemo(() => 
    (propertyBookings || []).filter(b => b.status === 'confirmed'),
    [propertyBookings]
  );

  function getDatesBetween(start: string, end: string) {
    const dates = [];
    let curr = new Date(start);
    const last = new Date(end);
    while (curr <= last) {
      dates.push(curr.toISOString().slice(0, 10));
      curr.setDate(curr.getDate() + 1);
    }
    return dates;
  }

  const disabledDates = useMemo(() => {
    const dates: Record<string, { disabled: true }> = {};
    confirmedBookings.forEach(b => {
      getDatesBetween(b.checkIn, b.checkOut).forEach(date => {
        dates[date] = { disabled: true };
      });
    });
    return dates;
  }, [confirmedBookings]);

  const markedDates = useMemo(() => {
    let dates: Record<string, any> = { ...disabledDates };
    if (selectedRange.startDate && selectedRange.endDate) {
      let curr = new Date(selectedRange.startDate);
      const last = new Date(selectedRange.endDate);
      while (curr <= last) {
        const dateStr = curr.toISOString().slice(0, 10);
        dates[dateStr] = {
          ...(dates[dateStr] || {}),
          color: '#0ea5e9',
          textColor: 'white',
          startingDay: dateStr === selectedRange.startDate,
          endingDay: dateStr === selectedRange.endDate,
        };
        curr.setDate(curr.getDate() + 1);
      }
    } else if (selectedRange.startDate && !selectedRange.endDate) {
      dates[selectedRange.startDate] = {
        ...(dates[selectedRange.startDate] || {}),
        color: '#0ea5e9',
        textColor: 'white',
        startingDay: true,
        endingDay: true,
      };
    }
    return dates;
  }, [disabledDates, selectedRange]);

  const handleDayPress = useCallback((day: { dateString: string }) => {
    const date = day.dateString;
    if (disabledDates[date]) return;
    if (!selectedRange.startDate || (selectedRange.startDate && selectedRange.endDate)) {
      setSelectedRange({ startDate: date, endDate: null });
    } else {
      const start = new Date(selectedRange.startDate);
      const end = new Date(date);
      if (end < start) {
        setSelectedRange({ startDate: date, endDate: selectedRange.startDate });
      } else {
        setSelectedRange({ startDate: selectedRange.startDate, endDate: date });
      }
    }
  }, [selectedRange, disabledDates]);

  const marker = useMemo(() => property ? {
    latitude: property.location.coordinates.latitude,
    longitude: property.location.coordinates.longitude,
  } : null, [property]);

  const region = useMemo(() => marker ? {
    latitude: marker.latitude,
    longitude: marker.longitude,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  } : undefined, [marker]);

  const onScroll = (event: any) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / screenWidth);
    setActiveIndex(index);
  };

  const handleBook = useCallback(async () => {
    if (!user || !user.id) {
      router.push('/profile');
      return;
    }
    if (!selectedRange.startDate || !selectedRange.endDate) {
      alert('Please select a check-in and check-out date.');
      return;
    }
    if (!property) return;
    try {
      await createBooking.mutateAsync({
        booking: {
          propertyId: property.id,
          userId: user.id.toString(),
          checkIn: selectedRange.startDate,
          checkOut: selectedRange.endDate,
          status: 'confirmed',
        },
        user,
      });
      router.push('/bookings');
    } catch (error) {
      console.error('Failed to create booking:', error);
    }
  }, [user, router, selectedRange, property, createBooking]);

  return {
    property,
    isLoading,
    backgroundColor,
    selectedRange,
    setSelectedRange,
    activeIndex,
    setActiveIndex,
    scrollRef,
    markedDates,
    handleDayPress,
    marker,
    region,
    handleBook,
    onScroll,
  };
} 