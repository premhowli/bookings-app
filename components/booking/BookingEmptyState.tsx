import React, { memo } from 'react';
import { Pressable, Text, View } from 'react-native';

interface BookingEmptyStateProps {
  onBrowse: () => void;
}

export const BookingEmptyState = memo(({ onBrowse }: BookingEmptyStateProps) => (
  <View className="flex-1 items-center justify-center bg-white dark:bg-neutral-900">
    <Text className="text-lg text-black dark:text-white">No bookings found</Text>
    <Pressable
      onPress={onBrowse}
      className="bg-blue-500 rounded-lg px-6 py-3 mt-4"
    >
      <Text className="text-white font-bold">Browse Properties</Text>
    </Pressable>
  </View>
));

BookingEmptyState.displayName = 'BookingEmptyState'; 