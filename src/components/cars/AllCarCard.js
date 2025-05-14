"use client"
import { useState } from "react"
import { View, Image, TouchableOpacity, Animated } from "react-native"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { useNavigation } from "@react-navigation/native"
import { useLocale } from "../../contexts/LocaleContext"
import { brands, brandLogos } from "../../mock-data"
import { useRecentlyViewed } from "../../contexts/RecentlyViewedContext"
import { useCompare } from "../../contexts/CompareContext"
import AppText from "../common/AppText"
import CompareCarIcon from "../../assets/Icon/campare_car.svg"
import RiyalIcon from "../../assets/Icon/riyal_icon.svg"

export default function AllCarCard({ car, onPress, isSelectingForComparison = false }) {
  const { locale } = useLocale()
  const navigation = useNavigation()
  const { addToRecentlyViewed } = useRecentlyViewed()
  const { openCompareModal, addCarToCompare } = useCompare()
  const [scale] = useState(new Animated.Value(1))

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

  const handleCardPress = () => {
    if (isSelectingForComparison) {
      // Add this car to comparison and return to previous screen
      console.log("Adding car to comparison:", car.name || car.id)
      addCarToCompare(car)
      navigation.goBack()
    } else {
      // Normal flow - go to gallery
      addToRecentlyViewed(car)
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
  }

  const handleComparePress = (e) => {
    e.stopPropagation()
    openCompareModal(car)
  }

  return (
    <Animated.View
      style={{
        flex: 1,
        margin: 4,
        transform: [{ scale }],
      }}
      className="bg-white border-2 border-[#46194F] rounded-xl"
    >
      <TouchableOpacity
        onPress={handleCardPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        activeOpacity={0.95}
        className="overflow-hidden rounded-2xl"
      >
        <View className="flex-row justify-between items-center px-2 pt-2">
          <Icon name="heart-outline" size={18} color="#46194F" />
          {!isSelectingForComparison && (
            <TouchableOpacity onPress={handleComparePress}>
              <CompareCarIcon width={18} height={18} />
            </TouchableOpacity>
          )}
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
