import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { PropertyCalendar } from '../../components/property/PropertyCalendar';
import { PropertyFeatures } from '../../components/property/PropertyFeatures';
import { PropertyImageCarousel } from '../../components/property/PropertyImageCarousel';
import { PropertyLocationMap } from '../../components/property/PropertyLocationMap';
import { usePropertyDetails } from '../../hooks/usePropertyDetails';

export default function PropertyDetailScreen() {
  const {
    property,
    isLoading,
    backgroundColor,
    activeIndex,
    scrollRef,
    markedDates,
    handleDayPress,
    marker,
    region,
    handleBook,
    onScroll,
  } = usePropertyDetails();

  if (isLoading || !property) {
    return (
      <View style={{ flex: 1, backgroundColor }}>
        <View className="flex-1 items-center justify-center">
          <Text className="text-black dark:text-white">Loading...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor }}>
      <ScrollView style={{ flex: 1, backgroundColor }}>
        <PropertyImageCarousel
          images={property.images}
          activeIndex={activeIndex}
          onScroll={onScroll}
          scrollRef={scrollRef}
        />
        <View className="p-4">
          <Text className="text-2xl font-bold text-black dark:text-white">{property.title}</Text>
          <Text className="text-gray-600 dark:text-gray-300 mt-2">${property.price}/night</Text>
          <Text className="mt-4 text-gray-700 dark:text-gray-200">{property.location.address}, {property.location.city}, {property.location.state}</Text>
          <PropertyFeatures features={property.features} />
          <PropertyLocationMap marker={marker} region={region} title={property.title} />
          <PropertyCalendar markedDates={markedDates} onDayPress={handleDayPress} />
          <Pressable
            onPress={handleBook}
            className="bg-blue-500 rounded-lg p-4 mt-6"
          >
            <Text className="text-white text-center font-bold">Book Now</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
} 