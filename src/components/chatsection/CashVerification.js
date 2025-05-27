"use client"

import { useState, useEffect } from "react"
import { View, Text, Animated, Easing, TouchableOpacity, I18nManager } from "react-native"
import CashEvaluation from "./CashEvaluation"

const ToyotaLogo = () => (
  <View style={{ width: 16, height: 16 }} className="justify-center items-center">
    <View style={{ width: 14, height: 8, borderRadius: 4 }} className="bg-gray-200 justify-center items-center">
      <View
        style={{ width: 10, height: 5, borderRadius: 2.5, borderWidth: 1 }}
        className="border-gray-300 justify-center items-center"
      >
        <View style={{ width: 6, height: 2.5, borderRadius: 1.25 }} className="bg-gray-300" />
      </View>
    </View>
  </View>
)

// Updated DoubleArrowIcon to match the provided image design
const DoubleArrowIcon = ({ onPress }) => {
  // Create animated value for rotation
  const spinValue = new Animated.Value(0)

  // Detect if RTL is enabled
  const isRTL = I18nManager.isRTL

  // Start the animation when component mounts
  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start()
  }, [])

  // Interpolate the value for rotation
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  })

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <View style={{ width: 48, height: 48 }} className="justify-center items-center relative">
        {/* White background circle */}
        <View style={{ width: 48, height: 48, borderRadius: 24 }} className="absolute bg-white" />

        {/* Animated progress indicator - partial circle */}
        <Animated.View
          style={{
            width: 48,
            height: 48,
            transform: [{ rotate: spin }],
          }}
          className="absolute"
        >
          <View
            style={{
              width: 48,
              height: 48,
              borderRadius: 24,
              borderWidth: 4,
              borderTopColor: "#5D2D84",
              borderRightColor: "#5D2D84",
              borderBottomColor: "transparent",
              borderLeftColor: "transparent",
            }}
          />
        </Animated.View>

        {/* Double arrow icons - exactly like the image */}
        <View className="flex-row justify-center items-center z-10">
          {/* First arrow */}
          <View
            style={{
              width: 8,
              height: 8,
              borderRightWidth: 3,
              borderBottomWidth: 3,
              borderColor: "#5D2D84",
              transform: [{ rotate: isRTL ? "230deg" : "-45deg" }],
              marginRight: isRTL ? 0 : 2,
              marginLeft: isRTL ? 2 : 0,
            }}
          />
          {/* Second arrow */}
          <View
            style={{
              width: 8,
              height: 8,
              borderRightWidth: 3,
              borderBottomWidth: 3,
              borderColor: "#5D2D84",
              transform: [{ rotate: isRTL ? "230deg" : "-45deg" }],
              marginLeft: isRTL ? 0 : -1,
              marginRight: isRTL ? -1 : 0,
            }}
          />
        </View>
      </View>
    </TouchableOpacity>
  )
}

const CashVerification = () => {
  // State to track whether to show CashEvaluation
  const [showCashEvaluation, setShowCashEvaluation] = useState(false)

  // Function to navigate to CashEvaluation
  const navigateToCashEvaluation = () => {
    setShowCashEvaluation(true)
  }

  // Function to navigate back to CashVerification
  const navigateBack = () => {
    setShowCashEvaluation(false)
  }

  // Detect if RTL is enabled
  const isRTL = I18nManager.isRTL

  // Text content based on language direction
  const content = {
    title: isRTL ? "كاش" : "Cash",
    subtitle: isRTL ? "التحقق الأساسي (الانتقال للمرحلة التالية)" : "Basic Verification (Move to Next Stage)",
    carModel: isRTL ? "جينور T2 لدكجري فل كامل 2025" : "Jetour T2 Luxury Full Complete 2025",
  }

  // If showing CashEvaluation, render it without a back button
  if (showCashEvaluation) {
    return (
      <View className="flex-1">
        {/* CashEvaluation Component */}
        <CashEvaluation />
      </View>
    )
  }

  // Otherwise, show the CashVerification screen
  return (
    <View style={{ padding: 50, paddingHorizontal: 20 }} className="flex-1 bg-gray-100">
      <TouchableOpacity activeOpacity={0.9} onPress={navigateToCashEvaluation}>
        <View
          style={{
            borderRadius: 10,
            borderTopRightRadius: 60,
            borderBottomRightRadius: 60,
            padding: 10,
            marginVertical: 6,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 3,
            elevation: 2,
            height: 80,
          }}
          className="bg-white flex-row items-center mx-auto w-[90%]"
        >
          <View style={{ marginLeft: 8 }} className="flex-1 items-start">
            <Text style={{ fontSize: 16, color: "#5D2D84", marginBottom: 2 }} className="font-bold">
              {content.title}
            </Text>
            <Text style={{ fontSize: 12, color: "#555555", marginBottom: 2 }}>{content.subtitle}</Text>
            <View className="flex-row items-center">
              <ToyotaLogo />
              <Text style={{ fontSize: 10, color: "#666666", marginLeft: 6 }}>{content.carModel}</Text>
            </View>
          </View>

          <View style={{ marginLeft: 12 }}>
            <DoubleArrowIcon onPress={navigateToCashEvaluation} />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default CashVerification
