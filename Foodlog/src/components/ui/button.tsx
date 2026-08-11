import { Pressable, StyleSheet, Text, type PressableProps } from 'react-native';

import { FontFamily, Palette, Radius, Spacing } from '@/constants/theme';

type ButtonVariant = 'primary' | 'secondary';

type ButtonProps = Omit<PressableProps, 'children'> & {
  title: string;
  variant?: ButtonVariant;
};

/** Primary = olive fill (main actions). Secondary = neutral outline. */
export function Button({ title, variant = 'primary', style, disabled, ...props }: ButtonProps) {
  const isPrimary = variant === 'primary';

  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      style={(state) => [
        styles.base,
        isPrimary ? styles.primary : styles.secondary,
        state.pressed && styles.pressed,
        disabled && styles.disabled,
        typeof style === 'function' ? style(state) : style,
      ]}
      {...props}>
      <Text style={[styles.label, isPrimary ? styles.labelPrimary : styles.labelSecondary]}>
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: Spacing.xl,
    borderRadius: Radius.pill,
  },
  primary: {
    backgroundColor: Palette.olive,
  },
  secondary: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: Palette.sand,
  },
  pressed: {
    opacity: 0.85,
  },
  disabled: {
    opacity: 0.5,
  },
  label: {
    fontFamily: FontFamily.semiBold,
    fontSize: 16,
  },
  labelPrimary: {
    color: Palette.white,
  },
  labelSecondary: {
    color: Palette.ink,
  },
});
