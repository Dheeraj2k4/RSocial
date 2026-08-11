import { type ReactNode } from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';

import { FontFamily, Radius, Spacing, type ThemeColors } from '@/constants/theme';
import { useThemedStyles } from '@/theme/use-themed-styles';

type ToggleRowProps = {
  /** Leading icon element. */
  icon?: ReactNode;
  title: string;
  subtitle?: string;
  value: boolean;
  onValueChange: (val: boolean) => void;
};

/**
 * Row with a label, optional subtitle and a trailing toggle switch.
 * Used for binary options like "Share to Feed".
 */
export function ToggleRow({ icon, title, subtitle, value, onValueChange }: ToggleRowProps) {
  const { styles, colors } = useThemedStyles(createStyles);
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        {icon}
        <View style={styles.textBlock}>
          <Text style={styles.title}>{title}</Text>
          {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        </View>
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: colors.border, true: colors.accent }}
        thumbColor={colors.white}
        ios_backgroundColor={colors.border}
      />
    </View>
  );
}

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: colors.surface,
      borderRadius: Radius.md,
      paddingVertical: Spacing.md,
      paddingHorizontal: Spacing.lg,
      borderWidth: 1,
      borderColor: colors.border,
    },
    left: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: Spacing.md,
      flex: 1,
    },
    textBlock: {
      flex: 1,
    },
    title: {
      fontFamily: FontFamily.semiBold,
      fontSize: 15,
      color: colors.text,
    },
    subtitle: {
      fontFamily: FontFamily.body,
      fontSize: 13,
      color: colors.mutedText,
      marginTop: 1,
    },
  });
