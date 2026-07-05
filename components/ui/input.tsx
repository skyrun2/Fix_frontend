import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
  Pressable,
  useColorScheme,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface InputProps extends Omit<TextInputProps, 'style'> {
  label?: string;
  error?: string;
  iconName?: keyof typeof Ionicons.glyphMap;
  rightAction?: {
    label: string;
    onPress: () => void;
  };
  style?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
}

export function Input({
  label,
  error,
  iconName,
  rightAction,
  secureTextEntry,
  style,
  inputStyle,
  ...props
}: InputProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const containerBgColor = isDark ? '#161920' : '#F9FAFB';
  const borderColor = isDark ? '#2E3543' : '#E5E7EB';
  const textColor = isDark ? '#FFFFFF' : '#1F2937';
  const labelColor = isDark ? '#94A3B8' : '#4B5563';

  const shouldSecure = secureTextEntry && !isPasswordVisible;

  return (
    <View style={styles.container}>
      {/* Label and optional Right Action Link */}
      {(label || rightAction) && (
        <View style={styles.labelRow}>
          {label && <Text style={[styles.label, { color: labelColor }]}>{label}</Text>}
          {rightAction && (
            <Pressable onPress={rightAction.onPress}>
              <Text style={styles.rightActionText}>{rightAction.label}</Text>
            </Pressable>
          )}
        </View>
      )}

      {/* Input wrapper */}
      <View
        style={[
          styles.inputWrapper,
          {
            backgroundColor: containerBgColor,
            borderColor: error ? '#EF4444' : borderColor,
          },
          style,
        ]}
      >
        {iconName && (
          <Ionicons
            name={iconName}
            size={20}
            color={isDark ? '#64748B' : '#9CA3AF'}
            style={styles.leftIcon}
          />
        )}

        <TextInput
          style={[styles.input, { color: textColor }, inputStyle]}
          placeholderTextColor={isDark ? '#475569' : '#9CA3AF'}
          secureTextEntry={shouldSecure}
          autoCapitalize="none"
          {...props}
        />

        {/* Secure Text toggle action */}
        {secureTextEntry && (
          <Pressable
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            style={styles.rightIcon}
          >
            <Ionicons
              name={isPasswordVisible ? 'eye-off' : 'eye'}
              size={20}
              color={isDark ? '#64748B' : '#9CA3AF'}
            />
          </Pressable>
        )}
      </View>

      {/* Error message */}
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 16,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
  },
  rightActionText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFA000',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 52,
  },
  leftIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 15,
    fontWeight: '500',
  },
  rightIcon: {
    padding: 4,
  },
  errorText: {
    color: '#EF4444',
    fontSize: 12,
    marginTop: 4,
    fontWeight: '500',
  },
});
