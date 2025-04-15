import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { I18nManager } from 'react-native';
import RNRestart from 'react-native-restart';
import i18n from '../services/localization'; // Make sure this points to your i18n config

// Create context
const LocaleContext = createContext();

// Supported languages
const languages = {
  en: { label: 'English', direction: 'ltr', flag: '🇺🇸' },
  ar: { label: 'العربية', direction: 'rtl', flag: '🇸🇦' },
};

// Force RTL/LTR direction in the app
const applyRTL = (isRTL) => {
  I18nManager.allowRTL(isRTL);
  I18nManager.forceRTL(isRTL);
};

export const LocaleProvider = ({ children }) => {
  const [locale, setLocale] = useState('en');
  const [isLoading, setIsLoading] = useState(true);

  // Load locale from AsyncStorage on first render
  useEffect(() => {
    const loadLocale = async () => {
      try {
        const savedLocale = await AsyncStorage.getItem('@locale');
        const fallbackLocale = savedLocale && languages[savedLocale] ? savedLocale : 'en';
        const isRTL = languages[fallbackLocale].direction === 'rtl';

        applyRTL(isRTL);
        setLocale(fallbackLocale);
        await i18n.changeLanguage(fallbackLocale);
      } catch (error) {
        console.error('Failed to load locale', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadLocale();
  }, []);

  // ✅ Updated logic: Only restart app if RTL/LTR direction changes
  const changeLanguage = async (languageCode) => {
    if (!languages[languageCode]) return;

    try {
      await AsyncStorage.setItem('@locale', languageCode);
      const newDirection = languages[languageCode].direction;
      const isDirectionChanged = I18nManager.isRTL !== (newDirection === 'rtl');

      if (isDirectionChanged) {
        applyRTL(newDirection === 'rtl');
        await i18n.changeLanguage(languageCode);
        setLocale(languageCode);
        RNRestart.Restart(); // Only restart if direction flipped
      } else {
        await i18n.changeLanguage(languageCode);
        setLocale(languageCode); // Instant update without restart
      }
    } catch (error) {
      console.error('Failed to switch locale', error);
    }
  };

  const toggleLocale = async () => {
    const languageKeys = Object.keys(languages);
    const currentIndex = languageKeys.indexOf(locale);
    const nextLocale = languageKeys[(currentIndex + 1) % languageKeys.length];
    await changeLanguage(nextLocale);
  };

  const value = {
    locale,
    direction: languages[locale]?.direction,
    isRTL: languages[locale]?.direction === 'rtl',
    languages,
    isLoading,
    toggleLocale,
    setLanguage: changeLanguage,
    changeLanguage,
    getCurrentLanguage: () => languages[locale]?.label || 'English',
    getCurrentFlag: () => languages[locale]?.flag || '🇺🇸',
  };

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
};

export const useLocale = () => {
  const context = useContext(LocaleContext);
  if (!context) throw new Error('useLocale must be used within a LocaleProvider');
  return context;
};
