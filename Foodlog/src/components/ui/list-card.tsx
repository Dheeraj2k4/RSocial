import { type Icon } from 'phosphor-react-native';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { FontFamily, Radius, Spacing, type ThemeColors } from '@/constants/theme';
import { useThemedStyles } from '@/theme/use-themed-styles';
import { withAlpha } from '@/utils';

type ListCardProps = {
  icon: Icon;
  title: string;
  subtitle: string;
  onPress?: () => void;
};

/** Compact curated-list card: tinted icon, title and count. */
export function ListCard({ icon: IconComponent, title, subtitle, onPress }: ListCardProps) {
  const { styles, colors } = useThemedStyles(createStyles);

  return (
    <Pressable onPress={onPress} accessibilityRole="button" style={styles.card}>
      <View style={styles.iconWrap}>
        <IconComponent size={22} color={colors.accent} />
      </View>
      <View>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    </Pressable>
  );
}

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    card: {
      width: 156,
      height: 140,
      justifyContent: 'space-between',
      backgroundColor: colors.secondary,
      borderRadius: Radius.lg,
      padding: Spacing.lg,
    },
    iconWrap: {
      width: 44,
      height: 44,
      borderRadius: Radius.md,
      backgroundColor: withAlpha(colors.accent, 0.18),
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontFamily: FontFamily.semiBold,
      fontSize: 15,
      color: colors.text,
    },
    subtitle: {
      fontFamily: FontFamily.body,
      fontSize: 12,
      color: colors.mutedText,
      marginTop: 2,
    },
  });
