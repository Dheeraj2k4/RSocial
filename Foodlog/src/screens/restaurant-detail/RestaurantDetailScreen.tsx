import { useLocalSearchParams, useRouter } from 'expo-router';
import { ForkKnife } from 'phosphor-react-native';

import { Button, PlaceholderScreen, Screen, ScreenHeader } from '@/components/ui';

export default function RestaurantDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  return (
    <Screen>
      <ScreenHeader title="Restaurant" showBack />
      <PlaceholderScreen
        icon={ForkKnife}
        title={`Restaurant ${id}`}
        subtitle="Photos, rating, reviews, friends who visited and lists will live here.">
        <Button title="View a dish" onPress={() => router.push('/dish/d1')} />
        <Button
          title="Log this visit"
          variant="secondary"
          onPress={() => router.push('/log')}
        />
      </PlaceholderScreen>
    </Screen>
  );
}
