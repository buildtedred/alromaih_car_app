"use client"

import { useState, useEffect, useMemo } from "react"
import { View, TouchableOpacity, Text, Dimensions } from "react-native"
import { carDataService } from "../../services/carDataService"
import AlmaraiFonts from "../../constants/fonts"

const YearSelection = ({ selectedYear, onSelectYear, locale, sizeClass: propSizeClass }) => {
  const [years, setYears] = useState([])
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
          fontSize: 11,
          itemWidth: "30%", // Slightly wider on small screens
          itemHeight: 55,
          itemMargin: 1.5,
          itemPadding: 1.5,
        }
      case "medium":
        return {
          fontSize: 12,
          itemWidth: "28%",
          itemHeight: 60,
          itemMargin: 1.5,
          itemPadding: 2,
        }
      default: // large
        return {
          fontSize: 13,
          itemWidth: "28%",
          itemHeight: 65,
          itemMargin: 2,
          itemPadding: 2,
        }
    }
  }, [sizeClass])

  useEffect(() => {
    setYears(carDataService.getYears())
  }, [])

  return (
    <View className="flex-1">
      <View className="flex-row flex-wrap justify-start px-2">
        {years.map((year) => (
          <TouchableOpacity
            key={String(year)}
            className={`rounded-[10px] ${
              selectedYear === year ? "border-2 border-[#46194F]" : "border border-gray-200"
            }`}
            style={{
              width: sizes.itemWidth,
              height: sizes.itemHeight,
              margin: sizes.itemMargin * 4,
              padding: sizes.itemPadding * 4,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => onSelectYear(year)}
          >
            <Text
              style={{
                fontSize: sizes.fontSize,
                color: "#333",
                textAlign: "center",
                fontFamily: selectedYear === year ? AlmaraiFonts.bold : AlmaraiFonts.regular,
              }}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {String(year)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )
}

export default YearSelection
