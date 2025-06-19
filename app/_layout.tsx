import { Colors } from '@/constants/Colors';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const queryClient = new QueryClient();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const bg = colorScheme === 'dark' ? Colors.dark.background : Colors.light.background;

  return (
    <SafeAreaProvider>
      <View className={`flex-1 ${colorScheme === 'dark' ? 'bg-neutral-900' : 'bg-gray-100'}`}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <Stack
              screenOptions={{
                headerStyle: {
                  backgroundColor: colorScheme === 'dark' ? Colors.dark.background : Colors.light.background,
                },
                headerTintColor: colorScheme === 'dark' ? Colors.dark.text : Colors.light.text,
                headerShadowVisible: false,
                gestureEnabled: true,
                gestureDirection: 'horizontal',
              }}
            >
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen 
                name="property/[id]" 
                options={{ 
                  headerShown: true,
                  presentation: 'card',
                  gestureEnabled: true,
                  gestureDirection: 'horizontal',
                  freezeOnBlur: true,
                }}
              />
            </Stack>
            <StatusBar
              style={colorScheme === 'dark' ? 'light' : 'dark'}
              backgroundColor={bg}
              translucent={false}
            />
          </ThemeProvider>
        </QueryClientProvider>
      </View>
    </SafeAreaProvider>
  );
}
