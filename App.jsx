import './src/services/localization';
import './src/utils/globalText'; // ✅ Global Almarai font patch

import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView, I18nManager } from 'react-native';

import './global.css';

import { LocaleProvider, useLocale } from './src/contexts/LocaleContext';
import { RecentlyViewedProvider } from './src/contexts/RecentlyViewedContext';
import { FinanceFlowProvider } from './src/contexts/FinanceFlowContext';
import { FilterProvider } from './src/contexts/FilterContext'; // ✅ Added FilterProvider

import StackNavigator from './src/components/navigation/StackNavigator';
import FinanceFlowNavigator from './src/components/Financials/FinanceFlowNavigator';

function AppWithLocale() {
  const { direction } = useLocale();
  const isRTL = direction === 'rtl';

  useEffect(() => {
    if (I18nManager.isRTL !== isRTL) {
      I18nManager.allowRTL(true);
      I18nManager.forceRTL(isRTL);
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
          <FilterProvider>
            <AppWithLocale />
          </FilterProvider>
        </FinanceFlowProvider>
      </RecentlyViewedProvider>
    </LocaleProvider>
  );
}
