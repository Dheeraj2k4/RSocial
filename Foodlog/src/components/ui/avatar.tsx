import { Image } from 'expo-image';
import { StyleSheet, View } from 'react-native';

import { Palette, Radius } from '@/constants/theme';

type AvatarProps = {
  source: string;
  size?: number;
  online?: boolean;
};

/** Circular user image with an optional presence dot. */
export function Avatar({ source, size = 44, online = false }: AvatarProps) {
  return (
    <View style={{ width: size, height: size }}>
      <Image
        source={{ uri: source }}
        style={[styles.image, { width: size, height: size, borderRadius: size / 2 }]}
        contentFit="cover"
      />
      {online ? <View style={styles.status} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    backgroundColor: Palette.sandMuted,
  },
  status: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 12,
    height: 12,
    borderRadius: Radius.pill,
    backgroundColor: '#43B581', // presence indicator
    borderWidth: 2,
    borderColor: Palette.offWhite,
  },
});
