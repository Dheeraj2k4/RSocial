import { useRouter } from 'expo-router';
import {
  Coffee,
  ForkKnife,
  Gear,
  GridFour,
  MapPin,
} from 'phosphor-react-native';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import {
  Avatar,
  Button,
  ListCard,
  LogListItem,
  ProfileStats,
  Screen,
  SectionHeader,
  SegmentedControl,
  TastePill,
} from '@/components/ui';
import { CommonStyles, FontFamily, Radius, Spacing, type ThemeColors } from '@/constants/theme';
import { useThemedStyles } from '@/theme/use-themed-styles';

const AVATAR = 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80';

const STATS = [
  { value: '128', label: 'logs' },
  { value: '4.2k', label: 'fans' },
  { value: '856', label: 'faves' },
];

const TASTES: { label: string; variant?: 'neutral' | 'primary' }[] = [
  { label: 'Italian' },
  { label: 'Japanese' },
  { label: 'Vegan Friendly', variant: 'primary' },
  { label: 'Natural Wine' },
];

const LISTS = [
  { id: 'w', icon: ForkKnife, title: 'Weekend Brunch', subtitle: '12 spots' },
  { id: 'c', icon: Coffee, title: 'Coffee Nooks', subtitle: '8 spots' },
];

const SEGMENTS = [
  { key: 'logs', label: 'Logs', icon: GridFour },
  { key: 'spots', label: 'Spots', icon: MapPin },
  { key: 'dishes', label: 'Dishes', icon: ForkKnife },
];

const LOGS = [
  { id: '1', title: 'The Morning Spread', place: "Brumby's Bakery", date: 'Oct 12', rating: 4.8, image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=200&q=80' },
  { id: '2', title: 'Truffle Burger Bliss', place: 'Gourmet Grill', date: 'Oct 10', rating: 4.9, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=200&q=80' },
  { id: '3', title: 'Artisanal Cafe Vibe', place: 'The Minimalist', date: 'Oct 08', rating: 4.5, image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=200&q=80' },
];

export default function ProfileScreen() {
  const router = useRouter();
  const { styles, colors } = useThemedStyles(createStyles);
  const [tab, setTab] = useState('logs');

  return (
    <Screen scroll contentContainerStyle={styles.content}>
      <View style={[CommonStyles.rowBetween, CommonStyles.screenPadded]}>
        <View>
          <Text style={styles.eyebrow}>MY PROFILE</Text>
          <Text style={styles.username}>@alexa_eats</Text>
        </View>
        <Pressable
          onPress={() => router.push('/settings')}
          accessibilityRole="button"
          accessibilityLabel="Open settings"
          style={styles.gearButton}>
          <Gear size={20} color={colors.text} />
        </Pressable>
      </View>

      <View style={[CommonStyles.row, CommonStyles.screenPadded, styles.profileRow]}>
        <Avatar source={AVATAR} size={72} />
        <ProfileStats stats={STATS} />
      </View>

      <View style={[CommonStyles.screenPadded, styles.identity]}>
        <Text style={styles.name}>Alexa J.</Text>
        <View style={[CommonStyles.row, styles.location]}>
          <MapPin size={14} color={colors.mutedText} />
          <Text style={styles.locationText}>Brooklyn, NY</Text>
        </View>
        <Text style={styles.bio}>
          Curating the best brunch spots in NYC. Lover of natural wines, artisanal sourdough, and
          moody dinners.
        </Text>
        <View style={styles.tags}>
          {TASTES.map((taste) => (
            <TastePill key={taste.label} label={taste.label} variant={taste.variant} />
          ))}
        </View>
      </View>

      <View style={[CommonStyles.screenPadded, styles.section]}>
        <SectionHeader
          title="Favorite Lists"
          actionLabel="SEE ALL"
          onActionPress={() => router.push('/lists')}
        />
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.lists}>
        {LISTS.map((list) => (
          <ListCard
            key={list.id}
            icon={list.icon}
            title={list.title}
            subtitle={list.subtitle}
            onPress={() => router.push('/list/l1')}
          />
        ))}
      </ScrollView>

      <View style={CommonStyles.screenPadded}>
        <SegmentedControl segments={SEGMENTS} value={tab} onChange={setTab} />
      </View>

      <View style={[CommonStyles.screenPadded, styles.logs]}>
        {tab === 'logs' ? (
          LOGS.map((log) => (
            <LogListItem
              key={log.id}
              image={log.image}
              title={log.title}
              place={log.place}
              date={log.date}
              rating={log.rating}
              onPress={() => router.push('/restaurant/r1')}
            />
          ))
        ) : (
          <Text style={styles.empty}>Nothing here yet.</Text>
        )}
      </View>

      <View style={CommonStyles.screenPadded}>
        <Button title="View Full History" variant="secondary" />
      </View>
    </Screen>
  );
}

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    content: {
      paddingTop: Spacing.sm,
      paddingBottom: 140,
      gap: Spacing.xl,
    },
    eyebrow: {
      fontFamily: FontFamily.semiBold,
      fontSize: 12,
      letterSpacing: 1,
      color: colors.mutedText,
    },
    username: {
      fontFamily: FontFamily.display,
      fontSize: 24,
      color: colors.text,
      marginTop: 2,
    },
    gearButton: {
      width: 40,
      height: 40,
      borderRadius: Radius.pill,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.surface,
    },
    profileRow: {
      gap: Spacing.lg,
    },
    identity: {
      gap: Spacing.sm,
    },
    name: {
      fontFamily: FontFamily.display,
      fontSize: 26,
      color: colors.text,
    },
    location: {
      gap: 4,
      marginTop: -2,
    },
    locationText: {
      fontFamily: FontFamily.body,
      fontSize: 14,
      color: colors.mutedText,
    },
    bio: {
      fontFamily: FontFamily.body,
      fontSize: 15,
      lineHeight: 22,
      color: colors.text,
      marginTop: Spacing.xs,
    },
    tags: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: Spacing.sm,
      marginTop: Spacing.sm,
    },
    section: {
      marginBottom: -Spacing.sm,
    },
    lists: {
      paddingHorizontal: Spacing.xl,
      gap: Spacing.md,
    },
    logs: {
      gap: Spacing.md,
    },
    empty: {
      fontFamily: FontFamily.body,
      fontSize: 14,
      color: colors.mutedText,
      textAlign: 'center',
      paddingVertical: Spacing.xl,
    },
  });
