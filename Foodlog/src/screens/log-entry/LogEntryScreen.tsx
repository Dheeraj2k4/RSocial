import { useRouter } from 'expo-router';
import { NotePencil, X } from 'phosphor-react-native';
import { Pressable } from 'react-native';

import { PlaceholderScreen, Screen, ScreenHeader } from '@/components/ui';
import { Palette } from '@/constants/theme';

export default function LogEntryScreen() {
  const router = useRouter();

  return (
    <Screen edges={['top', 'bottom']}>
      <ScreenHeader
        title="Log a visit"
        right={
          <Pressable
            onPress={() => router.back()}
            hitSlop={8}
            accessibilityRole="button"
            accessibilityLabel="Close">
            <X size={24} color={Palette.ink} />
          </Pressable>
        }
      />
      <PlaceholderScreen
        icon={NotePencil}
        title="Log a restaurant"
        subtitle="Mark as visited, give a 1–5 rating, write a review, add photos and save to a list."
      />
    </Screen>
  );
}
