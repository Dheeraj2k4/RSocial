import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { CaretRight, Lock, Plus } from 'phosphor-react-native';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { IconButton, Screen, ScreenHeader } from '@/components/ui';
import { CommonStyles, FontFamily, Radius, Spacing, type ThemeColors } from '@/constants/theme';
import { useThemedStyles } from '@/theme/use-themed-styles';

type List = {
  id: string;
  title: string;
  count: number;
  private?: boolean;
  covers: string[];
};

const LISTS: List[] = [
  {
    id: 'l1',
    title: 'Weekend Brunch',
    count: 12,
    covers: [
      'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=200&auto=format&fit=crop&q=80',
    ],
  },
  {
    id: 'l2',
    title: 'Coffee Nooks',
    count: 8,
    covers: [
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=200&auto=format&fit=crop&q=80',
    ],
  },
  {
    id: 'l3',
    title: 'Date Night Dinners',
    count: 15,
    private: true,
    covers: [
      'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&auto=format&fit=crop&q=80',
    ],
  },
  {
    id: 'l4',
    title: 'Want to Try',
    count: 27,
    covers: [
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=200&auto=format&fit=crop&q=80',
    ],
  },
];

export default function ListsScreen() {
  const router = useRouter();
  const { styles, colors } = useThemedStyles(createStyles);

  return (
    <Screen scroll contentContainerStyle={styles.content}>
      <ScreenHeader
        title="My Lists"
        showBack
        right={<IconButton icon={Plus} accessibilityLabel="Create list" />}
      />

      <Pressable style={[CommonStyles.row, styles.createRow]} accessibilityRole="button">
        <View style={styles.createIcon}>
          <Plus size={20} color={colors.accent} weight="bold" />
        </View>
        <Text style={styles.createText}>Create a new list</Text>
      </Pressable>

      <View style={styles.list}>
        {LISTS.map((item) => (
          <Pressable
            key={item.id}
            onPress={() => router.push('/list/l1')}
            accessibilityRole="button"
            style={[CommonStyles.row, styles.row]}>
            <View style={styles.covers}>
              <Image source={{ uri: item.covers[0] }} style={styles.coverBack} contentFit="cover" />
              <Image source={{ uri: item.covers[1] }} style={styles.coverFront} contentFit="cover" />
            </View>

            <View style={styles.body}>
              <View style={[CommonStyles.row, styles.titleRow]}>
                <Text style={styles.title} numberOfLines={1}>
                  {item.title}
                </Text>
                {item.private ? <Lock size={13} color={colors.mutedText} weight="fill" /> : null}
              </View>
              <Text style={styles.count}>
                {item.count} spots{item.private ? ' · Private' : ''}
              </Text>
            </View>

            <CaretRight size={18} color={colors.mutedText} />
          </Pressable>
        ))}
      </View>
    </Screen>
  );
}

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    content: {
      paddingBottom: 140,
    },
    createRow: {
      gap: Spacing.md,
      marginHorizontal: Spacing.xl,
      marginTop: Spacing.sm,
      marginBottom: Spacing.lg,
      padding: Spacing.md,
      borderRadius: Radius.md,
      borderWidth: 1,
      borderStyle: 'dashed',
      borderColor: colors.border,
    },
    createIcon: {
      width: 40,
      height: 40,
      borderRadius: Radius.pill,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.secondary,
    },
    createText: {
      fontFamily: FontFamily.semiBold,
      fontSize: 15,
      color: colors.text,
    },
    list: {
      paddingHorizontal: Spacing.xl,
      gap: Spacing.md,
    },
    row: {
      gap: Spacing.md,
      paddingVertical: Spacing.sm,
    },
    covers: {
      width: 64,
      height: 56,
    },
    coverBack: {
      position: 'absolute',
      right: 0,
      top: 4,
      width: 52,
      height: 48,
      borderRadius: Radius.sm,
      backgroundColor: colors.border,
      opacity: 0.6,
    },
    coverFront: {
      position: 'absolute',
      left: 0,
      bottom: 0,
      width: 52,
      height: 52,
      borderRadius: Radius.sm,
      backgroundColor: colors.border,
      borderWidth: 2,
      borderColor: colors.background,
    },
    body: {
      flex: 1,
      gap: 2,
    },
    titleRow: {
      gap: Spacing.sm,
    },
    title: {
      fontFamily: FontFamily.displaySemiBold,
      fontSize: 16,
      color: colors.text,
    },
    count: {
      fontFamily: FontFamily.body,
      fontSize: 13,
      color: colors.mutedText,
    },
  });
