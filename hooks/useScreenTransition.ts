import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useCallback } from 'react';
import { useColorScheme } from 'react-native';

export const useScreenTransition = () => {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();

  // Handle screen focus to ensure proper background
  useFocusEffect(
    useCallback(() => {
      // Set proper background color when screen comes into focus
      const backgroundColor = colorScheme === 'dark' ? '#171717' : '#f3f4f6';
      
      // This helps prevent white flash during transitions
      return () => {
        // Cleanup when screen loses focus
      };
    }, [colorScheme])
  );

  return {
    backgroundColor: colorScheme === 'dark' ? '#171717' : '#f3f4f6',
  };
}; 