import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Palette, Radius, Spacing } from '@/constants/theme';

// ── Mock stats ──────────────────────────────────────────────────────
const STATS = [
  { label: 'Food Logs', value: '127' },
  { label: 'Following', value: '84' },
  { label: 'Followers', value: '312' },
];

export default function ProfileScreen() {
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
        {/* Header row */}
        <View style={styles.headerRow}>
          <Text style={styles.headerTitle}>Profile</Text>
          <Pressable hitSlop={8}>
            <Ionicons name="settings-outline" size={24} color={Palette.ink} />
          </Pressable>
        </View>

        {/* Avatar + name */}
        <View style={styles.avatarSection}>
          <Image
            source="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80"
            style={styles.avatar}
          />
          <Text style={styles.name}>Alex Rivera</Text>
          <Text style={styles.handle}>@alexrivera</Text>
          <Text style={styles.bio}>
            Documenting my culinary journey, one bite at a time 🍽️
          </Text>
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          {STATS.map((s) => (
            <View key={s.label} style={styles.statItem}>
              <Text style={styles.statValue}>{s.value}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </View>
          ))}
        </View>

        {/* Edit profile button */}
        <View style={styles.actionRow}>
          <Pressable style={styles.editButton}>
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </Pressable>
          <Pressable style={styles.shareButton}>
            <Ionicons name="share-outline" size={20} color={Palette.ink} />
          </Pressable>
        </View>

        {/* Placeholder grid */}
        <View style={styles.gridPlaceholder}>
          <Ionicons name="grid-outline" size={48} color={Palette.sand} />
          <Text style={styles.gridPlaceholderText}>
            Your food logs will appear here
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Palette.offWhite },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
    marginBottom: Spacing.xl,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: Palette.ink,
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: Radius.pill,
    marginBottom: Spacing.md,
    borderWidth: 3,
    borderColor: Palette.terracotta,
  },
  name: {
    fontSize: 22,
    fontWeight: '800',
    color: Palette.ink,
  },
  handle: {
    fontSize: 14,
    color: Palette.inkMuted,
    marginBottom: Spacing.sm,
  },
  bio: {
    fontSize: 14,
    color: Palette.inkMuted,
    textAlign: 'center',
    paddingHorizontal: Spacing.xxl,
    lineHeight: 20,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: Spacing.xl,
    paddingHorizontal: Spacing.xl,
  },
  statItem: { alignItems: 'center' },
  statValue: { fontSize: 20, fontWeight: '800', color: Palette.ink },
  statLabel: { fontSize: 13, color: Palette.inkMuted, marginTop: 2 },
  actionRow: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.xl,
    gap: Spacing.md,
    marginBottom: Spacing.xxl,
  },
  editButton: {
    flex: 1,
    backgroundColor: Palette.terracotta,
    borderRadius: Radius.pill,
    paddingVertical: 14,
    alignItems: 'center',
  },
  editButtonText: {
    color: Palette.white,
    fontSize: 15,
    fontWeight: '700',
  },
  shareButton: {
    width: 48,
    height: 48,
    borderRadius: Radius.pill,
    backgroundColor: Palette.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(213,199,163,0.35)',
  },
  gridPlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
  },
  gridPlaceholderText: {
    fontSize: 15,
    color: Palette.sand,
    marginTop: Spacing.md,
  },
});
