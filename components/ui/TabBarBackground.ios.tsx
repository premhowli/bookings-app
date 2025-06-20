import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { BlurView } from 'expo-blur';

export default function BlurTabBarBackground() {
  return (
    <BlurView
      // System chrome material automatically adapts to the system's theme
      // and matches the native tab bar appearance on iOS.
      className="absolute inset-0"
      tint="systemChromeMaterial"
      intensity={100}
    />
  );
}

export function useBottomTabOverflow() {
  return useBottomTabBarHeight();
}
