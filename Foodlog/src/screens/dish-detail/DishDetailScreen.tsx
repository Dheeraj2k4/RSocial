import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  BookmarkSimple,
  ChatCircle,
  ForkKnife,
  Heart,
  Info,
  NavigationArrow,
  Plus,
  ShareNetwork,
  Star,
  Wine,
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
  LogReviewRow,
  PairingCard,
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

// ── Mock data ───────────────────────────────────────────────────────
const DISH = {
  id: 'd1',
  name: 'Truffle Tagliatelle',
  image:
    'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=800&auto=format&fit=crop&q=80',
  rating: 4.9,
  reviews: '194',
  trendingLabel: 'TRENDING #1',
  restaurant: "L'Artusi",
  location: 'West Village, NYC',
  price: '$32',
  about:
    'Hand-rolled tagliatelle with Umbrian black truffles, parmigiano-reggiano aged 24 months, and house-churned cultured butter. A signature decadent masterpiece.',
  tags: ['Signature', 'Truffle', 'Handmade Pasta'],
  pairings: [
    { id: 'p1', icon: Wine, category: 'WINE', name: 'Barolo Riserva' },
    { id: 'p2', icon: ForkKnife, category: 'SIDE', name: 'Burrata & Peach' },
  ],
  logs: [
    {
      id: 'l1',
      avatar:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
      name: 'Sophia Chen',
      rating: 5,
      quote:
        '"The truffle aroma hits you before the plate even touches the table. Pure magic."',
    },
    {
      id: 'l2',
      avatar:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
      name: 'Marcus J.',
      rating: 4.8,
      quote:
        '"Worth every penny. The texture of the pasta is unmatched in the city."',
    },
  ],
  nutrition: 'Contains dairy, gluten. Crafted with seasonal Umbrian truffles.',
};

export default function DishDetailScreen() {
  useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { styles, colors } = useThemedStyles(createStyles);

  const [loved, setLoved] = useState(false);
  const [saved, setSaved] = useState(false);

  const dish = DISH;

  return (
    <View style={[CommonStyles.fill, { backgroundColor: colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false} bounces>

        {/* ── Hero ────────────────────────────────────────── */}
        <View style={styles.heroContainer}>
          <Image
            source={{ uri: dish.image }}
            style={styles.heroImage}
            contentFit="cover"
          />
          <View style={styles.heroScrim} />

          {/* Top floating bar */}
          <View style={[styles.heroTopBar, { paddingTop: insets.top + Spacing.sm }]}>
            <Pressable
              onPress={() => router.back()}
              style={styles.heroBtn}
              accessibilityLabel="Go back"
            >
              <NavigationArrow size={20} color={Palette.white} weight="fill" />
            </Pressable>
            <View style={styles.heroRight}>
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
              <Pressable style={styles.heroBtn} accessibilityLabel="Share">
                <ShareNetwork size={20} color={Palette.white} />
              </Pressable>
            </View>
          </View>

          {/* Hero info overlay */}
          <View style={styles.heroInfo}>
            <View style={styles.heroTopRow}>
              <Tag label={dish.trendingLabel} tone="accent" />
              <View style={styles.ratingPill}>
                <Star size={12} color={Palette.terracotta} weight="fill" />
                <Text style={styles.ratingText}>{dish.rating}</Text>
                <Text style={styles.ratingCount}>({dish.reviews})</Text>
              </View>
            </View>
            <Text style={styles.heroName}>{dish.name}</Text>
            <View style={[CommonStyles.row, styles.heroMeta]}>
              <Text style={styles.heroRestaurant}>{dish.restaurant}</Text>
              <Text style={styles.heroDot}>·</Text>
              <Text style={styles.heroLocation}>{dish.location}</Text>
            </View>
          </View>
        </View>

        {/* ── About ───────────────────────────────────────── */}
        <View style={[styles.section, CommonStyles.screenPadded]}>
          <View style={[CommonStyles.rowBetween]}>
            <Text style={styles.sectionTitle}>About</Text>
            <Text style={styles.price}>{dish.price}</Text>
          </View>
          <Text style={styles.aboutText}>{dish.about}</Text>

          {/* Flavor tags */}
          <View style={styles.tagsRow}>
            {dish.tags.map((tag) => (
              <View key={tag} style={styles.flavorTag}>
                <Text style={styles.flavorTagText}>{tag}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* ── CTA row ─────────────────────────────────────── */}
        <View style={[styles.ctaRow, CommonStyles.screenPadded]}>
          <Pressable
            style={[styles.ctaBtn, loved ? styles.ctaBtnLovedActive : styles.ctaBtnLoved]}
            onPress={() => setLoved((l) => !l)}
            accessibilityLabel={loved ? 'Unlove' : 'I love this'}
          >
            <Heart size={18} color={Palette.white} weight={loved ? 'fill' : 'regular'} />
            <Text style={styles.ctaBtnLovedText}>I love this</Text>
          </Pressable>
          <Pressable style={[styles.ctaBtn, styles.ctaBtnComment]} accessibilityLabel="Comment">
            <ChatCircle size={18} color={colors.text} />
            <Text style={styles.ctaBtnCommentText}>Comment</Text>
          </Pressable>
        </View>

        {/* ── Perfect Pairings ────────────────────────────── */}
        <View style={[styles.section, CommonStyles.screenPadded]}>
          <SectionHeader title="Perfect Pairings" actionLabel="↗" />
          <View style={styles.pairingsGrid}>
            {dish.pairings.map((p) => (
              <PairingCard
                key={p.id}
                icon={p.icon}
                category={p.category}
                name={p.name}
              />
            ))}
          </View>
        </View>

        {/* ── Recent Logs ─────────────────────────────────── */}
        <View style={[styles.section, CommonStyles.screenPadded]}>
          <SectionHeader title="Recent Logs" actionLabel="View All" />
          <View style={styles.logsList}>
            {dish.logs.map((log) => (
              <LogReviewRow
                key={log.id}
                avatar={log.avatar}
                name={log.name}
                rating={log.rating}
                quote={log.quote}
              />
            ))}
          </View>
        </View>

        {/* ── Nutritional Insights ────────────────────────── */}
        <View style={[CommonStyles.screenPadded, styles.nutritionSection]}>
          <View style={styles.nutritionCard}>
            <Info size={18} color={colors.mutedText} />
            <View style={styles.nutritionBody}>
              <Text style={styles.nutritionTitle}>Nutritional Insights</Text>
              <Text style={styles.nutritionText} numberOfLines={2}>
                {dish.nutrition}
              </Text>
            </View>
          </View>
        </View>

        <View style={{ height: insets.bottom + 100 }} />
      </ScrollView>

      {/* ── Floating Log CTA ────────────────────────────── */}
      <View style={[styles.fabWrapper, { bottom: insets.bottom + Spacing.lg }]}>
        <Pressable
          style={styles.fab}
          onPress={() => router.push('/log')}
          accessibilityLabel="Log this dish"
        >
          <Plus size={16} color={Palette.white} weight="bold" />
          <Text style={styles.fabText}>LOG THIS DISH</Text>
        </Pressable>
      </View>
    </View>
  );
}

// ── Styles ─────────────────────────────────────────────────────────
const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    /* Hero */
    heroContainer: { position: 'relative', height: 300 },
    heroImage: { width: '100%', height: '100%' },
    heroScrim: {
      ...StyleSheet.absoluteFillObject,
      top: '35%',
      backgroundColor: 'rgba(18,16,12,0.65)',
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
      backgroundColor: 'rgba(18,16,12,0.45)',
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
    heroTopRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: Spacing.md,
    },
    ratingPill: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 3,
      backgroundColor: 'rgba(18,16,12,0.55)',
      paddingHorizontal: Spacing.sm,
      paddingVertical: 4,
      borderRadius: Radius.pill,
    },
    ratingText: {
      fontFamily: FontFamily.semiBold,
      fontSize: 13,
      color: Palette.white,
    },
    ratingCount: {
      fontFamily: FontFamily.body,
      fontSize: 12,
      color: 'rgba(255,255,255,0.75)',
    },
    heroName: {
      fontFamily: FontFamily.display,
      fontSize: 28,
      color: Palette.white,
      lineHeight: 34,
    },
    heroMeta: { gap: Spacing.xs },
    heroRestaurant: {
      fontFamily: FontFamily.medium,
      fontSize: 13,
      color: 'rgba(255,255,255,0.85)',
    },
    heroDot: { color: 'rgba(255,255,255,0.5)', fontSize: 13 },
    heroLocation: {
      fontFamily: FontFamily.body,
      fontSize: 13,
      color: 'rgba(255,255,255,0.75)',
    },

    /* About */
    section: { paddingTop: Spacing.xl, gap: Spacing.md },
    sectionTitle: {
      fontFamily: FontFamily.display,
      fontSize: 22,
      color: colors.text,
    },
    price: {
      fontFamily: FontFamily.semiBold,
      fontSize: 20,
      color: colors.accent,
    },
    aboutText: {
      fontFamily: FontFamily.body,
      fontSize: 15,
      color: colors.mutedText,
      lineHeight: 23,
    },
    tagsRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: Spacing.sm,
    },
    flavorTag: {
      paddingHorizontal: Spacing.md,
      paddingVertical: 6,
      borderRadius: Radius.pill,
      borderWidth: 1,
      borderColor: colors.secondary,
      backgroundColor: 'transparent',
    },
    flavorTagText: {
      fontFamily: FontFamily.medium,
      fontSize: 13,
      color: colors.text,
    },

    /* CTA row */
    ctaRow: {
      flexDirection: 'row',
      gap: Spacing.md,
      paddingTop: Spacing.sm,
    },
    ctaBtn: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: Spacing.sm,
      paddingVertical: 13,
      borderRadius: Radius.pill,
    },
    ctaBtnLoved: { backgroundColor: colors.accent },
    ctaBtnLovedActive: { backgroundColor: '#a84f2c' },
    ctaBtnLovedText: {
      fontFamily: FontFamily.semiBold,
      fontSize: 15,
      color: Palette.white,
    },
    ctaBtnComment: {
      borderWidth: 1.5,
      borderColor: colors.secondary,
    },
    ctaBtnCommentText: {
      fontFamily: FontFamily.semiBold,
      fontSize: 15,
      color: colors.text,
    },

    /* Pairings */
    pairingsGrid: {
      flexDirection: 'row',
      gap: Spacing.md,
    },

    /* Logs */
    logsList: { gap: Spacing.md },

    /* Nutrition */
    nutritionSection: { paddingTop: Spacing.lg, paddingBottom: Spacing.lg },
    nutritionCard: {
      flexDirection: 'row',
      gap: Spacing.md,
      backgroundColor: colors.surface,
      borderRadius: Radius.md,
      padding: Spacing.lg,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.border,
      alignItems: 'flex-start',
    },
    nutritionBody: { flex: 1, gap: 3 },
    nutritionTitle: {
      fontFamily: FontFamily.semiBold,
      fontSize: 14,
      color: colors.text,
    },
    nutritionText: {
      fontFamily: FontFamily.body,
      fontSize: 13,
      color: colors.mutedText,
      lineHeight: 19,
    },

    /* FAB */
    fabWrapper: {
      position: 'absolute',
      alignSelf: 'center',
    },
    fab: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: Spacing.sm,
      paddingHorizontal: Spacing.xl,
      paddingVertical: 14,
      borderRadius: Radius.pill,
      backgroundColor: colors.accent,
      shadowColor: colors.black,
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.28,
      shadowRadius: 10,
      elevation: 8,
    },
    fabText: {
      fontFamily: FontFamily.semiBold,
      fontSize: 15,
      color: Palette.white,
      letterSpacing: 0.5,
    },
  });
