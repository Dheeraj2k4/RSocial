import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  BookmarkSimple,
  CalendarBlank,
  Clock,
  MapPin,
  NavigationArrow,
  PencilLine,
  Phone,
  Plus,
  ShareNetwork,
  Star,
} from 'phosphor-react-native';
import { useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  DishCard,
  ReviewCard,
  SectionHeader,
  Tag,
} from '@/components/ui';
import {
  CommonStyles,
  FontFamily,
  Palette,
  Radius,
  Spacing,
  type ThemeColors,
} from '@/constants/theme';
import { useThemedStyles } from '@/theme/use-themed-styles';

// ── Mock data (replace with real API fetch) ─────────────────────────
const RESTAURANT = {
  id: 'r1',
  name: 'Lumière Dining',
  image:
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80',
  rating: 4.9,
  reviews: '2.4k',
  category: 'FINE DINING',
  priceRange: '$$$',
  status: 'Open until 11 PM',
  phone: '+1 (555) 012-3456',
  atmosphere: [
    'https://images.unsplash.com/photo-1514190051997-0f6f39ca5cde?w=400&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&auto=format&fit=crop&q=80',
  ],
  dishes: [
    {
      id: 'd1',
      name: 'Avocado Sourdough',
      price: '$18',
      rating: 4.5,
      image:
        'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&auto=format&fit=crop&q=80',
    },
    {
      id: 'd2',
      name: 'Salmon Poke Bowl',
      price: '$22',
      rating: 4.8,
      image:
        'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&auto=format&fit=crop&q=80',
    },
  ],
  reviews_list: [
    {
      id: 'rv1',
      avatar:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
      handle: '@alexrivers',
      rating: 5,
      body: 'The lighting here is a mood. Honestly the best truffle pasta I\'ve had in the city. Definitely coming back for the aesthetic alone.',
      timeAgo: '2D AGO',
    },
    {
      id: 'rv2',
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
      handle: '@jordansmith',
      rating: 4,
      body: 'Vibe check: 10/10. Service was a bit slow on a Friday night, but the dishes were worth the wait.',
      timeAgo: '2D AGO',
    },
  ],
};

export default function RestaurantDetailScreen() {
  useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { styles, colors } = useThemedStyles(createStyles);

  const [saved, setSaved] = useState(false);

  const restaurant = RESTAURANT; // swap with id-based fetch when API is ready

  return (
    <View style={[CommonStyles.fill, { backgroundColor: colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false} bounces>

        {/* ── Hero image ─────────────────────────────────── */}
        <View style={styles.heroContainer}>
          <Image
            source={{ uri: restaurant.image }}
            style={styles.heroImage}
            contentFit="cover"
          />

          {/* Gradient scrim at bottom of image */}
          <View style={styles.heroScrim} />

          {/* Floating action bar (top) */}
          <View style={[styles.heroTopBar, { paddingTop: insets.top + Spacing.sm }]}>
            <Pressable
              onPress={() => router.back()}
              style={styles.heroBtn}
              accessibilityLabel="Go back"
            >
              <NavigationArrow size={20} color={Palette.white} weight="fill" />
            </Pressable>
            <View style={styles.heroRight}>
              <Pressable style={styles.heroBtn} accessibilityLabel="Share">
                <ShareNetwork size={20} color={Palette.white} />
              </Pressable>
              <Pressable
                style={styles.heroBtn}
                onPress={() => setSaved((s) => !s)}
                accessibilityLabel={saved ? 'Unsave' : 'Save'}
              >
                <BookmarkSimple
                  size={20}
                  color={Palette.white}
                  weight={saved ? 'fill' : 'regular'}
                />
              </Pressable>
            </View>
          </View>

          {/* Hero title info */}
          <View style={styles.heroInfo}>
            <Tag label="TRENDING #1" tone="accent" />
            <Text style={styles.heroName}>{restaurant.name}</Text>
            <View style={[CommonStyles.row, styles.heroMeta]}>
              <Star size={14} color={Palette.terracotta} weight="fill" />
              <Text style={styles.heroRating}>
                {restaurant.rating} ({restaurant.reviews} reviews)
              </Text>
              <Text style={styles.heroDot}>·</Text>
              <Text style={styles.heroCategory}>{restaurant.category}</Text>
              <Text style={styles.heroDot}>·</Text>
              <Text style={styles.heroPrice}>{restaurant.priceRange}</Text>
            </View>
          </View>
        </View>

        {/* ── CTA Buttons ────────────────────────────────── */}
        <View style={[styles.ctaRow, CommonStyles.screenPadded]}>
          <Pressable
            style={[styles.ctaBtn, styles.ctaBtnPrimary]}
            onPress={() => router.push('/log')}
            accessibilityLabel="Book Table"
          >
            <CalendarBlank size={16} color={Palette.white} weight="bold" />
            <Text style={styles.ctaBtnPrimaryText}>Book Table</Text>
          </Pressable>
          <Pressable
            style={[styles.ctaBtn, styles.ctaBtnSecondary]}
            accessibilityLabel="Directions"
          >
            <MapPin size={16} color={colors.text} weight="bold" />
            <Text style={styles.ctaBtnSecondaryText}>Directions</Text>
          </Pressable>
        </View>

        {/* ── Info tiles ─────────────────────────────────── */}
        <View style={[styles.infoRow, CommonStyles.screenPadded]}>
          <View style={styles.infoTile}>
            <Clock size={18} color={colors.primary} />
            <Text style={styles.infoLabel}>STATUS</Text>
            <Text style={styles.infoValueGreen}>{restaurant.status}</Text>
          </View>
          <View style={[styles.infoTile, styles.infoTileRight]}>
            <Phone size={18} color={colors.primary} />
            <Text style={styles.infoLabel}>CONTACT</Text>
            <Text style={styles.infoValue}>{restaurant.phone}</Text>
          </View>
        </View>

        {/* ── Atmosphere ─────────────────────────────────── */}
        <View style={[styles.section, CommonStyles.screenPadded]}>
          <SectionHeader title="Atmosphere" actionLabel="VIEW ALL" />
          <View style={styles.atmosphereGrid}>
            {restaurant.atmosphere.map((uri, idx) => (
              <Image
                key={idx}
                source={{ uri }}
                style={styles.atmosphereImage}
                contentFit="cover"
              />
            ))}
          </View>
        </View>

        {/* ── Signature Dishes ───────────────────────────── */}
        <View style={[styles.section, CommonStyles.screenPadded]}>
          <SectionHeader title="Signature Dishes" actionLabel="MENU" />
          <View style={styles.dishGrid}>
            {restaurant.dishes.map((dish) => (
              <DishCard
                key={dish.id}
                image={dish.image}
                name={dish.name}
                price={dish.price}
                rating={dish.rating}
                onPress={() => router.push(`/dish/${dish.id}`)}
              />
            ))}
          </View>
        </View>

        {/* ── What People Say ────────────────────────────── */}
        <View style={[styles.section, CommonStyles.screenPadded]}>
          <SectionHeader title="What People Say" actionLabel="WRITE +" />
          <View style={styles.reviewList}>
            {restaurant.reviews_list.map((review) => (
              <ReviewCard
                key={review.id}
                avatar={review.avatar}
                handle={review.handle}
                rating={review.rating}
                body={review.body}
                timeAgo={review.timeAgo}
              />
            ))}
          </View>

          {/* View all reviews */}
          <Pressable style={styles.viewAllRow} accessibilityLabel="View all reviews">
            <Text style={styles.viewAllText}>
              View all {restaurant.reviews} reviews
            </Text>
            <NavigationArrow size={14} color={colors.accent} />
          </Pressable>
        </View>

        <View style={{ height: insets.bottom + 100 }} />
      </ScrollView>

      {/* ── Floating Log CTA ───────────────────────────── */}
      <View style={[styles.fabWrapper, { bottom: insets.bottom + Spacing.xl }]}>
        <Pressable
          style={styles.fab}
          onPress={() => router.push('/log')}
          accessibilityLabel="Log this visit"
        >
          <PencilLine size={18} color={Palette.white} weight="bold" />
          <Plus size={14} color={Palette.white} weight="bold" />
        </Pressable>
      </View>
    </View>
  );
}

// ── Styles ─────────────────────────────────────────────────────────
const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    /* Hero */
    heroContainer: { position: 'relative', height: 320 },
    heroImage: { width: '100%', height: '100%' },
    heroScrim: {
      ...StyleSheet.absoluteFillObject,
      background: 'transparent',
      // Gradient emulated via a semi-transparent layer at the bottom
      top: '40%',
      backgroundColor: 'rgba(20,18,14,0.62)',
    },
    heroTopBar: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: Spacing.xl,
    },
    heroRight: { flexDirection: 'row', gap: Spacing.sm },
    heroBtn: {
      width: 38,
      height: 38,
      borderRadius: Radius.pill,
      backgroundColor: 'rgba(20,18,14,0.45)',
      alignItems: 'center',
      justifyContent: 'center',
    },
    heroInfo: {
      position: 'absolute',
      bottom: Spacing.xl,
      left: Spacing.xl,
      right: Spacing.xl,
      gap: Spacing.sm,
    },
    heroName: {
      fontFamily: FontFamily.display,
      fontSize: 28,
      color: Palette.white,
      lineHeight: 34,
    },
    heroMeta: { gap: Spacing.xs, flexWrap: 'wrap' },
    heroRating: { fontFamily: FontFamily.medium, fontSize: 13, color: Palette.white },
    heroDot: { color: 'rgba(255,255,255,0.5)', fontSize: 13 },
    heroCategory: { fontFamily: FontFamily.medium, fontSize: 13, color: Palette.offWhite },
    heroPrice: { fontFamily: FontFamily.semiBold, fontSize: 13, color: Palette.white },

    /* CTA row */
    ctaRow: {
      flexDirection: 'row',
      gap: Spacing.md,
      paddingTop: Spacing.xl,
      paddingBottom: Spacing.md,
    },
    ctaBtn: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: Spacing.sm,
      paddingVertical: 14,
      borderRadius: Radius.pill,
    },
    ctaBtnPrimary: { backgroundColor: colors.accent },
    ctaBtnPrimaryText: {
      fontFamily: FontFamily.semiBold,
      fontSize: 15,
      color: Palette.white,
    },
    ctaBtnSecondary: {
      borderWidth: 1.5,
      borderColor: colors.secondary,
      backgroundColor: 'transparent',
    },
    ctaBtnSecondaryText: {
      fontFamily: FontFamily.semiBold,
      fontSize: 15,
      color: colors.text,
    },

    /* Info tiles */
    infoRow: {
      flexDirection: 'row',
      gap: Spacing.md,
      marginBottom: Spacing.lg,
    },
    infoTile: {
      flex: 1,
      gap: Spacing.xs,
      backgroundColor: colors.surface,
      borderRadius: Radius.md,
      padding: Spacing.lg,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.border,
    },
    infoTileRight: {},
    infoLabel: {
      fontFamily: FontFamily.semiBold,
      fontSize: 10,
      letterSpacing: 0.8,
      color: colors.mutedText,
      textTransform: 'uppercase',
      marginTop: Spacing.xs,
    },
    infoValue: {
      fontFamily: FontFamily.semiBold,
      fontSize: 14,
      color: colors.text,
    },
    infoValueGreen: {
      fontFamily: FontFamily.semiBold,
      fontSize: 14,
      color: '#4CAF50',
    },

    /* Section wrapper */
    section: { marginBottom: Spacing.xl, gap: Spacing.lg },

    /* Atmosphere */
    atmosphereGrid: {
      flexDirection: 'row',
      gap: Spacing.md,
    },
    atmosphereImage: {
      flex: 1,
      height: 130,
      borderRadius: Radius.md,
      backgroundColor: colors.border,
    },

    /* Dish grid */
    dishGrid: {
      flexDirection: 'row',
      gap: Spacing.md,
    },

    /* Reviews */
    reviewList: { gap: Spacing.md },
    viewAllRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: Spacing.xs,
      paddingTop: Spacing.sm,
    },
    viewAllText: {
      fontFamily: FontFamily.medium,
      fontSize: 14,
      color: colors.accent,
    },

    /* Floating log button */
    fabWrapper: {
      position: 'absolute',
      alignSelf: 'center',
    },
    fab: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 2,
      width: 52,
      height: 52,
      borderRadius: Radius.pill,
      backgroundColor: colors.accent,
      shadowColor: colors.black,
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.25,
      shadowRadius: 10,
      elevation: 8,
    },
  });
