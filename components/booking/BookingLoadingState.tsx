import React, { memo } from 'react';
import { Text, View } from 'react-native';

export const BookingLoadingState = memo(() => (
  <View className="flex-1 items-center justify-center bg-white dark:bg-neutral-900">
    <Text className="text-black dark:text-white">Loading bookings...</Text>
  </View>
));

BookingLoadingState.displayName = 'BookingLoadingState'; 