import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import {Colors, Fonts,FontFamily}  from '@/utils';

interface DeviceCardProps {
  deviceName: string;
  deviceType?: string;
  icon?: React.ReactNode;
  isOn?: boolean;
  onToggle?: (value: boolean) => void;
  onPress?: () => void;
  disabled?: boolean;
  style?: ViewStyle;
}

const DeviceCard: React.FC<DeviceCardProps> = ({
  deviceName,
  deviceType,
  icon,
  isOn = false,
  onToggle,
  onPress,
  disabled = false,
  style,
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, disabled && styles.disabledContainer, style]}
      onPress={onPress}
      disabled={disabled || !onPress}
      activeOpacity={onPress ? 0.7 : 1}>
      <View style={styles.topRow}>
        <View style={styles.iconContainer}>
          {icon || <View style={styles.defaultIcon} />}
        </View>
        {/* <Switch
          value={isOn}
          onValueChange={onToggle}
          disabled={disabled}
          trackColor={{
            false: Colors.accent[200],
            true: Colors.primary.main,
          }}
          thumbColor={Colors.white}
          ios_backgroundColor={Colors.accent[200]}
        /> */}
      </View>

      <View style={styles.infoContainer}>
        <Text
          style={[styles.deviceName, disabled && styles.disabledText]}
          numberOfLines={2}>
          {deviceName}
        </Text>
        {deviceType && (
          <Text
            style={[styles.deviceType, disabled && styles.disabledText]}
            numberOfLines={1}>
            {deviceType}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.accent[50],
    borderRadius: 12,
    padding: 16,
    marginVertical: 0,
    borderWidth: 1,
    borderColor: Colors.accent[200],
    minHeight: 160,
  },
  disabledContainer: {
    backgroundColor: Colors.accent[50],
    opacity: 0.6,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.accent[200],
    alignItems: 'center',
    justifyContent: 'center',
  },
  defaultIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.accent[400],
  },
  infoContainer: {
    width: '100%',
    alignItems: 'flex-start',
    minHeight: 48,
  },
  deviceName: {
    fontSize: 14,
    fontFamily: Fonts.medium,
    color: Colors.accent[700],
    marginBottom: 4,
    lineHeight: 18,
  },
  deviceType: {
    fontSize: 11,
    fontFamily: Fonts.regular,
    color: Colors.accent[500],
    lineHeight: 14,
  },
  disabledText: {
    color: Colors.accent[400],
  },
});

export default DeviceCard;