import { type Icon } from 'phosphor-react-native';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { CommonStyles, FontFamily, Spacing, type ThemeColors } from '@/constants/theme';
import { useThemedStyles } from '@/theme/use-themed-styles';

type SectionHeaderProps = {
  title: string;
  icon?: Icon;
  actionLabel?: string;
  actionIcon?: Icon;
  onActionPress?: () => void;
};

/** Editorial section title with an optional leading icon and right-side action. */
export function SectionHeader({
  title,
  icon: IconComponent,
  actionLabel,
  actionIcon: ActionIcon,
  onActionPress,
}: SectionHeaderProps) {
  const { styles, colors } = useThemedStyles(createStyles);
  const hasAction = Boolean(actionLabel || ActionIcon);

  return (
    <View style={CommonStyles.rowBetween}>
      <View style={[CommonStyles.row, styles.titleRow]}>
        {IconComponent ? <IconComponent size={20} color={colors.accent} weight="bold" /> : null}
        <Text style={styles.title}>{title}</Text>
      </View>
      {hasAction ? (
        <Pressable onPress={onActionPress} hitSlop={8} accessibilityRole="button">
          {actionLabel ? <Text style={styles.action}>{actionLabel}</Text> : null}
          {ActionIcon ? <ActionIcon size={20} color={colors.mutedText} /> : null}
        </Pressable>
      ) : null}
    </View>
  );
}

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    titleRow: {
      gap: Spacing.sm,
    },
    title: {
      fontFamily: FontFamily.display,
      fontSize: 22,
      color: colors.text,
    },
    action: {
      fontFamily: FontFamily.medium,
      fontSize: 14,
      color: colors.accent,
    },
  });
