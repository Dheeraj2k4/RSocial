import { useRouter } from 'expo-router';
import { BookmarkSimple, MapTrifold } from 'phosphor-react-native';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  CalloutCard,
  Chip,
  IconButton,
  RestaurantListCard,
  Screen,
  SearchBar,
  type TagTone,
} from '@/components/ui';
import { CommonStyles, FontFamily, Radius, Spacing, type ThemeColors } from '@/constants/theme';
import { useThemedStyles } from '@/theme/use-themed-styles';

const CATEGORIES = ['ALL', 'TRENDING', 'BRUNCH', 'JAPANESE'];

type Restaurant = {
  id: string;
  name: string;
  rating: number;
  cuisine: string;
  distance: string;
  time: string;
  tags: { label: string; tone: TagTone }[];
  image: string;
};

// Temporary mock content until the discovery service is wired up.
const RESTAURANTS: Restaurant[] = [
  {
    id: '1',
    name: 'Poke Haven',
    rating: 4.8,
    cuisine: 'Japanese · Healthy',
    distance: '0.8 mi',
    time: '15-25 min',
    tags: [{ label: 'TRENDING', tone: 'accent' }, { label: 'FRESH', tone: 'olive' }],
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: '2',
    name: 'Artesian Crust',
    rating: 4.8,
    cuisine: 'Italian · Pizza',
    distance: '1.2 mi',
    time: '20-30 min',
    tags: [{ label: 'WOOD FIRED', tone: 'olive' }],
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: '3',
    name: 'Green & Grain',
    rating: 4.8,
    cuisine: 'Brunch · Organic',
    distance: '0.5 mi',
    time: '10-20 min',
    tags: [{ label: 'MUST TRY', tone: 'accent' }, { label: 'VEGAN', tone: 'olive' }],
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: '4',
    name: 'Zen Brews',
    rating: 4.7,
    cuisine: 'Cafe · Tea',
    distance: '2.1 mi',
    time: '5-15 min',
    tags: [{ label: 'AESTHETIC', tone: 'accent' }],
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&auto=format&fit=crop&q=80',
  },
];

export default function SearchScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [query, setQuery] = useState('');
  const { styles, colors } = useThemedStyles(createStyles);

  return (
    <View style={CommonStyles.fill}>
      <Screen scroll contentContainerStyle={styles.content}>
        <View style={[CommonStyles.rowBetween, CommonStyles.screenPadded, styles.header]}>
          <Text style={styles.title}>Discover</Text>
          <IconButton icon={BookmarkSimple} accessibilityLabel="Saved places" />
        </View>

        <View style={[CommonStyles.screenPadded, styles.searchRow]}>
          <SearchBar
            placeholder="Search for spots, dishes, or vibes..."
            value={query}
            onChangeText={setQuery}
          />
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.pills}>
          {CATEGORIES.map((category) => (
            <Chip
              key={category}
              label={category}
              active={category === activeCategory}
              onPress={() => setActiveCategory(category)}
            />
          ))}
        </ScrollView>

        <View style={[CommonStyles.rowBetween, CommonStyles.screenPadded, styles.section]}>
          <Text style={styles.sectionTitle}>Recommended for You</Text>
          <Text style={styles.count}>{RESTAURANTS.length} results</Text>
        </View>

        <View style={[CommonStyles.screenPadded, styles.list]}>
          {RESTAURANTS.map((item) => (
            <RestaurantListCard
              key={item.id}
              image={item.image}
              name={item.name}
              rating={item.rating}
              cuisine={item.cuisine}
              distance={item.distance}
              time={item.time}
              tags={item.tags}
              onPress={() => router.push('/restaurant/r1')}
            />
          ))}
        </View>

        <View style={CommonStyles.screenPadded}>
          <CalloutCard
            title="Can't decide?"
            subtitle="Let us curate a personalized list of trending spots near your current location."
            buttonLabel="Spin the Foodlog"
          />
        </View>
      </Screen>

      <View style={[styles.mapWrap, { bottom: insets.bottom + 90 }]}>
        <Pressable style={[CommonStyles.row, styles.mapButton]} accessibilityRole="button">
          <MapTrifold size={18} color={colors.text} />
          <Text style={styles.mapText}>View Map</Text>
        </Pressable>
      </View>
    </View>
  );
}

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    content: {
      paddingTop: Spacing.md,
      paddingBottom: 140,
    },
    header: {
      marginBottom: Spacing.lg,
    },
    title: {
      fontFamily: FontFamily.display,
      fontSize: 32,
      color: colors.text,
    },
    searchRow: {
      marginBottom: Spacing.lg,
    },
    pills: {
      paddingHorizontal: Spacing.xl,
      gap: Spacing.sm,
      paddingBottom: Spacing.xl,
    },
    section: {
      marginBottom: Spacing.md,
    },
    sectionTitle: {
      fontFamily: FontFamily.displaySemiBold,
      fontSize: 20,
      color: colors.text,
    },
    count: {
      fontFamily: FontFamily.body,
      fontSize: 13,
      color: colors.mutedText,
    },
    list: {
      gap: Spacing.lg,
      marginBottom: Spacing.xl,
    },
    mapWrap: {
      position: 'absolute',
      right: Spacing.xl,
      alignItems: 'flex-end',
    },
    mapButton: {
      gap: 6,
      backgroundColor: colors.surface,
      paddingHorizontal: 18,
      paddingVertical: 12,
      borderRadius: Radius.pill,
      borderWidth: 1,
      borderColor: colors.border,
    },
    mapText: {
      fontFamily: FontFamily.semiBold,
      fontSize: 14,
      color: colors.text,
    },
  });
