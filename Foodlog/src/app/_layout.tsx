import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from '@expo-google-fonts/inter';
import { Montserrat_600SemiBold } from '@expo-google-fonts/montserrat/600SemiBold';
import { Montserrat_700Bold } from '@expo-google-fonts/montserrat/700Bold';
import { ClerkProvider, useAuth, useUser } from '@clerk/clerk-expo';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { ENV } from '@/config/env';
import { tokenCache } from '@/lib/clerk-token-cache';
import { setSupabaseTokenGetter } from '@/lib/supabase';
import { ensureProfile } from '@/services/profile.service';
import { AppThemeProvider, useTheme } from '@/theme/theme-context';

SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  initialRouteName: 'index',
};

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ClerkProvider publishableKey={ENV.clerkPublishableKey} tokenCache={tokenCache}>
      <AppThemeProvider>
        <RootNavigator />
      </AppThemeProvider>
    </ClerkProvider>
  );
}

function RootNavigator() {
  const { isDark } = useTheme();
  const { isLoaded, isSignedIn, userId, getToken } = useAuth();
  const { user } = useUser();
  const segments = useSegments();
  const router = useRouter();

  // Hand Clerk's session token to Supabase so RLS can identify the user.
  useEffect(() => {
    setSupabaseTokenGetter(async () => (await getToken()) ?? null);
  }, [getToken]);

  // Ensure a Supabase profile row exists once the user is authenticated.
  useEffect(() => {
    if (!isLoaded || !isSignedIn || !userId) return;
    const meta = (user?.unsafeMetadata ?? {}) as { username?: string; displayName?: string };
    ensureProfile({
      id: userId,
      username: meta.username,
      displayName: meta.displayName ?? user?.fullName ?? undefined,
      avatarUrl: user?.imageUrl ?? undefined,
    }).catch(() => {});
  }, [isLoaded, isSignedIn, userId, user]);

  // Route guard: keep signed-out users out of the tab app.
  useEffect(() => {
    if (!isLoaded) return;
    const inTabs = segments[0] === '(tabs)';
    const atEntry = segments[0] === undefined || segments[0] === 'auth';
    if (isSignedIn && atEntry) {
      router.replace('/(tabs)/home');
    } else if (!isSignedIn && inTabs) {
      router.replace('/');
    }
  }, [isLoaded, isSignedIn, segments]);

  if (!isLoaded) {
    return null;
  }

  return (
    <ThemeProvider value={isDark ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="auth" options={{ headerShown: false }} />
        <Stack.Screen name="settings" options={{ headerShown: false }} />
        <Stack.Screen name="privacy-policy" options={{ headerShown: false }} />
        <Stack.Screen name="notifications" options={{ headerShown: false }} />
        <Stack.Screen name="lists" options={{ headerShown: false }} />
        <Stack.Screen name="log" options={{ presentation: 'modal', headerShown: false }} />
        <Stack.Screen name="comments" options={{ presentation: 'modal', headerShown: false }} />
      </Stack>
      <StatusBar style={isDark ? 'light' : 'dark'} />
    </ThemeProvider>
  );
}
