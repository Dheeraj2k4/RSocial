import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { Screen, ScreenHeader } from '@/components/ui';
import { FontFamily, Spacing, type ThemeColors } from '@/constants/theme';
import { useThemedStyles } from '@/theme/use-themed-styles';

const LAST_UPDATED = 'August 12, 2026';

// Store-ready privacy policy content. Keep in sync with your legal review.
const SECTIONS: { heading: string; body: string[] }[] = [
  {
    heading: '1. Information We Collect',
    body: [
      'Account information you provide: name, username, email, profile photo and bio.',
      'Content you create: restaurant logs, ratings, reviews, photos, lists and comments.',
      'Usage data: the restaurants you view, searches, likes, follows and other interactions.',
      'Device and log data: device model, operating system, app version, language and approximate IP-based location.',
      'Location: with your permission, we use your approximate location to show nearby restaurants.',
      'Camera and photos: with your permission, we access the camera or photo library only when you add a photo.',
    ],
  },
  {
    heading: '2. How We Use Your Information',
    body: [
      'To provide, maintain and personalize the app and your feed.',
      'To power discovery and recommendations based on your taste and people you follow.',
      'To enable social features such as following, likes, comments and lists.',
      'To keep the community safe and prevent fraud or abuse.',
      'To send important service updates and, if you opt in, product news.',
      'To analyze usage so we can improve the product.',
    ],
  },
  {
    heading: '3. How We Share Information',
    body: [
      'With other users: your public profile, reviews, ratings and public lists are visible to others.',
      'With service providers who host, analyze and support the app under confidentiality obligations.',
      'For legal reasons, to comply with the law or protect rights and safety.',
      'In a business transfer such as a merger or acquisition.',
      'We do not sell your personal information.',
    ],
  },
  {
    heading: '4. Data Retention',
    body: [
      'We keep your information while your account is active. You can delete your account at any time, after which we remove or anonymize your personal data, except where retention is required by law.',
    ],
  },
  {
    heading: '5. Your Rights and Choices',
    body: [
      'Access, update or delete your information from your profile and settings.',
      'Request a copy of your data or ask us to delete your account.',
      'Manage camera, photo and location permissions in your device settings.',
      'Opt out of marketing communications at any time.',
    ],
  },
  {
    heading: '6. Security',
    body: [
      'We use reasonable technical and organizational measures to protect your information. No method of transmission or storage is completely secure, so we cannot guarantee absolute security.',
    ],
  },
  {
    heading: '7. Children’s Privacy',
    body: [
      'Foodlog is not directed to children under 13 (or the minimum age required in your country). We do not knowingly collect data from children. If you believe a child has provided us data, contact us and we will delete it.',
    ],
  },
  {
    heading: '8. Third-Party Services',
    body: [
      'The app may link to or use third-party services (for example maps or image hosting). Their use of your information is governed by their own privacy policies.',
    ],
  },
  {
    heading: '9. International Transfers',
    body: [
      'Your information may be processed and stored in countries other than your own, which may have different data protection laws. We take steps to protect your data wherever it is processed.',
    ],
  },
  {
    heading: '10. Changes to This Policy',
    body: [
      'We may update this policy from time to time. We will notify you of significant changes in the app or by email, and update the date above.',
    ],
  },
  {
    heading: '11. Contact Us',
    body: ['Questions about this policy? Email us at privacy@foodlog.app.'],
  },
];

export default function PrivacyPolicyScreen() {
  const { styles } = useThemedStyles(createStyles);

  return (
    <Screen>
      <ScreenHeader title="Privacy Policy" showBack />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.updated}>Last updated: {LAST_UPDATED}</Text>
        <Text style={styles.intro}>
          This Privacy Policy explains what information Foodlog collects, how we use it, and the
          choices you have. By using the app you agree to this policy.
        </Text>

        {SECTIONS.map((section) => (
          <View key={section.heading} style={styles.section}>
            <Text style={styles.heading}>{section.heading}</Text>
            {section.body.map((paragraph) => (
              <Text key={paragraph} style={styles.paragraph}>
                {paragraph}
              </Text>
            ))}
          </View>
        ))}
      </ScrollView>
    </Screen>
  );
}

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    content: {
      paddingHorizontal: Spacing.xl,
      paddingTop: Spacing.md,
      paddingBottom: Spacing.xxxl,
      gap: Spacing.lg,
    },
    updated: {
      fontFamily: FontFamily.medium,
      fontSize: 13,
      color: colors.mutedText,
    },
    intro: {
      fontFamily: FontFamily.body,
      fontSize: 15,
      lineHeight: 23,
      color: colors.text,
    },
    section: {
      gap: Spacing.sm,
    },
    heading: {
      fontFamily: FontFamily.semiBold,
      fontSize: 16,
      color: colors.text,
    },
    paragraph: {
      fontFamily: FontFamily.body,
      fontSize: 14,
      lineHeight: 21,
      color: colors.mutedText,
    },
  });
