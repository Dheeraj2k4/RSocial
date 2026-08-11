import { useRouter } from 'expo-router';
import { Gear, User } from 'phosphor-react-native';
import { Pressable } from 'react-native';

import { Button, PlaceholderScreen, Screen, ScreenHeader } from '@/components/ui';
import { Palette } from '@/constants/theme';

export default function ProfileScreen() {
  const router = useRouter();

  return (
    <Screen>
      <ScreenHeader
        title="Profile"
        right={
          <Pressable
            onPress={() => router.push('/settings')}
            hitSlop={8}
            accessibilityRole="button"
            accessibilityLabel="Open settings">
            <Gear size={22} color={Palette.ink} />
          </Pressable>
        }
      />
      <PlaceholderScreen
        icon={User}
        title="Your food identity"
        subtitle="Visited restaurants, ratings, reviews, lists and followers will live here.">
        <Button title="Open settings" variant="secondary" onPress={() => router.push('/settings')} />
      </PlaceholderScreen>
    </Screen>
  );
}
