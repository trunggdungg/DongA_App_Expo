import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import {Colors, Fonts,FontFamily}  from '@/utils';

interface RadioListItemProps {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  onMenuPress?: () => void;
  showMenu?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
}

const RadioListItem: React.FC<RadioListItemProps> = ({
  label,
  selected = false,
  onPress,
  onMenuPress,
  showMenu = true,
  disabled = false,
  style,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        selected && styles.selectedContainer,
        disabled && styles.disabledContainer,
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}>
      <View style={styles.leftContent}>
        <View
          style={[
            styles.radioOuter,
            selected && styles.radioOuterSelected,
            disabled && styles.radioDisabled,
          ]}>
          {selected && <View style={styles.radioInner} />}
        </View>
        <Text
          style={[
            styles.label,
            selected && styles.labelSelected,
            disabled && styles.labelDisabled,
          ]}>
          {label}
        </Text>
      </View>

      {showMenu && (
        <TouchableOpacity
          style={styles.menuButton}
          onPress={onMenuPress}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <Text style={styles.menuIcon}>⋮</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.accent[200],
    borderRadius: 8,
    marginVertical: 4,
  },
  selectedContainer: {
    borderColor: Colors.primary.main,
    borderWidth: 2,
  },
  disabledContainer: {
    backgroundColor: Colors.accent[50],
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  radioOuter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.accent[400],
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  radioOuterSelected: {
    borderColor: Colors.primary.main,
  },
  radioDisabled: {
    borderColor: Colors.accent[300],
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.primary.main,
  },
  label: {
    fontSize: 16,
    fontFamily: Fonts.regular,
    color: Colors.onSurface,
    flex: 1,
  },
  labelSelected: {
    fontFamily: Fonts.medium,
  },
  labelDisabled: {
    color: Colors.accent[400],
  },
  menuButton: {
    padding: 8,
  },
  menuIcon: {
    fontSize: 20,
    color: Colors.accent[600],
    fontWeight: 'bold',
  },
});

export default RadioListItem;