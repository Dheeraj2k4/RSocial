import { StyleSheet, Text } from 'react-native';

import { FontFamily, Radius } from '@/constants/theme';
import { useTheme } from '@/theme/theme-context';
import { withAlpha } from '@/utils';

type BadgeProps = {
  label: string;
  /** solid = filled accent; soft = tinted accent. */
  variant?: 'solid' | 'soft';
};

/** Small status pill, theme-aware. */
export function Badge({ label, variant = 'solid' }: BadgeProps) {
  const { colors } = useTheme();
  const solid = variant === 'solid';

  return (
    <Text
      style={[
        styles.badge,
        {
          backgroundColor: solid ? colors.accent : withAlpha(colors.accent, 0.16),
          color: solid ? colors.white : colors.accent,
        },
      ]}>
      {label}
    </Text>
  );
}

const styles = StyleSheet.create({
  badge: {
    fontFamily: FontFamily.semiBold,
    fontSize: 11,
    letterSpacing: 0.3,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: Radius.pill,
    overflow: 'hidden',
  },
});
