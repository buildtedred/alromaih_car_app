"use client"
import { useState } from "react"
import { View, Image, TouchableOpacity, Animated, useWindowDimensions } from "react-native"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { useNavigation } from "@react-navigation/native"
import { useLocale } from "../../contexts/LocaleContext"
import { brands, brandLogos } from "../../mock-data"
import { useRecentlyViewed } from "../../contexts/RecentlyViewedContext"
import AppText from "../common/AppText"
import CompareCarIcon from "../../assets/Icon/campare_car.svg"
import RiyalIcon from "../../assets/Icon/riyal_icon.svg"

export default function AllCarCard({ car, onPress }) {
  const { locale } = useLocale()
  const navigation = useNavigation()
  const { addToRecentlyViewed } = useRecentlyViewed()
  const [scale] = useState(new Animated.Value(1))
  const { width } = useWindowDimensions()

  // Calculate card width to fit 2 cards per row with some spacing
  // We're using flex: 1 in the parent FlatList with numColumns=2, so we don't need to calculate width here

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

    // Use the provided onPress if available, otherwise navigate to Gallery
    if (onPress) {
      onPress(car)
    } else {
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
  }

  return (
    <Animated.View
      style={{
        flex: 1, // This makes the card take up equal space in the grid
        margin: 4, // Small margin around each card
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
        <View className="flex-row justify-between items-center px-2 pt-2">
          <Icon name="heart-outline" size={18} color="#46194F" />
          <CompareCarIcon width={18} height={18} />
        </View>

        <View className="w-full h-20 px-2 mt-1 mb-1">
          <Image source={car.image} className="w-full h-full" resizeMode="contain" />
        </View>

        <View className="h-[1px] bg-[#46194F] my-1" />

        <View className="flex-row justify-between items-center px-2 py-1">
          <View className="items-start flex-1">
            <AppText bold style={{ fontSize: 12, color: "#46194F" }} numberOfLines={1}>
              {getLang(car.name)}
            </AppText>
            <AppText style={{ fontSize: 10, color: "#666" }} numberOfLines={1}>
              {getLang(car.subtext)
                ? getLang(car.subtext)
                : `${locale === "ar" ? "لكجري فل كامل" : "Luxury Full Option"} ${car.specs?.year}`}
            </AppText>
          </View>
          {LogoComponent ? (
            <View className="ml-1">
              <LogoComponent width={50} height={16} />
            </View>
          ) : (
            <AppText bold style={{ fontSize: 12, color: "#000" }}>
              {brandName}
            </AppText>
          )}
        </View>

        <View className="h-[1px] bg-[#46194F] my-1 mx-2" />

        <View className="flex-row justify-between items-center px-2 pb-2">
          <View className="items-center flex-1">
            <AppText style={{ fontSize: 10, color: "#666", marginBottom: 2 }}>
              {locale === "ar" ? "سعر الكاش" : "Cash Price"}
            </AppText>
            <View className="flex-row items-center justify-center">
              <AppText bold style={{ fontSize: 12, color: "#46194F", marginRight: 2 }}>
                {car.cashPrice?.toLocaleString()}
              </AppText>
              <RiyalIcon width={16} height={16} />
            </View>
          </View>

          <View className="w-px h-8 bg-[#46194F] mx-1" />

          <View className="items-center flex-1">
            <AppText style={{ fontSize: 10, color: "#666", marginBottom: 2 }}>
              {locale === "ar" ? "يبدأ القسط من" : "Installment From"}
            </AppText>
            <View className="flex-row items-center justify-center">
              <AppText bold style={{ fontSize: 12, color: "#46194F", marginRight: 2 }}>
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
