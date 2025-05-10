"use client"
import { useState } from "react"
import { View, Text, Image, TouchableOpacity, Animated, useWindowDimensions } from "react-native"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { useLocale } from "../../contexts/LocaleContext"
import AlmaraiFonts from "../../constants/fonts"
import JetourLogo from "../../assets/brands/jetour_logo.svg"
import CompareCarIcon from "../../assets/Icon/campare_car.svg" // ✅ Your SVG icon

export default function PopularCarCard({ car, onPress }) {
  const { locale } = useLocale()
  const { width } = useWindowDimensions()
  const [scale] = useState(new Animated.Value(1))

  const getLocalized = (value) => {
    if (!value) return ""
    return typeof value === "object" ? value[locale] : value
  }

  const onPressIn = () => {
    Animated.spring(scale, {
      toValue: 1.02,
      useNativeDriver: true,
    }).start()
  }

  const onPressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
    }).start()
  }

  return (
    <Animated.View
      style={{
        flex: 1,
        margin: 2,
        transform: [{ scale }],
      }}
      className="bg-white border-2 border-[#46194F] rounded-xl"
    >
      <TouchableOpacity
        onPress={onPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        activeOpacity={0.95}
        className="overflow-hidden rounded-2xl flex-row items-center relative py-2"
      >
        {/* Top Left Heart Icon */}
        <View className="absolute top-2 left-2">
          <Icon name="heart-outline" size={18} color="#46194F" />
        </View>

        {/* Top Right Custom Compare Icon */}
        <View className="absolute top-2 right-2">
          <CompareCarIcon width={18} height={18} />
        </View>

        {/* Text Info */}
        <View className="flex-1 ml-2 mr-1 mt-8">
          <View className="mb-1">
            <JetourLogo width={60} height={16} />
          </View>

          <Text
            numberOfLines={1}
            style={{
              fontFamily: AlmaraiFonts.bold,
              fontSize: 14,
              color: "#46194F",
              marginTop: 3,
              marginBottom: 2,
            }}
          >
            {getLocalized(car.name)}
          </Text>

          <Text
            numberOfLines={1}
            style={{
              fontFamily: AlmaraiFonts.regular,
              fontSize: 11,
              color: "#46194F",
            }}
          >
            {locale === "ar" ? "لكجري فل كامل" : "Luxury Full Option"} {car.specs?.year || "2025"}
          </Text>
        </View>

        {/* Car Image */}
        <View className="h-24 px-1">
          <Image
            source={car.image}
            resizeMode="contain"
            style={{
              width: 110,
              height: "100%",
              marginTop: 10,
            }}
          />
        </View>
      </TouchableOpacity>
    </Animated.View>
  )
}
