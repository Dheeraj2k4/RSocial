import { Image } from 'expo-image';
import { PaperPlaneRight } from 'phosphor-react-native';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { Screen, ScreenHeader } from '@/components/ui';
import { CommonStyles, FontFamily, Radius, Spacing, type ThemeColors } from '@/constants/theme';
import { useThemedStyles } from '@/theme/use-themed-styles';

type Comment = {
  id: string;
  avatar: string;
  name: string;
  text: string;
  time: string;
};

const INITIAL: Comment[] = [
  {
    id: 'c1',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=80',
    name: 'foodie_jen',
    text: 'The sourdough here really is unmatched. Adding to my list!',
    time: '1h',
  },
  {
    id: 'c2',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    name: 'Jordan K.',
    text: 'This looks incredible 🔥',
    time: '45m',
  },
  {
    id: 'c3',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    name: 'mia.eats',
    text: 'Need to go here this weekend 😍',
    time: '20m',
  },
];

const ME = 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80';

export default function CommentsScreen() {
  const { styles, colors } = useThemedStyles(createStyles);
  const [comments, setComments] = useState(INITIAL);
  const [draft, setDraft] = useState('');

  const post = () => {
    const text = draft.trim();
    if (!text) return;
    setComments((prev) => [
      ...prev,
      { id: `c${prev.length + 1}`, avatar: ME, name: 'alexa_eats', text, time: 'now' },
    ]);
    setDraft('');
  };

  return (
    <Screen>
      <ScreenHeader title={`Comments · ${comments.length}`} showBack />
      <KeyboardAvoidingView
        style={CommonStyles.fill}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={8}>
        <ScrollView
          style={CommonStyles.fill}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}>
          {comments.map((c) => (
            <View key={c.id} style={styles.row}>
              <Image source={{ uri: c.avatar }} style={styles.avatar} contentFit="cover" />
              <View style={styles.body}>
                <Text style={styles.meta}>
                  <Text style={styles.name}>{c.name}</Text>
                  {'  '}
                  <Text style={styles.time}>{c.time}</Text>
                </Text>
                <Text style={styles.text}>{c.text}</Text>
              </View>
            </View>
          ))}
        </ScrollView>

        <View style={[CommonStyles.row, styles.inputBar]}>
          <Image source={{ uri: ME }} style={styles.inputAvatar} contentFit="cover" />
          <TextInput
            style={styles.input}
            placeholder="Add a comment..."
            placeholderTextColor={colors.mutedText}
            value={draft}
            onChangeText={setDraft}
            multiline
          />
          <Pressable
            onPress={post}
            disabled={!draft.trim()}
            accessibilityRole="button"
            accessibilityLabel="Post comment"
            style={[styles.send, !draft.trim() && styles.sendDisabled]}>
            <PaperPlaneRight size={18} color={colors.white} weight="fill" />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </Screen>
  );
}

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    list: {
      paddingHorizontal: Spacing.xl,
      paddingVertical: Spacing.md,
      gap: Spacing.lg,
    },
    row: {
      flexDirection: 'row',
      gap: Spacing.md,
    },
    avatar: {
      width: 38,
      height: 38,
      borderRadius: Radius.pill,
      backgroundColor: colors.border,
    },
    body: {
      flex: 1,
      gap: 3,
    },
    meta: {
      fontFamily: FontFamily.body,
    },
    name: {
      fontFamily: FontFamily.semiBold,
      fontSize: 14,
      color: colors.text,
    },
    time: {
      fontFamily: FontFamily.body,
      fontSize: 12,
      color: colors.mutedText,
    },
    text: {
      fontFamily: FontFamily.body,
      fontSize: 14,
      color: colors.text,
      lineHeight: 19,
    },
    inputBar: {
      gap: Spacing.sm,
      paddingHorizontal: Spacing.lg,
      paddingVertical: Spacing.md,
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: colors.border,
      backgroundColor: colors.background,
    },
    inputAvatar: {
      width: 34,
      height: 34,
      borderRadius: Radius.pill,
      backgroundColor: colors.border,
    },
    input: {
      flex: 1,
      maxHeight: 100,
      fontFamily: FontFamily.body,
      fontSize: 15,
      color: colors.text,
      paddingHorizontal: Spacing.md,
      paddingVertical: Spacing.sm,
      borderRadius: Radius.lg,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
    },
    send: {
      width: 40,
      height: 40,
      borderRadius: Radius.pill,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.accent,
    },
    sendDisabled: {
      opacity: 0.4,
    },
  });
