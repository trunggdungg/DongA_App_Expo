import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { authService, storageService, keychainService } from '@/services';
import {Colors, Fonts} from '@/utils'
import {Button,TextField} from'@/componets'


interface LoginScreenProps {
  onLoginSuccess?: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ username?: string; password?: string }>({});

  useEffect(() => {
    loadSavedCredentials();
  }, []);

  const loadSavedCredentials = async () => {
    const credentials = await keychainService.getCredentials();
    if (credentials) {
      setUsername(credentials.username);
      setPassword(credentials.password);
    }
  };

  const validate = (): boolean => {
    const newErrors: { username?: string; password?: string } = {};

    if (!username.trim()) {
      newErrors.username = 'Vui lòng nhập email';
    }

    if (!password) {
      newErrors.password = 'Vui lòng nhập mật khẩu';
    } else if (password.length < 6) {
      newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validate()) return;

    setLoading(true);
    try {
      const result = await authService.login({
        username: username.trim(),
        password,
      });

      if (result.success && result.data) {
        // Save tokens
        await storageService.setToken(result.data.token);
        await storageService.setRefreshToken(result.data.refreshToken);
        
        // Save credentials to keychain
        await keychainService.saveCredentials(username.trim(), password);
        
        onLoginSuccess?.();
      } else {
        Alert.alert('Lỗi', result.error || 'Đăng nhập thất bại');
      }
    } catch {
      Alert.alert('Lỗi', 'Đã xảy ra lỗi. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled">
          <View style={styles.header}>
            <Image
              source={require('../../assets/logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.title}>Đăng nhập</Text>
          </View>

          <View style={styles.form}>
            <TextField
              label="Email"
              value={username}
              onChangeText={setUsername}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              error={!!errors.username}
              errorText={errors.username}
            />

            <TextField
              label="Mật khẩu"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              showPasswordToggle
              autoCapitalize="none"
              error={!!errors.password}
              errorText={errors.password}
            />

            <Button
              title="Đăng nhập"
              onPress={handleLogin}
              loading={loading}
              style={styles.loginButton}
            />

            <Button
              title="Quên mật khẩu?"
              variant="text"
              color="primary"
              onPress={() => Alert.alert('Thông báo', 'Tính năng đang phát triển')}
              style={styles.forgotButton}
            />
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              © 2026 Đông Á Platform
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
  },
  header: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 40,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontFamily: Fonts.bold,
    color: Colors.onSurface,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: Fonts.regular,
    color: Colors.accent[500],
  },
  form: {
    flex: 1,
  },
  loginButton: {
    marginTop: 24,
    height: 48,
  },
  forgotButton: {
    marginTop: 16,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  footerText: {
    fontSize: 12,
    fontFamily: Fonts.regular,
    color: Colors.accent[400],
  },
});

export default LoginScreen;