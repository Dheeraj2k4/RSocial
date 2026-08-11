import { ForkKnife } from 'phosphor-react-native';
import { StyleSheet, Text, View } from 'react-native';

import { FontFamily, Spacing, type ThemeColors } from '@/constants/theme';
import { useThemedStyles } from '@/theme/use-themed-styles';

type BrandMarkProps = {
  size?: number;
};

/** Foodlog logo badge + wordmark. */
export function BrandMark({ size = 40 }: BrandMarkProps) {
  const { styles, colors } = useThemedStyles(createStyles);
  return (
    <View style={styles.row}>
      <View style={[styles.badge, { width: size, height: size, borderRadius: size / 2 }]}>
        <ForkKnife size={size * 0.5} color={colors.white} weight="fill" />
      </View>
      <Text style={styles.name}>Foodlog</Text>
    </View>
  );
}

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: Spacing.sm,
    },
    badge: {
      backgroundColor: colors.accent,
      alignItems: 'center',
      justifyContent: 'center',
    },
    name: {
      fontFamily: FontFamily.display,
      fontSize: 24,
      color: colors.accent,
    },
  });
