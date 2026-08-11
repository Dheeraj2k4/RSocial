import { ArrowRight } from 'phosphor-react-native';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { FontFamily, Palette, Radius, Spacing } from '@/constants/theme';

type LogPromptCardProps = {
  title: string;
  subtitle: string;
  onPress?: () => void;
};

/** Olive CTA banner nudging the user to log a visit. */
export function LogPromptCard({ title, subtitle, onPress }: LogPromptCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
      <Pressable
        onPress={onPress}
        accessibilityRole="button"
        style={({ pressed }) => [styles.button, pressed && styles.pressed]}>
        <Text style={styles.buttonText}>Start Logging</Text>
        <ArrowRight size={16} color={Palette.terracotta} weight="bold" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Palette.olive,
    borderRadius: Radius.lg,
    padding: Spacing.xl,
    gap: Spacing.xs,
  },
  title: {
    fontFamily: FontFamily.display,
    fontSize: 20,
    color: Palette.white,
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
    backgroundColor: Palette.white,
  },
  buttonText: {
    fontFamily: FontFamily.semiBold,
    fontSize: 15,
    color: Palette.terracotta,
  },
  pressed: {
    opacity: 0.9,
  },
});
