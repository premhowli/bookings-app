import { useColorScheme } from 'react-native';

export function useThemeClasses() {
  const colorScheme = useColorScheme() ?? 'light';
  return {
    bg: colorScheme === 'dark' ? 'bg-neutral-900' : 'bg-gray-100',
    card: colorScheme === 'dark' ? 'bg-neutral-100 border border-neutral-700' : 'bg-white',
    text: colorScheme === 'dark' ? 'text-white' : 'text-black',
    subText: colorScheme === 'dark' ? 'text-gray-300' : 'text-gray-600',
    border: colorScheme === 'dark' ? 'border-gray-700' : 'border-gray-200',
    // Add more as needed
  };
} 