import { Image } from 'expo-image';
import { Clock, MapPin } from 'phosphor-react-native';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { FontFamily, Radius, Spacing, type ThemeColors } from '@/constants/theme';
import { useThemedStyles } from '@/theme/use-themed-styles';
import { RatingBadge } from './rating-badge';

type FeaturedRestaurantCardProps = {
  image: string;
  name: string;
  distance: string;
  time: string;
  cuisine: string;
  rating: number;
  onPress?: () => void;
};

/** Large editorial restaurant card: hero image + info panel + rating badge. */
export function FeaturedRestaurantCard({
  image,
  name,
  distance,
  time,
  cuisine,
  rating,
  onPress,
}: FeaturedRestaurantCardProps) {
  const { styles, colors } = useThemedStyles(createStyles);
  return (
    <Pressable onPress={onPress} accessibilityRole="button" style={styles.card}>
      <View>
        <Image source={{ uri: image }} style={styles.image} contentFit="cover" transition={300} />
        <View style={styles.rating}>
          <RatingBadge value={rating} />
        </View>
      </View>

      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>
        <View style={styles.meta}>
          <View style={styles.metaItem}>
            <MapPin size={14} color={colors.mutedText} />
            <Text style={styles.metaText}>{distance}</Text>
          </View>
          <View style={styles.metaItem}>
            <Clock size={14} color={colors.mutedText} />
            <Text style={styles.metaText}>{time}</Text>
          </View>
          <Text style={styles.cuisine}>{cuisine}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    card: {
      borderRadius: Radius.lg,
      overflow: 'hidden',
      backgroundColor: colors.border,
    },
    image: {
      width: '100%',
      height: 180,
      backgroundColor: colors.border,
    },
    rating: {
      position: 'absolute',
      top: Spacing.md,
      right: Spacing.md,
    },
    info: {
      padding: Spacing.lg,
    },
    name: {
      fontFamily: FontFamily.display,
      fontSize: 20,
      color: colors.text,
      marginBottom: Spacing.sm,
    },
    meta: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: Spacing.lg,
    },
    metaItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
    metaText: {
      fontFamily: FontFamily.body,
      fontSize: 13,
      color: colors.mutedText,
    },
    cuisine: {
      fontFamily: FontFamily.semiBold,
      fontSize: 13,
      color: colors.text,
    },
  });
