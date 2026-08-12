import { StyleSheet, Text } from 'react-native';

import { FontFamily, Radius, type ThemeColors } from '@/constants/theme';
import { useThemedStyles } from '@/theme/use-themed-styles';

export type TagTone = 'accent' | 'olive';

type TagProps = {
  label: string;
  tone?: TagTone;
};

/** Small overlay label (e.g. on restaurant images). */
export function Tag({ label, tone = 'accent' }: TagProps) {
  const { styles } = useThemedStyles(createStyles);
  return <Text style={[styles.tag, tone === 'olive' ? styles.olive : styles.accent]}>{label}</Text>;
}

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    tag: {
      fontFamily: FontFamily.semiBold,
      fontSize: 10,
      letterSpacing: 0.6,
      color: colors.white,      alignSelf: 'flex-start',      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: Radius.sm,
      overflow: 'hidden',
    },
    accent: {
      backgroundColor: colors.accent,
    },
    olive: {
      backgroundColor: colors.primary,
    },
  });
