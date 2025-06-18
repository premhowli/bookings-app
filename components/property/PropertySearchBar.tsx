import React, { memo } from 'react';
import { TextInput } from 'react-native';

interface PropertySearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  colorScheme: string;
}

export const PropertySearchBar = memo(({ value, onChangeText, colorScheme }: PropertySearchBarProps) => (
  <TextInput
    className="bg-white dark:bg-neutral-800 text-black dark:text-white p-4 rounded-xl mb-4"
    placeholder="Search properties..."
    placeholderTextColor={colorScheme === 'dark' ? '#9BA1A6' : '#687076'}
    value={value}
    onChangeText={onChangeText}
  />
));

PropertySearchBar.displayName = 'PropertySearchBar'; 