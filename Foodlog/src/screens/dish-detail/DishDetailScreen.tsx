import { useLocalSearchParams } from 'expo-router';
import { Pizza } from 'phosphor-react-native';

import { PlaceholderScreen, Screen, ScreenHeader } from '@/components/ui';

export default function DishDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <Screen>
      <ScreenHeader title="Dish" showBack />
      <PlaceholderScreen
        icon={Pizza}
        title={`Dish ${id}`}
        subtitle="Dish photos, ratings and the reviews that mention it will appear here."
      />
    </Screen>
  );
}
