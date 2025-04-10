import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '../assets/translations/en.json';
import ar from '../assets/translations/ar.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      ar: { translation: ar }
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    compatibilityJSON: 'v3' // For React Native
  });

export default i18n;