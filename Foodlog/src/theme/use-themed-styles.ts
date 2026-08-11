import { useMemo } from 'react';

import { type ThemeColors } from '@/constants/theme';
import { useTheme } from './theme-context';

/**
 * Build theme-aware styles from the active colors.
 * Returns both the memoized styles and the raw colors (for inline icon colors).
 */
export function useThemedStyles<T>(factory: (colors: ThemeColors) => T): { styles: T; colors: ThemeColors } {
  const { colors } = useTheme();
  const styles = useMemo(() => factory(colors), [colors]);
  return { styles, colors };
}
