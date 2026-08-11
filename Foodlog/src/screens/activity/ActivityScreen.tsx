import { Heart } from 'phosphor-react-native';

import { PlaceholderScreen, Screen, ScreenHeader } from '@/components/ui';

export default function ActivityScreen() {
  return (
    <Screen>
      <ScreenHeader title="Activity" />
      <PlaceholderScreen
        icon={Heart}
        title="Activity"
        subtitle="Likes, comments, new followers and social activity will show up here."
      />
    </Screen>
  );
}
