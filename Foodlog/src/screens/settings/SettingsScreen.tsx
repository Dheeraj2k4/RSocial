import { useRouter } from 'expo-router';
import {
  ArrowLeft,
  Bell,
  CaretRight,
  CreditCard,
  DeviceMobile,
  EnvelopeSimple,
  Globe,
  Lock,
  Moon,
  Question,
  ShieldCheck,
  SignOut,
  Trash,
  User,
} from 'phosphor-react-native';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Avatar, Badge, SettingsRow, SettingsSection } from '@/components/ui';
import { CommonStyles, FontFamily, Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/theme/theme-context';

const AVATAR = 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80';

export default function SettingsScreen() {
  const router = useRouter();
  const { colors, isDark, toggleMode } = useTheme();

  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNewsletter, setEmailNewsletter] = useState(false);

  const renderSwitch = (value: boolean, onValueChange: (next: boolean) => void) => (
    <Switch
      value={value}
      onValueChange={onValueChange}
      trackColor={{ true: colors.accent, false: colors.border }}
      thumbColor={colors.white}
      ios_backgroundColor={colors.border}
    />
  );

  return (
    <View style={[CommonStyles.fill, { backgroundColor: colors.background }]}>
      <SafeAreaView style={CommonStyles.fill} edges={['top']}>
        <View style={[CommonStyles.rowBetween, styles.header]}>
          <Pressable onPress={() => router.back()} hitSlop={8} accessibilityLabel="Go back">
            <ArrowLeft size={24} color={colors.text} />
          </Pressable>
          <Text style={[styles.headerTitle, { color: colors.text }]}>Settings</Text>
          <Pressable onPress={() => router.back()} hitSlop={8} accessibilityRole="button">
            <Text style={[styles.done, { color: colors.accent }]}>Done</Text>
          </Pressable>
        </View>

        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          {/* Profile */}
          <Pressable
            style={[styles.profileCard, { backgroundColor: colors.surface, borderColor: colors.border }]}
            accessibilityRole="button">
            <Avatar source={AVATAR} size={56} />
            <View style={styles.profileInfo}>
              <Text style={[styles.profileName, { color: colors.text }]}>Jordan Hayes</Text>
              <Text style={[styles.profileEmail, { color: colors.mutedText }]}>jordan@foodlog.app</Text>
              <View style={styles.profileBadge}>
                <Badge label="Foodie Pro" />
              </View>
            </View>
            <View style={[styles.profileChevron, { backgroundColor: colors.background }]}>
              <CaretRight size={16} color={colors.mutedText} />
            </View>
          </Pressable>

          <SettingsSection title="ACCOUNT">
            <SettingsRow icon={User} label="Personal Information" onPress={() => {}} />
            <SettingsRow
              icon={CreditCard}
              label="Foodlog Pro Subscription"
              right={<Badge label="Active" variant="soft" />}
              onPress={() => {}}
            />
            <SettingsRow icon={Globe} label="Language" value="English (US)" onPress={() => {}} />
          </SettingsSection>

          <SettingsSection title="NOTIFICATIONS">
            <SettingsRow
              icon={Bell}
              label="Push Notifications"
              showChevron={false}
              right={renderSwitch(pushNotifications, setPushNotifications)}
            />
            <SettingsRow
              icon={EnvelopeSimple}
              label="Email Newsletter"
              showChevron={false}
              right={renderSwitch(emailNewsletter, setEmailNewsletter)}
            />
            <SettingsRow icon={DeviceMobile} label="SMS Alerts" onPress={() => {}} />
          </SettingsSection>

          <SettingsSection title="PRIVACY">
            <SettingsRow icon={Lock} label="Privacy Policy" onPress={() => {}} />
            <SettingsRow icon={ShieldCheck} label="Security & Password" onPress={() => {}} />
            <SettingsRow
              icon={Moon}
              label="Dark Mode"
              showChevron={false}
              right={renderSwitch(isDark, toggleMode)}
            />
          </SettingsSection>

          <SettingsSection title="SUPPORT">
            <SettingsRow icon={Question} label="Help Center" onPress={() => {}} />
            <SettingsRow icon={Trash} label="Clear Cache" value="124 MB" onPress={() => {}} />
          </SettingsSection>

          <Pressable
            style={[CommonStyles.center, styles.logout]}
            onPress={() => router.replace('/')}
            accessibilityRole="button">
            <View style={CommonStyles.row}>
              <SignOut size={20} color={colors.accent} />
              <Text style={[styles.logoutText, { color: colors.accent }]}>Log Out</Text>
            </View>
          </Pressable>

          <View style={styles.footer}>
            <Text style={[styles.footerText, { color: colors.mutedText }]}>FOODLOG VERSION 2.4.0 (1202)</Text>
            <Text style={[styles.footerText, { color: colors.mutedText }]}>MADE WITH LOVE IN NYC</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 52,
    paddingHorizontal: Spacing.xl,
  },
  headerTitle: {
    fontFamily: FontFamily.semiBold,
    fontSize: 20,
  },
  done: {
    fontFamily: FontFamily.semiBold,
    fontSize: 15,
  },
  content: {
    padding: Spacing.xl,
    gap: Spacing.xl,
    paddingBottom: Spacing.xxxl,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    padding: Spacing.lg,
    borderRadius: Radius.lg,
    borderWidth: 1,
  },
  profileInfo: {
    flex: 1,
    gap: 2,
  },
  profileName: {
    fontFamily: FontFamily.semiBold,
    fontSize: 17,
  },
  profileEmail: {
    fontFamily: FontFamily.body,
    fontSize: 13,
  },
  profileBadge: {
    alignSelf: 'flex-start',
    marginTop: Spacing.xs,
  },
  profileChevron: {
    width: 28,
    height: 28,
    borderRadius: Radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logout: {
    flexDirection: 'row',
    gap: Spacing.sm,
    paddingVertical: Spacing.sm,
  },
  logoutText: {
    fontFamily: FontFamily.semiBold,
    fontSize: 16,
  },
  footer: {
    alignItems: 'center',
    gap: 2,
  },
  footerText: {
    fontFamily: FontFamily.medium,
    fontSize: 11,
    letterSpacing: 0.4,
  },
});
