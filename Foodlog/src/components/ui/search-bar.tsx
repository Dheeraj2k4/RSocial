import { MagnifyingGlass } from 'phosphor-react-native';
import { type ReactNode } from 'react';
import { StyleSheet, TextInput, View, type TextInputProps } from 'react-native';

import { FontFamily, Radius, Spacing, type ThemeColors } from '@/constants/theme';
import { useThemedStyles } from '@/theme/use-themed-styles';

type SearchBarProps = TextInputProps & {
  /** Optional control shown after a divider (e.g. a filter button). */
  trailing?: ReactNode;
};

/** Rounded search field with a leading icon and optional trailing control. */
export function SearchBar({ style, trailing, ...props }: SearchBarProps) {
  const { styles, colors } = useThemedStyles(createStyles);
  return (
    <View style={styles.container}>
      <MagnifyingGlass size={18} color={colors.mutedText} />
      <TextInput
        placeholderTextColor={colors.mutedText}
        style={[styles.input, style]}
        returnKeyType="search"
        {...props}
      />
      {trailing ? (
        <View style={styles.trailing}>
          <View style={styles.divider} />
          {trailing}
        </View>
      ) : null}
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
      height: 46,
      borderRadius: Radius.md,
      backgroundColor: colors.border,
    },
    input: {
      flex: 1,
      fontFamily: FontFamily.body,
      fontSize: 15,
      color: colors.text,
      paddingVertical: 0,
    },
    trailing: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: Spacing.md,
    },
    divider: {
      width: 1,
      height: 22,
      backgroundColor: colors.secondary,
    },
  });
