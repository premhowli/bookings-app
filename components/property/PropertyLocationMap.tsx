import React, { memo } from 'react';
import { Text } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';

interface PropertyLocationMapProps {
  marker: { latitude: number; longitude: number } | null;
  region: Region | undefined;
  title: string;
}

export const PropertyLocationMap = memo(({ marker, region, title }: PropertyLocationMapProps) => (
  <>
    <Text className="text-xl font-bold mb-2 text-black dark:text-white mt-6">Location</Text>
    {marker && region && (
      <MapView
        className="w-full h-64 rounded-lg"
        initialRegion={region}
      >
        <Marker
          coordinate={marker}
          title={title}
        />
      </MapView>
    )}
  </>
));

PropertyLocationMap.displayName = 'PropertyLocationMap'; 