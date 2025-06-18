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
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 12 }}>Something went wrong.</Text>
          <Text style={{ color: 'gray', marginBottom: 24 }}>{this.state.error?.message}</Text>
          <Pressable onPress={this.handleReset} style={{ backgroundColor: '#2563eb', padding: 12, borderRadius: 8 }}>
            <Text style={{ color: 'white', fontWeight: 'bold' }}>Try Again</Text>
          </Pressable>
        </View>
      );
    }
    return this.props.children;
  }
} 