"use client"

import { View } from "react-native"
import AppHeader from "./AppHeader"

export default function ScreenLayout({ children }) {
  return (
    <View style={{ flex: 1 }}>
      <AppHeader />
      <View style={{ flex: 1 }}>
        {children}
      </View>
    </View>
  )
}
