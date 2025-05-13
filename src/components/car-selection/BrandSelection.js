"use client"

import { useState, useEffect, useMemo } from "react"
import { View, TouchableOpacity, Text, Dimensions } from "react-native"
import { carDataService } from "../../services/carDataService"
import AlmaraiFonts from "../../constants/fonts"

const BrandSelection = ({ selectedBrand, onSelectBrand, locale, sizeClass: propSizeClass }) => {
  const [brands, setBrands] = useState([])
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
          logoWidth: 28,
          logoHeight: 12, // Updated to maintain aspect ratio with medium size
          fontSize: 11,
          itemWidth: "30%", // Slightly wider on small screens
          itemHeight: 55, // Reduced to accommodate smaller logo height
          itemMargin: 1.5,
          itemPadding: 1.5,
          noDataFontSize: 12,
        }
      case "medium":
        return {
          logoWidth: 32,
          logoHeight: 14,
          fontSize: 12,
          itemWidth: "28%",
          itemHeight: 60,
          itemMargin: 1.5,
          itemPadding: 2,
          noDataFontSize: 13,
        }
      default: // large
        return {
          logoWidth: 35,
          logoHeight: 16, // Updated to maintain aspect ratio with medium size
          fontSize: 13,
          itemWidth: "28%",
          itemHeight: 65, // Reduced to accommodate smaller logo height
          itemMargin: 2,
          itemPadding: 2,
          noDataFontSize: 14,
        }
    }
  }, [sizeClass])

  useEffect(() => {
    try {
      const brandsData = carDataService.getBrands(locale)
      setBrands(brandsData || [])
    } catch (error) {
      console.error("Error loading brands:", error)
      setBrands([])
    }
  }, [locale])

  const handleSelectBrand = (brand) => {
    try {
      onSelectBrand(brand)
    } catch (error) {
      console.error("Error selecting brand:", error)
    }
  }

  if (!brands || brands.length === 0) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text
          style={{
            fontSize: sizes.noDataFontSize,
            fontFamily: AlmaraiFonts.regular,
            color: "#666",
          }}
        >
          {locale === "ar" ? "لا توجد علامات متاحة" : "No brands available"}
        </Text>
      </View>
    )
  }

  return (
    <View className="flex-1">
      <View className="flex-row flex-wrap justify-center">
        {brands.map((brand) => {
          if (!brand || !brand.key) return null

          const BrandLogo = brand.logo
          const brandName = brand.name || ""
          const isSelected = selectedBrand?.key === brand.key

          return (
            <TouchableOpacity
              key={brand.key}
              className={`rounded-[10px] items-center justify-center ${
                isSelected ? "border-2 border-[#46194F]" : "border border-gray-200"
              }`}
              style={{
                width: sizes.itemWidth,
                minHeight: sizes.itemHeight,
                margin: sizes.itemMargin * 4,
                padding: sizes.itemPadding * 4,
              }}
              onPress={() => handleSelectBrand(brand)}
            >
              {BrandLogo && (
                <BrandLogo
                  width={sizes.logoWidth}
                  height={sizes.logoHeight}
                  style={{ marginBottom: sizeClass === "small" ? 2 : 3 }}
                />
              )}
              <Text
                style={{
                  fontSize: sizes.fontSize,
                  textAlign: "center",
                  color: "#333",
                  textTransform: "capitalize",
                  fontFamily: isSelected ? AlmaraiFonts.bold : AlmaraiFonts.regular,
                }}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {brandName}
              </Text>
            </TouchableOpacity>
          )
        })}
      </View>
    </View>
  )
}

export default BrandSelection
