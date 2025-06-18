/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0ea5e9'; // Sky blue
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#18181b', // Zinc 900
    background: '#fafafa', // Zinc 50
    tint: tintColorLight,
    icon: '#71717a', // Zinc 500
    tabIconDefault: '#71717a', // Zinc 500
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#18181b', // Zinc 900
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};
