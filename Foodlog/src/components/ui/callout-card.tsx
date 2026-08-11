import { ArrowRight } from 'phosphor-react-native';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { CommonStyles, FontFamily, Palette, Radius, Spacing } from '@/constants/theme';

type CalloutCardProps = {
  title: string;
  subtitle: string;
  buttonLabel: string;
  onPress?: () => void;
};

/** Centered promo card with a single call-to-action. */
export function CalloutCard({ title, subtitle, buttonLabel, onPress }: CalloutCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
      <Pressable
        onPress={onPress}
        accessibilityRole="button"
        style={({ pressed }) => [CommonStyles.row, styles.button, pressed && styles.pressed]}>
        <Text style={styles.buttonText}>{buttonLabel}</Text>
        <ArrowRight size={16} color={Palette.white} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Palette.sandMuted,
    borderRadius: Radius.lg,
    padding: Spacing.xl,
    alignItems: 'center',
    gap: Spacing.sm,
  },
  title: {
    fontFamily: FontFamily.display,
    fontSize: 20,
    color: Palette.ink,
  },
  subtitle: {
    fontFamily: FontFamily.body,
    fontSize: 14,
    lineHeight: 20,
    color: Palette.inkMuted,
    textAlign: 'center',
  },
  button: {
    justifyContent: 'center',
    gap: Spacing.sm,
    marginTop: Spacing.sm,
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: Radius.pill,
    backgroundColor: Palette.terracotta,
  },
  buttonText: {
    fontFamily: FontFamily.semiBold,
    fontSize: 15,
    color: Palette.white,
  },
  pressed: {
    opacity: 0.9,
  },
});
