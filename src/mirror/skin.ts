/**
 * Design Mirror Skin (Web Version)
 * 
 * Recreates the neobrut2 skin tokens from mojvis/mobile for web use.
 * Uses pure CSS values instead of React Native StyleSheet.
 */

// HSL helper functions
const hsl = (h: number, s: number, l: number) => `hsl(${h} ${s}% ${l}%)`;
const hsla = (h: number, s: number, l: number, a: number) =>
  `hsla(${h} ${s}% ${l}% / ${a})`;

// Mediterranean Neobrut palette - ALIGNED TO V1 DESIGN SYSTEM
const palette = {
  // Core Background & Foreground
  background: hsl(45, 30, 96), // Warm cream/sand
  foreground: hsl(220, 20, 10), // Near-black

  // Surfaces
  surface: hsl(45, 25, 98), // cards
  surfaceAlt: hsl(45, 15, 90), // muted panels

  // Text
  mutedText: hsl(220, 10, 40),

  // Primary - Mediterranean Blue
  primary: hsl(210, 80, 45),
  // Secondary - Olive Green
  secondary: hsl(160, 45, 38),
  // Accent - Sun Yellow
  accent: hsl(45, 92, 55),
  // Destructive - Terracotta Red
  destructive: hsl(12, 55, 50),

  // Extended Mediterranean Palette
  lavender: hsl(270, 35, 70),
  amber: hsl(35, 83, 61),
  orange: hsl(25, 85, 55),
  teal: hsl(180, 45, 42),
  pink: hsl(350, 50, 65),

  // UI extras
  chevron: hsl(220, 10, 50),
  typeBadge: hsl(270, 40, 52),
  unreadIndicator: hsl(210, 80, 45),
  link: hsl(210, 80, 45),
};

export const skin = {
  colors: {
    // Backgrounds
    background: palette.background,
    backgroundSecondary: palette.surfaceAlt,
    backgroundTertiary: palette.surface,
    backgroundUnread: hsla(42, 95, 55, 0.18),

    // Text
    textPrimary: palette.foreground,
    textSecondary: palette.mutedText,
    textMuted: palette.mutedText,
    textDisabled: hsla(220, 10, 34, 0.55),

    // Borders
    border: palette.foreground,
    borderLight: hsla(220, 18, 10, 0.12),
    borderMuted: hsla(220, 10, 50, 0.35),

    // Interactive
    primary: palette.primary,
    primaryText: 'white',
    primaryTextMuted: hsla(0, 0, 100, 0.85),

    // Links
    link: palette.link,

    // Status
    successBackground: hsla(155, 45, 34, 0.15),
    successText: palette.secondary,
    successAccent: palette.secondary,
    errorBackground: hsla(12, 62, 48, 0.14),
    errorText: palette.destructive,
    urgent: palette.destructive,
    urgentText: 'white',
    warningBackground: hsl(35, 83, 61),
    warningText: palette.foreground,
    warningAccent: palette.accent,
    infoBackground: hsla(210, 85, 40, 0.14),
    infoText: palette.primary,
    pendingBackground: hsla(25, 85, 55, 0.16),
    pendingText: hsl(25, 85, 40),

    // Special
    unreadIndicator: palette.unreadIndicator,
    typeBadge: palette.typeBadge,
    chevron: palette.chevron,
    accent: palette.accent,
    lavender: palette.lavender,
    amber: palette.amber,
    orange: palette.orange,
    teal: palette.teal,
    pink: palette.pink,
    overlay: hsla(220, 20, 10, 0.6),
  },

  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  } as const,

  borders: {
    widthHairline: 1,
    widthThin: 2,
    widthCard: 3,
    widthHeavy: 4,
    radiusSharp: 0,
    radiusSmall: 4,
    radiusMedium: 0,
    radiusLarge: 0,
    radiusCard: 0,
    radiusPill: 9999,
  } as const,

  typography: {
    fontFamily: {
      display: "'Space Grotesk', sans-serif",
      body: "'Space Mono', monospace",
    },
    fontSize: {
      xs: 10,
      sm: 12,
      md: 14,
      lg: 16,
      xl: 18,
      xxl: 24,
      xxxl: 28,
    },
    fontWeight: {
      regular: '400',
      medium: '500',
      semiBold: '600',
      bold: '700',
    },
  } as const,

  icons: {
    size: {
      xs: 14,
      sm: 18,
      md: 24,
      lg: 32,
      xl: 40,
    },
    strokeWidth: {
      light: 1.5,
      regular: 2,
      strong: 2.5,
    },
  } as const,

  shadows: {
    card: '4px 4px 0px 0px hsl(220 20% 10%)',
    none: 'none',
  },
} as const;

export type SkinColors = keyof typeof skin.colors;
export type SkinSpacing = keyof typeof skin.spacing;
export type IconSize = keyof typeof skin.icons.size;

export default skin;
