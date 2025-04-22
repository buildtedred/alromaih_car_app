import './src/services/localization';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { LocaleProvider, useLocale } from './src/contexts/LocaleContext';
import { RecentlyViewedProvider } from './src/contexts/RecentlyViewedContext'; // ✅ NEW
import StackNavigator from './src/components/navigation/StackNavigator';
import { SafeAreaView, I18nManager } from 'react-native';
import './global.css';

function AppWithLocale() {
  const { direction } = useLocale();
  const isRTL = direction === 'rtl';

  useEffect(() => {
    if (I18nManager.isRTL !== isRTL) {
      I18nManager.forceRTL(isRTL);
      I18nManager.allowRTL(isRTL);
      // Note: Full RTL switch may require app reload depending on the platform.
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
      <RecentlyViewedProvider>
        <AppWithLocale />
      </RecentlyViewedProvider>
    </LocaleProvider>
  );
}
