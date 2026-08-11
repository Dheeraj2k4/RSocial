import { Image } from 'expo-image';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { FontFamily, Radius, Spacing, type ThemeColors } from '@/constants/theme';
import { useThemedStyles } from '@/theme/use-themed-styles';
import { AvatarStack } from './avatar-stack';

type ActivityRowProps = {
  image: string;
  name: string;
  quote: string;
  likedBy: string;
  likedAvatars: string[];
  onPress?: () => void;
};

/** Compact recent-activity row: thumbnail + review snippet + social proof. */
export function ActivityRow({ image, name, quote, likedBy, likedAvatars, onPress }: ActivityRowProps) {
  const { styles } = useThemedStyles(createStyles);
  return (
    <Pressable onPress={onPress} accessibilityRole="button" style={styles.row}>
      <Image source={{ uri: image }} style={styles.thumb} contentFit="cover" />
      <View style={styles.body}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.quote} numberOfLines={1}>
          {quote}
        </Text>
        <View style={styles.liked}>
          <AvatarStack sources={likedAvatars} />
          <Text style={styles.likedText} numberOfLines={1}>
            {likedBy}
          </Text>
        </View>
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
      paddingVertical: Spacing.md,
    },
    thumb: {
      width: 56,
      height: 56,
      borderRadius: Radius.md,
      backgroundColor: colors.border,
    },
    body: {
      flex: 1,
      gap: 2,
    },
    name: {
      fontFamily: FontFamily.semiBold,
      fontSize: 15,
      color: colors.text,
    },
    quote: {
      fontFamily: FontFamily.body,
      fontSize: 13,
      fontStyle: 'italic',
      color: colors.mutedText,
    },
    liked: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: Spacing.sm,
      marginTop: 4,
    },
    likedText: {
      flex: 1,
      fontFamily: FontFamily.body,
      fontSize: 12,
      color: colors.mutedText,
    },
  });
