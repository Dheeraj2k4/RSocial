import { type Icon } from 'phosphor-react-native';
import { Pressable, StyleSheet, View } from 'react-native';

import { Radius, type ThemeColors } from '@/constants/theme';
import { useThemedStyles } from '@/theme/use-themed-styles';

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
  color,
  badge = false,
}: IconButtonProps) {
  const { styles, colors } = useThemedStyles(createStyles);
  return (
    <Pressable
      onPress={onPress}
      hitSlop={8}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}>
      <IconComponent size={size} color={color ?? colors.text} />
      {badge ? <View style={styles.badge} /> : null}
    </Pressable>
  );
}

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
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
      backgroundColor: colors.accent,
      borderWidth: 1.5,
      borderColor: colors.background,
    },
  });
