/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  View,
} from 'react-native';
import { Colors, Fonts , FontFamily} from '@/utils';

type ButtonVariant = 'text' | 'outlined' | 'contained';
type ButtonColor = 'primary' | 'secondary' | 'error' | 'default';

interface ButtonProps {
  title: string;
  onPress?: () => void;
  variant?: ButtonVariant;
  color?: ButtonColor;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'contained',
  color = 'primary',
  disabled = false,
  loading = false,
  icon,
  style,
  textStyle,
}) => {
  const getBackgroundColor = (): string => {
    if (disabled) return Colors.accent[100];
    if (variant !== 'contained') return 'transparent';

    switch (color) {
      case 'primary':
        return Colors.primary.main;
      case 'secondary':
        return Colors.secondary[900];
      case 'error':
        return Colors.error;
      default:
        return Colors.accent[900];
    }
  };

  const getTextColor = (): string => {
    if (disabled) return Colors.accent[300];

    if (variant === 'contained') {
      return Colors.white;
    }

    switch (color) {
      case 'primary':
        return Colors.primary.main;
      case 'secondary':
        return Colors.secondary[900];
      case 'error':
        return Colors.error;
      default:
        return Colors.accent[900];
    }
  };

  const getBorderColor = (): string => {
    if (disabled) return Colors.accent[200];
    if (variant !== 'outlined') return 'transparent';

    switch (color) {
      case 'primary':
        return Colors.primary.main;
      case 'secondary':
        return Colors.secondary[900];
      case 'error':
        return Colors.error;
      default:
        return Colors.accent[400];
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: getBackgroundColor(),
          borderColor: getBorderColor(),
          borderWidth: variant === 'outlined' ? 1 : 0,
        },
        variant === 'text' && styles.textButton,
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}>
      {loading ? (
        <ActivityIndicator size="small" color={getTextColor()} />
      ) : (
        <View style={styles.content}>
          {icon && <View style={styles.icon}>{icon}</View>}
          <Text style={[styles.text, { color: getTextColor() }, textStyle]}>
            {title}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 40,
  },
  textButton: {
    paddingHorizontal: 8,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 8,
  },
  text: {
    fontSize: 14,
    fontFamily: Fonts.semiBold,
    textTransform: 'uppercase',
  },
});

export default Button;