import { Image } from 'expo-image';
import { Star } from 'phosphor-react-native';
import { StyleSheet, Text, View } from 'react-native';

import { FontFamily, Palette, Radius, Spacing, type ThemeColors } from '@/constants/theme';
import { useThemedStyles } from '@/theme/use-themed-styles';

type ReviewCardProps = {
  avatar: string;
  handle: string;
  rating: number;
  body: string;
  timeAgo: string;
};

/**
 * User review card showing avatar, handle, star rating, body text and timestamp.
 * Used in the "What People Say" section on detail screens.
 */
export function ReviewCard({ avatar, handle, rating, body, timeAgo }: ReviewCardProps) {
  const { styles } = useThemedStyles(createStyles);

  return (
    <View style={styles.card}>
      {/* Header row */}
      <View style={styles.header}>
        <Image source={{ uri: avatar }} style={styles.avatar} contentFit="cover" />
        <View style={styles.meta}>
          <Text style={styles.handle}>{handle}</Text>
          {/* Stars */}
          <View style={styles.stars}>
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={s}
                size={13}
                color={s <= rating ? Palette.terracotta : Palette.sand}
                weight={s <= rating ? 'fill' : 'regular'}
              />
            ))}
          </View>
        </View>
        <Text style={styles.time}>{timeAgo}</Text>
      </View>
      {/* Body */}
      <Text style={styles.body} numberOfLines={3}>{body}</Text>
    </View>
  );
}

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    card: {
      backgroundColor: colors.surface,
      borderRadius: Radius.md,
      padding: Spacing.lg,
      gap: Spacing.md,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.border,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: Spacing.md,
    },
    avatar: {
      width: 38,
      height: 38,
      borderRadius: Radius.pill,
      backgroundColor: colors.border,
    },
    meta: { flex: 1, gap: 3 },
    handle: {
      fontFamily: FontFamily.semiBold,
      fontSize: 14,
      color: colors.text,
    },
    stars: { flexDirection: 'row', gap: 2 },
    time: {
      fontFamily: FontFamily.body,
      fontSize: 11,
      color: colors.mutedText,
      textTransform: 'uppercase',
      letterSpacing: 0.4,
      marginTop: 2,
    },
    body: {
      fontFamily: FontFamily.body,
      fontSize: 14,
      color: colors.mutedText,
      lineHeight: 21,
    },
  });
