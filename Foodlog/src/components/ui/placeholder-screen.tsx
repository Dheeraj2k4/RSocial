import { ForkKnife, type Icon } from 'phosphor-react-native';
import { type ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { FontFamily, Palette, Radius, Spacing } from '@/constants/theme';

type PlaceholderScreenProps = {
  title: string;
  subtitle?: string;
  icon?: Icon;
  children?: ReactNode;
};

/** Centered empty/placeholder state used for scaffolded screens and empty lists. */
export function PlaceholderScreen({
  title,
  subtitle,
  icon: IconComponent = ForkKnife,
  children,
}: PlaceholderScreenProps) {
  return (
    <View style={styles.container}>
      <View style={styles.iconWrap}>
        <IconComponent size={34} color={Palette.olive} />
      </View>

      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}

      {children ? <View style={styles.actions}>{children}</View> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.xl,
    gap: Spacing.sm,
  },
  iconWrap: {
    width: 72,
    height: 72,
    borderRadius: Radius.pill,
    backgroundColor: Palette.sandMuted,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
  },
  title: {
    fontFamily: FontFamily.display,
    fontSize: 22,
    color: Palette.ink,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: FontFamily.body,
    fontSize: 15,
    lineHeight: 21,
    color: Palette.inkMuted,
    textAlign: 'center',
    maxWidth: 300,
  },
  actions: {
    width: '100%',
    maxWidth: 320,
    marginTop: Spacing.lg,
    gap: Spacing.md,
  },
});
