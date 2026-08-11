import { StyleSheet, Text } from 'react-native';

import { FontFamily, Palette, Radius } from '@/constants/theme';

export type TagTone = 'accent' | 'olive';

type TagProps = {
  label: string;
  tone?: TagTone;
};

/** Small overlay label (e.g. on restaurant images). */
export function Tag({ label, tone = 'accent' }: TagProps) {
  return <Text style={[styles.tag, tone === 'olive' ? styles.olive : styles.accent]}>{label}</Text>;
}

const styles = StyleSheet.create({
  tag: {
    fontFamily: FontFamily.semiBold,
    fontSize: 10,
    letterSpacing: 0.6,
    color: Palette.white,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: Radius.sm,
    overflow: 'hidden',
  },
  accent: {
    backgroundColor: Palette.terracotta,
  },
  olive: {
    backgroundColor: Palette.olive,
  },
});
