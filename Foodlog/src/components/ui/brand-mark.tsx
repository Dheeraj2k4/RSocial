import { ForkKnife } from 'phosphor-react-native';
import { StyleSheet, Text, View } from 'react-native';

import { FontFamily, Palette, Spacing } from '@/constants/theme';

type BrandMarkProps = {
  size?: number;
};

/** Foodlog logo badge + wordmark. */
export function BrandMark({ size = 40 }: BrandMarkProps) {
  return (
    <View style={styles.row}>
      <View style={[styles.badge, { width: size, height: size, borderRadius: size / 2 }]}>
        <ForkKnife size={size * 0.5} color={Palette.white} weight="fill" />
      </View>
      <Text style={styles.name}>Foodlog</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  badge: {
    backgroundColor: Palette.terracotta,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontFamily: FontFamily.display,
    fontSize: 24,
    color: Palette.terracotta,
  },
});
