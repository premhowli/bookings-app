import React, { memo } from 'react';
import { Text, View } from 'react-native';

interface PropertyFeaturesProps {
  features: string[];
}

export const PropertyFeatures = memo(({ features }: PropertyFeaturesProps) => (
  <View className="mt-6">
    <Text className="text-xl font-bold mb-2 text-black dark:text-white">Features</Text>
    <View className="flex-row flex-wrap">
      {features.map((feature, index) => (
        <View
          key={index}
          className="bg-gray-100 dark:bg-neutral-800 rounded-full px-4 py-2 mr-2 mb-2"
        >
          <Text className="text-black dark:text-white">{feature}</Text>
        </View>
      ))}
    </View>
  </View>
));

PropertyFeatures.displayName = 'PropertyFeatures'; 