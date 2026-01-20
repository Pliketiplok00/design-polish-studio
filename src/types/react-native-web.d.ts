/**
 * Type declarations for React Native Web and shims
 */

declare module 'react-native' {
  export * from 'react-native-web';
}

declare module 'react-native-web' {
  import React from 'react';

  export interface ViewStyle {
    [key: string]: any;
  }

  export interface TextStyle {
    [key: string]: any;
  }

  export interface ImageStyle {
    [key: string]: any;
  }

  export type StyleProp<T> = T | T[] | undefined | null | false;

  export interface ViewProps {
    style?: StyleProp<ViewStyle>;
    children?: React.ReactNode;
    pointerEvents?: 'auto' | 'none' | 'box-none' | 'box-only';
    accessibilityLabel?: string;
    testID?: string;
    onLayout?: (event: any) => void;
  }

  export interface TextProps {
    style?: StyleProp<TextStyle>;
    children?: React.ReactNode;
    numberOfLines?: number;
    ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip';
    accessibilityLabel?: string;
    onPress?: () => void;
  }

  export interface TouchableOpacityProps extends ViewProps {
    onPress?: () => void;
    disabled?: boolean;
    activeOpacity?: number;
    accessibilityRole?: string;
  }

  export interface ScrollViewProps extends ViewProps {
    contentContainerStyle?: StyleProp<ViewStyle>;
    horizontal?: boolean;
    showsVerticalScrollIndicator?: boolean;
    showsHorizontalScrollIndicator?: boolean;
    keyboardShouldPersistTaps?: 'always' | 'never' | 'handled';
  }

  export interface TextInputProps {
    style?: StyleProp<TextStyle>;
    value?: string;
    onChangeText?: (text: string) => void;
    placeholder?: string;
    placeholderTextColor?: string;
    multiline?: boolean;
    numberOfLines?: number;
    secureTextEntry?: boolean;
    autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
    autoCorrect?: boolean;
    keyboardType?: string;
    returnKeyType?: string;
    onSubmitEditing?: () => void;
    editable?: boolean;
    maxLength?: number;
  }

  export interface ImageProps {
    style?: StyleProp<ImageStyle>;
    source: { uri: string } | number;
    resizeMode?: 'cover' | 'contain' | 'stretch' | 'repeat' | 'center';
    accessibilityLabel?: string;
  }

  export interface ActivityIndicatorProps {
    size?: 'small' | 'large' | number;
    color?: string;
  }

  export const View: React.FC<ViewProps>;
  export const Text: React.FC<TextProps>;
  export const TouchableOpacity: React.FC<TouchableOpacityProps>;
  export const ScrollView: React.FC<ScrollViewProps>;
  export const TextInput: React.FC<TextInputProps>;
  export const Image: React.FC<ImageProps>;
  export const SafeAreaView: React.FC<ViewProps>;
  export const ActivityIndicator: React.FC<ActivityIndicatorProps>;
  export const FlatList: React.FC<any>;
  export const Pressable: React.FC<any>;
  export const Modal: React.FC<any>;
  export const Animated: any;
  export const Dimensions: {
    get: (dim: 'window' | 'screen') => { width: number; height: number };
    addEventListener: (type: string, handler: any) => any;
    removeEventListener: (type: string, handler: any) => void;
  };
  export const Platform: {
    OS: 'ios' | 'android' | 'web';
    Version: number;
    select: <T>(specifics: { ios?: T; android?: T; web?: T; default?: T }) => T;
  };
  export const StyleSheet: {
    create: <T extends Record<string, ViewStyle | TextStyle | ImageStyle>>(styles: T) => T;
    flatten: (style: any) => any;
    absoluteFill: ViewStyle;
    absoluteFillObject: ViewStyle;
    hairlineWidth: number;
  };
  export const Keyboard: {
    dismiss: () => void;
    addListener: (event: string, callback: () => void) => { remove: () => void };
  };
  export const Linking: {
    openURL: (url: string) => Promise<void>;
    canOpenURL: (url: string) => Promise<boolean>;
  };
  export const Share: {
    share: (content: { message?: string; url?: string; title?: string }) => Promise<any>;
  };
  export const Alert: {
    alert: (title: string, message?: string, buttons?: any[], options?: any) => void;
  };
}

declare module 'react-native-safe-area-context' {
  import React from 'react';
  import { ViewStyle } from 'react-native-web';

  export interface SafeAreaViewProps {
    children?: React.ReactNode;
    style?: ViewStyle | ViewStyle[];
    edges?: Array<'top' | 'bottom' | 'left' | 'right'>;
    mode?: 'padding' | 'margin';
  }

  export const SafeAreaView: React.FC<SafeAreaViewProps>;
  export const SafeAreaProvider: React.FC<{ children: React.ReactNode }>;
  export function useSafeAreaInsets(): { top: number; bottom: number; left: number; right: number };
  export function useSafeAreaFrame(): { x: number; y: number; width: number; height: number };
}

declare module 'lucide-react-native' {
  // Re-export everything from lucide-react with compatible types
  export * from 'lucide-react';
  // Use any for LucideIcon to avoid strict type checking issues
  export type LucideIcon = any;
}

declare module 'expo-font' {
  export function useFonts(fontMap: Record<string, unknown>): [boolean, Error | null];
  export function loadAsync(fontMap: Record<string, unknown>): Promise<void>;
}

declare module '@expo-google-fonts/space-grotesk' {
  export const SpaceGrotesk_400Regular: string;
  export const SpaceGrotesk_500Medium: string;
  export const SpaceGrotesk_600SemiBold: string;
  export const SpaceGrotesk_700Bold: string;
}

declare module '@expo-google-fonts/space-mono' {
  export const SpaceMono_400Regular: string;
  export const SpaceMono_700Bold: string;
}

declare module '@react-navigation/native' {
  export function useNavigation(): {
    navigate: (route: string, params?: unknown) => void;
    goBack: () => void;
    setOptions: (options: unknown) => void;
    reset: (state: unknown) => void;
    isFocused: () => boolean;
    canGoBack: () => boolean;
    getParent: () => any;
    getState: () => any;
  };
  export function useRoute(): { key: string; name: string; params: any };
  export function useFocusEffect(callback: () => void | (() => void)): void;
  export function useIsFocused(): boolean;
  export const NavigationContainer: React.FC<{ children: React.ReactNode }>;
}

declare module '@react-navigation/native-stack' {
  export function createNativeStackNavigator(): {
    Navigator: React.FC<{ children: React.ReactNode }>;
    Screen: React.FC<any>;
    Group: React.FC<any>;
  };
  export type NativeStackNavigationProp<T, K extends keyof T = keyof T> = any;
}

declare const __DEV__: boolean;
