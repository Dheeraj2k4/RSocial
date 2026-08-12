import { useRouter } from 'expo-router';
import { ForkKnife, EnvelopeSimple, Lock, User } from 'phosphor-react-native';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Button, InputField, Screen } from '@/components/ui';
import { CommonStyles, FontFamily, Radius, Spacing, type ThemeColors } from '@/constants/theme';
import { useThemedStyles } from '@/theme/use-themed-styles';

type Mode = 'signin' | 'signup';

export default function AuthScreen() {
  const router = useRouter();
  const { styles, colors } = useThemedStyles(createStyles);
  const [mode, setMode] = useState<Mode>('signin');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isSignup = mode === 'signup';
  // No backend yet — proceed into the app once the form is filled.
  const canSubmit = email.trim().length > 3 && password.length >= 6 && (!isSignup || name.trim().length > 1);

  const submit = () => router.replace('/(tabs)/home');

  return (
    <Screen scroll padded contentContainerStyle={styles.content}>
      <View style={styles.brand}>
        <View style={styles.logoBadge}>
          <ForkKnife size={24} color={colors.white} weight="fill" />
        </View>
        <Text style={styles.brandName}>Foodlog</Text>
      </View>

      <Text style={styles.title}>{isSignup ? 'Create your account' : 'Welcome back'}</Text>
      <Text style={styles.subtitle}>
        {isSignup
          ? 'Start your culinary diary and follow friends.'
          : 'Log in to pick up where you left off.'}
      </Text>

      <View style={styles.form}>
        {isSignup ? (
          <InputField
            icon={User}
            placeholder="Display name"
            autoCapitalize="words"
            value={name}
            onChangeText={setName}
          />
        ) : null}
        <InputField
          icon={EnvelopeSimple}
          placeholder="Email address"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <InputField
          icon={Lock}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <Button
        title={isSignup ? 'Create account' : 'Log in'}
        onPress={submit}
        disabled={!canSubmit}
        style={styles.cta}
      />

      <Pressable onPress={submit} hitSlop={8} style={styles.guest}>
        <Text style={styles.guestText}>Continue as guest</Text>
      </Pressable>

      <View style={[CommonStyles.center, styles.toggle]}>
        <Text style={styles.toggleText}>
          {isSignup ? 'Already have an account? ' : "Don't have an account? "}
          <Text
            style={styles.toggleLink}
            onPress={() => setMode(isSignup ? 'signin' : 'signup')}>
            {isSignup ? 'Log in' : 'Sign up'}
          </Text>
        </Text>
      </View>
    </Screen>
  );
}

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    content: {
      paddingTop: Spacing.xxl,
      paddingBottom: Spacing.xxl,
    },
    brand: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: Spacing.md,
      marginBottom: Spacing.xxl,
    },
    logoBadge: {
      width: 48,
      height: 48,
      borderRadius: Radius.pill,
      backgroundColor: colors.accent,
      alignItems: 'center',
      justifyContent: 'center',
    },
    brandName: {
      fontFamily: FontFamily.displaySemiBold,
      fontSize: 22,
      color: colors.text,
      letterSpacing: 0.3,
    },
    title: {
      fontFamily: FontFamily.display,
      fontSize: 28,
      color: colors.text,
      marginBottom: Spacing.xs,
    },
    subtitle: {
      fontFamily: FontFamily.body,
      fontSize: 15,
      color: colors.mutedText,
      lineHeight: 21,
      marginBottom: Spacing.xl,
    },
    form: {
      gap: Spacing.md,
      marginBottom: Spacing.xl,
    },
    cta: {
      marginBottom: Spacing.md,
    },
    guest: {
      alignItems: 'center',
      paddingVertical: Spacing.sm,
    },
    guestText: {
      fontFamily: FontFamily.medium,
      fontSize: 14,
      color: colors.mutedText,
    },
    toggle: {
      marginTop: Spacing.xl,
    },
    toggleText: {
      fontFamily: FontFamily.body,
      fontSize: 14,
      color: colors.mutedText,
    },
    toggleLink: {
      fontFamily: FontFamily.semiBold,
      color: colors.accent,
    },
  });
