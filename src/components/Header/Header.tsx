import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import {Colors, Fonts,FontFamily}  from '@/utils';

interface HeaderProps {
  title: string;
  subtitle?: string;
  onBackPress?: () => void;
  showBackButton?: boolean;
  rightComponent?: React.ReactNode;
  style?: ViewStyle;
}

const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  onBackPress,
  showBackButton = true,
  rightComponent,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.leftContainer}>
        {showBackButton && (
          <TouchableOpacity
            style={styles.backButton}
            onPress={onBackPress}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <Text style={styles.backIcon}>{'‹'}</Text>
          </TouchableOpacity>
        )}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
      </View>
      {rightComponent && (
        <View style={styles.rightContainer}>{rightComponent}</View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.background,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  backButton: {
    marginRight: 8,
    padding: 4,
  },
  backIcon: {
    fontSize: 28,
    color: Colors.onSurface,
    fontFamily: Fonts.medium,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontFamily: Fonts.semiBold,
    color: Colors.onSurface,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: Colors.accent[500],
    marginTop: 2,
  },
  rightContainer: {
    marginLeft: 16,
  },
});

export default Header;