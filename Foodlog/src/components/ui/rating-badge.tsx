import { Star } from 'phosphor-react-native';
import { StyleSheet, Text, View } from 'react-native';

import { FontFamily, Palette, Radius, Spacing } from '@/constants/theme';

type RatingBadgeProps = {
  value: number;
};

/** White pill showing a star rating. Terracotta star = ratings accent. */
export function RatingBadge({ value }: RatingBadgeProps) {
  return (
    <View style={styles.badge}>
      <Star size={13} color={Palette.terracotta} weight="fill" />
      <Text style={styles.value}>{value.toFixed(1)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Palette.white,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: Radius.pill,
  },
  value: {
    fontFamily: FontFamily.semiBold,
    fontSize: 12,
    color: Palette.ink,
  },
});
