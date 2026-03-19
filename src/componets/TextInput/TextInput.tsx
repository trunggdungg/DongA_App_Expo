/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  TextInputProps,
} from 'react-native';
import {Colors, Fonts,FontFamily}  from '@/utils';

type TextFieldVariant = 'outlined' | 'filled';

interface TextFieldProps extends Omit<TextInputProps, 'style'> {
  label?: string;
  assistiveText?: string;
  error?: boolean;
  errorText?: string;
  disabled?: boolean;
  variant?: TextFieldVariant;
  secureTextEntry?: boolean;
  showPasswordToggle?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerStyle?: ViewStyle;
}

const TextField: React.FC<TextFieldProps> = ({
  label,
  assistiveText,
  error = false,
  errorText,
  disabled = false,
  variant = 'outlined',
  secureTextEntry = false,
  showPasswordToggle = false,
  leftIcon,
  rightIcon,
  containerStyle,
  onFocus,
  onBlur,
  value,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const hasValue = value && value.length > 0;
  const showFloatingLabel = isFocused || hasValue;

  const getBorderColor = (): string => {
    if (error) return Colors.error;
    if (disabled) return Colors.accent[200];
    if (isFocused) return Colors.primary.main;
    return Colors.accent[400];
  };

  const getLabelColor = (): string => {
    if (error) return Colors.error;
    if (disabled) return Colors.accent[300];
    if (isFocused) return Colors.primary.main;
    return Colors.accent[500];
  };

  const handleFocus = (e: any) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <View
        style={[
          styles.inputContainer,
          variant === 'filled' && styles.filledContainer,
          {
            borderColor: getBorderColor(),
            borderBottomWidth: variant === 'filled' ? 2 : 1,
            borderWidth: variant === 'outlined' ? 1 : 0,
          },
        ]}>
        {label && (
          <Text
            style={[
              styles.label,
              showFloatingLabel && styles.floatingLabel,
              { color: getLabelColor() },
            ]}>
            {label}
          </Text>
        )}

        {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}

        <TextInput
          style={[
            styles.input,
            leftIcon ? styles.inputWithLeftIcon : null,
            rightIcon || showPasswordToggle ? styles.inputWithRightIcon : null,
            disabled ? styles.disabledInput : null,
            label && showFloatingLabel ? styles.inputWithLabel : null,
          ]}
          editable={!disabled}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          onFocus={handleFocus}
          onBlur={handleBlur}
          value={value}
          placeholderTextColor={Colors.accent[400]}
          {...rest}
        />

        {showPasswordToggle && secureTextEntry && (
          <TouchableOpacity
            style={styles.rightIcon}
            onPress={togglePasswordVisibility}>
            <Text style={styles.eyeIcon}>{isPasswordVisible ? '👁' : '👁‍🗨'}</Text>
          </TouchableOpacity>
        )}

        {rightIcon && !showPasswordToggle && (
          <View style={styles.rightIcon}>{rightIcon}</View>
        )}
      </View>

      {(assistiveText || (error && errorText)) && (
        <Text
          style={[
            styles.assistiveText,
            error && styles.errorText,
          ]}>
          {error && errorText ? errorText : assistiveText}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 4,
    backgroundColor: Colors.background,
    minHeight: 56,
    position: 'relative',
  },
  filledContainer: {
    backgroundColor: Colors.accent[50],
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  label: {
    position: 'absolute',
    left: 12,
    top: 18,
    fontSize: 16,
    fontFamily: Fonts.regular,
    backgroundColor: 'transparent',
  },
  floatingLabel: {
    top: 6,
    fontSize: 12,
    backgroundColor: Colors.background,
    paddingHorizontal: 4,
  },
  input: {
    flex: 1,
    paddingHorizontal: 12,
    paddingTop: 24,
    paddingBottom: 8,
    fontSize: 16,
    fontFamily: Fonts.regular,
    color: Colors.onSurface,
  },
  inputWithLabel: {
    paddingTop: 24,
  },
  inputWithLeftIcon: {
    paddingLeft: 0,
  },
  inputWithRightIcon: {
    paddingRight: 48,
  },
  disabledInput: {
    color: Colors.accent[400],
  },
  leftIcon: {
    paddingLeft: 12,
  },
  rightIcon: {
    position: 'absolute',
    right: 12,
    padding: 4,
  },
  eyeIcon: {
    fontSize: 20,
  },
  assistiveText: {
    marginTop: 4,
    marginLeft: 12,
    fontSize: 12,
    fontFamily: Fonts.regular,
    color: Colors.accent[500],
  },
  errorText: {
    color: Colors.error,
  },
});

export default TextField;