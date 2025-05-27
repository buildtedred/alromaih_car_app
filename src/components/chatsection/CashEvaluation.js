"use client"

import { useState, useEffect } from "react"
import { View, Text, Animated, Easing, TouchableOpacity, I18nManager } from "react-native"
import CashFinalDecision from "./CashFinalDecision" // Import the CashFinalDecision component

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

// Pause Icon Component with animation
const PauseIcon = () => {
  // Create animated value for rotation
  const spinValue = new Animated.Value(0)

  // Start the animation when component mounts
  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1500,
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
    <View style={{ width: 45, height: 45, marginLeft: 12 }} className="justify-center items-center relative">
      {/* Track Circle */}
      <View style={{ width: 42, height: 42, borderRadius: 21, borderWidth: 4 }} className="absolute border-gray-100" />

      {/* Animated Indicator */}
      <Animated.View style={{ width: 42, height: 42, transform: [{ rotate: spin }] }} className="absolute">
        <View
          style={{
            width: 42,
            height: 42,
            borderRadius: 21,
            borderWidth: 4,
            borderTopColor: "#5D2D84",
            borderRightColor: "#5D2D84",
            borderBottomColor: "transparent",
            borderLeftColor: "transparent",
          }}
        />
      </Animated.View>

      {/* Pause icon */}
      <View style={{ width: 16, height: 16 }} className="flex-row justify-between items-center z-10">
        <View style={{ width: 4, height: 16, borderRadius: 2, marginHorizontal: 2 }} className="bg-purple-900" />
        <View style={{ width: 4, height: 16, borderRadius: 2, marginHorizontal: 2 }} className="bg-purple-900" />
      </View>
    </View>
  )
}

// Fixed Double Arrow Icon Component with RTL support
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
        duration: 1500,
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
      <View style={{ width: 45, height: 45, marginLeft: 12 }} className="justify-center items-center relative">
        {/* Track Circle */}
        <View
          style={{ width: 42, height: 42, borderRadius: 21, borderWidth: 4 }}
          className="absolute border-gray-100"
        />

        {/* Animated Indicator */}
        <Animated.View style={{ width: 42, height: 42, transform: [{ rotate: spin }] }} className="absolute">
          <View
            style={{
              width: 42,
              height: 42,
              borderRadius: 21,
              borderWidth: 4,
              borderTopColor: "#5D2D84",
              borderRightColor: "#5D2D84",
              borderBottomColor: "transparent",
              borderLeftColor: "transparent",
            }}
          />
        </Animated.View>

        {/* Double arrow icon with RTL support */}
        <View className="flex-row justify-center items-center z-10">
          <View
            style={{
              width: 10,
              height: 10,
              borderRightWidth: 3,
              borderTopWidth: 3,
              borderColor: "#5D2D84",
              transform: [{ rotate: isRTL ? "140deg" : "45deg" }], // Fixed: RTL support added
              marginRight: isRTL ? 2 : -2,
              marginLeft: isRTL ? -2 : 0,
            }}
          />
          <View
            style={{
              width: 10,
              height: 10,
              borderRightWidth: 3,
              borderTopWidth: 3,
              borderColor: "#5D2D84",
              transform: [{ rotate: isRTL ? "140deg" : "45deg" }], // Fixed: RTL support added
              marginLeft: isRTL ? 0 : 2,
              marginRight: isRTL ? 0 : 0,
            }}
          />
        </View>
      </View>
    </TouchableOpacity>
  )
}

// Card Component
const Card = ({ icon, title, subtitle, carModel, onPress }) => {
  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onPress} disabled={!onPress}>
      <View
        style={{
          borderRadius: 10,
          borderTopRightRadius: 50,
          borderBottomRightRadius: 50,
          padding: 10,
          marginVertical: 5,
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
            {title}
          </Text>
          <Text style={{ fontSize: 12, color: "#555555", marginBottom: 2 }}>{subtitle}</Text>
          <View className="flex-row items-center">
            <ToyotaLogo />
            <Text style={{ fontSize: 10, color: "#666666", marginLeft: 6 }}>{carModel}</Text>
          </View>
        </View>

        {icon}
      </View>
    </TouchableOpacity>
  )
}

const CashEvaluation = () => {
  // State to track whether to show CashFinalDecision
  const [showFinalDecision, setShowFinalDecision] = useState(false)

  // Function to navigate to CashFinalDecision
  const navigateToFinalDecision = () => {
    setShowFinalDecision(true)
  }

  // Function to navigate back to CashEvaluation
  const navigateBack = () => {
    setShowFinalDecision(false)
  }

  // Detect if RTL is enabled
  const isRTL = I18nManager.isRTL

  // Text content based on language direction
  const content = {
    title: isRTL ? "كاش" : "Cash",
    waitingSubtitle: isRTL ? "التقييم والمطابقة (قيد الانتظار)" : "Evaluation & Matching (Waiting)",
    finalDecisionSubtitle: isRTL
      ? "التقييم والمطابقة (الانتقال للقرار النهائي)"
      : "Evaluation & Matching (Move to Final Decision)",
    carModel: isRTL ? "جينور T2 لدكجري فل كامل 2025" : "Jetour T2 Luxury Full Complete 2025",
  }

  // If showing CashFinalDecision, render it without a back button
  if (showFinalDecision) {
    return (
      <View className="flex-1">
        {/* CashFinalDecision Component */}
        <CashFinalDecision />
      </View>
    )
  }

  // Otherwise, show the CashEvaluation screen
  return (
    <View style={{ padding: 50, paddingHorizontal: 20 }} className="flex-1 bg-gray-100">
      {/* Waiting Card */}
      <Card icon={<PauseIcon />} title={content.title} subtitle={content.waitingSubtitle} carModel={content.carModel} />

      {/* Moving to Final Decision Card - Made clickable */}
      <Card
        icon={<DoubleArrowIcon onPress={navigateToFinalDecision} />}
        title={content.title}
        subtitle={content.finalDecisionSubtitle}
        carModel={content.carModel}
        onPress={navigateToFinalDecision}
      />
    </View>
  )
}

export default CashEvaluation
