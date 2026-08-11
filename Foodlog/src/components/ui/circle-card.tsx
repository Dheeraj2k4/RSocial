import { Image } from 'expo-image';
import { Pressable, StyleSheet, Text } from 'react-native';

import { FontFamily, Spacing, type ThemeColors } from '@/constants/theme';
import { useThemedStyles } from '@/theme/use-themed-styles';

type CircleCardProps = {
  image: string;
  label: string;
  onPress?: () => void;
  size?: number;
};

/** Circular thumbnail with a caption — used in discovery rows. */
export function CircleCard({ image, label, onPress, size = 92 }: CircleCardProps) {
  const { styles } = useThemedStyles(createStyles);
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

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      width: 100,
      alignItems: 'center',
    },
    image: {
      backgroundColor: colors.border,
      borderWidth: 3,
      borderColor: colors.background,
    },
    label: {
      fontFamily: FontFamily.semiBold,
      fontSize: 12,
      color: colors.text,
      marginTop: Spacing.sm,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },
  });
