import React, { useEffect } from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ProfileHeader } from '../../components/profile/ProfileHeader';
import { ProfileLogin } from '../../components/profile/ProfileLogin';
import { ProfileLogout } from '../../components/profile/ProfileLogout';
import { useProfile } from '../../hooks/useProfile';

export default function ProfileScreen() {
  const {
    user,
    apiUser,
    isLoading,
    handleLogin,
    handleLogout,
    invalidateUser,
  } = useProfile();

  useEffect(() => {
    invalidateUser();
  }, [invalidateUser]);

  if (!user) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-white dark:bg-neutral-900">
        <Text className="text-xl font-bold mb-6 text-black dark:text-white">Welcome to Bookings App</Text>
        <ProfileLogin onLogin={handleLogin} />
      </SafeAreaView>
    );
  }

  if (isLoading || !apiUser) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-white dark:bg-neutral-900">
        <Text className="text-xl font-bold text-black dark:text-white">Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      edges={['left', 'right']}
      className="flex-1 bg-gray-100 dark:bg-neutral-900 p-4">
      <ProfileHeader
        avatar={apiUser.avatar}
        name={apiUser.name}
        email={apiUser.email}
        bookingsCount={Array.isArray(apiUser.bookings) ? apiUser.bookings.length : 0}
      />
      <ProfileLogout onLogout={handleLogout} />
    </SafeAreaView>
  );
} 