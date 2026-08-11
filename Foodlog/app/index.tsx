import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Fonts, Palette, Radius, Spacing } from '@/constants/theme';

// Editorial food hero.
const HERO_IMAGE = require('@/assets/images/visily-image.png');

export default function WelcomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handleGetStarted = () => router.replace('/(tabs)/home');
  const handleLogin = () => router.replace('/(tabs)/home');

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <Image
        source={HERO_IMAGE}
        style={StyleSheet.absoluteFill}
        contentFit="cover"
        transition={400}
      />

      <View
        style={[
          styles.content,
          { paddingTop: insets.top + Spacing.lg, paddingBottom: insets.bottom + Spacing.lg },
        ]}>
        <View style={styles.brand}>
          <View style={styles.logoBadge}>
            <MaterialCommunityIcons name="chef-hat" size={26} color={Palette.white} />
          </View>
          <Text style={styles.brandName}>Foodlog</Text>
        </View>

        <Text style={styles.headline}>Document Your Culinary Journey.</Text>
        <Text style={styles.subtitle}>
          The premium social diary for the modern food enthusiast.
        </Text>

        <Pressable
          onPress={handleGetStarted}
          accessibilityRole="button"
          accessibilityLabel="Get started"
          style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed]}>
          <Text style={styles.primaryButtonText}>Get Started</Text>
        </Pressable>

        <Pressable
          onPress={handleLogin}
          accessibilityRole="button"
          accessibilityLabel="Log in to an existing account"
          hitSlop={8}
          style={({ pressed }) => [styles.loginRow, pressed && styles.pressed]}>
          <Text style={styles.loginText}>
            Already have an account? <Text style={styles.loginLink}>Log in</Text>
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Palette.ink,
  },
  scrimTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(20, 22, 17, 0.15)',
  },
  scrimBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(20, 22, 17, 0.62)',
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: Spacing.xl,
  },
  brand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    marginBottom: Spacing.lg,
  },
  logoBadge: {
    width: 52,
    height: 52,
    borderRadius: Radius.pill,
    backgroundColor: Palette.terracotta,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandName: {
    color: Palette.terracotta,
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  headline: {
    color: Palette.white,
    fontFamily: Fonts.serif,
    fontSize: 46,
    lineHeight: 50,
    fontWeight: Platform.OS === 'ios' ? '700' : 'bold',
    marginBottom: Spacing.md,
  },
  subtitle: {
    color: 'rgba(245, 243, 236, 0.88)',
    fontSize: 16,
    lineHeight: 23,
    marginBottom: Spacing.xxl,
  },
  primaryButton: {
    backgroundColor: Palette.terracotta,
    borderRadius: Radius.pill,
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    color: Palette.white,
    fontSize: 17,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  loginRow: {
    alignItems: 'center',
    marginTop: Spacing.lg,
  },
  loginText: {
    color: 'rgba(245, 243, 236, 0.85)',
    fontSize: 15,
  },
  loginLink: {
    color: Palette.white,
    fontWeight: '700',
  },
  pressed: {
    opacity: 0.85,
  },
});
