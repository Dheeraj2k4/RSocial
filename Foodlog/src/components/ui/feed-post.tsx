import { Image } from 'expo-image';
import { CaretRight, MapPin } from 'phosphor-react-native';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { FontFamily, Radius, Spacing, type ThemeColors } from '@/constants/theme';
import { useThemedStyles } from '@/theme/use-themed-styles';

type FeedPostProps = {
  /** User who made the post */
  userName: string;
  userAvatar: string;
  userLocation: string;
  /** Food image */
  foodImage: string;
  /** Restaurant the user was logging at */
  restaurantName: string;
  /** Tag chips shown below the image (e.g. "BRUNCH", "VEGAN FRIENDLY") */
  tags: string[];
  dishName: string;
  caption: string;
  likes: number;
  comments: number;
  /** Time string, e.g. "2h ago" */
  timeAgo: string;
  onLike?: () => void;
  onComment?: () => void;
  onShare?: () => void;
  onMore?: () => void;
};

/**
 * Full social feed post card.
 * Shows user info, a photo with a "logging at" badge, tags, dish name,
 * caption and engagement row.
 */
export function FeedPost({
  userName,
  userAvatar,
  userLocation,
  foodImage,
  restaurantName,
  tags,
  dishName,
  caption,
  likes,
  comments,
  timeAgo,
  onLike,
  onComment,
  onShare,
  onMore,
}: FeedPostProps) {
  const { styles, colors } = useThemedStyles(createStyles);

  return (
    <View style={styles.container}>
      {/* ── User row ─────────────────────────────────────── */}
      <View style={styles.userRow}>
        <Image source={{ uri: userAvatar }} style={styles.avatar} contentFit="cover" />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{userName}</Text>
          <View style={styles.locationRow}>
            <MapPin size={12} color={colors.mutedText} weight="fill" />
            <Text style={styles.location}>{userLocation}</Text>
          </View>
        </View>
        <Pressable onPress={onMore} hitSlop={8} accessibilityLabel="More options">
          <Text style={styles.more}>•••</Text>
        </Pressable>
      </View>

      {/* ── Food image ───────────────────────────────────── */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: foodImage }} style={styles.foodImage} contentFit="cover" />
        {/* Logging-at badge */}
        <Pressable style={styles.restaurantBadge} accessibilityLabel={`Logging at ${restaurantName}`}>
          <View style={styles.badgeInner}>
            <View>
              <Text style={styles.loggingAt}>LOGGING AT</Text>
              <Text style={styles.restaurantName}>{restaurantName}</Text>
            </View>
            <CaretRight size={16} color={colors.text} />
          </View>
        </Pressable>
      </View>

      {/* ── Tags ─────────────────────────────────────────── */}
      <View style={styles.tagsRow}>
        {tags.map((tag) => (
          <Text key={tag} style={styles.tag}>{tag}</Text>
        ))}
      </View>

      {/* ── Dish name + caption ───────────────────────────── */}
      <Text style={styles.dishName}>{dishName}</Text>
      <Text style={styles.caption} numberOfLines={2}>{caption}</Text>

      {/* ── Engagement row ───────────────────────────────── */}
      <View style={styles.engagementRow}>
        <Pressable onPress={onLike} style={styles.engagementItem} accessibilityLabel="Like">
          <Text style={styles.engagementIcon}>♡</Text>
          <Text style={styles.engagementCount}>{likes}</Text>
        </Pressable>
        <Pressable onPress={onComment} style={styles.engagementItem} accessibilityLabel="Comment">
          <Text style={styles.engagementIcon}>◯</Text>
          <Text style={styles.engagementCount}>{comments}</Text>
        </Pressable>
        <Pressable onPress={onShare} accessibilityLabel="Share">
          <Text style={styles.engagementIcon}>⇡</Text>
        </Pressable>
        <Text style={styles.timeAgo}>{timeAgo}</Text>
      </View>
    </View>
  );
}

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.background,
      paddingHorizontal: Spacing.xl,
      paddingTop: Spacing.lg,
      paddingBottom: Spacing.xl,
    },
    /* User row */
    userRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: Spacing.md,
    },
    avatar: {
      width: 42,
      height: 42,
      borderRadius: Radius.pill,
      marginRight: Spacing.md,
      backgroundColor: colors.border,
    },
    userInfo: { flex: 1 },
    userName: {
      fontFamily: FontFamily.semiBold,
      fontSize: 15,
      color: colors.text,
    },
    locationRow: { flexDirection: 'row', alignItems: 'center', gap: 3, marginTop: 2 },
    location: {
      fontFamily: FontFamily.body,
      fontSize: 12,
      color: colors.mutedText,
    },
    more: {
      fontSize: 16,
      color: colors.mutedText,
      letterSpacing: 1,
      paddingLeft: Spacing.sm,
    },
    /* Image */
    imageContainer: {
      borderRadius: Radius.lg,
      overflow: 'hidden',
      marginBottom: Spacing.md,
      height: 240,
    },
    foodImage: { width: '100%', height: '100%' },
    restaurantBadge: {
      position: 'absolute',
      bottom: Spacing.md,
      left: Spacing.md,
      right: Spacing.md,
      backgroundColor: colors.surface,
      borderRadius: Radius.md,
      paddingHorizontal: Spacing.md,
      paddingVertical: Spacing.sm,
    },
    badgeInner: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    loggingAt: {
      fontFamily: FontFamily.semiBold,
      fontSize: 9,
      letterSpacing: 0.8,
      color: colors.accent,
      textTransform: 'uppercase',
      marginBottom: 1,
    },
    restaurantName: {
      fontFamily: FontFamily.semiBold,
      fontSize: 15,
      color: colors.text,
    },
    /* Tags */
    tagsRow: { flexDirection: 'row', gap: Spacing.sm, marginBottom: Spacing.sm },
    tag: {
      fontFamily: FontFamily.semiBold,
      fontSize: 10,
      letterSpacing: 0.6,
      color: colors.mutedText,
      textTransform: 'uppercase',
    },
    /* Dish + caption */
    dishName: {
      fontFamily: FontFamily.display,
      fontSize: 22,
      color: colors.text,
      marginBottom: Spacing.xs,
    },
    caption: {
      fontFamily: FontFamily.body,
      fontSize: 14,
      color: colors.mutedText,
      lineHeight: 20,
      marginBottom: Spacing.md,
    },
    /* Engagement */
    engagementRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: Spacing.lg,
    },
    engagementItem: { flexDirection: 'row', alignItems: 'center', gap: Spacing.xs },
    engagementIcon: { fontSize: 20, color: colors.mutedText },
    engagementCount: {
      fontFamily: FontFamily.medium,
      fontSize: 14,
      color: colors.mutedText,
    },
    timeAgo: {
      fontFamily: FontFamily.body,
      fontSize: 12,
      color: colors.mutedText,
      marginLeft: 'auto',
    },
  });
