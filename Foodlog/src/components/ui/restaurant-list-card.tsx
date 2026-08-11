import { Image } from 'expo-image';
import { CaretRight, Clock, MapPin } from 'phosphor-react-native';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { CommonStyles, FontFamily, Radius, Spacing, type ThemeColors } from '@/constants/theme';
import { useThemedStyles } from '@/theme/use-themed-styles';
import { RatingBadge } from './rating-badge';
import { Tag, type TagTone } from './tag';

type RestaurantListCardProps = {
  image: string;
  name: string;
  rating: number;
  cuisine: string;
  distance: string;
  time: string;
  tags?: { label: string; tone?: TagTone }[];
  onPress?: () => void;
};

/** Restaurant result card: image with tags, then name, rating, cuisine and meta. */
export function RestaurantListCard({
  image,
  name,
  rating,
  cuisine,
  distance,
  time,
  tags = [],
  onPress,
}: RestaurantListCardProps) {
  const { styles, colors } = useThemedStyles(createStyles);
  return (
    <Pressable onPress={onPress} accessibilityRole="button" style={styles.card}>
      <View style={styles.imageWrap}>
        <Image source={{ uri: image }} style={styles.image} contentFit="cover" transition={300} />
        {tags.length ? (
          <View style={styles.tags}>
            {tags.map((tag) => (
              <Tag key={tag.label} label={tag.label} tone={tag.tone} />
            ))}
          </View>
        ) : null}
      </View>

      <View style={styles.body}>
        <View style={CommonStyles.rowBetween}>
          <Text style={styles.name}>{name}</Text>
          <RatingBadge value={rating} />
        </View>
        <Text style={styles.cuisine}>{cuisine}</Text>

        <View style={[CommonStyles.row, styles.meta]}>
          <View style={[CommonStyles.row, styles.metaItem]}>
            <MapPin size={14} color={colors.mutedText} />
            <Text style={styles.metaText}>{distance}</Text>
          </View>
          <View style={[CommonStyles.row, styles.metaItem]}>
            <Clock size={14} color={colors.mutedText} />
            <Text style={styles.metaText}>{time}</Text>
          </View>
          <View style={[CommonStyles.row, styles.details]}>
            <Text style={styles.detailsText}>View Details</Text>
            <CaretRight size={14} color={colors.accent} />
          </View>
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
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
    },
    imageWrap: {
      height: 180,
      width: '100%',
    },
    image: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: colors.border,
    },
    tags: {
      position: 'absolute',
      top: Spacing.md,
      left: Spacing.md,
      flexDirection: 'row',
      gap: 6,
    },
    body: {
      padding: Spacing.lg,
      gap: 4,
    },
    name: {
      fontFamily: FontFamily.semiBold,
      fontSize: 18,
      color: colors.text,
    },
    cuisine: {
      fontFamily: FontFamily.body,
      fontSize: 14,
      color: colors.mutedText,
    },
    meta: {
      gap: Spacing.md,
      marginTop: Spacing.sm,
    },
    metaItem: {
      gap: 4,
    },
    metaText: {
      fontFamily: FontFamily.body,
      fontSize: 13,
      color: colors.mutedText,
    },
    details: {
      marginLeft: 'auto',
      gap: 2,
    },
    detailsText: {
      fontFamily: FontFamily.medium,
      fontSize: 13,
      color: colors.accent,
    },
  });
