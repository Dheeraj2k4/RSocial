import { type Icon } from 'phosphor-react-native';
import { StyleSheet, TextInput, View, type TextInputProps } from 'react-native';

import { FontFamily, Radius, Spacing, type ThemeColors } from '@/constants/theme';
import { useThemedStyles } from '@/theme/use-themed-styles';

type InputFieldProps = TextInputProps & {
  /** Phosphor icon shown as a leading adornment. */
  icon?: Icon;
};

/**
 * A rounded text input with optional leading icon.
 * Reusable across forms for restaurant name, dish name, etc.
 */
export function InputField({ icon: IconComponent, style, ...props }: InputFieldProps) {
  const { styles, colors } = useThemedStyles(createStyles);
  return (
    <View style={styles.container}>
      {IconComponent ? (
        <IconComponent size={18} color={colors.mutedText} weight="regular" />
      ) : null}
      <TextInput
        placeholderTextColor={colors.mutedText}
        style={[styles.input, style]}
        {...props}
      />
    </View>
  );
}

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: Spacing.sm,
      paddingHorizontal: Spacing.lg,
      height: 52,
      borderRadius: Radius.md,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
    },
    input: {
      flex: 1,
      fontFamily: FontFamily.body,
      fontSize: 15,
      color: colors.text,
      paddingVertical: 0,
    },
  });
