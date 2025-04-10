import { I18nManager } from 'react-native';

export const rtlStyles = (isRTL) => ({
  direction: isRTL ? 'rtl' : 'ltr',
  textAlign: isRTL ? 'right' : 'left',
  writingDirection: isRTL ? 'rtl' : 'ltr'
});