"use client"
import { useState } from "react"
import { View, Text, Image, TouchableOpacity, Animated, useWindowDimensions } from "react-native"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { useLocale } from "../../contexts/LocaleContext"
import AlmaraiFonts from "../../constants/fonts"
import JetourLogo from "../../assets/brands/jetour_logo.svg"
import CompareCarIcon from "../../assets/Icon/campare_car.svg"
import { useWishlist } from "../../contexts/WishlistContext"
import { useCompare } from "../../contexts/CompareContext"

export default function PopularCarCard({ car, onPress }) {
  const { locale } = useLocale()
  const { width } = useWindowDimensions()
  const [scale] = useState(new Animated.Value(1))
  const { isInWishlist, toggleWishlist } = useWishlist()
  const { openCompareModal, isSelectingSecondCar, addCarToCompare, carsToCompare } = useCompare()

  // Check if this car is in the wishlist
  const inWishlist = isInWishlist(car.id)

  // Check if this car is already selected for comparison
  const isSelectedForComparison = carsToCompare.some((c) => c.id === car.id)

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

  const handleWishlistToggle = (e) => {
    e.stopPropagation() // Prevent triggering the parent TouchableOpacity
    toggleWishlist(car)
  }

  const handleComparePress = (e) => {
    e.stopPropagation() // Prevent triggering the parent TouchableOpacity
    openCompareModal(car)
  }

  const handleCardPress = () => {
    // If we're in selection mode, add this car to comparison
    if (isSelectingSecondCar) {
      addCarToCompare(car)
    } else {
      // Otherwise, handle normal card press
      if (onPress) {
        onPress(car)
      }
    }
  }

  return (
    <Animated.View
      style={{
        flex: 1,
        margin: 2,
        transform: [{ scale }],
      }}
      className={`bg-white border-2 ${isSelectedForComparison ? "border-[#46194F]" : "border-[#46194F]"} ${isSelectingSecondCar ? "opacity-90" : "opacity-100"} rounded-xl`}
    >
      <TouchableOpacity
        onPress={handleCardPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        activeOpacity={0.95}
        className="overflow-hidden rounded-2xl flex-row items-center relative py-2"
      >
        {/* Selection Indicator - Changed to white background with black check */}
        {isSelectedForComparison && (
          <View className="absolute top-0 right-0 bg-white px-2 py-1 rounded-bl-lg z-10 shadow-sm border border-gray-200">
            <Icon name="check" size={16} color="black" />
          </View>
        )}

        {/* Top Left Heart Icon */}
        <TouchableOpacity
          onPress={handleWishlistToggle}
          className="absolute top-2 left-2"
          style={{ zIndex: 1 }} // Ensure it's above other elements
        >
          <Icon name={inWishlist ? "heart" : "heart-outline"} size={18} color="#46194F" />
        </TouchableOpacity>

        {/* Top Right Custom Compare Icon */}
        {!isSelectingSecondCar && (
          <TouchableOpacity
            onPress={handleComparePress}
            className="absolute top-2 right-2"
            style={{ zIndex: 1 }} // Ensure it's above other elements
          >
            <CompareCarIcon width={18} height={18} />
          </TouchableOpacity>
        )}

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
