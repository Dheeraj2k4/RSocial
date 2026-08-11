import { type Icon } from 'phosphor-react-native';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { CommonStyles, FontFamily, Radius, type ThemeColors } from '@/constants/theme';
import { useThemedStyles } from '@/theme/use-themed-styles';

type Segment = {
  key: string;
  label: string;
  icon?: Icon;
};

type SegmentedControlProps = {
  segments: Segment[];
  value: string;
  onChange: (key: string) => void;
};

/** Pill segmented control; the active segment gets a raised surface pill. */
export function SegmentedControl({ segments, value, onChange }: SegmentedControlProps) {
  const { styles, colors } = useThemedStyles(createStyles);

  return (
    <View style={styles.track}>
      {segments.map((segment) => {
        const active = segment.key === value;
        const SegmentIcon = segment.icon;
        const tint = active ? colors.text : colors.mutedText;
        return (
          <Pressable
            key={segment.key}
            onPress={() => onChange(segment.key)}
            accessibilityRole="button"
            style={[CommonStyles.row, styles.segment, active && styles.segmentActive]}>
            {SegmentIcon ? (
              <SegmentIcon size={16} color={tint} weight={active ? 'fill' : 'regular'} />
            ) : null}
            <Text style={[styles.label, { color: tint }]}>{segment.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    track: {
      flexDirection: 'row',
      gap: 4,
      padding: 4,
      borderRadius: Radius.pill,
      backgroundColor: colors.border,
    },
    segment: {
      flex: 1,
      justifyContent: 'center',
      gap: 6,
      paddingVertical: 10,
      borderRadius: Radius.pill,
    },
    segmentActive: {
      backgroundColor: colors.surface,
    },
    label: {
      fontFamily: FontFamily.medium,
      fontSize: 13,
    },
  });
