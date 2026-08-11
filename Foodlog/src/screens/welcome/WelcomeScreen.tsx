import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ForkKnife } from 'phosphor-react-native';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { FontFamily, Palette, Radius, Spacing } from '@/constants/theme';

// Editorial food hero.
const HERO_IMAGE = require('@/assets/onboarding_screen.jpg');

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

      <LinearGradient
        colors={['transparent', 'rgba(20, 22, 17, 0.95)']}
        locations={[0.3, 1]}
        style={StyleSheet.absoluteFill}
        pointerEvents="none"
      />

      <View
        style={[
          styles.content,
          { paddingTop: insets.top + Spacing.lg, paddingBottom: insets.bottom + Spacing.xxxl },
        ]}>
        <View style={styles.brand}>
          <View style={styles.logoBadge}>
            <ForkKnife size={26} color={Palette.white} weight="fill" />
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
    fontFamily: FontFamily.semiBold,
    fontSize: 22,
    letterSpacing: 0.3,
  },
  headline: {
    color: Palette.white,
    fontFamily: FontFamily.display,
    fontSize: 46,
    lineHeight: 50,
    marginBottom: Spacing.md,
  },
  subtitle: {
    color: 'rgba(245, 243, 236, 0.88)',
    fontFamily: FontFamily.body,
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
    fontFamily: FontFamily.semiBold,
    fontSize: 17,
    letterSpacing: 0.2,
  },
  loginRow: {
    alignItems: 'center',
    marginTop: Spacing.lg,
  },
  loginText: {
    color: 'rgba(245, 243, 236, 0.85)',
    fontFamily: FontFamily.body,
    fontSize: 15,
  },
  loginLink: {
    color: Palette.white,
    fontFamily: FontFamily.semiBold,
  },
  pressed: {
    opacity: 0.85,
  },
});
