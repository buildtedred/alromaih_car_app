import './src/services/localization';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView, I18nManager } from 'react-native';

import './global.css';

import { LocaleProvider, useLocale } from './src/contexts/LocaleContext';
import { RecentlyViewedProvider } from './src/contexts/RecentlyViewedContext';
import { FinanceFlowProvider } from './src/contexts/FinanceFlowContext';

import StackNavigator from './src/components/navigation/StackNavigator';
import FinanceFlowNavigator from './src/components/Financials/FinanceFlowNavigator'; // ✅ Added here

function AppWithLocale() {
  const { direction } = useLocale();
  const isRTL = direction === 'rtl';

  useEffect(() => {
    if (I18nManager.isRTL !== isRTL) {
      I18nManager.forceRTL(isRTL);
      I18nManager.allowRTL(isRTL);
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
        <FinanceFlowNavigator />
      </NavigationContainer>
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <LocaleProvider>
      <RecentlyViewedProvider>
        <FinanceFlowProvider>
          <AppWithLocale />
        </FinanceFlowProvider>
      </RecentlyViewedProvider>
    </LocaleProvider>
  );
}
