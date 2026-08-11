import { Star } from 'phosphor-react-native';
import { Pressable, StyleSheet, View } from 'react-native';

import { Spacing } from '@/constants/theme';
import { useTheme } from '@/theme/theme-context';

type StarRatingProps = {
  /** Current value (0–5). */
  value: number;
  /** Called with the new rating (1–5). */
  onChange?: (rating: number) => void;
  /** Star icon size. */
  size?: number;
};

/**
 * Interactive 5-star rating row.
 * Filled stars use the terracotta accent; empty stars are sand-muted outlines.
 */
export function StarRating({ value, onChange, size = 36 }: StarRatingProps) {
  const { colors } = useTheme();
  return (
    <View style={styles.container}>
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = star <= value;
        return (
          <Pressable
            key={star}
            onPress={() => onChange?.(star)}
            hitSlop={4}
            accessibilityRole="button"
            accessibilityLabel={`Rate ${star} star${star > 1 ? 's' : ''}`}
          >
            <Star
              size={size}
              color={filled ? colors.accent : colors.secondary}
              weight={filled ? 'fill' : 'regular'}
            />
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
  },
});
