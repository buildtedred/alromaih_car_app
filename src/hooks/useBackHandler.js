"use client"

import { useEffect } from "react"
import { BackHandler } from "react-native"
import { useNavigation } from "@react-navigation/native"

/**
 * Custom hook to handle back button presses
 * @param {Function} handleBack - Custom back handler function
 * @param {Array} deps - Dependencies array for the effect
 */
export default function useBackHandler(handleBack, deps = []) {
  const navigation = useNavigation()

  useEffect(() => {
    // Create the back handler function
    const backAction = () => {
      // If a custom handler is provided and it returns true, prevent default behavior
      if (handleBack && handleBack()) {
        return true
      }

      // Check if we can go back in the navigation stack
      if (navigation.canGoBack()) {
        navigation.goBack()
        return true
      }

      // Return false to allow default back behavior (usually exits the app)
      return false
    }

    // Add event listener for hardware back button press
    const subscription = BackHandler.addEventListener("hardwareBackPress", backAction)

    // Clean up the event listener
    return () => subscription.remove()
  }, [navigation, handleBack, ...(deps || [])])
}
