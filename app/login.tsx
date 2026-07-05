import React, { useState } from 'react';
import { View, StyleSheet, Text, Pressable, ScrollView, Alert, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Ionicons } from '@expo/vector-icons';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function LoginScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const router = useRouter();

  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = () => {
    // Navigate straight to tabs as requested
    router.replace('/(tabs)' as any);
  };

  const handleSocialLogin = (platform: string) => {
    Alert.alert(`${platform} Login`, `Logging in via ${platform} (UI Bypass)...`, [
      { text: 'OK', onPress: () => router.replace('/(tabs)' as any) },
    ]);
  };

  const handleForgotPassword = () => {
    Alert.alert('Reset Password', 'Password reset instructions would be sent here.');
  };

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
            Welcome back! 👋
          </Text>
          <Text style={[styles.subtitle, { color: isDark ? '#94A3B8' : '#64748B' }]}>
            Login to your account
          </Text>
        </View>

        {/* Inputs */}
        <View style={styles.formSection}>
          <Input
            label="Email or Phone"
            placeholder="Enter email or phone"
            value={emailOrPhone}
            onChangeText={setEmailOrPhone}
            iconName="mail-outline"
            keyboardType="email-address"
          />

          <Input
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            iconName="lock-closed-outline"
            rightAction={{
              label: 'Forgot?',
              onPress: handleForgotPassword,
            }}
          />

          {/* Remember Me Row */}
          <Pressable
            onPress={() => setRememberMe(!rememberMe)}
            style={styles.rememberMeRow}
          >
            <View
              style={[
                styles.checkbox,
                {
                  borderColor: rememberMe ? '#FFA000' : isDark ? '#334155' : '#CBD5E1',
                  backgroundColor: rememberMe ? '#FFA000' : 'transparent',
                },
              ]}
            >
              {rememberMe && <Ionicons name="checkmark" size={12} color="#000000" />}
            </View>
            <Text style={[styles.rememberMeText, { color: isDark ? '#94A3B8' : '#64748B' }]}>
              Remember me
            </Text>
          </Pressable>
        </View>

        {/* Action Button */}
        <View style={styles.actionSection}>
          <Button
            label="Login"
            onPress={handleLogin}
            size="lg"
            style={styles.loginButton}
          />
        </View>

        {/* Social Dividers */}
        <View style={styles.dividerRow}>
          <View style={[styles.line, { backgroundColor: isDark ? '#1E293B' : '#E2E8F0' }]} />
          <Text style={[styles.dividerText, { color: isDark ? '#64748B' : '#94A3B8' }]}>
            or continue with
          </Text>
          <View style={[styles.line, { backgroundColor: isDark ? '#1E293B' : '#E2E8F0' }]} />
        </View>

        {/* Social Logins */}
        <View style={styles.socialRow}>
          <Pressable
            onPress={() => handleSocialLogin('Apple')}
            style={[
              styles.socialButton,
              {
                backgroundColor: isDark ? '#1E293B' : '#F8FAFC',
                borderColor: isDark ? '#334155' : '#E2E8F0',
              },
            ]}
          >
            <Ionicons name="logo-apple" size={24} color={isDark ? '#FFFFFF' : '#000000'} />
          </Pressable>

          <Pressable
            onPress={() => handleSocialLogin('Google')}
            style={[
              styles.socialButton,
              {
                backgroundColor: isDark ? '#1E293B' : '#F8FAFC',
                borderColor: isDark ? '#334155' : '#E2E8F0',
              },
            ]}
          >
            <Ionicons name="logo-google" size={24} color="#EA4335" />
          </Pressable>

          <Pressable
            onPress={() => handleSocialLogin('Facebook')}
            style={[
              styles.socialButton,
              {
                backgroundColor: isDark ? '#1E293B' : '#F8FAFC',
                borderColor: isDark ? '#334155' : '#E2E8F0',
              },
            ]}
          >
            <Ionicons name="logo-facebook" size={24} color="#1877F2" />
          </Pressable>
        </View>

        {/* Footer Redirect */}
        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: isDark ? '#94A3B8' : '#64748B' }]}>
            Don't have an account?{' '}
            <Text
              style={styles.footerLink}
              onPress={() => router.replace('/register' as any)}
            >
              Sign up
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
    marginBottom: 30,
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
  rememberMeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  rememberMeText: {
    fontSize: 14,
    fontWeight: '600',
  },
  actionSection: {
    marginBottom: 36,
  },
  loginButton: {
    width: '100%',
    shadowColor: '#FFA000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 4,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  line: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    fontSize: 13,
    fontWeight: '700',
    paddingHorizontal: 12,
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginBottom: 36,
  },
  socialButton: {
    width: SCREEN_WIDTH * 0.22,
    height: 52,
    borderRadius: 16,
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    alignItems: 'center',
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
