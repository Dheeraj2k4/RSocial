import { Star } from 'phosphor-react-native';
import { StyleSheet, Text, View } from 'react-native';

import { FontFamily, Radius, Spacing, type ThemeColors } from '@/constants/theme';
import { useThemedStyles } from '@/theme/use-themed-styles';

type RatingBadgeProps = {
  value: number;
};

/** White pill showing a star rating. Terracotta star = ratings accent. */
export function RatingBadge({ value }: RatingBadgeProps) {
  const { styles, colors } = useThemedStyles(createStyles);
  return (
    <View style={styles.badge}>
      <Star size={13} color={colors.accent} weight="fill" />
      <Text style={styles.value}>{value.toFixed(1)}</Text>
    </View>
  );
}

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    badge: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      backgroundColor: colors.surface,
      paddingHorizontal: Spacing.sm,
      paddingVertical: 4,
      borderRadius: Radius.pill,
    },
    value: {
      fontFamily: FontFamily.semiBold,
      fontSize: 12,
      color: colors.text,
    },
  });
