import { type Icon } from 'phosphor-react-native';
import { StyleSheet, TextInput, View, type TextInputProps } from 'react-native';

import { FontFamily, Palette, Radius, Spacing } from '@/constants/theme';

type InputFieldProps = TextInputProps & {
  /** Phosphor icon shown as a leading adornment. */
  icon?: Icon;
};

/**
 * A rounded text input with optional leading icon.
 * Reusable across forms for restaurant name, dish name, etc.
 */
export function InputField({ icon: IconComponent, style, ...props }: InputFieldProps) {
  return (
    <View style={styles.container}>
      {IconComponent ? (
        <IconComponent size={18} color={Palette.inkMuted} weight="regular" />
      ) : null}
      <TextInput
        placeholderTextColor={Palette.inkMuted}
        style={[styles.input, style]}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    height: 52,
    borderRadius: Radius.md,
    backgroundColor: Palette.white,
    borderWidth: 1,
    borderColor: Palette.sandMuted,
  },
  input: {
    flex: 1,
    fontFamily: FontFamily.body,
    fontSize: 15,
    color: Palette.ink,
    paddingVertical: 0,
  },
});
