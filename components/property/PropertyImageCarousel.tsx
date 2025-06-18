import { Image } from 'expo-image';
import React, { memo } from 'react';
import { Dimensions, ScrollView, View } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

interface PropertyImageCarouselProps {
  images: string[];
  activeIndex: number;
  onScroll: (event: any) => void;
  scrollRef: React.RefObject<ScrollView | null>;
}

export const PropertyImageCarousel = memo(
  ({ images, activeIndex, onScroll, scrollRef }: PropertyImageCarouselProps) => (
    <View>
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        className="h-64"
        onScroll={onScroll}
        scrollEventThrottle={16}
      >
        {images.map((img, idx) => (
          <Image
            key={idx}
            source={{ uri: img }}
            style={{ width: screenWidth, height: 256 }}
            contentFit="cover"
            transition={300}
            cachePolicy="memory-disk"
            className="h-64"
          />
        ))}
      </ScrollView>
      <View className="flex-row justify-center mt-2">
        {images.map((_, idx) => (
          <View
            key={idx}
            className={`w-2 h-2 mx-1 rounded-full ${activeIndex === idx ? 'bg-blue-500' : 'bg-gray-400 dark:bg-gray-600'}`}
          />
        ))}
      </View>
    </View>
  )
);

PropertyImageCarousel.displayName = 'PropertyImageCarousel'; 