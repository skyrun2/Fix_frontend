import React, { useState } from 'react';
import { View, StyleSheet, Text, Pressable, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Ionicons } from '@expo/vector-icons';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function RegisterScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const router = useRouter();
  const { role } = useLocalSearchParams<{ role?: string }>();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleSignUp = () => {
    // Navigate straight to tabs as requested
    router.replace('/(tabs)' as any);
  };

  const formattedRole = role
    ? role.charAt(0).toUpperCase() + role.slice(1)
    : 'User';

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDark ? '#0D0E11' : '#FFFFFF' }]}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header Navigation */}
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={isDark ? '#FFFFFF' : '#1E2022'} />
          </Pressable>
        </View>

        {/* Welcome titles */}
        <View style={styles.titleSection}>
          <Text style={[styles.title, { color: isDark ? '#FFFFFF' : '#1E2022' }]}>
            Create your account
          </Text>
          <Text style={[styles.subtitle, { color: isDark ? '#94A3B8' : '#64748B' }]}>
            Join FIX as a {formattedRole} and get started
          </Text>
        </View>

        {/* Inputs */}
        <View style={styles.formSection}>
          <Input
            label="Full Name"
            placeholder="Enter your full name"
            value={fullName}
            onChangeText={setFullName}
            iconName="person-outline"
          />

          <Input
            label="Email"
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            iconName="mail-outline"
            keyboardType="email-address"
          />

          <Input
            label="Phone"
            placeholder="Enter your phone number"
            value={phone}
            onChangeText={setPhone}
            iconName="call-outline"
            keyboardType="phone-pad"
          />

          <Input
            label="Password"
            placeholder="Create a password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            iconName="lock-closed-outline"
          />

          {/* Terms & Conditions Row */}
          <Pressable
            onPress={() => setAgreeTerms(!agreeTerms)}
            style={styles.termsRow}
          >
            <View
              style={[
                styles.checkbox,
                {
                  borderColor: agreeTerms ? '#FFA000' : isDark ? '#334155' : '#CBD5E1',
                  backgroundColor: agreeTerms ? '#FFA000' : 'transparent',
                },
              ]}
            >
              {agreeTerms && <Ionicons name="checkmark" size={12} color="#000000" />}
            </View>
            <Text style={[styles.termsText, { color: isDark ? '#94A3B8' : '#64748B' }]}>
              I agree to the{' '}
              <Text style={styles.highlightText}>Terms & Conditions</Text> and{' '}
              <Text style={styles.highlightText}>Privacy Policy</Text>
            </Text>
          </Pressable>
        </View>

        {/* Action Button */}
        <View style={styles.actionSection}>
          <Button
            label="Sign Up"
            onPress={handleSignUp}
            size="lg"
            style={styles.signUpButton}
          />
        </View>

        {/* Footer Redirect */}
        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: isDark ? '#94A3B8' : '#64748B' }]}>
            Already have an account?{' '}
            <Text
              style={styles.footerLink}
              onPress={() => router.replace('/login' as any)}
            >
              Login
            </Text>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingBottom: 30,
  },
  header: {
    marginTop: 15,
    marginBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  titleSection: {
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
  },
  subtitle: {
    fontSize: 16,
    marginTop: 8,
    fontWeight: '500',
  },
  formSection: {
    marginBottom: 24,
  },
  termsRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 10,
    paddingRight: 20,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    marginTop: 2,
  },
  termsText: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '600',
  },
  highlightText: {
    color: '#FFA000',
    fontWeight: '700',
  },
  actionSection: {
    marginBottom: 30,
  },
  signUpButton: {
    width: '100%',
    shadowColor: '#FFA000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 4,
  },
  footer: {
    alignItems: 'center',
    marginTop: 10,
  },
  footerText: {
    fontSize: 14,
    fontWeight: '600',
  },
  footerLink: {
    color: '#FFA000',
    fontWeight: '800',
  },
});
