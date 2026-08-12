import { Image } from 'expo-image';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { FontFamily, Radius, Spacing, type ThemeColors } from '@/constants/theme';
import { useThemedStyles } from '@/theme/use-themed-styles';

type CreatorCardProps = {
  avatar: string;
  handle: string;
  followers: string;
  onFollow?: () => void;
  isFollowing?: boolean;
};

/**
 * Compact vertical card for the "Suggested Creators" horizontal list.
 * Shows an avatar, handle, follower count and a Follow/Following button.
 */
export function CreatorCard({ avatar, handle, followers, onFollow, isFollowing = false }: CreatorCardProps) {
  const { styles } = useThemedStyles(createStyles);

  return (
    <View style={styles.card}>
      <Image source={{ uri: avatar }} style={styles.avatar} contentFit="cover" />
      <Text style={styles.handle} numberOfLines={1}>{handle}</Text>
      <Text style={styles.followers}>{followers} followers</Text>
      <Pressable
        onPress={onFollow}
        accessibilityRole="button"
        accessibilityLabel={isFollowing ? 'Following' : 'Follow'}
        style={({ pressed }) => [
          styles.followBtn,
          isFollowing && styles.followingBtn,
          pressed && styles.pressed,
        ]}
      >
        <Text style={[styles.followText, isFollowing && styles.followingText]}>
          {isFollowing ? 'Following' : 'Follow'}
        </Text>
      </Pressable>
    </View>
  );
}

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    card: {
      width: 110,
      alignItems: 'center',
      gap: Spacing.xs,
    },
    avatar: {
      width: 64,
      height: 64,
      borderRadius: Radius.pill,
      marginBottom: Spacing.xs,
      backgroundColor: colors.border,
    },
    handle: {
      fontFamily: FontFamily.semiBold,
      fontSize: 13,
      color: colors.text,
      textAlign: 'center',
    },
    followers: {
      fontFamily: FontFamily.body,
      fontSize: 11,
      color: colors.mutedText,
      textAlign: 'center',
    },
    followBtn: {
      marginTop: Spacing.xs,
      paddingHorizontal: Spacing.md,
      paddingVertical: 7,
      borderRadius: Radius.pill,
      borderWidth: 1,
      borderColor: colors.secondary,
      backgroundColor: colors.surface,
      minWidth: 80,
      alignItems: 'center',
    },
    followingBtn: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
    followText: {
      fontFamily: FontFamily.semiBold,
      fontSize: 12,
      color: colors.text,
    },
    followingText: {
      color: colors.white,
    },
    pressed: { opacity: 0.75 },
  });
