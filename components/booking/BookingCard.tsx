import { Booking, Property } from '@/types';
import React from 'react';
import { Text, View } from 'react-native';


interface BookingCardProps {
  item: Booking;
  property?: Property;
}

const BookingCard = React.memo(({ item, property }: BookingCardProps) => {
  return (
    <View className="bg-white dark:bg-neutral-800 rounded-lg p-4 mb-4">
      {property && (
        <Text className="text-lg font-bold text-blue-600 dark:text-blue-400 mb-1">
          {property.title}
        </Text>
      )}
      <Text className="text-lg font-bold text-black dark:text-white">Booking #{item.id}</Text>
      <Text className="text-gray-600 dark:text-gray-300 mt-2">
        Check-in: {item.checkIn}
      </Text>
      <Text className="text-gray-600 dark:text-gray-300">
        Check-out: {item.checkOut}
      </Text>
      <View className="mt-2">
        <Text
          className={
            item.status === 'confirmed'
              ? 'text-green-500 font-bold'
              : item.status === 'pending'
              ? 'text-yellow-500 font-bold'
              : 'text-red-500 font-bold'
          }
        >
          {item.status?.toUpperCase()}
        </Text>
      </View>
    </View>
  );
});

BookingCard.displayName = 'BookingCard';

export default BookingCard; 