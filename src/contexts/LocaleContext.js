// src/contexts/LocaleContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { I18nManager } from 'react-native';
import i18n from '../services/localization'; // Import i18n instance

// Create context
const LocaleContext = createContext();

const applyRTL = (isRTL) => {
  I18nManager.forceRTL(isRTL);
  I18nManager.allowRTL(isRTL);
};

export const LocaleProvider = ({ children }) => {
  // Supported languages
  const languages = {
    en: { label: 'English', direction: 'ltr', flag: '🇺🇸' },
    ar: { label: 'العربية', direction: 'rtl', flag: '🇸🇦' },
  };

  // State for current locale
  const [locale, setLocale] = useState('en');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadLocale = async () => {
      try {
        const savedLocale = await AsyncStorage.getItem('@locale');
        if (savedLocale && languages[savedLocale]) {
          changeLanguage(savedLocale);
        }
      } catch (error) {
        console.error('Failed to load locale', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadLocale();
  }, []);

  const changeLanguage = async (languageCode) => {
    if (languages[languageCode]) {
      try {
        await AsyncStorage.setItem('@locale', languageCode);
        setLocale(languageCode);
        applyRTL(languages[languageCode].direction === 'rtl');
        i18n.changeLanguage(languageCode); // Sync with i18n
      } catch (error) {
        console.error('Failed to save locale', error);
      }
    }
  };

  const toggleLocale = async () => {
    const languageKeys = Object.keys(languages);
    const currentIndex = languageKeys.indexOf(locale);
    const nextIndex = (currentIndex + 1) % languageKeys.length;
    const newLocale = languageKeys[nextIndex];
    await changeLanguage(newLocale);
  };

  const setLanguage = async (languageCode) => {
    await changeLanguage(languageCode);
  };

  const getCurrentLanguage = () => {
    return languages[locale]?.label || 'English';
  };

  const getCurrentFlag = () => {
    return languages[locale]?.flag || '🇺🇸';
  };

  const isRTL = languages[locale]?.direction === 'rtl';

  const value = {
    locale,
    languages,
    toggleLocale,
    direction: languages[locale].direction,
    setLanguage,
    isRTL,
    isLoading,
    getCurrentLanguage,
    getCurrentFlag,
    changeLanguage
  };

  return (
    <LocaleContext.Provider value={value}>
      {children}
    </LocaleContext.Provider>
  );
};

export const useLocale = () => {
  const context = useContext(LocaleContext);
  if (context === undefined) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return context;
};