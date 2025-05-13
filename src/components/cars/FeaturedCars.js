"use client"

import { View, Text, FlatList, TouchableOpacity } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useTranslation } from "react-i18next"
import { useState, useEffect, useMemo } from "react"
import { Dimensions } from "react-native"
import CarCard from "./CarCard"
import AlmaraiFonts from "../../constants/fonts"

const FeaturedCars = ({ cars, isRTL, sizeClass: propSizeClass }) => {
  const { t } = useTranslation()
  const navigation = useNavigation()
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

  const data = isRTL ? [...cars.slice(0, 6)].reverse() : cars.slice(0, 6)

  // Item separator component for consistent spacing
  const ItemSeparatorComponent = () => <View style={{ width: sizes.itemMargin * 2 }} />

  return (
    <View className="mb-1">
      {/* Header Row */}
      <View className="flex-row justify-between items-center px-3 mb-1">
        <Text
          className="text-[#46194F]"
          style={{
            fontSize: sizes.titleSize,
            fontFamily: AlmaraiFonts.bold,
            textAlign: isRTL ? "right" : "left",
          }}
        >
          {t("home.title", { defaultValue: "Featured Cars" })}
        </Text>

        {/* Added View All button */}
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
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ marginHorizontal: sizes.itemMargin }}>
            <CarCard car={item} sizeClass={sizeClass} />
          </View>
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

export default FeaturedCars
