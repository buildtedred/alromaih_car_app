"use client"

import { View } from "react-native"
import AppHeader from "./AppHeader"
import { useRoute } from "@react-navigation/native"

export default function ScreenLayout({ children }) {
  const route = useRoute()

  // Check if we're on screens that should hide the header
  const hideHeaderScreens = ["Account", "AccountScreen", "PersonalInfo"]
  const shouldHideHeader = hideHeaderScreens.includes(route.name)

  return (
    <View style={{ flex: 1 }}>
      {!shouldHideHeader && <AppHeader />}
      <View style={{ flex: 1 }}>{children}</View>
    </View>
  )
}
