import React from 'react';
import { Pressable, StyleSheet, Text, ActivityIndicator, ViewStyle, TextStyle, View, StyleProp } from 'react-native';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Ionicons } from '@expo/vector-icons';

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  iconName?: keyof typeof Ionicons.glyphMap;
  iconPosition?: 'left' | 'right';
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export function Button({
  label,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  iconName,
  iconPosition = 'right',
  style,
  textStyle,
}: ButtonProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  // Base background and text colors matching mockups (warning/gold yellow)
  let backgroundColor = '#FFA000'; 
  let textColor = '#000000'; 
  let borderColor = 'transparent';
  let borderWidth = 0;

  if (variant === 'secondary') {
    backgroundColor = isDark ? '#262930' : '#F1F5F9';
    textColor = isDark ? '#FFFFFF' : '#1E2022';
  } else if (variant === 'outline') {
    backgroundColor = 'transparent';
    borderColor = isDark ? '#475569' : '#CBD5E1';
    borderWidth = 1.5;
    textColor = isDark ? '#FFFFFF' : '#1E2022';
  } else if (variant === 'text') {
    backgroundColor = 'transparent';
    textColor = isDark ? '#FFA000' : '#D97706';
  }

  // Handle active states and disable states
  if (disabled || loading) {
    backgroundColor = variant === 'primary' ? '#FFD180' : isDark ? '#1E2022' : '#F1F5F9';
    textColor = isDark ? '#64748B' : '#94A3B8';
  }

  // Sizes
  const paddingVertical = size === 'sm' ? 8 : size === 'lg' ? 15 : 12;
  const paddingHorizontal = size === 'sm' ? 16 : size === 'lg' ? 30 : 22;
  const fontSize = size === 'sm' ? 14 : size === 'lg' ? 17 : 15;
  const borderRadius = 28; // Beautiful rounded capsule

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.base,
        {
          backgroundColor,
          borderColor,
          borderWidth,
          paddingVertical,
          paddingHorizontal,
          borderRadius,
          opacity: pressed ? 0.85 : 1.0,
        },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={textColor} size="small" />
      ) : (
        <View style={styles.content}>
          {iconName && iconPosition === 'left' && (
            <Ionicons name={iconName} size={fontSize + 2} color={textColor} style={styles.leftIcon} />
          )}
          <Text
            style={[
              styles.text,
              {
                color: textColor,
                fontSize,
                fontWeight: '700',
              },
              textStyle,
            ]}
          >
            {label}
          </Text>
          {iconName && iconPosition === 'right' && (
            <Ionicons name={iconName} size={fontSize + 2} color={textColor} style={styles.rightIcon} />
          )}
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
  },
  leftIcon: {
    marginRight: 6,
  },
  rightIcon: {
    marginLeft: 6,
  },
});
