import React from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BookingCard from '../../components/booking/BookingCard';
import { BookingEmptyState } from '../../components/booking/BookingEmptyState';
import { BookingLoadingState } from '../../components/booking/BookingLoadingState';
import { useUserBookings } from '../../hooks/useUserBookings';

const ITEM_HEIGHT = 112;

export default function BookingsScreen() {
  const { router, user, bookings, isLoading, propertyMap } = useUserBookings();

  const renderItem = React.useCallback(
    ({ item }: { item: import('../../types').Booking }) => (
      <BookingCard item={item} property={propertyMap.get(item.propertyId)} />
    ),
    [propertyMap]
  );

  if (!user) {
    return (
      <View className="flex-1 items-center justify-center bg-white dark:bg-neutral-900">
        <Text className="text-lg mb-4 text-black dark:text-white">Please log in to view your bookings</Text>
        <Pressable
          onPress={() => router.push('/profile')}
          className="bg-blue-500 rounded-lg px-6 py-3"
        >
          <Text className="text-white font-bold">Go to Profile</Text>
        </Pressable>
      </View>
    );
  }

  if (isLoading) {
    return <BookingLoadingState />;
  }

  if (!bookings?.length) {
    return <BookingEmptyState onBrowse={() => router.push('/')} />;
  }

  return (
    <SafeAreaView
      edges={['top', 'left', 'right']}
      className="flex-1 bg-gray-100 dark:bg-neutral-900 px-4">
      <FlatList
        data={bookings}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        getItemLayout={(_, index) => ({
          length: ITEM_HEIGHT,
          offset: ITEM_HEIGHT * index,
          index,
        })}
        initialNumToRender={5}
        maxToRenderPerBatch={10}
        windowSize={10}
        removeClippedSubviews={true}
      />
    </SafeAreaView>
  );
} 