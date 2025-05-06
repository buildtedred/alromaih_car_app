"use client"
import { View, Text, Image, TouchableOpacity, useWindowDimensions } from "react-native"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { useLocale } from "../../contexts/LocaleContext"
import AlmaraiFonts from "../../constants/fonts"
import JetourLogo from "../../assets/brands/jetour_logo.svg"
import CompareCarIcon from "../../assets/Icon/campare_car.svg" // ✅ Your SVG icon

export default function PopularCarCard({ car, onPress }) {
  const { locale } = useLocale()
  const { width } = useWindowDimensions()

  const getLocalized = (value) => {
    if (!value) return ""
    return typeof value === "object" ? value[locale] : value
  }

  // Fixed card width of 280 instead of dynamic calculation
  const cardWidth = 280
  const imageSize = 150

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.9}
      style={{ width: cardWidth }}
      className="bg-white border-2 border-[#46194F] rounded-xl px-3 py-3 mb-4 shadow-sm flex-row items-center relative"
    >
      {/* Top Left Heart Icon */}
      <View className="absolute top-3 left-3">
        <Icon name="heart" size={22} color="#46194F" />
      </View>

      {/* Top Right Custom Compare Icon */}
      <View className="absolute top-3 right-4">
        <CompareCarIcon width={22} height={22} />
      </View>

      {/* Padding Space on the Left */}
      <View style={{ width: 10 }} />

      {/* Text Info */}
      <View className="flex-1 mr-2 mt-8 ml-1">
        <View className="mb-1">
          <JetourLogo width={75} height={16} />
        </View>

        <Text
          numberOfLines={1}
          style={{
            fontFamily: AlmaraiFonts.bold,
            fontSize: 18,
            color: "#46194F",
            marginTop: 4,
            marginBottom: 2,
          }}
        >
          {getLocalized(car.name)}
        </Text>

        <Text
          numberOfLines={1}
          style={{
            fontFamily: AlmaraiFonts.regular,
            fontSize: 12,
            color: "#46194F",
          }}
        >
          {locale === "ar" ? "لكجري فل كامل" : "Luxury Full Option"} {car.specs?.year || "2025"}
        </Text>
      </View>

      {/* Car Image */}
      <Image
        source={car.image}
        resizeMode="contain"
        style={{
          width: imageSize,
          height: imageSize * 0.6,
          marginTop: 24,
          marginLeft: 0,
        }}
      />
    </TouchableOpacity>
  )
}
