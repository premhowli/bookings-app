import { Image } from 'expo-image';
import React, { memo } from 'react';
import { Text, View } from 'react-native';

interface ProfileHeaderProps {
  avatar: string;
  name: string;
  email: string;
  bookingsCount: number;
}

export const ProfileHeader = memo(({ avatar, name, email, bookingsCount }: ProfileHeaderProps) => (
  <View className="items-center">
    <Image
      source={{ uri: avatar }}
      style={{ width: 128, height: 128, borderRadius: 9999 }}
      contentFit="cover"
      transition={300}
      cachePolicy="memory-disk"
    />
    <Text className="text-2xl font-bold mt-4 text-black dark:text-white">{name}</Text>
    <Text className="text-gray-600 dark:text-gray-300 mt-2">{email}</Text>
    <Text className="text-lg font-semibold mt-4 text-black dark:text-white">
      Total Bookings: {bookingsCount}
    </Text>
  </View>
));

ProfileHeader.displayName = 'ProfileHeader'; 