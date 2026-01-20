/**
 * Web shim for expo-font
 * Fonts are loaded via CSS @font-face instead
 */

export function useFonts(_fontMap: Record<string, unknown>): [boolean, Error | null] {
  // On web, fonts are loaded via CSS - always report as loaded
  return [true, null];
}

export async function loadAsync(_fontMap: Record<string, unknown>): Promise<void> {
  // No-op on web - fonts loaded via CSS
  return Promise.resolve();
}

export default { useFonts, loadAsync };
