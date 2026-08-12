import { Check, Plus } from 'phosphor-react-native';
import { useState } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

import { FontFamily, Radius, Spacing, type ThemeColors } from '@/constants/theme';
import { useThemedStyles } from '@/theme/use-themed-styles';

type FollowButtonProps = {
  initialFollowing?: boolean;
  onChange?: (following: boolean) => void;
};

/** Toggling follow control. Follow = terracotta CTA; Following = neutral outline. */
export function FollowButton({ initialFollowing = false, onChange }: FollowButtonProps) {
  const { styles, colors } = useThemedStyles(createStyles);
  const [following, setFollowing] = useState(initialFollowing);

  const toggle = () => {
    const next = !following;
    setFollowing(next);
    onChange?.(next);
  };

  return (
    <Pressable
      onPress={toggle}
      accessibilityRole="button"
      accessibilityLabel={following ? 'Following' : 'Follow'}
      style={[styles.base, following ? styles.following : styles.follow]}>
      {following ? (
        <Check size={14} color={colors.text} weight="bold" />
      ) : (
        <Plus size={14} color={colors.white} weight="bold" />
      )}
      <Text style={[styles.label, following ? styles.labelFollowing : styles.labelFollow]}>
        {following ? 'Following' : 'Follow'}
      </Text>
    </Pressable>
  );
}

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    base: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      height: 34,
      paddingHorizontal: Spacing.md,
      borderRadius: Radius.pill,
    },
    follow: {
      backgroundColor: colors.accent,
    },
    following: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: colors.border,
    },
    label: {
      fontFamily: FontFamily.semiBold,
      fontSize: 13,
    },
    labelFollow: {
      color: colors.white,
    },
    labelFollowing: {
      color: colors.text,
    },
  });
