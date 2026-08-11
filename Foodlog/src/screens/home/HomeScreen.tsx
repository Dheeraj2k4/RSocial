import { useRouter } from 'expo-router';
import { Bell, CaretRight, Funnel, Medal, TrendUp } from 'phosphor-react-native';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import {
  ActivityRow,
  Avatar,
  Chip,
  CircleCard,
  FeaturedRestaurantCard,
  IconButton,
  LogPromptCard,
  Screen,
  SearchBar,
  SectionHeader,
} from '@/components/ui';
import { CommonStyles, FontFamily, Palette, Spacing } from '@/constants/theme';

// Temporary mock content until the discovery service is wired up.
const CATEGORIES = ['all', 'trending', 'nearby', 'healthy', 'desserts', 'drinks'];

const TRENDING = [
  { id: 't1', label: 'Poke Bowls', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80' },
  { id: 't2', label: 'Matcha Love', image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=400&q=80' },
  { id: 't3', label: 'Cold Brew', image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=400&q=80' },
  { id: 't4', label: 'Truffle Pasta', image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=400&q=80' },
  { id: 't5', label: 'Ramen', image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=400&q=80' },
];

const AVATAR = 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80';

const EDITORS_CHOICE = [
  { id: 'e1', name: 'The Minimalist Cafe', distance: '0.8 km', time: '15-20 min', cuisine: 'Modern European', rating: 4.9, image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80' },
  { id: 'e2', name: 'Artisanal Burger Co.', distance: '1.2 km', time: '25-30 min', cuisine: 'Gourmet Burgers', rating: 4.7, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80' },
];

const LIKED_AVATARS = [
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80',
];

const RECENT = [
  { id: 'l1', name: 'The Brunch Club', quote: '“The best Eggs Benedict I’ve had in ages!”', likedBy: 'liked by sarah & 12 others', image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=200&q=80' },
  { id: 'l2', name: 'Pasta & Co.', quote: '“Incredible handmade pasta, worth the wait.”', likedBy: 'liked by mia & 8 others', image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=200&q=80' },
];

export default function HomeScreen() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState('all');

  return (
    <Screen scroll>
      <View style={[CommonStyles.rowBetween, styles.header]}>
        <View style={[CommonStyles.row, styles.greeting]}>
          <Avatar source={AVATAR} online />
          <View>
            <Text style={styles.greetingLabel}>good morning,</Text>
            <Text style={styles.greetingName}>Alex Rivera</Text>
          </View>
        </View>
        <IconButton icon={Bell} accessibilityLabel="Notifications" badge />
      </View>

      <View style={CommonStyles.screenPadded}>
        <SearchBar
          placeholder="Search dishes, cafes, or chefs..."
          trailing={<IconButton icon={Funnel} accessibilityLabel="Filters" size={20} color={Palette.inkMuted} />}
        />
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
        {CATEGORIES.map((category) => (
          <Chip
            key={category}
            label={category}
            active={activeCategory === category}
            onPress={() => setActiveCategory(category)}
          />
        ))}
      </ScrollView>

      <View style={[CommonStyles.screenPadded, styles.section]}>
        <SectionHeader title="Trending Now" icon={TrendUp} actionLabel="see all" />
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.trending}>
        {TRENDING.map((item) => (
          <CircleCard
            key={item.id}
            image={item.image}
            label={item.label}
            onPress={() => router.push('/restaurant/r1')}
          />
        ))}
      </ScrollView>

      <View style={[CommonStyles.screenPadded, styles.section]}>
        <SectionHeader title="Editor's Choice" icon={Medal} />
      </View>

      <View style={CommonStyles.screenPadded}>
        {EDITORS_CHOICE.map((item) => (
          <View key={item.id} style={styles.featured}>
            <FeaturedRestaurantCard
              image={item.image}
              name={item.name}
              distance={item.distance}
              time={item.time}
              cuisine={item.cuisine}
              rating={item.rating}
              onPress={() => router.push('/restaurant/r1')}
            />
          </View>
        ))}
      </View>

      <View style={CommonStyles.screenPadded}>
        <LogPromptCard
          title="Keep your streak going"
          subtitle="Log the last place you ate."
          onPress={() => router.push('/log')}
        />
      </View>

      <View style={[CommonStyles.screenPadded, styles.section]}>
        <SectionHeader title="Recently Logged Nearby" actionIcon={CaretRight} />
      </View>

      <View style={[CommonStyles.screenPadded, styles.recent]}>
        {RECENT.map((item) => (
          <ActivityRow
            key={item.id}
            image={item.image}
            name={item.name}
            quote={item.quote}
            likedBy={item.likedBy}
            likedAvatars={LIKED_AVATARS}
            onPress={() => router.push('/restaurant/r1')}
          />
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.lg,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Palette.sandMuted,
  },
  greeting: {
    gap: Spacing.md,
  },
  greetingLabel: {
    fontFamily: FontFamily.body,
    fontSize: 13,
    color: Palette.inkMuted,
  },
  greetingName: {
    fontFamily: FontFamily.semiBold,
    fontSize: 20,
    color: Palette.ink,
  },
  chips: {
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    gap: Spacing.sm,
  },
  section: {
    marginTop: Spacing.lg,
    marginBottom: Spacing.md,
  },
  trending: {
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.xl,
    gap: Spacing.lg,
  },
  featured: {
    marginBottom: Spacing.lg,
  },
  recent: {
    paddingBottom: Spacing.xxxl,
  },
});
