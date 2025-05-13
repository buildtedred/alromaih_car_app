"use client"
import { useState } from "react"
import { View, Image, TouchableOpacity, Animated, useWindowDimensions } from "react-native"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { useNavigation } from "@react-navigation/native"

import { useLocale } from "../../contexts/LocaleContext"
import { brands, brandLogos } from "../../mock-data"
import { useRecentlyViewed } from "../../contexts/RecentlyViewedContext"
import { useWishlist } from "../../contexts/WishlistContext"
import AppText from "../common/AppText"
import CompareCarIcon from "../../assets/Icon/campare_car.svg"
import RiyalIcon from "../../assets/Icon/riyal_icon.svg"

export default function CarCard({ car }) {
  const { locale } = useLocale()
  const navigation = useNavigation()
  const { addToRecentlyViewed } = useRecentlyViewed()
  const { isInWishlist, toggleWishlist } = useWishlist()
  const [scale] = useState(new Animated.Value(1))
  const { width } = useWindowDimensions()

  // Check if this car is in the wishlist
  const inWishlist = isInWishlist(car.id)

  // Function to truncate text after 10 characters
  const truncateText = (text, maxLength = 10) => {
    if (!text) return ""
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + "..."
  }

  const getLang = (field) => (typeof field === "object" ? field?.[locale] : field)

  const brandName = brands?.[car.brand]?.[locale] || ""
  const LogoComponent = brandLogos[car.brand]

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

  const goToGallery = () => {
    addToRecentlyViewed(car)

    navigation.navigate("Gallery", {
      car: {
        ...car,
        brand: car.brand,
        name: car.name,
        specs: car.specs,
        image: car.image,
        cashPrice: car.cashPrice,
        installmentPrice: car.installmentPrice,
        exteriorImages: car.exteriorImages || [car.image],
        interiorImages: car.interiorImages || [car.image],
        features: car.features || {},
        subtext: car.subtext,
      },
    })
  }

  const handleWishlistToggle = (e) => {
    e.stopPropagation() // Prevent triggering the parent TouchableOpacity
    toggleWishlist(car)
  }

  return (
    <Animated.View
      style={{
        flex: 2,
        margin: 2,
        minWidth: 180,
        transform: [{ scale }],
      }}
      className="bg-white border-2 border-[#46194F] rounded-xl"
    >
      <TouchableOpacity
        onPress={goToGallery}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        activeOpacity={0.95}
        className="overflow-hidden rounded-2xl"
      >
        {/* Top Icons Row */}
        <View className="flex-row justify-between items-center px-3 pt-1">
          <TouchableOpacity onPress={handleWishlistToggle}>
            <Icon name={inWishlist ? "heart" : "heart-outline"} size={18} color="#46194F" />
          </TouchableOpacity>
          <CompareCarIcon width={18} height={18} />
        </View>

        {/* Car Image */}
        <View className="w-full h-20 px-3 mt-0 mb-0">
          <Image source={car.image} className="w-full h-full" resizeMode="contain" />
        </View>

        {/* Divider */}
        <View className="h-[1px] bg-[#46194F] my-0.5" />

        {/* Name + Brand */}
        <View className="flex-row justify-between items-center px-3 py-0.5">
          <View className="items-start flex-1 mr-2" style={{ maxWidth: "65%" }}>
            <AppText
              bold
              style={{
                fontSize: 12,
                color: "#46194F",
                width: "100%",
              }}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {truncateText(getLang(car.name))}
            </AppText>
            <AppText
              style={{
                fontSize: 10,
                color: "#666",
                width: "100%",
              }}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {truncateText(
                getLang(car.subtext) ||
                  `${locale === "ar" ? "لكجري فل كامل" : "Luxury Full Option"} ${car.specs?.year}`,
              )}
            </AppText>
          </View>
          {LogoComponent ? (
            <View className="ml-1" style={{ maxWidth: "30%" }}>
              <LogoComponent width={55} height={18} />
            </View>
          ) : (
            <AppText
              bold
              style={{
                fontSize: 12,
                color: "#000",
                maxWidth: "30%",
              }}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {truncateText(brandName)}
            </AppText>
          )}
        </View>

        {/* Divider */}
        <View className="h-[1px] bg-[#46194F] my-0.5 mx-2" />

        {/* Prices Row */}
        <View className="flex-row justify-between items-center px-3 pb-1">
          {/* Cash Price */}
          <View className="items-center flex-1">
            <AppText
              style={{
                fontSize: 10,
                color: "#666",
                marginBottom: 1,
              }}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {locale === "ar" ? "سعر الكاش" : "Cash Price"}
            </AppText>
            <View className="flex-row items-center justify-center">
              <AppText
                bold
                style={{
                  fontSize: 12,
                  color: "#46194F",
                  marginRight: 2,
                  maxWidth: 70,
                }}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {car.cashPrice?.toLocaleString()}
              </AppText>
              <RiyalIcon width={16} height={16} />
            </View>
          </View>

          {/* Divider */}
          <View className="w-px h-8 bg-[#46194F] mx-2" />

          {/* Installment */}
          <View className="items-center flex-1">
            <AppText
              style={{
                fontSize: 10,
                color: "#666",
                marginBottom: 1,
              }}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {locale === "ar" ? "يبدأ القسط من" : "Installment From"}
            </AppText>
            <View className="flex-row items-center justify-center">
              <AppText
                bold
                style={{
                  fontSize: 12,
                  color: "#46194F",
                  marginRight: 2,
                  maxWidth: 70,
                }}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {car.installmentPrice?.toLocaleString()}
              </AppText>
              <RiyalIcon width={16} height={16} />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  )
}
