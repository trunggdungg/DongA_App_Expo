import React from 'react';
import { Text, StyleSheet, ViewStyle } from 'react-native';
import {Colors, Fonts,FontFamily}  from '@/utils';

interface SectionLabelProps {
  label: string;
  style?: ViewStyle;
}

const SectionLabel: React.FC<SectionLabelProps> = ({ label, style }) => {
  return <Text style={[styles.label]}>{label}</Text>;
};

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: Colors.accent[500],
    marginBottom: 8,
    marginTop: 16,
  },
});

export default SectionLabel;