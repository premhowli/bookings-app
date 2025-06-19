import { useColorScheme } from '@/hooks/useColorScheme';
import React from "react";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { PropertyCard } from "../../components";
import { PropertySearchBar } from '../../components/property/PropertySearchBar';
import { useHomeProperties } from "../../components/property/hooks/useHomeProperties";

export default function HomeScreen() {
  const {
    searchQuery,
    handleSearchChange,
    filteredProperties,
    isLoading,
  } = useHomeProperties();

  const colorScheme = useColorScheme();
  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-white dark:bg-neutral-900">
        <Text className="text-black dark:text-white">Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView
      edges={['top', 'left', 'right']}
      className="flex-1 bg-gray-100 dark:bg-neutral-900 pt-4 px-4"
    >
      <PropertySearchBar
        value={searchQuery}
        onChangeText={handleSearchChange}
        colorScheme={colorScheme ?? 'light'}
      />
      <FlatList
        data={filteredProperties}
        renderItem={({ item }) => <PropertyCard item={item} />}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={true}
        maxToRenderPerBatch={5}
        windowSize={10}
        initialNumToRender={3}
      />
    </SafeAreaView>
  );
}
