import { CaretRight, type Icon } from 'phosphor-react-native';
import { type ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { FontFamily, Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/theme/theme-context';
import { withAlpha } from '@/utils';

type SettingsRowProps = {
  icon: Icon;
  label: string;
  /** Muted right-aligned value text (e.g. "English (US)"). */
  value?: string;
  /** Custom trailing element (e.g. a Switch or Badge). */
  right?: ReactNode;
  showChevron?: boolean;
  onPress?: () => void;
};

/** A single settings row: tinted icon, label, optional value/control and chevron. */
export function SettingsRow({
  icon: IconComponent,
  label,
  value,
  right,
  showChevron = true,
  onPress,
}: SettingsRowProps) {
  const { colors } = useTheme();

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      style={({ pressed }) => [styles.row, pressed && onPress ? styles.pressed : null]}>
      <View style={[styles.iconWrap, { backgroundColor: withAlpha(colors.accent, 0.14) }]}>
        <IconComponent size={20} color={colors.accent} />
      </View>

      <Text style={[styles.label, { color: colors.text }]} numberOfLines={1}>
        {label}
      </Text>

      <View style={styles.right}>
        {value ? <Text style={[styles.value, { color: colors.mutedText }]}>{value}</Text> : null}
        {right}
        {showChevron ? <CaretRight size={18} color={colors.mutedText} /> : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
  },
  pressed: {
    opacity: 0.6,
  },
  iconWrap: {
    width: 38,
    height: 38,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    flex: 1,
    fontFamily: FontFamily.medium,
    fontSize: 15,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  value: {
    fontFamily: FontFamily.body,
    fontSize: 14,
  },
});
