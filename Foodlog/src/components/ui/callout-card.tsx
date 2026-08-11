import { ArrowRight } from 'phosphor-react-native';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { CommonStyles, FontFamily, Radius, Spacing, type ThemeColors } from '@/constants/theme';
import { useThemedStyles } from '@/theme/use-themed-styles';

type CalloutCardProps = {
  title: string;
  subtitle: string;
  buttonLabel: string;
  onPress?: () => void;
};

/** Centered promo card with a single call-to-action. */
export function CalloutCard({ title, subtitle, buttonLabel, onPress }: CalloutCardProps) {
  const { styles, colors } = useThemedStyles(createStyles);
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
      <Pressable
        onPress={onPress}
        accessibilityRole="button"
        style={({ pressed }) => [CommonStyles.row, styles.button, pressed && styles.pressed]}>
        <Text style={styles.buttonText}>{buttonLabel}</Text>
        <ArrowRight size={16} color={colors.white} />
      </Pressable>
    </View>
  );
}

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    card: {
      backgroundColor: colors.border,
      borderRadius: Radius.lg,
      padding: Spacing.xl,
      alignItems: 'center',
      gap: Spacing.sm,
    },
    title: {
      fontFamily: FontFamily.display,
      fontSize: 20,
      color: colors.text,
    },
    subtitle: {
      fontFamily: FontFamily.body,
      fontSize: 14,
      lineHeight: 20,
      color: colors.mutedText,
      textAlign: 'center',
    },
    button: {
      justifyContent: 'center',
      gap: Spacing.sm,
      marginTop: Spacing.sm,
      paddingHorizontal: 24,
      paddingVertical: 14,
      borderRadius: Radius.pill,
      backgroundColor: colors.accent,
    },
    buttonText: {
      fontFamily: FontFamily.semiBold,
      fontSize: 15,
      color: colors.white,
    },
    pressed: {
      opacity: 0.9,
    },
  });
