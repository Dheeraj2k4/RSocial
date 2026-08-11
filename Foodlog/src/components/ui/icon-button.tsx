import { type Icon } from 'phosphor-react-native';
import { Pressable, StyleSheet, View } from 'react-native';

import { Palette, Radius } from '@/constants/theme';

type IconButtonProps = {
  icon: Icon;
  accessibilityLabel: string;
  onPress?: () => void;
  size?: number;
  color?: string;
  /** Show a small accent notification dot. */
  badge?: boolean;
};

/** Tappable Phosphor icon with an optional notification dot. */
export function IconButton({
  icon: IconComponent,
  accessibilityLabel,
  onPress,
  size = 24,
  color = Palette.ink,
  badge = false,
}: IconButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      hitSlop={8}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}>
      <IconComponent size={size} color={color} />
      {badge ? <View style={styles.badge} /> : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 4,
  },
  pressed: {
    opacity: 0.6,
  },
  badge: {
    position: 'absolute',
    top: 2,
    right: 2,
    width: 8,
    height: 8,
    borderRadius: Radius.pill,
    backgroundColor: Palette.terracotta,
    borderWidth: 1.5,
    borderColor: Palette.offWhite,
  },
});
