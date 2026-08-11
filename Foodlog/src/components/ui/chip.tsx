import { Pressable, StyleSheet, Text } from 'react-native';

import { FontFamily, Palette, Radius, Spacing } from '@/constants/theme';

type ChipProps = {
  label: string;
  active?: boolean;
  onPress?: () => void;
};

/** Pill filter chip. Active = terracotta fill; inactive = neutral outline. */
export function Chip({ label, active = false, onPress }: ChipProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      style={[styles.base, active ? styles.active : styles.inactive]}>
      <Text style={[styles.label, active ? styles.labelActive : styles.labelInactive]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    height: 40,
    paddingHorizontal: Spacing.lg,
    borderRadius: Radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  active: {
    backgroundColor: Palette.terracotta,
  },
  inactive: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Palette.sand,
  },
  label: {
    fontFamily: FontFamily.medium,
    fontSize: 14,
  },
  labelActive: {
    color: Palette.white,
  },
  labelInactive: {
    color: Palette.ink,
  },
});
