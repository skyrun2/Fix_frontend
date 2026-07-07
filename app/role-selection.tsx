import { useColorScheme } from '@/hooks/use-color-scheme';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// import { colors } from '@/theme/colors';
// import { Color } from 'react-native/types_generated/Libraries/Animated/AnimatedExports';
import { Colors } from '@/constants/theme';
const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function RoleSelectionScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const router = useRouter();

  const handleSelectRole = (role: 'professional' | 'customer') => {
    // Navigate to register screen passing the role as a query parameter
    router.push({
      pathname: '/register' as any,
      params: { role },
    });
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDark ? Colors.dark.background : Colors.light.background }]}>
      {/* Top Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={isDark ? Colors.dark.text : Colors.light.text} />
        </Pressable>
        <Text style={[styles.headerTitle, { color: isDark ? Colors.dark.text : Colors.light.text }]}>
          Choose your{'\n'}experience
        </Text>
        <Text style={[styles.headerSubtitle, { color: isDark ? Colors.dark.sub : Colors.light.sub }]}>
          Select how you want to use FIX
        </Text>
      </View>

      {/* Cards Container */}
      <View style={styles.cardsContainer}>
        {/* Professional Card (Signature Dark Card) */}
        <Pressable
          onPress={() => handleSelectRole('professional')}
          style={({ pressed }) => [
            styles.roleCard,
            styles.professionalCard,
            { opacity: pressed ? 0.94 : 1.0 },
            { backgroundColor: isDark ? Colors.dark.card : Colors.light.card }
          ]}
        >
          <View style={styles.cardContent}>
            <Text style={[styles.professionalTitle, { color: isDark ? Colors.dark.text : Colors.light.text }]}>I'm a Professional</Text>
            <Text style={[styles.professionalSubtitle, { color: isDark ? Colors.dark.sub : Colors.light.sub }]}>
              Offer your skills and grow your business
            </Text>
            <View style={styles.arrowButtonYellow}>
              <Ionicons name="arrow-forward" size={18} color="#000000" />
            </View>
          </View>
          <Image
            source={require('@/assets/images/mascot_standing.png')}
            style={styles.proMascotImage}
            resizeMode="contain"
          />
        </Pressable>

        {/* Customer Card */}
        <Pressable
          onPress={() => handleSelectRole('customer')}
          style={({ pressed }) => [
            styles.roleCard,
            styles.customerCard,
            { opacity: pressed ? 0.94 : 1.0 },
            { backgroundColor: isDark ? Colors.dark.card : Colors.light.card }
          ]}
        >
          <View style={styles.cardContent}>
            <Text style={[styles.customerTitle, { color: isDark ? Colors.dark.text : Colors.light.text }]}>
              I'm a Customer
            </Text>
            <Text style={[styles.customerSubtitle, { color: isDark ? Colors.dark.sub : Colors.light.sub }]}>
              Find services and shop quality products
            </Text>
            {/* <View style={[styles.arrowButtonDark, { backgroundColor: isDark ? '#2E3543' : '#1E2022' }]}> */}
            <View style={styles.arrowButtonYellow}>
              <Ionicons name="arrow-forward" size={18} color="#000" />
            </View>
          </View>
          <Image
            source={require('@/assets/images/customer.png')}
            style={styles.customerMascotImage}
            resizeMode="contain"
          />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const roleCardBase = {
  borderWidth: 2,
  borderColor: '#FFA000',
  borderRadius: 16,
  backgroundColor: '#111317',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  header: {
    marginTop: 15,
    marginBottom: 24,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '900',
    lineHeight: 38,
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 15,
    marginTop: 6,
  },
  cardsContainer: {
    flex: 1,
    gap: 20,
    paddingBottom: 30,
  },
  roleCard: {
    flex: 1,
    borderRadius: 28,
    borderWidth: 1,
    flexDirection: 'row',
    overflow: 'hidden',
    position: 'relative',
    maxHeight: 210,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  professionalCard: {
    ...roleCardBase,
  },
  customerCard: {
    ...roleCardBase,
  },
  cardContent: {
    flex: 1.2,
    justifyContent: 'center',
    paddingLeft: 24,
    paddingRight: 10,
    zIndex: 2,
  },
  professionalTitle: {
    maxWidth: '75%',
    fontSize: 22,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  professionalSubtitle: {
    fontSize: 13,
    color: '#94A3B8',
    marginTop: 8,
    lineHeight: 18,
    maxWidth: '75%',
  },
  customerTitle: {
    fontSize: 22,
    fontWeight: '800',
    maxWidth: '75%',
  },
  customerSubtitle: {
    fontSize: 13,
    marginTop: 8,
    lineHeight: 18,
    maxWidth: '75%',
  },
  arrowButtonYellow: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFA000',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  arrowButtonDark: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFA000',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  proMascotImage: {
    position: 'absolute',
    right: -10,
    bottom: -15,
    width: SCREEN_WIDTH * 0.38,
    height: '110%',
    zIndex: 1,
  },
  customerMascotImage: {
    position: 'absolute',
    right: -5,
    bottom: -10,
    width: SCREEN_WIDTH * 0.35,
    height: '105%',
    zIndex: 1,
  },
});
