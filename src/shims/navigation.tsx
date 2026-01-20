/**
 * Web shim for @react-navigation/native
 * Provides minimal stubs for navigation hooks used in mirror screens
 */

import React from 'react';

// Stub navigation hook - mirror screens don't actually navigate
export function useNavigation() {
  return {
    navigate: (_route: string, _params?: unknown) => {
      console.log('[Navigation stub] navigate called:', _route);
    },
    goBack: () => {
      console.log('[Navigation stub] goBack called');
    },
    setOptions: (_options: unknown) => {},
    reset: (_state: unknown) => {},
    isFocused: () => true,
    canGoBack: () => false,
    getParent: () => null,
    getState: () => ({ routes: [], index: 0 }),
  };
}

export function useRoute() {
  return {
    key: 'stub-route',
    name: 'StubRoute',
    params: {},
  };
}

export function useFocusEffect(_callback: () => void | (() => void)) {
  // No-op for web
}

export function useIsFocused() {
  return true;
}

// Navigation container stub
export function NavigationContainer({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

// Stack navigator stub
export function createNativeStackNavigator() {
  return {
    Navigator: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    Screen: () => null,
    Group: () => null,
  };
}

// Types
export type NativeStackNavigationProp<T, _K extends keyof T = keyof T> = ReturnType<typeof useNavigation>;
export type RouteProp<T, K extends keyof T> = { key: string; name: K; params: T[K] };

export default {
  useNavigation,
  useRoute,
  useFocusEffect,
  useIsFocused,
  NavigationContainer,
  createNativeStackNavigator,
};
