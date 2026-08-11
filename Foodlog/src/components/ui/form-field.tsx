import { type ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { FontFamily, Spacing, type ThemeColors } from '@/constants/theme';
import { useThemedStyles } from '@/theme/use-themed-styles';

type FormFieldProps = {
  label: string;
  /** Optional right-aligned text (e.g. "Required"). */
  badge?: string;
  children: ReactNode;
};

/**
 * Labelled form section with an uppercase title and optional right badge.
 * Used throughout data-entry screens for consistent field grouping.
 */
export function FormField({ label, badge, children }: FormFieldProps) {
  const { styles } = useThemedStyles(createStyles);
  return (
    <View style={styles.container}>
      <View style={styles.labelRow}>
        <Text style={styles.label}>{label}</Text>
        {badge ? <Text style={styles.badge}>{badge}</Text> : null}
      </View>
      {children}
    </View>
  );
}

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      gap: Spacing.sm,
    },
    labelRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    label: {
      fontFamily: FontFamily.semiBold,
      fontSize: 12,
      letterSpacing: 0.8,
      color: colors.mutedText,
      textTransform: 'uppercase',
    },
    badge: {
      fontFamily: FontFamily.medium,
      fontSize: 12,
      color: colors.accent,
    },
  });
