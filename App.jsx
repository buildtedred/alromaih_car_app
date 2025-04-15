import './src/services/localization';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { LocaleProvider, useLocale } from './src/contexts/LocaleContext';
import StackNavigator from './src/components/navigation/StackNavigator';
import { SafeAreaView, I18nManager } from 'react-native';
import './global.css';

function AppWithLocale() {
  const { direction } = useLocale();
  const isRTL = direction === 'rtl';

  // Force layout direction at runtime
  useEffect(() => {
    if (I18nManager.isRTL !== isRTL) {
      I18nManager.forceRTL(isRTL);
      I18nManager.allowRTL(isRTL);
      // Reload app is required for layout changes to take full effect
      // Usually handled with Expo Updates or a manual reload
    }
  }, [isRTL]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        direction: isRTL ? 'rtl' : 'ltr',
      }}
    >
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <LocaleProvider>
      <AppWithLocale />
    </LocaleProvider>
  );
}
