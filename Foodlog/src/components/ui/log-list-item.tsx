import { Image } from 'expo-image';
import { Calendar, DotsThree, MapPin } from 'phosphor-react-native';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { CommonStyles, FontFamily, Radius, Spacing, type ThemeColors } from '@/constants/theme';
import { useThemedStyles } from '@/theme/use-themed-styles';
import { RatingBadge } from './rating-badge';

type LogListItemProps = {
  image: string;
  title: string;
  place: string;
  date: string;
  rating: number;
  onPress?: () => void;
  onMenuPress?: () => void;
};

/** Log entry row: thumbnail, title, place, date, rating and a menu control. */
export function LogListItem({
  image,
  title,
  place,
  date,
  rating,
  onPress,
  onMenuPress,
}: LogListItemProps) {
  const { styles, colors } = useThemedStyles(createStyles);

  return (
    <Pressable onPress={onPress} accessibilityRole="button" style={styles.row}>
      <Image source={{ uri: image }} style={styles.thumb} contentFit="cover" />

      <View style={styles.body}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <View style={[CommonStyles.row, styles.metaItem]}>
          <MapPin size={13} color={colors.mutedText} />
          <Text style={styles.meta} numberOfLines={1}>
            {place}
          </Text>
        </View>
        <View style={[CommonStyles.row, styles.metaItem]}>
          <Calendar size={13} color={colors.mutedText} />
          <Text style={styles.meta}>{date}</Text>
        </View>
      </View>

      <View style={styles.right}>
        <RatingBadge value={rating} />
        <Pressable onPress={onMenuPress} hitSlop={8} accessibilityLabel="More options">
          <DotsThree size={22} color={colors.mutedText} weight="bold" />
        </Pressable>
      </View>
    </Pressable>
  );
}

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: Spacing.md,
      padding: Spacing.md,
      borderRadius: Radius.lg,
      backgroundColor: colors.border,
    },
    thumb: {
      width: 64,
      height: 64,
      borderRadius: Radius.md,
      backgroundColor: colors.secondary,
    },
    body: {
      flex: 1,
      gap: 3,
    },
    title: {
      fontFamily: FontFamily.semiBold,
      fontSize: 15,
      color: colors.text,
    },
    metaItem: {
      gap: 4,
    },
    meta: {
      fontFamily: FontFamily.body,
      fontSize: 12,
      color: colors.mutedText,
    },
    right: {
      alignSelf: 'stretch',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
    },
  });
