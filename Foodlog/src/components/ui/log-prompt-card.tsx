import { ArrowRight } from 'phosphor-react-native';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { FontFamily, Radius, Spacing, type ThemeColors } from '@/constants/theme';
import { useThemedStyles } from '@/theme/use-themed-styles';

type LogPromptCardProps = {
  title: string;
  subtitle: string;
  onPress?: () => void;
};

/** Olive CTA banner nudging the user to log a visit. */
export function LogPromptCard({ title, subtitle, onPress }: LogPromptCardProps) {
  const { styles, colors } = useThemedStyles(createStyles);
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
      <Pressable
        onPress={onPress}
        accessibilityRole="button"
        style={({ pressed }) => [styles.button, pressed && styles.pressed]}>
        <Text style={styles.buttonText}>Start Logging</Text>
        <ArrowRight size={16} color={colors.accent} weight="bold" />
      </Pressable>
    </View>
  );
}

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    card: {
      backgroundColor: colors.primary,
      borderRadius: Radius.lg,
      padding: Spacing.xl,
      gap: Spacing.xs,
    },
    title: {
      fontFamily: FontFamily.display,
      fontSize: 20,
      color: colors.white,
    },
    subtitle: {
      fontFamily: FontFamily.body,
      fontSize: 14,
      color: 'rgba(245, 243, 236, 0.85)',
    },
    button: {
      alignSelf: 'flex-start',
      flexDirection: 'row',
      alignItems: 'center',
      gap: Spacing.sm,
      marginTop: Spacing.md,
      paddingVertical: 12,
      paddingHorizontal: Spacing.lg,
      borderRadius: Radius.pill,
      backgroundColor: colors.white,
    },
    buttonText: {
      fontFamily: FontFamily.semiBold,
      fontSize: 15,
      color: colors.accent,
    },
    pressed: {
      opacity: 0.9,
    },
  });
