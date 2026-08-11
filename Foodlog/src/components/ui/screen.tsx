import { type ReactNode } from 'react';
import { ScrollView, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { SafeAreaView, type Edge } from 'react-native-safe-area-context';

import { CommonStyles, Spacing, type ThemeColors } from '@/constants/theme';
import { useThemedStyles } from '@/theme/use-themed-styles';

type ScreenProps = {
  children: ReactNode;
  /** Wrap content in a vertical ScrollView. */
  scroll?: boolean;
  /** Add horizontal screen padding. Off by default so headers can be full-bleed. */
  padded?: boolean;
  edges?: readonly Edge[];
  contentContainerStyle?: StyleProp<ViewStyle>;
};

/** App-standard screen shell: safe area + themed background + optional scroll. */
export function Screen({
  children,
  scroll = false,
  padded = false,
  edges = ['top'],
  contentContainerStyle,
}: ScreenProps) {
  const { styles } = useThemedStyles(createStyles);
  const inner = [padded && styles.padded, contentContainerStyle];

  return (
    <SafeAreaView style={styles.safe} edges={edges}>
      {scroll ? (
        <ScrollView
          style={CommonStyles.fill}
          contentContainerStyle={[styles.scrollContent, inner]}
          showsVerticalScrollIndicator={false}>
          {children}
        </ScrollView>
      ) : (
        <View style={[CommonStyles.fill, inner]}>{children}</View>
      )}
    </SafeAreaView>
  );
}

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    safe: {
      flex: 1,
      backgroundColor: colors.background,
    },
    scrollContent: {
      flexGrow: 1,
    },
    padded: {
      paddingHorizontal: Spacing.xl,
    },
  });
