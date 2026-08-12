import { Image } from 'expo-image';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { FontFamily, Radius, Spacing, type ThemeColors } from '@/constants/theme';
import { useThemedStyles } from '@/theme/use-themed-styles';
import { RatingBadge } from './rating-badge';

type DishCardProps = {
  image: string;
  name: string;
  price: string;
  rating: number;
  onPress?: () => void;
};

/**
 * Compact dish card with a square photo, rating badge overlay,
 * dish name and price. Used in the "Signature Dishes" grid.
 */
export function DishCard({ image, name, price, rating, onPress }: DishCardProps) {
  const { styles } = useThemedStyles(createStyles);

  return (
    <Pressable onPress={onPress} style={styles.card} accessibilityRole="button">
      <View style={styles.imageContainer}>
        <Image source={{ uri: image }} style={styles.image} contentFit="cover" />
        <View style={styles.badge}>
          <RatingBadge value={rating} />
        </View>
      </View>
      <Text style={styles.name} numberOfLines={2}>{name}</Text>
      <Text style={styles.price}>{price}</Text>
    </Pressable>
  );
}

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    card: {
      flex: 1,
      gap: Spacing.xs,
    },
    imageContainer: {
      borderRadius: Radius.md,
      overflow: 'hidden',
      marginBottom: Spacing.xs,
    },
    image: {
      width: '100%',
      aspectRatio: 1,
      backgroundColor: colors.border,
    },
    badge: {
      position: 'absolute',
      top: Spacing.sm,
      right: Spacing.sm,
    },
    name: {
      fontFamily: FontFamily.semiBold,
      fontSize: 13,
      color: colors.text,
      textTransform: 'uppercase',
      letterSpacing: 0.3,
    },
    price: {
      fontFamily: FontFamily.semiBold,
      fontSize: 14,
      color: colors.accent,
    },
  });
