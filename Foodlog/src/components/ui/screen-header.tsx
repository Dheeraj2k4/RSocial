import { CaretLeft } from 'phosphor-react-native';
import { useRouter } from 'expo-router';
import { type ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { FontFamily, Spacing, type ThemeColors } from '@/constants/theme';
import { useThemedStyles } from '@/theme/use-themed-styles';

type ScreenHeaderProps = {
  title: string;
  showBack?: boolean;
  onBack?: () => void;
  right?: ReactNode;
};

/** Consistent top bar with optional back control and a right-side slot. */
export function ScreenHeader({ title, showBack = false, onBack, right }: ScreenHeaderProps) {
  const router = useRouter();
  const { styles, colors } = useThemedStyles(createStyles);
  const handleBack = onBack ?? (() => router.back());

  return (
    <View style={styles.container}>
      <View style={styles.side}>
        {showBack ? (
          <Pressable
            onPress={handleBack}
            hitSlop={8}
            accessibilityRole="button"
            accessibilityLabel="Go back">
            <CaretLeft size={24} color={colors.text} />
          </Pressable>
        ) : null}
      </View>

      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>

      <View style={[styles.side, styles.right]}>{right}</View>
    </View>
  );
}

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      height: 52,
      paddingHorizontal: Spacing.lg,
    },
    side: {
      minWidth: 40,
      justifyContent: 'center',
    },
    right: {
      alignItems: 'flex-end',
    },
    title: {
      flex: 1,
      textAlign: 'center',
      fontFamily: FontFamily.semiBold,
      fontSize: 18,
      color: colors.text,
    },
  });
