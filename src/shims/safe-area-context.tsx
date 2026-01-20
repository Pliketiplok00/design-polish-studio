/**
 * Web shim for react-native-safe-area-context
 * Provides SafeAreaView and related components for web rendering
 */

import React from 'react';
import { View, StyleSheet, type ViewStyle } from 'react-native-web';

interface SafeAreaViewProps {
  children?: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
  edges?: Array<'top' | 'bottom' | 'left' | 'right'>;
  mode?: 'padding' | 'margin';
}

export function SafeAreaView({ 
  children, 
  style, 
  edges = ['top', 'bottom', 'left', 'right'],
}: SafeAreaViewProps) {
  // Apply safe area insets based on edges
  const edgeStyles: ViewStyle = {};
  
  if (edges.includes('top')) {
    edgeStyles.paddingTop = 44; // Approximate iOS safe area
  }
  if (edges.includes('bottom')) {
    edgeStyles.paddingBottom = 34;
  }

  const combinedStyle = StyleSheet.flatten([edgeStyles, style]);

  return (
    <View style={combinedStyle}>
      {children}
    </View>
  );
}

export function SafeAreaProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export function useSafeAreaInsets() {
  return {
    top: 44,
    bottom: 34,
    left: 0,
    right: 0,
  };
}

export function useSafeAreaFrame() {
  return {
    x: 0,
    y: 0,
    width: typeof window !== 'undefined' ? window.innerWidth : 375,
    height: typeof window !== 'undefined' ? window.innerHeight : 812,
  };
}

export default { SafeAreaView, SafeAreaProvider, useSafeAreaInsets, useSafeAreaFrame };
