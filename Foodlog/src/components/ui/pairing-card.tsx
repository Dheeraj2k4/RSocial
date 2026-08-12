import { type Icon } from 'phosphor-react-native';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { FontFamily, Radius, Spacing, type ThemeColors } from '@/constants/theme';
import { useThemedStyles } from '@/theme/use-themed-styles';

type PairingCardProps = {
  /** Phosphor icon for the pairing category (e.g. Wine, Fork). */
  icon: Icon;
  /** Category label shown above the name (e.g. "WINE", "SIDE"). */
  category: string;
  name: string;
  onPress?: () => void;
};

/**
 * Compact card used in the "Perfect Pairings" grid.
 * Shows a tinted icon, category label, pairing name and a "See details" link.
 */
export function PairingCard({ icon: IconComponent, category, name, onPress }: PairingCardProps) {
  const { styles, colors } = useThemedStyles(createStyles);

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <View style={styles.iconWrap}>
        <IconComponent size={22} color={colors.accent} />
      </View>
      <Text style={styles.category}>{category}</Text>
      <Text style={styles.name}>{name}</Text>
      <View style={styles.detailsRow}>
        <Text style={styles.detailsText}>See details</Text>
        <Text style={styles.arrow}> ›</Text>
      </View>
    </Pressable>
  );
}

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    card: {
      flex: 1,
      backgroundColor: colors.surface,
      borderRadius: Radius.md,
      padding: Spacing.lg,
      gap: Spacing.xs,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.border,
    },
    pressed: { opacity: 0.8 },
    iconWrap: {
      width: 40,
      height: 40,
      borderRadius: Radius.sm,
      backgroundColor: colors.border,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: Spacing.xs,
    },
    category: {
      fontFamily: FontFamily.semiBold,
      fontSize: 10,
      letterSpacing: 0.8,
      color: colors.mutedText,
      textTransform: 'uppercase',
    },
    name: {
      fontFamily: FontFamily.semiBold,
      fontSize: 15,
      color: colors.text,
    },
    detailsRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: Spacing.xs,
    },
    detailsText: {
      fontFamily: FontFamily.medium,
      fontSize: 13,
      color: colors.accent,
    },
    arrow: {
      fontFamily: FontFamily.medium,
      fontSize: 15,
      color: colors.accent,
    },
  });
