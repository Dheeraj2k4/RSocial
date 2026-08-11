import { Image } from 'expo-image';
import { Pressable, StyleSheet, Text } from 'react-native';

import { FontFamily, Palette, Spacing } from '@/constants/theme';

type CircleCardProps = {
  image: string;
  label: string;
  onPress?: () => void;
  size?: number;
};

/** Circular thumbnail with a caption — used in discovery rows. */
export function CircleCard({ image, label, onPress, size = 92 }: CircleCardProps) {
  return (
    <Pressable onPress={onPress} accessibilityRole="button" style={styles.container}>
      <Image
        source={{ uri: image }}
        style={[styles.image, { width: size, height: size, borderRadius: size / 2 }]}
        contentFit="cover"
        transition={300}
      />
      <Text style={styles.label} numberOfLines={1}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 100,
    alignItems: 'center',
  },
  image: {
    backgroundColor: Palette.sandMuted,
    borderWidth: 3,
    borderColor: Palette.white,
  },
  label: {
    fontFamily: FontFamily.semiBold,
    fontSize: 12,
    color: Palette.ink,
    marginTop: Spacing.sm,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});
