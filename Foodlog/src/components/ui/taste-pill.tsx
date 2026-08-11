import { StyleSheet, Text } from 'react-native';

import { FontFamily, Radius, Spacing, type ThemeColors } from '@/constants/theme';
import { useThemedStyles } from '@/theme/use-themed-styles';

type TastePillProps = {
  label: string;
  /** neutral = sand fill; primary = olive fill. */
  variant?: 'neutral' | 'primary';
};

/** Non-interactive taste/preference pill. */
export function TastePill({ label, variant = 'neutral' }: TastePillProps) {
  const { styles } = useThemedStyles(createStyles);
  return (
    <Text style={[styles.pill, variant === 'primary' ? styles.primary : styles.neutral]}>
      {label}
    </Text>
  );
}

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    pill: {
      fontFamily: FontFamily.medium,
      fontSize: 13,
      paddingHorizontal: Spacing.md,
      paddingVertical: 7,
      borderRadius: Radius.pill,
      overflow: 'hidden',
    },
    neutral: {
      backgroundColor: colors.secondary,
      color: colors.text,
    },
    primary: {
      backgroundColor: colors.primary,
      color: colors.white,
    },
  });
