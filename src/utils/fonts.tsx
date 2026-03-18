import { Platform } from 'react-native';

export const Fonts = {
  thin: Platform.select({
    ios: 'Lexend-Thin',
    android: 'Lexend-Thin',
  }),
  extraLight: Platform.select({
    ios: 'Lexend-ExtraLight',
    android: 'Lexend-ExtraLight',
  }),
  light: Platform.select({
    ios: 'Lexend-Light',
    android: 'Lexend-Light',
  }),
  regular: Platform.select({
    ios: 'Lexend-Regular',
    android: 'Lexend-Regular',
  }),
  medium: Platform.select({
    ios: 'Lexend-Medium',
    android: 'Lexend-Medium',
  }),
  semiBold: Platform.select({
    ios: 'Lexend-SemiBold',
    android: 'Lexend-SemiBold',
  }),
  bold: Platform.select({
    ios: 'Lexend-Bold',
    android: 'Lexend-Bold',
  }),
  extraBold: Platform.select({
    ios: 'Lexend-ExtraBold',
    android: 'Lexend-ExtraBold',
  }),
  black: Platform.select({
    ios: 'Lexend-Black',
    android: 'Lexend-Black',
  }),
};

export const FontFamily = {
  LEXEND: 'Lexend',
};

export default Fonts;