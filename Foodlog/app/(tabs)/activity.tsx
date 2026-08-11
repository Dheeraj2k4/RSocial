import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Fonts, Palette, Radius, Spacing } from '@/constants/theme';

// ── Mock activity data ──────────────────────────────────────────────
const ACTIVITIES = [
  {
    id: '1',
    type: 'like',
    user: 'Sarah Chen',
    avatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
    action: 'liked your food log at',
    place: 'The Brunch Club',
    time: '2 min ago',
  },
  {
    id: '2',
    type: 'comment',
    user: 'Marcus Liu',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    action: 'commented on your review of',
    place: 'Artesian Crust',
    time: '15 min ago',
  },
  {
    id: '3',
    type: 'follow',
    user: 'Priya Sharma',
    avatar:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    action: 'started following you',
    place: '',
    time: '1 hr ago',
  },
  {
    id: '4',
    type: 'badge',
    user: 'Foodlog',
    avatar: '',
    action: 'You earned the',
    place: 'Brunch Master',
    time: '3 hrs ago',
  },
  {
    id: '5',
    type: 'like',
    user: 'Alex Kim',
    avatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
    action: 'liked your food log at',
    place: 'Zen Brews',
    time: '5 hrs ago',
  },
];

const ICON_MAP: Record<string, { name: string; bg: string; fg: string }> = {
  like: { name: 'heart', bg: '#FBECE5', fg: Palette.terracotta },
  comment: { name: 'chatbubble', bg: '#EEF2E8', fg: Palette.olive },
  follow: { name: 'person-add', bg: '#EEF2E8', fg: Palette.olive },
  badge: { name: 'ribbon', bg: '#FFF3E0', fg: '#F5A623' },
};

export default function ActivityScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: insets.top + Spacing.md,
          paddingBottom: insets.bottom + Spacing.xxl,
        }}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Activity</Text>
        </View>

        {/* Activity list */}
        <View style={styles.list}>
          {ACTIVITIES.map((item) => {
            const icon = ICON_MAP[item.type];
            return (
              <View key={item.id} style={styles.row}>
                {/* Avatar / Icon */}
                <View style={styles.avatarWrapper}>
                  {item.avatar ? (
                    <Image source={item.avatar} style={styles.avatar} />
                  ) : (
                    <View
                      style={[
                        styles.iconCircle,
                        { backgroundColor: icon.bg },
                      ]}
                    >
                      <Ionicons
                        name={icon.name as any}
                        size={20}
                        color={icon.fg}
                      />
                    </View>
                  )}
                  <View
                    style={[styles.typeBadge, { backgroundColor: icon.bg }]}
                  >
                    <Ionicons
                      name={icon.name as any}
                      size={10}
                      color={icon.fg}
                    />
                  </View>
                </View>

                {/* Text */}
                <View style={styles.textBlock}>
                  <Text style={styles.activityText}>
                    <Text style={styles.bold}>{item.user}</Text>{' '}
                    {item.action}
                    {item.place ? (
                      <Text style={styles.placeText}> {item.place}</Text>
                    ) : null}
                  </Text>
                  <Text style={styles.timeText}>{item.time}</Text>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Palette.offWhite },
  header: {
    paddingHorizontal: Spacing.xl,
    marginBottom: Spacing.xl,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: Palette.ink,
    fontFamily: Fonts.serif,
  },
  list: {
    paddingHorizontal: Spacing.xl,
    gap: Spacing.lg,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.md,
  },
  avatarWrapper: { position: 'relative' },
  avatar: { width: 48, height: 48, borderRadius: Radius.pill },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: Radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  typeBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 20,
    height: 20,
    borderRadius: Radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Palette.offWhite,
  },
  textBlock: { flex: 1 },
  activityText: {
    fontSize: 15,
    color: Palette.ink,
    lineHeight: 21,
  },
  bold: { fontWeight: '700' },
  placeText: { fontWeight: '600', color: Palette.terracotta },
  timeText: { fontSize: 13, color: Palette.inkMuted, marginTop: 2 },
});
