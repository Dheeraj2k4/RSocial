import { useSignIn, useSignUp } from '@clerk/clerk-expo';
import { EnvelopeSimple, ForkKnife, Lock, User } from 'phosphor-react-native';
import { useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';

import { Button, InputField, Screen } from '@/components/ui';
import { CommonStyles, FontFamily, Radius, Spacing, type ThemeColors } from '@/constants/theme';
import { useThemedStyles } from '@/theme/use-themed-styles';

type Mode = 'signin' | 'signup' | 'reset';

function clerkError(err: unknown): string {
  const message = (err as { errors?: { message?: string }[] })?.errors?.[0]?.message;
  return typeof message === 'string' ? message : 'Something went wrong. Please try again.';
}

export default function AuthScreen() {
  const { styles, colors } = useThemedStyles(createStyles);
  const { signIn, setActive: setSignInActive, isLoaded: signInLoaded } = useSignIn();
  const { signUp, setActive: setSignUpActive, isLoaded: signUpLoaded } = useSignUp();

  const [mode, setMode] = useState<Mode>('signin');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [pendingVerification, setPendingVerification] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isSignup = mode === 'signup';
  const isReset = mode === 'reset';
  const ready = Boolean(signInLoaded && signUpLoaded);
  const canSubmit =
    email.trim().length > 3 &&
    password.length >= 6 &&
    (!isSignup || (name.trim().length > 1 && username.trim().length > 2));

  const switchMode = (next: Mode) => {
    setMode(next);
    setError(null);
    setPendingVerification(false);
    setResetSent(false);
    setCode('');
  };

  const onSignIn = async () => {
    if (!signIn) return;
    setLoading(true);
    setError(null);
    try {
      const attempt = await signIn.create({ identifier: email.trim(), password });
      if (attempt.status === 'complete') {
        await setSignInActive({ session: attempt.createdSessionId });
      } else {
        setError('Additional verification is required.');
      }
    } catch (err) {
      setError(clerkError(err));
    } finally {
      setLoading(false);
    }
  };

  const onSignUp = async () => {
    if (!signUp) return;
    setLoading(true);
    setError(null);
    try {
      await signUp.create({
        emailAddress: email.trim(),
        password,
        unsafeMetadata: { username: username.trim(), displayName: name.trim() },
      });
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
      setPendingVerification(true);
    } catch (err) {
      setError(clerkError(err));
    } finally {
      setLoading(false);
    }
  };

  const onVerify = async () => {
    if (!signUp) return;
    setLoading(true);
    setError(null);
    try {
      const attempt = await signUp.attemptEmailAddressVerification({ code: code.trim() });
      if (attempt.status === 'complete') {
        await setSignUpActive({ session: attempt.createdSessionId });
      } else {
        setError('That code did not work. Please try again.');
      }
    } catch (err) {
      setError(clerkError(err));
    } finally {
      setLoading(false);
    }
  };

  const onSendReset = async () => {
    if (!signIn) return;
    setLoading(true);
    setError(null);
    try {
      await signIn.create({ strategy: 'reset_password_email_code', identifier: email.trim() });
      setResetSent(true);
    } catch (err) {
      setError(clerkError(err));
    } finally {
      setLoading(false);
    }
  };

  const onResetPassword = async () => {
    if (!signIn) return;
    setLoading(true);
    setError(null);
    try {
      const attempt = await signIn.attemptFirstFactor({
        strategy: 'reset_password_email_code',
        code: code.trim(),
        password,
      });
      if (attempt.status === 'complete') {
        await setSignInActive({ session: attempt.createdSessionId });
      } else {
        setError('Could not reset password. Please try again.');
      }
    } catch (err) {
      setError(clerkError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Screen scroll padded contentContainerStyle={styles.content}>
      <View style={styles.brand}>
        <View style={styles.logoBadge}>
          <ForkKnife size={24} color={colors.white} weight="fill" />
        </View>
        <Text style={styles.brandName}>Foodlog</Text>
      </View>

      {pendingVerification ? (
        <>
          <Text style={styles.title}>Check your email</Text>
          <Text style={styles.subtitle}>Enter the code we just sent to {email}.</Text>
          <View style={styles.form}>
            <InputField
              placeholder="Verification code"
              keyboardType="number-pad"
              value={code}
              onChangeText={setCode}
            />
          </View>
          {error ? <Text style={styles.error}>{error}</Text> : null}
          <Button
            title="Verify email"
            onPress={onVerify}
            disabled={loading || code.trim().length < 4}
            style={styles.cta}
          />
        </>
      ) : isReset ? (
        <>
          <Text style={styles.title}>Reset password</Text>
          <Text style={styles.subtitle}>
            {resetSent
              ? 'Enter the code and choose a new password.'
              : "We'll email you a reset code."}
          </Text>
          <View style={styles.form}>
            <InputField
              icon={EnvelopeSimple}
              placeholder="Email address"
              autoCapitalize="none"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
              editable={!resetSent}
            />
            {resetSent ? (
              <>
                <InputField
                  placeholder="Reset code"
                  keyboardType="number-pad"
                  value={code}
                  onChangeText={setCode}
                />
                <InputField
                  icon={Lock}
                  placeholder="New password"
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                />
              </>
            ) : null}
          </View>
          {error ? <Text style={styles.error}>{error}</Text> : null}
          <Button
            title={resetSent ? 'Update password' : 'Send reset code'}
            onPress={resetSent ? onResetPassword : onSendReset}
            disabled={loading || !ready || email.trim().length < 4}
            style={styles.cta}
          />
          <Pressable onPress={() => switchMode('signin')} hitSlop={8} style={styles.guest}>
            <Text style={styles.guestText}>Back to log in</Text>
          </Pressable>
        </>
      ) : (
        <>
          <Text style={styles.title}>{isSignup ? 'Create your account' : 'Welcome back'}</Text>
          <Text style={styles.subtitle}>
            {isSignup
              ? 'Start your culinary diary and follow friends.'
              : 'Log in to pick up where you left off.'}
          </Text>

          <View style={styles.form}>
            {isSignup ? (
              <>
                <InputField
                  icon={User}
                  placeholder="Display name"
                  autoCapitalize="words"
                  value={name}
                  onChangeText={setName}
                />
                <InputField
                  icon={User}
                  placeholder="Username"
                  autoCapitalize="none"
                  value={username}
                  onChangeText={setUsername}
                />
              </>
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

          {!isSignup ? (
            <Pressable onPress={() => switchMode('reset')} hitSlop={8} style={styles.forgot}>
              <Text style={styles.forgotText}>Forgot password?</Text>
            </Pressable>
          ) : null}

          {error ? <Text style={styles.error}>{error}</Text> : null}

          <Button
            title={isSignup ? 'Create account' : 'Log in'}
            onPress={isSignup ? onSignUp : onSignIn}
            disabled={loading || !ready || !canSubmit}
            style={styles.cta}
          />

          <View style={[CommonStyles.center, styles.toggle]}>
            <Text style={styles.toggleText}>
              {isSignup ? 'Already have an account? ' : "Don't have an account? "}
              <Text
                style={styles.toggleLink}
                onPress={() => switchMode(isSignup ? 'signin' : 'signup')}>
                {isSignup ? 'Log in' : 'Sign up'}
              </Text>
            </Text>
          </View>
        </>
      )}

      {loading ? <ActivityIndicator color={colors.accent} style={styles.spinner} /> : null}
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
    error: {
      fontFamily: FontFamily.medium,
      fontSize: 13,
      color: colors.accent,
      marginBottom: Spacing.md,
    },
    forgot: {
      alignSelf: 'flex-end',
      marginBottom: Spacing.lg,
    },
    forgotText: {
      fontFamily: FontFamily.medium,
      fontSize: 13,
      color: colors.mutedText,
    },
    spinner: {
      marginTop: Spacing.lg,
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
