import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import {
  Camera,
  CookingPot,
  MapPin,
  ShareNetwork,
  XCircle,
} from 'phosphor-react-native';
import { useState } from 'react';
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import {
  Chip,
  FormField,
  InputField,
  Screen,
  ScreenHeader,
  StarRating,
  ToggleRow,
} from '@/components/ui';
import { FontFamily, Palette, Radius, Spacing } from '@/constants/theme';

// ── Rating labels ───────────────────────────────────────────────────
const RATING_LABELS: Record<number, string> = {
  0: 'Tap a star to rate',
  1: 'Not great',
  2: 'Okay',
  3: 'Good',
  4: 'Very good',
  5: 'Absolutely delicious',
};

// ── Vibe tags ───────────────────────────────────────────────────────
const VIBE_TAGS = ['Aesthetic', 'Date Night', 'Hidden Gem', 'Loud'];

export default function LogEntryScreen() {
  const router = useRouter();

  // ── State ───────────────────────────────────────────────────────
  const [rating, setRating] = useState(4);
  const [selectedVibes, setSelectedVibes] = useState<string[]>(['Aesthetic']);
  const [shareToFeed, setShareToFeed] = useState(true);
  const [notes, setNotes] = useState('');
  const [photo, setPhoto] = useState<string | null>(null);

  const toggleVibe = (tag: string) => {
    setSelectedVibes((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  const handleTakePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Camera access needed', 'Enable camera access to add a photo of your dish.');
      return;
    }
    const result = await ImagePicker.launchCameraAsync({ quality: 0.8, allowsEditing: true });
    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };

  const handlePublish = () => {
    // TODO: wire up publish logic
    router.back();
  };

  return (
    <Screen edges={['top', 'bottom']}>
      {/* ── Header ──────────────────────────────────────────── */}
      <ScreenHeader
        title="New Log Entry"
        showBack
        right={
          <Pressable
            onPress={handlePublish}
            accessibilityRole="button"
            style={({ pressed }) => [styles.publishButton, pressed && styles.publishButtonPressed]}>
            <Text style={styles.publishText}>Publish</Text>
          </Pressable>
        }
      />

      <View style={styles.divider} />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* ── Photo Upload ──────────────────────────────────── */}
        <FormField label="THE MAIN DISH" badge="Optional">
          <View style={styles.photoContainer}>
            {photo ? (
              <Image source={{ uri: photo }} style={StyleSheet.absoluteFill} contentFit="cover" />
            ) : (
              <View style={styles.photoPlaceholder}>
                <Camera size={48} color={Palette.sand} weight="thin" />
              </View>
            )}

            <View style={styles.photoActions}>
              <Pressable
                style={styles.cameraButton}
                onPress={handleTakePhoto}
                accessibilityLabel="Take photo">
                <Camera size={18} color={Palette.white} weight="fill" />
              </Pressable>
              {photo ? (
                <Pressable onPress={() => setPhoto(null)} accessibilityLabel="Remove photo">
                  <XCircle size={28} color={Palette.terracotta} weight="fill" />
                </Pressable>
              ) : null}
            </View>
          </View>
        </FormField>

        {/* ── Restaurant ────────────────────────────────────── */}
        <FormField label="RESTAURANT">
          <InputField
            icon={MapPin}
            placeholder="Where did you eat?"
          />
        </FormField>

        {/* ── Dish Name ─────────────────────────────────────── */}
        <FormField label="DISH NAME">
          <InputField
            icon={CookingPot}
            placeholder="Signature Truffle Pasta..."
          />
        </FormField>

        {/* ── Rating ────────────────────────────────────────── */}
        <View style={styles.ratingSection}>
          <Text style={styles.ratingQuestion}>How was the experience?</Text>
          <StarRating value={rating} onChange={setRating} size={38} />
          <Text style={styles.ratingLabel}>{RATING_LABELS[rating]}</Text>
        </View>

        {/* ── Vibe Check ────────────────────────────────────── */}
        <FormField label="THE VIBE">
          <View style={styles.vibeRow}>
            {VIBE_TAGS.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                active={selectedVibes.includes(tag)}
                onPress={() => toggleVibe(tag)}
              />
            ))}
          </View>
        </FormField>

        {/* ── Personal Notes ────────────────────────────────── */}
        <FormField label="PERSONAL NOTES">
          <View style={styles.notesContainer}>
            <TextInput
              style={styles.notesInput}
              placeholder={
                'Log this meal... What made it special?\n(e.g., "The pesto was actually imported from Genoa!")'
              }
              placeholderTextColor={Palette.inkMuted}
              multiline
              textAlignVertical="top"
              value={notes}
              onChangeText={setNotes}
            />
          </View>
        </FormField>

        {/* ── Share Toggle ──────────────────────────────────── */}
        <ToggleRow
          icon={<ShareNetwork size={20} color={Palette.ink} weight="bold" />}
          title="Share to Feed"
          subtitle="Visible to your followers"
          value={shareToFeed}
          onValueChange={setShareToFeed}
        />
      </ScrollView>
    </Screen>
  );
}

// ── Styles ─────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  publishButton: {
    backgroundColor: Palette.terracotta,
    paddingHorizontal: Spacing.lg,
    paddingVertical: 8,
    borderRadius: Radius.pill,
  },
  publishButtonPressed: {
    opacity: 0.85,
  },
  publishText: {
    fontFamily: FontFamily.semiBold,
    fontSize: 13,
    color: Palette.white,
  },
  divider: {
    height: 1,
    backgroundColor: Palette.sandMuted,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: Spacing.xl,
    gap: Spacing.xl,
    paddingBottom: Spacing.xxxl,
  },

  /* Photo upload */
  photoContainer: {
    height: 200,
    borderRadius: Radius.lg,
    backgroundColor: Palette.sandMuted,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoPlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoActions: {
    position: 'absolute',
    bottom: Spacing.md,
    right: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  cameraButton: {
    width: 36,
    height: 36,
    borderRadius: Radius.pill,
    backgroundColor: Palette.ink,
    alignItems: 'center',
    justifyContent: 'center',
  },
  removePhotoButton: {
    /* Touch target handled by the XCircle icon size */
  },

  /* Rating section */
  ratingSection: {
    alignItems: 'center',
    gap: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  ratingQuestion: {
    fontFamily: FontFamily.semiBold,
    fontSize: 18,
    color: Palette.ink,
  },
  ratingLabel: {
    fontFamily: FontFamily.medium,
    fontSize: 15,
    color: Palette.terracotta,
    fontStyle: 'italic',
  },

  /* Vibe chips */
  vibeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },

  /* Notes */
  notesContainer: {
    backgroundColor: Palette.sandMuted,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
    minHeight: 120,
  },
  notesInput: {
    fontFamily: FontFamily.body,
    fontSize: 15,
    color: Palette.ink,
    lineHeight: 22,
    padding: 0,
  },
});
