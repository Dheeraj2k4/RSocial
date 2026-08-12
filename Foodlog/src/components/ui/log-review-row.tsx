import { Image } from 'expo-image';
import { Star } from 'phosphor-react-native';
import { StyleSheet, Text, View } from 'react-native';

import { FontFamily, Palette, Radius, Spacing, type ThemeColors } from '@/constants/theme';
import { useThemedStyles } from '@/theme/use-themed-styles';

type LogReviewRowProps = {
  avatar: string;
  name: string;
  rating: number;
  quote: string;
};

/**
 * Compact log-review row used in "Recent Logs" on dish/restaurant detail screens.
 * Shows a round avatar, user name, inline star rating and an italic quote snippet.
 */
export function LogReviewRow({ avatar, name, rating, quote }: LogReviewRowProps) {
  const { styles } = useThemedStyles(createStyles);

  return (
    <View style={styles.row}>
      <Image source={{ uri: avatar }} style={styles.avatar} contentFit="cover" />
      <View style={styles.body}>
        <View style={styles.nameRow}>
          <Text style={styles.name}>{name}</Text>
          <View style={styles.ratingRow}>
            <Star size={13} color={Palette.terracotta} weight="regular" />
            <Text style={styles.ratingText}>{rating.toFixed(1)}</Text>
          </View>
        </View>
        <Text style={styles.quote} numberOfLines={2}>{quote}</Text>
      </View>
    </View>
  );
}

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    row: {
      flexDirection: 'row',
      gap: Spacing.md,
      backgroundColor: colors.surface,
      borderRadius: Radius.md,
      padding: Spacing.lg,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.border,
    },
    avatar: {
      width: 42,
      height: 42,
      borderRadius: Radius.pill,
      backgroundColor: colors.border,
      flexShrink: 0,
    },
    body: { flex: 1, gap: 4 },
    nameRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    name: {
      fontFamily: FontFamily.semiBold,
      fontSize: 14,
      color: colors.text,
    },
    ratingRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 3,
    },
    ratingText: {
      fontFamily: FontFamily.semiBold,
      fontSize: 13,
      color: colors.mutedText,
    },
    quote: {
      fontFamily: FontFamily.body,
      fontSize: 13,
      fontStyle: 'italic',
      color: colors.mutedText,
      lineHeight: 19,
    },
  });
