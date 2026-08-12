import { Image } from 'expo-image';
import { Chat, Heart, MapPin } from 'phosphor-react-native';
import { Fragment } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Avatar, FollowButton, Screen, ScreenHeader } from '@/components/ui';
import { CommonStyles, FontFamily, Radius, Spacing, type ThemeColors } from '@/constants/theme';
import { useThemedStyles } from '@/theme/use-themed-styles';

type NotificationType = 'like' | 'comment' | 'follow' | 'visit';

type Notification = {
  id: string;
  type: NotificationType;
  avatar: string;
  name: string;
  action: string;
  time: string;
  thumbnail?: string;
};

type Group = { title: string; items: Notification[] };

const GROUPS: Group[] = [
  {
    title: 'Today',
    items: [
      {
        id: 'n1',
        type: 'like',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
        name: 'Sienna Miller',
        action: 'liked your log at The Morning Table',
        time: '2h',
        thumbnail: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=200&auto=format&fit=crop&q=80',
      },
      {
        id: 'n2',
        type: 'follow',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=80',
        name: 'foodie_jen',
        action: 'started following you',
        time: '4h',
      },
      {
        id: 'n3',
        type: 'comment',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
        name: 'Jordan K.',
        action: 'commented: “This looks incredible 🔥”',
        time: '6h',
        thumbnail: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=200&auto=format&fit=crop&q=80',
      },
    ],
  },
  {
    title: 'This Week',
    items: [
      {
        id: 'n4',
        type: 'visit',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
        name: 'travelplate',
        action: 'visited a spot from your Weekend Brunch list',
        time: '2d',
      },
      {
        id: 'n5',
        type: 'follow',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
        name: 'mia.eats',
        action: 'started following you',
        time: '3d',
      },
    ],
  },
];

const ICONS = {
  like: Heart,
  comment: Chat,
  follow: MapPin,
  visit: MapPin,
} as const;

export default function NotificationsScreen() {
  const { styles, colors } = useThemedStyles(createStyles);

  return (
    <Screen>
      <ScreenHeader title="Notifications" showBack />
      <View style={CommonStyles.fill}>
        {GROUPS.map((group) => (
          <Fragment key={group.title}>
            <Text style={styles.groupTitle}>{group.title}</Text>
            {group.items.map((item) => {
              const Badge = ICONS[item.type];
              return (
                <View key={item.id} style={styles.row}>
                  <View style={styles.avatarWrap}>
                    <Avatar source={item.avatar} size={44} />
                    <View style={styles.badge}>
                      <Badge size={11} color={colors.white} weight="fill" />
                    </View>
                  </View>

                  <View style={styles.body}>
                    <Text style={styles.text}>
                      <Text style={styles.name}>{item.name} </Text>
                      {item.action}
                    </Text>
                    <Text style={styles.time}>{item.time} ago</Text>
                  </View>

                  {item.type === 'follow' ? (
                    <FollowButton />
                  ) : item.thumbnail ? (
                    <Image source={{ uri: item.thumbnail }} style={styles.thumb} contentFit="cover" />
                  ) : null}
                </View>
              );
            })}
          </Fragment>
        ))}
      </View>
    </Screen>
  );
}

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    groupTitle: {
      fontFamily: FontFamily.semiBold,
      fontSize: 12,
      letterSpacing: 0.8,
      textTransform: 'uppercase',
      color: colors.mutedText,
      paddingHorizontal: Spacing.xl,
      paddingTop: Spacing.lg,
      paddingBottom: Spacing.sm,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: Spacing.md,
      paddingHorizontal: Spacing.xl,
      paddingVertical: Spacing.md,
    },
    avatarWrap: {
      width: 44,
      height: 44,
    },
    badge: {
      position: 'absolute',
      right: -2,
      bottom: -2,
      width: 20,
      height: 20,
      borderRadius: Radius.pill,
      backgroundColor: colors.accent,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 2,
      borderColor: colors.background,
    },
    body: {
      flex: 1,
      gap: 2,
    },
    text: {
      fontFamily: FontFamily.body,
      fontSize: 14,
      color: colors.text,
      lineHeight: 19,
    },
    name: {
      fontFamily: FontFamily.semiBold,
      color: colors.text,
    },
    time: {
      fontFamily: FontFamily.body,
      fontSize: 12,
      color: colors.mutedText,
    },
    thumb: {
      width: 44,
      height: 44,
      borderRadius: Radius.sm,
      backgroundColor: colors.border,
    },
  });
