"use client"

import "./src/services/localization"
import "./src/utils/globalText" // ✅ Global Almarai font patch

import { useEffect } from "react"
import { NavigationContainer, DefaultTheme } from "@react-navigation/native"
import { SafeAreaView, I18nManager, LogBox } from "react-native"
import { ErrorBoundary } from "./src/components/common/ErrorBoundary"

import "./global.css"

// Context Providers
import { LocaleProvider, useLocale } from "./src/contexts/LocaleContext"
import { RecentlyViewedProvider } from "./src/contexts/RecentlyViewedContext"
import { FinanceFlowProvider } from "./src/contexts/FinanceFlowContext"
import { FilterProvider } from "./src/contexts/FilterContext"
import { WishlistProvider } from "./src/contexts/WishlistContext"
import { CompareProvider } from "./src/contexts/CompareContext"

// Navigation
import StackNavigator from "./src/components/navigation/StackNavigator"

// Ignore harmless warnings
LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
  "Sending `onAnimatedValueUpdate` with no listeners registered",
])

// Custom theme
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "white",
    primary: "#46194F",
  },
}

function AppWithLocale() {
  const { direction } = useLocale()
  const isRTL = direction === "rtl"

  useEffect(() => {
    if (I18nManager.isRTL !== isRTL) {
      I18nManager.allowRTL(true)
      I18nManager.forceRTL(isRTL)
    }
  }, [isRTL])

  return (
    <SafeAreaView
      style={{
        flex: 1,
        direction: isRTL ? "rtl" : "ltr", // Ensures global layout direction
      }}
    >
      <NavigationContainer theme={MyTheme}>
        <StackNavigator />
      </NavigationContainer>
    </SafeAreaView>
  )
}

export default function App() {
  return (
    <ErrorBoundary>
      <LocaleProvider>
        <RecentlyViewedProvider>
          <FinanceFlowProvider>
            <FilterProvider>
              <WishlistProvider>
                <CompareProvider>
                  <AppWithLocale />
                </CompareProvider>
              </WishlistProvider>
            </FilterProvider>
          </FinanceFlowProvider>
        </RecentlyViewedProvider>
      </LocaleProvider>
    </ErrorBoundary>
  )
}
