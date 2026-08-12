import { Pressable, StyleSheet, Text } from 'react-native';

import { FontFamily, Radius, Spacing, type ThemeColors } from '@/constants/theme';
import { useThemedStyles } from '@/theme/use-themed-styles';

type ChipProps = {
  label: string;
  active?: boolean;
  onPress?: () => void;
};

/** Pill filter chip. Active = terracotta fill; inactive = neutral outline. */
export function Chip({ label, active = false, onPress }: ChipProps) {
  const { styles } = useThemedStyles(createStyles);
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      style={[styles.base, active ? styles.active : styles.inactive]}>
      <Text style={[styles.label, active ? styles.labelActive : styles.labelInactive]}>{label}</Text>
    </Pressable>
  );
}

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    base: {
      height: 40,
      paddingHorizontal: Spacing.lg,
      borderRadius: Radius.pill,
      alignItems: 'center',
      justifyContent: 'center',
    },
    active: {
      backgroundColor: colors.primary,
    },
    inactive: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: colors.secondary,
    },
    label: {
      fontFamily: FontFamily.medium,
      fontSize: 14,
    },
    labelActive: {
      color: colors.white,
    },
    labelInactive: {
      color: colors.text,
    },
  });
