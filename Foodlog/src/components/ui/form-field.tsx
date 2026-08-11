import { type ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { FontFamily, Palette, Spacing } from '@/constants/theme';

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

const styles = StyleSheet.create({
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
    color: Palette.inkMuted,
    textTransform: 'uppercase',
  },
  badge: {
    fontFamily: FontFamily.medium,
    fontSize: 12,
    color: Palette.terracotta,
  },
});
