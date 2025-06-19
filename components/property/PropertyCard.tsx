import { Property } from "@/types";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React, { useCallback, useRef, useState } from "react";
import {
  Dimensions,
  GestureResponderEvent,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";

const { width: screenWidth } = Dimensions.get("window");

interface PropertyCardProps {
  item: Property;
}

export const PropertyCard = React.memo(({ item }: PropertyCardProps) => {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<ScrollView>(null);
  const touchX = useRef<number | null>(null);

  // Optimize onScroll handler with useCallback
  const onScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / screenWidth);
    setActiveIndex(index);
  }, []);

  const handlePress = useCallback(() => {
    router.push(`/property/${item.id}`);
  }, [item.id, router]);

  // Smart tap vs swipe handler
  const handleImageTouchStart = useCallback((e: GestureResponderEvent) => {
    touchX.current = e.nativeEvent.pageX;
  }, []);
  const handleImageTouchEnd = useCallback((e: GestureResponderEvent) => {
    if (touchX.current !== null) {
      const dx = Math.abs(e.nativeEvent.pageX - touchX.current);
      if (dx < 10) {
        router.push(`/property/${item.id}`);
        handlePress();
      }
      touchX.current = null;
    }
  }, [router, item.id, handlePress]);

  // Optimize navigation handler with useCallback


  return (
    <View className="rounded-2xl mb-4 overflow-hidden bg-white dark:bg-neutral-800 shadow-md dark:shadow-lg">
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        className="h-48"
        onScroll={onScroll}
        scrollEventThrottle={16}
        decelerationRate="fast"
        snapToInterval={screenWidth}
        snapToAlignment="center"
      >
        {item.images.map((img, idx) => (
          <View
            key={idx}
            onTouchStart={handleImageTouchStart}
            onTouchEnd={handleImageTouchEnd}
            className="h-48"
            style={{ width: screenWidth }}
          >
            <Image
              source={{ uri: img }}
              style={{ width: screenWidth, height: 192 }}
              className="h-48"
              contentFit="cover"
              transition={300}
              cachePolicy="memory-disk"
            />
          </View>
        ))}
      </ScrollView>
      <View className="flex-row justify-center mt-2">
        {item.images.map((_, idx) => (
          <View
            key={idx}
            className={`w-2 h-2 mx-1 rounded-full ${
              activeIndex === idx
                ? "bg-blue-500"
                : "bg-gray-400 dark:bg-gray-600"
            }`}
          />
        ))}
      </View>
      <Pressable
        onPress={handlePress}
        className="p-4 active:opacity-80"
      >
        <Text className="text-xl font-bold text-black dark:text-white">
          {item.title}
        </Text>
        <Text className="text-gray-600 dark:text-gray-300 mt-1">
          ${item.price}/night
        </Text>
      </Pressable>
    </View>
  );
});

PropertyCard.displayName = "PropertyCard";
