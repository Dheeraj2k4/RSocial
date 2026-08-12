import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  ArrowLeft,
  BookmarkSimple,
  ChatCircle,
  ForkKnife,
  Heart,
  Info,
  MapPin,
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
          <LinearGradient
            colors={['transparent', colors.background, colors.background]}
            locations={[0.2, 0.6, 1]}
            style={StyleSheet.absoluteFill}
            pointerEvents="none"
          />

          {/* Top floating bar */}
          <View style={[CommonStyles.rowBetween, styles.heroTopBar, { paddingTop: insets.top + Spacing.sm }]}>
            <Pressable
              onPress={() => router.back()}
              style={styles.heroBtn}
              accessibilityLabel="Go back"
            >
              <ArrowLeft size={20} color={Palette.white} weight="bold" />
            </Pressable>
            <View style={[CommonStyles.row, styles.heroRight]}>
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
            <View style={[CommonStyles.row, styles.heroTopRow]}>
              <Tag label={dish.trendingLabel} tone="accent" />
              <View style={[CommonStyles.row, styles.ratingPill]}>
                <Star size={14} color={colors.accent} weight="fill" />
                <Text style={styles.ratingText}>{dish.rating}</Text>
                <Text style={styles.ratingCount}>({dish.reviews})</Text>
              </View>
            </View>
            <Text style={styles.heroName}>{dish.name}</Text>
            <View style={[CommonStyles.row, styles.heroMeta]}>
              <MapPin size={13} color={colors.mutedText} />
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
          <View style={[CommonStyles.row, styles.tagsRow]}>
            {dish.tags.map((tag) => (
              <View key={tag} style={styles.flavorTag}>
                <Text style={styles.flavorTagText}>{tag}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* ── CTA row ─────────────────────────────────────── */}
        <View style={[CommonStyles.row, styles.ctaRow, CommonStyles.screenPadded]}>
          <Pressable
            style={[CommonStyles.row, styles.ctaBtn, loved ? styles.ctaBtnLovedActive : styles.ctaBtnLoved]}
            onPress={() => setLoved((l) => !l)}
            accessibilityLabel={loved ? 'Unlove' : 'I love this'}
          >
            <Heart size={18} color={Palette.white} weight={loved ? 'fill' : 'regular'} />
            <Text style={styles.ctaBtnLovedText}>I love this</Text>
          </Pressable>
          <Pressable style={[CommonStyles.row, styles.ctaBtn, styles.ctaBtnComment]} accessibilityLabel="Comment">
            <ChatCircle size={18} color={colors.text} />
            <Text style={styles.ctaBtnCommentText}>Comment</Text>
          </Pressable>
        </View>

        {/* ── Perfect Pairings ────────────────────────────── */}
        <View style={[styles.section, CommonStyles.screenPadded]}>
          <SectionHeader title="Perfect Pairings" actionLabel="↗" />
          <View style={[CommonStyles.row, styles.pairingsGrid]}>
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

    </View>
  );
}

// ── Styles ─────────────────────────────────────────────────────────
const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    /* Hero */
    heroContainer: { position: 'relative', height: 380 },
    heroImage: { width: '100%', height: '100%' },
    heroTopBar: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      paddingHorizontal: Spacing.xl,
    },
    heroRight: { gap: Spacing.sm },
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
      gap: Spacing.md,
    },
    ratingPill: {
      gap: 3,
    },
    ratingText: {
      fontFamily: FontFamily.semiBold,
      fontSize: 14,
      color: colors.text,
    },
    ratingCount: {
      fontFamily: FontFamily.body,
      fontSize: 13,
      color: colors.mutedText,
    },
    heroName: {
      fontFamily: FontFamily.display,
      fontSize: 30,
      color: colors.text,
      lineHeight: 36,
    },
    heroMeta: { gap: Spacing.xs },
    heroRestaurant: {
      fontFamily: FontFamily.medium,
      fontSize: 14,
      color: colors.text,
    },
    heroDot: { color: colors.mutedText, fontSize: 13 },
    heroLocation: {
      fontFamily: FontFamily.body,
      fontSize: 13,
      color: colors.mutedText,
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
      gap: Spacing.md,
      paddingTop: Spacing.sm,
    },
    ctaBtn: {
      flex: 1,
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
  });
