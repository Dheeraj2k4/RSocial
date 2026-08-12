import { Tabs, useRouter } from 'expo-router';
import { Heart, House, MagnifyingGlass, Plus, User } from 'phosphor-react-native';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { HapticTab } from '@/components/haptic-tab';
import { FontFamily, type ThemeColors } from '@/constants/theme';
import { useThemedStyles } from '@/theme/use-themed-styles';
import { withAlpha } from '@/utils';

export default function TabsLayout() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { styles, colors } = useThemedStyles(createStyles);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        animation: 'fade',
        tabBarButton: HapticTab,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: withAlpha(colors.text, 0.65),
        tabBarLabelStyle: styles.tabLabel,
        tabBarItemStyle: styles.tabItem,
        tabBarStyle: [styles.tabBar, { bottom: Math.max(insets.bottom, 16) }],
      }}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <House size={24} color={color} weight={focused ? 'fill' : 'regular'} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ color, focused }) => (
            <MagnifyingGlass size={24} color={color} weight={focused ? 'fill' : 'regular'} />
          ),
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: '',
          tabBarIcon: () => (
            <View style={styles.fab}>
              <Plus size={26} color={colors.white} weight="bold" />
            </View>
          ),
        }}
        listeners={{
          // The center action logs a visit — open the modal instead of a tab.
          tabPress: (e) => {
            e.preventDefault();
            router.push('/log');
          },
        }}
      />
      <Tabs.Screen
        name="activity"
        options={{
          title: 'Activity',
          tabBarIcon: ({ color, focused }) => (
            <Heart size={24} color={color} weight={focused ? 'fill' : 'regular'} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <User size={24} color={color} weight={focused ? 'fill' : 'regular'} />
          ),
        }}
      />

      {/* Detail screens live inside the tabs so the bar stays visible, but are hidden from it. */}
      <Tabs.Screen name="restaurant/[id]" options={{ href: null }} />
      <Tabs.Screen name="dish/[id]" options={{ href: null }} />
      <Tabs.Screen name="list/[id]" options={{ href: null }} />
    </Tabs>
  );
}

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    tabBar: {
      position: 'absolute',
      marginHorizontal: 48,
      height: 64,
      borderRadius: 32,
      paddingHorizontal: 16,
      backgroundColor: colors.surface,
      borderTopWidth: 0,
      borderWidth: 1,
      borderColor: colors.border,
      // Soft floating shadow
      shadowColor: colors.black,
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.12,
      shadowRadius: 16,
      elevation: 12,
    },
    tabItem: {
      height: 64,
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: 6,
    },
    tabLabel: {
      fontFamily: FontFamily.medium,
      fontSize: 11,
    },
    fab: {
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: colors.accent,
      alignItems: 'center',
      justifyContent: 'center',
      transform: [{ translateY: -12 }],
      shadowColor: colors.accent,
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.35,
      shadowRadius: 10,
      elevation: 8,
    },
  });
