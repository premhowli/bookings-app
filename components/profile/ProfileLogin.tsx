import React, { memo } from 'react';
import { Pressable, Text } from 'react-native';

interface ProfileLoginProps {
  onLogin: () => void;
}

export const ProfileLogin = memo(({ onLogin }: ProfileLoginProps) => (
  <Pressable
    onPress={onLogin}
    className="bg-blue-500 rounded-lg px-6 py-2"
  >
    <Text className="text-white font-bold text-lg">Login</Text>
  </Pressable>
));

ProfileLogin.displayName = 'ProfileLogin'; 