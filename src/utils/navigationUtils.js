import { createRef } from "react"
import { CommonActions } from "@react-navigation/native"

// Create a navigation reference that can be used outside of React components
export const navigationRef = createRef()

// Function to navigate to a specific screen
export function navigate(name, params) {
  if (navigationRef.current) {
    // Prevent navigation to the same screen
    if (navigationRef.current.getCurrentRoute()?.name === name) {
      return
    }
    navigationRef.current.navigate(name, params)
  }
}

// Function to go back safely
export function goBack() {
  if (navigationRef.current && navigationRef.current.canGoBack()) {
    navigationRef.current.goBack()
    return true
  }
  return false
}

// Function to reset the navigation stack
export function resetRoot(routeName = "HomeScreen", params = {}) {
  if (navigationRef.current) {
    navigationRef.current.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: routeName, params }],
      }),
    )
  }
}

// Function to check if we can go back
export function canGoBack() {
  return navigationRef.current?.canGoBack() || false
}

// Get the current route name
export function getCurrentRouteName() {
  return navigationRef.current?.getCurrentRoute()?.name
}
