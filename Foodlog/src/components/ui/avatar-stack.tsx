import { Image } from 'expo-image';
import { StyleSheet, View } from 'react-native';

import { Palette } from '@/constants/theme';

type AvatarStackProps = {
  sources: string[];
  size?: number;
  max?: number;
};

/** Overlapping avatars, e.g. "liked by …" or "friends who visited". */
export function AvatarStack({ sources, size = 20, max = 3 }: AvatarStackProps) {
  const shown = sources.slice(0, max);

  return (
    <View style={styles.row}>
      {shown.map((uri, index) => (
        <Image
          key={uri}
          source={{ uri }}
          contentFit="cover"
          style={[
            styles.avatar,
            {
              width: size,
              height: size,
              borderRadius: size / 2,
              marginLeft: index === 0 ? 0 : -size / 3,
            },
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    borderWidth: 1.5,
    borderColor: Palette.offWhite,
    backgroundColor: Palette.sandMuted,
  },
});
