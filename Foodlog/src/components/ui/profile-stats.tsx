import { Fragment } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { FontFamily, Radius, Spacing, type ThemeColors } from '@/constants/theme';
import { useThemedStyles } from '@/theme/use-themed-styles';
import { withAlpha } from '@/utils';

type Stat = { value: string; label: string };

type ProfileStatsProps = {
  stats: Stat[];
};

/** Horizontal stats card (logs / fans / faves) with divider separators. */
export function ProfileStats({ stats }: ProfileStatsProps) {
  const { styles } = useThemedStyles(createStyles);

  return (
    <View style={styles.card}>
      {stats.map((stat, index) => (
        <Fragment key={stat.label}>
          {index > 0 ? <View style={styles.divider} /> : null}
          <View style={styles.item}>
            <Text style={styles.value}>{stat.value}</Text>
            <Text style={styles.label}>{stat.label}</Text>
          </View>
        </Fragment>
      ))}
    </View>
  );
}

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    card: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.secondary,
      borderRadius: Radius.lg,
      paddingVertical: Spacing.md,
    },
    item: {
      flex: 1,
      alignItems: 'center',
      gap: 2,
    },
    value: {
      fontFamily: FontFamily.semiBold,
      fontSize: 18,
      color: colors.text,
    },
    label: {
      fontFamily: FontFamily.body,
      fontSize: 12,
      color: colors.mutedText,
    },
    divider: {
      width: StyleSheet.hairlineWidth,
      height: 28,
      backgroundColor: withAlpha(colors.text, 0.15),
    },
  });
