"use client"

import { useState, useEffect, useMemo } from "react"
import { View, TouchableOpacity, Text, Dimensions } from "react-native"
import { carDataService } from "../../services/carDataService"
import AlmaraiFonts from "../../constants/fonts"

const CategorySelection = ({ selectedCategory, onSelectCategory, locale, sizeClass: propSizeClass }) => {
  const [bodyTypes, setBodyTypes] = useState([])
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
          iconWidth: 28,
          iconHeight: 28,
          fontSize: 11,
          itemWidth: "30%", // Slightly wider on small screens
          itemHeight: 55,
          itemMargin: 1.5,
          itemPadding: 1.5,
        }
      case "medium":
        return {
          iconWidth: 32,
          iconHeight: 32,
          fontSize: 12,
          itemWidth: "28%",
          itemHeight: 60,
          itemMargin: 1.5,
          itemPadding: 2,
        }
      default: // large
        return {
          iconWidth: 35,
          iconHeight: 35,
          fontSize: 13,
          itemWidth: "28%",
          itemHeight: 65,
          itemMargin: 2,
          itemPadding: 2,
        }
    }
  }, [sizeClass])

  useEffect(() => {
    setBodyTypes(carDataService.getBodyTypes(locale))
  }, [locale])

  return (
    <View className="flex-1">
      <View className="flex-row flex-wrap justify-start px-2">
        {bodyTypes.map((bodyType) => {
          const isSelected = selectedCategory?.key === bodyType.key
          return (
            <TouchableOpacity
              key={bodyType.key}
              className={`rounded-[10px] ${isSelected ? "border-2 border-[#46194F]" : "border border-gray-200"}`}
              style={{
                width: sizes.itemWidth,
                height: sizes.itemHeight,
                margin: sizes.itemMargin * 4,
                padding: sizes.itemPadding * 4,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => onSelectCategory(bodyType)}
            >
              <Text
                style={{
                  fontSize: sizes.fontSize,
                  color: "#333",
                  textAlign: "center",
                  fontFamily: isSelected ? AlmaraiFonts.bold : AlmaraiFonts.regular,
                }}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {bodyType.name || ""}
              </Text>
            </TouchableOpacity>
          )
        })}
      </View>
    </View>
  )
}

export default CategorySelection
