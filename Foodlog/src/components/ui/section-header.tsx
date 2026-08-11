import { type Icon } from 'phosphor-react-native';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { CommonStyles, FontFamily, Palette, Spacing } from '@/constants/theme';

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
  const hasAction = Boolean(actionLabel || ActionIcon);

  return (
    <View style={CommonStyles.rowBetween}>
      <View style={[CommonStyles.row, styles.titleRow]}>
        {IconComponent ? <IconComponent size={20} color={Palette.terracotta} weight="bold" /> : null}
        <Text style={styles.title}>{title}</Text>
      </View>
      {hasAction ? (
        <Pressable onPress={onActionPress} hitSlop={8} accessibilityRole="button">
          {actionLabel ? <Text style={styles.action}>{actionLabel}</Text> : null}
          {ActionIcon ? <ActionIcon size={20} color={Palette.inkMuted} /> : null}
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  titleRow: {
    gap: Spacing.sm,
  },
  title: {
    fontFamily: FontFamily.display,
    fontSize: 22,
    color: Palette.ink,
  },
  action: {
    fontFamily: FontFamily.medium,
    fontSize: 14,
    color: Palette.terracotta,
  },
});
