import React from 'react';
import { View, StyleSheet, Text, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Button } from '@/components/ui/button';
import { HazardStripe } from '@/components/ui/hazard-stripe';
import { Ionicons } from '@expo/vector-icons';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function WelcomeScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const router = useRouter();

  // Theme colors matching mockups
  const backgroundColor = isDark ? '#0D0E11' : '#FFFFFF';
  const textColor = isDark ? '#FFFFFF' : '#1E2022';
  const subtextColor = isDark ? '#94A3B8' : '#64748B';
  const cardBgColor = isDark ? '#161920' : '#F8F9FA';
  const accentColor = '#FFA000'; // Yellow/Orange warning color

  const bulletPoints = [
    { title: 'Verified Professionals', desc: 'You can trust' },
    { title: 'Quality Products', desc: 'Top brands, best prices' },
    { title: 'Safe & Secure', desc: 'Your safety is our priority' },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]} edges={['top', 'left', 'right']}>
      <View style={styles.contentContainer}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={[styles.logoText, { color: accentColor }]}>FIX</Text>
        </View>

        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Text style={[styles.tagline, { color: textColor }]}>
            Fix it. {'\n'}Find it. {'\n'}
            <Text style={{ color: accentColor }}>Love it.</Text>
          </Text>
          <Text style={[styles.description, { color: subtextColor }]}>
            The all-in-one marketplace for skilled professionals and quality products.
          </Text>
        </View>

        {/* Middle Mascot & Value Cards Layout */}
        <View style={styles.middleContainer}>
          {/* Mascot Image - positioned to stand on the right overlapping elements */}
          <Image
            source={require('@/assets/images/mascot_standing.png')}
            style={styles.mascotImage}
            resizeMode="contain"
          />

          {/* Value Cards on the left */}
          <View style={styles.valueList}>
            {bulletPoints.map((item, index) => (
              <View key={index} style={[styles.valueCard, { backgroundColor: cardBgColor }]}>
                <View style={[styles.iconWrapper, { backgroundColor: isDark ? '#222530' : '#FFEFD6' }]}>
                  <Ionicons name="checkmark-circle" size={20} color={accentColor} />
                </View>
                <View style={styles.valueTextContainer}>
                  <Text style={[styles.valueTitle, { color: textColor }]}>{item.title}</Text>
                  <Text style={[styles.valueDesc, { color: subtextColor }]}>{item.desc}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Navigation & Action Section */}
        <View style={styles.bottomSection}>
          <Button
            label="Get Started"
            onPress={() => router.push('/onboarding' as any)}
            iconName="arrow-forward"
            size="lg"
            style={styles.actionButton}
          />
        </View>
      </View>

      {/* Decorative Hazard Stripe Tape */}
      <HazardStripe />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
    paddingBottom: 40, // space above hazard tape
  },
  header: {
    marginTop: 20,
  },
  logoText: {
    fontSize: 36,
    fontWeight: '900',
    fontStyle: 'italic',
    letterSpacing: 1.5,
    textShadowColor: 'rgba(0, 0, 0, 0.15)',
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 3,
  },
  heroSection: {
    marginTop: 15,
  },
  tagline: {
    fontSize: 44,
    fontWeight: '900',
    lineHeight: 52,
    letterSpacing: -1,
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    marginTop: 12,
    maxWidth: '85%',
  },
  middleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
    position: 'relative',
  },
  valueList: {
    flex: 1.2,
    zIndex: 1,
    gap: 12,
    justifyContent: 'center',
    maxWidth: '65%',
  },
  valueCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  iconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  valueTextContainer: {
    flex: 1,
  },
  valueTitle: {
    fontSize: 14,
    fontWeight: '700',
  },
  valueDesc: {
    fontSize: 12,
    marginTop: 1,
  },
  mascotImage: {
    position: 'absolute',
    right: -24,
    bottom: -10,
    width: SCREEN_WIDTH * 0.48,
    height: '100%',
    zIndex: 2,
  },
  bottomSection: {
    paddingVertical: 10,
    zIndex: 3,
  },
  actionButton: {
    width: '100%',
    shadowColor: '#FFA000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
});
