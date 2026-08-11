import { Gear } from 'phosphor-react-native';

import { PlaceholderScreen, Screen, ScreenHeader } from '@/components/ui';

export default function SettingsScreen() {
  return (
    <Screen>
      <ScreenHeader title="Settings" showBack />
      <PlaceholderScreen
        icon={Gear}
        title="Settings"
        subtitle="Account, notifications, privacy and preferences will be configured here."
      />
    </Screen>
  );
}
