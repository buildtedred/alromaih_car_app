"use client"

import "./src/services/localization"
import "./src/utils/globalText" // ✅ Global Almarai font patch

import { useEffect } from "react"
import { NavigationContainer, DefaultTheme } from "@react-navigation/native"
import { SafeAreaView, I18nManager, LogBox, BackHandler } from "react-native"
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
import FinanceFlowNavigator from "./src/components/Financials/FinanceFlowNavigator"
import { navigationRef } from "./src/utils/navigationUtils"

// Ignore harmless warnings
LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
  "Sending `onAnimatedValueUpdate` with no listeners registered",
  "The action 'GO_BACK' was not handled by any navigator",
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

  // Handle hardware back button globally
  useEffect(() => {
    const backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
      // Check if we can go back in the navigation stack
      if (navigationRef.current?.canGoBack()) {
        navigationRef.current.goBack()
        return true
      }
      // If we can't go back, let the default behavior happen (usually exits the app)
      return false
    })

    return () => backHandler.remove()
  }, [])

  return (
    <SafeAreaView
      style={{
        flex: 1,
        direction: isRTL ? "rtl" : "ltr", // Ensures global layout direction
      }}
    >
      <NavigationContainer ref={navigationRef} theme={MyTheme}>
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
