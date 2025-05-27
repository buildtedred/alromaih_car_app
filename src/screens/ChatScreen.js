"use client"

import React, { useState } from "react"
import { View, Text, ScrollView, Animated, Easing, TouchableOpacity, I18nManager } from "react-native"
import CashVerification from "../components/chatsection/CashVerification"
import Icon from "react-native-vector-icons/Ionicons"

// Create a component for the circular loader (updated design)
class CircularLoader extends React.Component {
  constructor(props) {
    super(props)
    this.rotateAnim = new Animated.Value(0)
    this.centerRotateAnim = new Animated.Value(0)
  }

  componentDidMount() {
    this.startRotation()
  }

  startRotation = () => {
    // Main circle rotation
    Animated.loop(
      Animated.timing(this.rotateAnim, {
        toValue: 1,
        duration: 1500,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start()

    // Center spinner rotation (slightly faster)
    Animated.loop(
      Animated.timing(this.centerRotateAnim, {
        toValue: 1,
        duration: 1200,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start()
  }

  render() {
    const spin = this.rotateAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "360deg"],
    })

    const centerSpin = this.centerRotateAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "360deg"],
    })

    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <View className="w-[48px] h-[48px] ml-[16px] relative items-center justify-center">
          {/* Track Circle */}
          <View className="absolute w-[48px] h-[48px] rounded-[24px] border-[4px] border-[#f0f0f0]" />

          {/* Animated Indicator */}
          <Animated.View className="absolute w-[48px] h-[48px]" style={{ transform: [{ rotate: spin }] }}>
            <View className="w-[48px] h-[48px] rounded-[24px] border-[4px] border-t-[#5D2D84] border-r-[#5D2D84] border-b-transparent border-l-transparent" />
          </Animated.View>

          {/* White center circle */}
          <View className="absolute w-[32px] h-[32px] rounded-[16px] bg-white" />

          {/* Center spinner with dashes */}
          <Animated.View
            className="absolute w-[22px] h-[22px] items-center justify-center"
            style={{ transform: [{ rotate: centerSpin }] }}
          >
            {/* 8 dashes positioned in a circle */}
            <View
              className="absolute w-[2px] h-[3px] bg-[#333] rounded-[1px]"
              style={{ top: 0, left: "50%", marginLeft: -1 }}
            />
            <View
              className="absolute w-[2px] h-[3px] bg-[#333] rounded-[1px]"
              style={{ top: "14.6%", right: "14.6%", transform: [{ rotate: "45deg" }] }}
            />
            <View
              className="absolute w-[2px] h-[3px] bg-[#333] rounded-[1px]"
              style={{ top: "50%", right: 0, marginTop: -1, transform: [{ rotate: "90deg" }] }}
            />
            <View
              className="absolute w-[2px] h-[3px] bg-[#333] rounded-[1px]"
              style={{ bottom: "14.6%", right: "14.6%", transform: [{ rotate: "135deg" }] }}
            />
            <View
              className="absolute w-[2px] h-[3px] bg-[#333] rounded-[1px]"
              style={{ bottom: 0, left: "50%", marginLeft: -1, transform: [{ rotate: "180deg" }] }}
            />
            <View
              className="absolute w-[2px] h-[3px] bg-[#333] rounded-[1px]"
              style={{ bottom: "14.6%", left: "14.6%", transform: [{ rotate: "225deg" }] }}
            />
            <View
              className="absolute w-[2px] h-[3px] bg-[#333] rounded-[1px]"
              style={{ top: "50%", left: 0, marginTop: -1, transform: [{ rotate: "270deg" }] }}
            />
            <View
              className="absolute w-[2px] h-[3px] bg-[#333] rounded-[1px]"
              style={{ top: "14.6%", left: "14.6%", transform: [{ rotate: "315deg" }] }}
            />
          </Animated.View>
        </View>
      </TouchableOpacity>
    )
  }
}

// Updated GreenCheckmark component with React Vector Icon
const GreenCheckmark = () => {
  return (
    <View className="w-[48px] h-[48px] ml-[16px] relative items-center justify-center">
      {/* Green circle background */}
      <View className="absolute w-[48px] h-[48px] rounded-[24px] bg-[#00C853]" />

      {/* White inner circle */}
      <View className="absolute w-[40px] h-[40px] rounded-[20px] bg-white" />

      {/* React Vector Icon Checkmark */}
      <View className="absolute items-center justify-center">
        <Icon name="checkmark" size={24} color="#00C853" />
      </View>
    </View>
  )
}

export default function ChatScreen() {
  const [showCashVerification, setShowCashVerification] = useState(false)
  const isRTL = I18nManager.isRTL

  const navigateToCashVerification = () => {
    setShowCashVerification(true)
  }

  const navigateBack = () => {
    setShowCashVerification(false)
  }

  const content = {
    cashTitle: isRTL ? "كاش" : "Cash",
    cashSubtitle: isRTL ? "استلام الطلب (بانتظار المراجعة)" : "Request Received (Awaiting Review)",
    cashCarModel: isRTL ? "جيتور T2 لكجري فل كامل 2025" : "Jetour T2 Luxury Full Complete 2025",
    financeTitle: isRTL ? "تمويل" : "Finance",
    financeSubtitle: isRTL ? "القرار المالي (موافقة)" : "Financial Decision (Approved)",
    financeCarModel: isRTL ? "جيتور T2 لكجري فل كامل 2025" : "Jetour T2 Luxury Full Complete 2025",
    backButtonText: isRTL ? "العودة" : "Back",
  }

  if (showCashVerification) {
    return (
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          onPress={navigateBack}
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: 16,
            backgroundColor: "#f8f8f8",
          }}
        >
          <View
            style={{
              width: 30,
              height: 30,
              borderRadius: 15,
              backgroundColor: "#5D2D84",
              justifyContent: "center",
              alignItems: "center",
              marginRight: 8,
            }}
          >
            <Text style={{ color: "white", fontSize: 16 }}>{isRTL ? "←" : "→"}</Text>
          </View>
          <Text style={{ color: "#5D2D84", fontSize: 16 }}>{content.backButtonText}</Text>
        </TouchableOpacity>
        <CashVerification />
      </View>
    )
  }

  return (
    <View className="flex-1 bg-[#f8f8f8]">
      <ScrollView className="p-[16px]">
        <View
          className="bg-white px-[16px] py-[8px] mb-[12px] flex-row items-center shadow-sm mx-auto w-[90%]"
          style={{
            borderTopRightRadius: 60,
            borderBottomRightRadius: 60,
            borderTopLeftRadius: 16,
            borderBottomLeftRadius: 16,
          }}
        >
          <View className="flex-1 items-start">
            <Text className="text-[16px] font-bold text-[#5D2D84] mb-[1px]">{content.cashTitle}</Text>
            <Text className="text-[12px] text-[#888888] mb-[1px]">{content.cashSubtitle}</Text>
            <View className="flex-row items-center">
              <View className="w-[14px] h-[14px] bg-[#EEEEEE] rounded-[7px]" />
              <Text className="text-[12px] text-[#555555] ml-[4px]">{content.cashCarModel}</Text>
            </View>
          </View>
          <CircularLoader onPress={navigateToCashVerification} />
        </View>

        <View
          className="bg-white px-[16px] py-[8px] mb-[12px] flex-row items-center shadow-sm mx-auto w-[90%]"
          style={{
            borderTopRightRadius: 60,
            borderBottomRightRadius: 60,
            borderTopLeftRadius: 16,
            borderBottomLeftRadius: 16,
          }}
        >
          <View className="flex-1 items-start">
            <Text className="text-[16px] font-bold text-[#00B74A] mb-[1px]">{content.financeTitle}</Text>
            <Text className="text-[12px] text-[#888888] mb-[1px]">{content.financeSubtitle}</Text>
            <View className="flex-row items-center">
              <View className="w-[16px] h-[9px] bg-[#EEEEEE] rounded-[4px]" />
              <Text className="text-[12px] text-[#555555] ml-[4px]">{content.financeCarModel}</Text>
            </View>
          </View>
          <GreenCheckmark />
        </View>
      </ScrollView>
    </View>
  )
}
