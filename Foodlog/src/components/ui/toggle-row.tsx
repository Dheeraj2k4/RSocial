import { type ReactNode } from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';

import { FontFamily, Palette, Radius, Spacing } from '@/constants/theme';

type ToggleRowProps = {
  /** Leading icon element. */
  icon?: ReactNode;
  title: string;
  subtitle?: string;
  value: boolean;
  onValueChange: (val: boolean) => void;
};

/**
 * Row with a label, optional subtitle and a trailing toggle switch.
 * Used for binary options like "Share to Feed".
 */
export function ToggleRow({ icon, title, subtitle, value, onValueChange }: ToggleRowProps) {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        {icon}
        <View style={styles.textBlock}>
          <Text style={styles.title}>{title}</Text>
          {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        </View>
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: Palette.sandMuted, true: Palette.terracotta }}
        thumbColor={Palette.white}
        ios_backgroundColor={Palette.sandMuted}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Palette.white,
    borderRadius: Radius.md,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderWidth: 1,
    borderColor: Palette.sandMuted,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    flex: 1,
  },
  textBlock: {
    flex: 1,
  },
  title: {
    fontFamily: FontFamily.semiBold,
    fontSize: 15,
    color: Palette.ink,
  },
  subtitle: {
    fontFamily: FontFamily.body,
    fontSize: 13,
    color: Palette.inkMuted,
    marginTop: 1,
  },
});
