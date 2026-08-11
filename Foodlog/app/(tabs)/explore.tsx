import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Fonts, Palette, Radius, Spacing } from '@/constants/theme';

// ── Filter categories ──────────────────────────────────────────────
const CATEGORIES = ['ALL', 'TRENDING', 'BRUNCH', 'JAPANESE'];

// ── Mock restaurant data ────────────────────────────────────────────
const RESTAURANTS = [
  {
    id: '1',
    name: 'Poke Haven',
    rating: '4.8',
    cuisine: 'Japanese · Healthy',
    distance: '0.8 mi',
    time: '15-25 min',
    tags: ['TRENDING', 'FRESH'],
    image:
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: '2',
    name: 'Artesian Crust',
    rating: '4.8',
    cuisine: 'Italian · Pizza',
    distance: '1.2 mi',
    time: '20-30 min',
    tags: ['WOOD FIRED'],
    image:
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: '3',
    name: 'Green & Grain',
    rating: '4.8',
    cuisine: 'Brunch · Organic',
    distance: '0.5 mi',
    time: '10-20 min',
    tags: ['MUST TRY', 'VEGAN'],
    image:
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: '4',
    name: 'Zen Brews',
    rating: '4.7',
    cuisine: 'Cafe · Tea',
    distance: '2.1 mi',
    time: '5-15 min',
    tags: ['AESTHETIC'],
    image:
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&auto=format&fit=crop&q=80',
  },
];

// ── Tag colours ─────────────────────────────────────────────────────
const TAG_COLOURS: Record<string, { bg: string; fg: string }> = {
  TRENDING: { bg: 'rgba(201,107,69,0.85)', fg: '#fff' },
  FRESH: { bg: 'rgba(89,99,74,0.85)', fg: '#fff' },
  'WOOD FIRED': { bg: 'rgba(89,99,74,0.85)', fg: '#fff' },
  'MUST TRY': { bg: 'rgba(201,107,69,0.85)', fg: '#fff' },
  VEGAN: { bg: 'rgba(89,99,74,0.85)', fg: '#fff' },
  AESTHETIC: { bg: 'rgba(201,107,69,0.85)', fg: '#fff' },
};

export default function SearchScreen() {
  const insets = useSafeAreaInsets();
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: insets.top + Spacing.md,
          paddingBottom: insets.bottom + 100, // extra room for floating button
        }}
      >
        {/* ── Header ──────────────────────────────────────────── */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Discover</Text>
          <Pressable hitSlop={8}>
            <Ionicons name="bookmark-outline" size={24} color={Palette.ink} />
          </Pressable>
        </View>

        {/* ── Search Bar ──────────────────────────────────────── */}
        <View style={styles.searchRow}>
          <View style={styles.searchBar}>
            <Ionicons
              name="search"
              size={20}
              color="rgba(32,35,29,0.4)"
              style={styles.searchIcon}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Search for spots, dishes, or vibes..."
              placeholderTextColor="rgba(32,35,29,0.4)"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        {/* ── Category Pills ──────────────────────────────────── */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.pillsContainer}
        >
          {CATEGORIES.map((cat) => {
            const isActive = cat === activeCategory;
            return (
              <Pressable
                key={cat}
                onPress={() => setActiveCategory(cat)}
                style={[styles.pill, isActive && styles.pillActive]}
              >
                <Text style={[styles.pillText, isActive && styles.pillTextActive]}>
                  {cat}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        {/* ── Section Header ──────────────────────────────────── */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recommended for You</Text>
          <Text style={styles.resultCount}>
            {RESTAURANTS.length} results
          </Text>
        </View>

        {/* ── Restaurant Cards ────────────────────────────────── */}
        <View style={styles.cardList}>
          {RESTAURANTS.map((item) => (
            <View key={item.id} style={styles.card}>
              {/* Image */}
              <View style={styles.cardImageContainer}>
                <Image source={item.image} style={styles.cardImage} />

                {/* Overlay Tags */}
                <View style={styles.tagRow}>
                  {item.tags.map((tag) => {
                    const colour = TAG_COLOURS[tag] ?? {
                      bg: 'rgba(0,0,0,0.5)',
                      fg: '#fff',
                    };
                    return (
                      <View
                        key={tag}
                        style={[styles.tag, { backgroundColor: colour.bg }]}
                      >
                        <Text style={[styles.tagText, { color: colour.fg }]}>
                          {tag}
                        </Text>
                      </View>
                    );
                  })}
                </View>
              </View>

              {/* Info */}
              <View style={styles.cardBody}>
                <View style={styles.cardTitleRow}>
                  <Text style={styles.cardName}>{item.name}</Text>
                  <View style={styles.ratingBadge}>
                    <Ionicons name="star" size={12} color="#F5A623" />
                    <Text style={styles.ratingText}>{item.rating}</Text>
                  </View>
                </View>
                <Text style={styles.cuisineText}>{item.cuisine}</Text>

                <View style={styles.cardMetaRow}>
                  <View style={styles.metaItem}>
                    <Ionicons
                      name="location-outline"
                      size={14}
                      color={Palette.inkMuted}
                    />
                    <Text style={styles.metaText}>{item.distance}</Text>
                  </View>
                  <View style={styles.metaItem}>
                    <Ionicons
                      name="time-outline"
                      size={14}
                      color={Palette.inkMuted}
                    />
                    <Text style={styles.metaText}>{item.time}</Text>
                  </View>
                  <Pressable style={styles.viewDetailsBtn}>
                    <Text style={styles.viewDetailsText}>View Details</Text>
                    <Ionicons
                      name="chevron-forward"
                      size={14}
                      color={Palette.terracotta}
                    />
                  </Pressable>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* ── CTA Card ────────────────────────────────────────── */}
        <View style={styles.ctaCard}>
          <Text style={styles.ctaTitle}>{"Can't decide?"}</Text>
          <Text style={styles.ctaSubtitle}>
            Let us curate a personalized list of trending spots near your
            current location.
          </Text>
          <Pressable style={styles.ctaButton}>
            <Text style={styles.ctaButtonText}>Spin the Foodlog</Text>
            <Ionicons
              name="arrow-forward"
              size={16}
              color={Palette.white}
              style={{ marginLeft: 6 }}
            />
          </Pressable>
        </View>
      </ScrollView>

      {/* ── Floating View Map ─────────────────────────────────── */}
      <View
        style={[styles.mapButtonWrapper, { bottom: insets.bottom + 90 }]}
      >
        <Pressable style={styles.mapButton}>
          <Ionicons name="map-outline" size={18} color={Palette.ink} />
          <Text style={styles.mapButtonText}>View Map</Text>
        </Pressable>
      </View>
    </View>
  );
}

// ── Styles ────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Palette.offWhite,
  },

  /* Header */
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
    marginBottom: Spacing.lg,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: Palette.ink,
    fontFamily: Fonts.serif,
  },

  /* Search */
  searchRow: {
    paddingHorizontal: Spacing.xl,
    marginBottom: Spacing.lg,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Palette.white,
    borderRadius: Radius.lg,
    paddingHorizontal: Spacing.md,
    height: 52,
    borderWidth: 1,
    borderColor: 'rgba(213,199,163,0.35)',
  },
  searchIcon: {
    marginRight: Spacing.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: Palette.ink,
    fontFamily: Fonts.sans,
    height: '100%',
  },

  /* Category pills */
  pillsContainer: {
    paddingHorizontal: Spacing.xl,
    gap: Spacing.sm,
    marginBottom: Spacing.xl,
  },
  pill: {
    paddingHorizontal: 18,
    paddingVertical: 9,
    borderRadius: Radius.pill,
    backgroundColor: Palette.white,
    borderWidth: 1,
    borderColor: 'rgba(213,199,163,0.3)',
  },
  pillActive: {
    backgroundColor: Palette.terracotta,
    borderColor: Palette.terracotta,
  },
  pillText: {
    fontSize: 13,
    fontWeight: '700',
    color: Palette.inkMuted,
    letterSpacing: 0.5,
  },
  pillTextActive: {
    color: Palette.white,
  },

  /* Section header */
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    paddingHorizontal: Spacing.xl,
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Palette.ink,
    fontFamily: Fonts.serif,
    fontStyle: 'italic',
  },
  resultCount: {
    fontSize: 13,
    color: Palette.inkMuted,
    fontStyle: 'italic',
  },

  /* Card list */
  cardList: {
    paddingHorizontal: Spacing.xl,
    gap: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  card: {
    borderRadius: Radius.lg,
    overflow: 'hidden',
    backgroundColor: Palette.white,
    borderWidth: 1,
    borderColor: 'rgba(213,199,163,0.25)',
    shadowColor: Palette.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 2,
  },
  cardImageContainer: {
    height: 180,
    width: '100%',
    position: 'relative',
  },
  cardImage: {
    ...StyleSheet.absoluteFillObject,
  },
  tagRow: {
    position: 'absolute',
    top: Spacing.md,
    left: Spacing.md,
    flexDirection: 'row',
    gap: 6,
  },
  tag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: Radius.sm,
  },
  tagText: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.6,
  },

  /* Card body */
  cardBody: {
    padding: Spacing.lg,
  },
  cardTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  cardName: {
    fontSize: 19,
    fontWeight: '700',
    color: Palette.ink,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: 'rgba(245,166,35,0.12)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: Radius.pill,
  },
  ratingText: {
    fontSize: 13,
    fontWeight: '700',
    color: Palette.ink,
  },
  cuisineText: {
    fontSize: 14,
    color: Palette.inkMuted,
    marginBottom: Spacing.sm,
  },
  cardMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 13,
    color: Palette.inkMuted,
  },
  viewDetailsBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
  },
  viewDetailsText: {
    fontSize: 13,
    fontWeight: '600',
    color: Palette.terracotta,
  },

  /* CTA card */
  ctaCard: {
    backgroundColor: Palette.sandMuted,
    marginHorizontal: Spacing.xl,
    borderRadius: Radius.lg,
    padding: Spacing.xl,
    alignItems: 'center',
    marginBottom: Spacing.xl,
    borderWidth: 1,
    borderColor: 'rgba(213,199,163,0.3)',
  },
  ctaTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: Palette.ink,
    marginBottom: Spacing.xs,
  },
  ctaSubtitle: {
    fontSize: 14,
    color: Palette.inkMuted,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: Spacing.lg,
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Palette.terracotta,
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: Radius.pill,
  },
  ctaButtonText: {
    color: Palette.white,
    fontSize: 15,
    fontWeight: '700',
  },

  /* Floating map button */
  mapButtonWrapper: {
    position: 'absolute',
    right: Spacing.xl,
    alignItems: 'flex-end',
  },
  mapButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Palette.white,
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: Radius.pill,
    shadowColor: Palette.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 4,
    borderWidth: 1,
    borderColor: 'rgba(213,199,163,0.25)',
  },
  mapButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: Palette.ink,
  },
});
