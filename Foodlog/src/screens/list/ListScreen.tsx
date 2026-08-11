import { useLocalSearchParams } from 'expo-router';
import { ListBullets } from 'phosphor-react-native';

import { PlaceholderScreen, Screen, ScreenHeader } from '@/components/ui';

export default function ListScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <Screen>
      <ScreenHeader title="List" showBack />
      <PlaceholderScreen
        icon={ListBullets}
        title={`List ${id}`}
        subtitle="A curated list of restaurants with a cover, description and saved places."
      />
    </Screen>
  );
}
