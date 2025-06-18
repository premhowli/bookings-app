import React, { memo } from 'react';
import { Pressable, Text } from 'react-native';

interface ProfileLogoutProps {
  onLogout: () => void;
}

export const ProfileLogout = memo(({ onLogout }: ProfileLogoutProps) => (
  <Pressable
    onPress={onLogout}
    className="bg-red-500 rounded-lg px-6 py-2 mt-8"
  >
    <Text className="text-white font-bold text-lg text-center">Logout</Text>
  </Pressable>
));

ProfileLogout.displayName = 'ProfileLogout'; 