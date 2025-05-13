"use client"

import { View, Text, FlatList, TouchableOpacity } from "react-native"
import { useTranslation } from "react-i18next"
import { useNavigation, CommonActions } from "@react-navigation/native"
import { useState, useEffect, useMemo } from "react"
import { Dimensions } from "react-native"
import { useRecentlyViewed } from "../../contexts/RecentlyViewedContext"
import PopularCarCard from "./PopularCarCard"
import AlmaraiFonts from "../../constants/fonts"

export default function PopularCars({ cars, isRTL, sizeClass: propSizeClass }) {
  const { t } = useTranslation()
  const navigation = useNavigation()
  const { addToRecentlyViewed } = useRecentlyViewed()
  const [screenWidth, setScreenWidth] = useState(Dimensions.get("window").width)

  // Listen for dimension changes
  useEffect(() => {
    const dimensionsHandler = ({ window }) => {
      setScreenWidth(window.width)
    }

    const subscription = Dimensions.addEventListener("change", dimensionsHandler)

    return () => subscription.remove()
  }, [])

  // Determine size class based on screen width if not provided by parent
  const sizeClass = useMemo(() => {
    if (propSizeClass) return propSizeClass
    if (screenWidth < 360) return "small"
    if (screenWidth < 480) return "medium"
    return "large"
  }, [screenWidth, propSizeClass])

  // Get responsive values based on size class
  const sizes = useMemo(() => {
    switch (sizeClass) {
      case "small":
        return {
          titleSize: 13,
          viewAllSize: 11,
          itemMargin: 2,
          snapInterval: screenWidth * 0.65 + 4,
        }
      case "medium":
        return {
          titleSize: 14,
          viewAllSize: 12,
          itemMargin: 2,
          snapInterval: screenWidth * 0.65 + 4,
        }
      default: // large
        return {
          titleSize: 15,
          viewAllSize: 13,
          itemMargin: 2,
          snapInterval: screenWidth * 0.65 + 4,
        }
    }
  }, [sizeClass, screenWidth])

  const handleCarPress = (car) => {
    addToRecentlyViewed(car)
    const { brandLogo, image, ...safeCar } = car // remove non-serializable values

    // Use CommonActions to navigate to the root stack navigator's Gallery screen
    navigation.dispatch(
      CommonActions.navigate({
        name: "Gallery",
        params: { car: safeCar },
      }),
    )
  }

  const data = isRTL ? [...cars.slice(0, 6)].reverse() : cars.slice(0, 6)

  // Item separator component to create gap between cards
  const ItemSeparatorComponent = () => <View style={{ width: sizes.itemMargin * 2 }} />

  return (
    <View className="mb-1">
      {/* Header */}
      <View className="flex-row justify-between items-center px-3 mb-1">
        <Text
          className="text-[#46194F]"
          style={{
            fontSize: sizes.titleSize,
            fontFamily: AlmaraiFonts.bold,
            textAlign: isRTL ? "right" : "left",
          }}
        >
          {t("home.popularCars", { defaultValue: "Popular Cars" })}
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("AllCars")}>
          <Text
            className="text-[#46194F]"
            style={{
              fontSize: sizes.viewAllSize,
              fontFamily: AlmaraiFonts.medium,
            }}
          >
            {t("common.view_all", { defaultValue: "View All" })}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Car List */}
      <FlatList
        horizontal
        inverted={isRTL}
        data={data}
        keyExtractor={(item) => item.id?.toString()}
        renderItem={({ item }) => (
          <PopularCarCard car={item} onPress={() => handleCarPress(item)} sizeClass={sizeClass} />
        )}
        ItemSeparatorComponent={ItemSeparatorComponent}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingLeft: 4,
          paddingRight: 4,
          paddingVertical: 2,
        }}
        snapToInterval={sizes.snapInterval}
        decelerationRate="fast"
      />
    </View>
  )
}
