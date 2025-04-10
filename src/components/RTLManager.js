// src/components/RTLManager.js
import { useEffect } from 'react';
import { I18nManager } from 'react-native';
import { useLocale } from '../contexts/LocaleContext';

export default function RTLManager() {
  const { locale } = useLocale();

  useEffect(() => {
    // Adjust RTL settings based on the locale
    if (locale === 'ar' && !I18nManager.isRTL) {
      I18nManager.forceRTL(true);
    } else if (locale === 'en' && I18nManager.isRTL) {
      I18nManager.forceRTL(false);
    }
  }, [locale]);

  return null;
}
