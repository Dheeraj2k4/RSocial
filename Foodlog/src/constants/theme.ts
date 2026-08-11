/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform, StyleSheet } from 'react-native';

/**
 * Foodlog brand palette. Use these tokens instead of raw hex values.
 * Direction: ~90% neutral surfaces, ~10% olive as the primary brand/action color.
 * Terracotta is a micro-accent (likes, ratings, badges, attention states).
 */
export const Palette = {
  olive: '#59634A', // primary brand / actions
  offWhite: '#F5F3EC', // app background
  sand: '#D5C7A3', // secondary neutral / borders
  ink: '#20231D', // primary text
  terracotta: '#C96B45', // accent (sparing)
  white: '#FFFFFF',
  black: '#000000',

  // Supporting neutrals derived from the core palette
  inkMuted: '#5B5E54', // secondary text
  sandMuted: '#E8E3D6', // subtle fills / dividers
  overlay: 'rgba(20, 22, 17, 0.45)', // scrim over photography
} as const;

const tintColorLight = Palette.olive;
const tintColorDark = Palette.offWhite;

export const Colors = {
  light: {
    text: Palette.ink,
    textSecondary: Palette.inkMuted,
    background: Palette.offWhite,
    surface: Palette.white,
    tint: tintColorLight,
    primary: Palette.olive,
    secondary: Palette.sand,
    accent: Palette.terracotta,
    border: Palette.sandMuted,
    icon: Palette.inkMuted,
    tabIconDefault: Palette.inkMuted,
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEBE3',
    textSecondary: '#A9AC9E',
    background: '#161811',
    surface: '#20231D',
    tint: tintColorDark,
    primary: '#8A9673',
    secondary: '#3A3D31',
    accent: Palette.terracotta,
    border: '#2C2F26',
    icon: '#A9AC9E',
    tabIconDefault: '#A9AC9E',
    tabIconSelected: tintColorDark,
  },
};

/** Spacing scale (4pt base) for consistent layout rhythm. */
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48,
} as const;

/** Corner radius tokens. Rounded but restrained. */
export const Radius = {
  sm: 8,
  md: 12,
  lg: 20,
  pill: 999,
} as const;

/**
 * Typography families.
 * Playfair Display → editorial display headings and major section titles.
 * Inter → body copy, navigation, buttons, labels and metadata.
 * Values match the @expo-google-fonts export keys (loaded in the root layout).
 */
export const FontFamily = {
  display: 'PlayfairDisplay_700Bold',
  displaySemiBold: 'PlayfairDisplay_600SemiBold',
  body: 'Inter_400Regular',
  medium: 'Inter_500Medium',
  semiBold: 'Inter_600SemiBold',
} as const;

/**
 * Frequently reused layout styles. Compose with component-specific styles,
 * e.g. style={[CommonStyles.rowBetween, styles.header]}.
 */
export const CommonStyles = StyleSheet.create({
  fill: { flex: 1 },
  row: { flexDirection: 'row', alignItems: 'center' },
  rowBetween: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  center: { alignItems: 'center', justifyContent: 'center' },
  screenPadded: { paddingHorizontal: Spacing.xl },
});

/**
 * Semantic color scheme consumed via `useTheme()`. Light maps to the base
 * Palette; dark uses the deep green-black scheme. Use these for anything that
 * must respond to dark mode.
 */
export type ThemeColors = {
  primary: string;
  background: string;
  secondary: string;
  text: string;
  accent: string;
  surface: string;
  border: string;
  mutedText: string;
  white: string;
  black: string;
};

export const LightColors: ThemeColors = {
  primary: Palette.olive,
  background: Palette.offWhite,
  secondary: Palette.sand,
  text: Palette.ink,
  accent: Palette.terracotta,
  surface: Palette.white,
  border: Palette.sandMuted,
  mutedText: Palette.inkMuted,
  white: Palette.white,
  black: Palette.black,
};

export const DarkColors: ThemeColors = {
  primary: '#71805D', // light olive
  background: '#151713', // deep green-black
  secondary: '#302F25', // dark sand
  text: '#F3F1E8', // warm white
  accent: '#D97855', // light terracotta
  surface: '#1D201B', // dark olive-gray
  border: '#30342D',
  mutedText: '#A7AA9E',
  white: '#FFFFFF',
  black: '#000000',
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
