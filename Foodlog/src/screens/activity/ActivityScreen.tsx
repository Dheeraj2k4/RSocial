import { UsersThree, WaveformSlash } from 'phosphor-react-native';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import {
  Chip,
  CreatorCard,
  FeedPost,
  IconButton,
  Screen,
  ScreenHeader,
} from '@/components/ui';
import { CommonStyles, FontFamily, Spacing, type ThemeColors } from '@/constants/theme';
import { useThemedStyles } from '@/theme/use-themed-styles';

// ── Feed data ───────────────────────────────────────────────────────
const FEED = [
  {
    id: 'p1',
    userName: 'Sienna Miller',
    userAvatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
    userLocation: 'downtown',
    foodImage:
      'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&auto=format&fit=crop&q=80',
    restaurantName: 'The Morning Table',
    tags: ['BRUNCH', 'VEGAN FRIENDLY'],
    dishName: 'Artisan Avocado Toast',
    caption: 'The sourdough here is actually life-changing. 🥑✨',
    likes: 124,
    comments: 12,
    timeAgo: '2h ago',
  },
  {
    id: 'p2',
    userName: 'Jordan K.',
    userAvatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    userLocation: 'midtown',
    foodImage:
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&auto=format&fit=crop&q=80',
    restaurantName: 'Roast & Co.',
    tags: ['COFFEE', 'AESTHETIC'],
    dishName: 'Oat Milk Latte',
    caption: 'Quick caffeine fix before the gallery opening.',
    likes: 89,
    comments: 4,
    timeAgo: '5h ago',
  },
];

// ── Suggested creators data ─────────────────────────────────────────
const CREATORS = [
  {
    id: 'c1',
    avatar:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=80',
    handle: '@foodie_jen',
    followers: '8.4k',
  },
  {
    id: 'c2',
    avatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
    handle: '@foodie_jen',
    followers: '8.4k',
  },
  {
    id: 'c3',
    avatar:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    handle: '@travelplate',
    followers: '12k',
  },
];

const FEED_TABS = ['Following', 'Nearby', 'Trending'] as const;
type FeedTab = (typeof FEED_TABS)[number];

export default function ActivityScreen() {
  const { styles } = useThemedStyles(createStyles);
  const [activeTab, setActiveTab] = useState<FeedTab>('Following');
  const [following, setFollowing] = useState<Record<string, boolean>>({});
  const [liked, setLiked] = useState<Record<string, boolean>>({});

  const toggleFollow = (id: string) =>
    setFollowing((prev) => ({ ...prev, [id]: !prev[id] }));

  const toggleLike = (id: string) =>
    setLiked((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <Screen>
      {/* ── Header ─────────────────────────────────────────── */}
      <ScreenHeader
        title="Activity"
        right={
          <View style={[CommonStyles.row, styles.headerIcons]}>
            <IconButton icon={UsersThree} accessibilityLabel="People" />
            <IconButton icon={WaveformSlash} accessibilityLabel="Notifications" />
          </View>
        }
      />

      {/* ── Tab pills ──────────────────────────────────────── */}
      <View style={[CommonStyles.row, styles.tabsRow]}>
        {FEED_TABS.map((tab) => (
          <Chip
            key={tab}
            label={tab}
            active={activeTab === tab}
            onPress={() => setActiveTab(tab)}
          />
        ))}
      </View>

      {/* ── Scrollable feed ────────────────────────────────── */}
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
        {/* Feed posts */}
        {FEED.map((post, idx) => (
          <View key={post.id}>
            <FeedPost
              userName={post.userName}
              userAvatar={post.userAvatar}
              userLocation={post.userLocation}
              foodImage={post.foodImage}
              restaurantName={post.restaurantName}
              tags={post.tags}
              dishName={post.dishName}
              caption={post.caption}
              likes={liked[post.id] ? post.likes + 1 : post.likes}
              comments={post.comments}
              timeAgo={post.timeAgo}
              onLike={() => toggleLike(post.id)}
            />
            {/* Divider between posts */}
            {idx < FEED.length - 1 ? <View style={styles.divider} /> : null}
          </View>
        ))}

        {/* ── Suggested Creators ─────────────────────────── */}
        <View style={styles.suggestedSection}>
          <View style={[CommonStyles.rowBetween, styles.suggestedHeader]}>
            <Text style={styles.suggestedTitle}>Suggested Creators</Text>
            <Text style={styles.viewAll}>VIEW ALL</Text>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.creatorList}
          >
            {CREATORS.map((creator) => (
              <CreatorCard
                key={creator.id}
                avatar={creator.avatar}
                handle={creator.handle}
                followers={creator.followers}
                isFollowing={following[creator.id] ?? false}
                onFollow={() => toggleFollow(creator.id)}
              />
            ))}
          </ScrollView>
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </Screen>
  );
}

// ── Styles ─────────────────────────────────────────────────────────
const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    headerIcons: { gap: Spacing.sm },
    tabsRow: {
      gap: Spacing.sm,
      paddingHorizontal: Spacing.xl,
      paddingVertical: Spacing.md,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors.border,
    },
    scroll: { flex: 1 },
    divider: {
      height: StyleSheet.hairlineWidth,
      backgroundColor: colors.border,
      marginHorizontal: Spacing.xl,
    },
    /* Suggested creators section */
    suggestedSection: {
      backgroundColor: colors.surface,
      marginTop: Spacing.xl,
      paddingTop: Spacing.xl,
      paddingBottom: Spacing.xl,
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: colors.border,
    },
    suggestedHeader: {
      paddingHorizontal: Spacing.xl,
      marginBottom: Spacing.lg,
    },
    suggestedTitle: {
      fontFamily: FontFamily.display,
      fontSize: 20,
      color: colors.text,
    },
    viewAll: {
      fontFamily: FontFamily.semiBold,
      fontSize: 12,
      letterSpacing: 0.5,
      color: colors.accent,
    },
    creatorList: {
      paddingHorizontal: Spacing.xl,
      gap: Spacing.xl,
    },
    bottomSpacing: { height: 120 },
  });
