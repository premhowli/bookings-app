import React from 'react';
import { Pressable, Text, View } from 'react-native';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // You can log error info to an error reporting service here
    console.error('ErrorBoundary caught an error:', error, info);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <View className="flex-1 justify-center items-center p-6">
          <Text className="text-2xl font-bold mb-3 text-black dark:text-white">Something went wrong.</Text>
          <Text className="text-gray-500 mb-6">{this.state.error?.message}</Text>
          <Pressable onPress={this.handleReset} className="bg-blue-600 p-3 rounded-lg">
            <Text className="text-white font-bold">Try Again</Text>
          </Pressable>
        </View>
      );
    }
    return this.props.children;
  }
} 