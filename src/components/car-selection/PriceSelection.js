"use client"

import { useState, useEffect, useMemo } from "react"
import { View, TouchableOpacity, Image, Text, Dimensions } from "react-native"
import { carDataService } from "../../services/carDataService"
import AlmaraiFonts from "../../constants/fonts"

import Bank1 from "../../assets/banks/bank1.svg"
import Bank2 from "../../assets/banks/bank2.svg"
import Bank3 from "../../assets/banks/bank3.svg"
import Bank4 from "../../assets/banks/bank4.svg"
import Bank5 from "../../assets/banks/bank5.svg"
import Bank6 from "../../assets/banks/bank6.svg"
import Bank7 from "../../assets/banks/bank7.svg"
import Bank8 from "../../assets/banks/bank8.svg"

const bankLogos = {
  1: Bank1,
  2: Bank2,
  3: Bank3,
  4: Bank4,
  5: Bank5,
  6: Bank6,
  7: Bank7,
  8: Bank8,
}

const PriceSelection = ({
  selectedPrice,
  onSelectPrice,
  selectedBrand,
  selectedModel,
  selectedCategory,
  selectedYear,
  onFinish,
  locale,
  sizeClass: propSizeClass,
}) => {
  const [priceRanges, setPriceRanges] = useState([])
  const [matchingCars, setMatchingCars] = useState([])
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
          logoWidth: 40,
          logoHeight: 24,
          itemWidth: "30%", // Slightly wider on small screens
          itemHeight: 55,
          itemMargin: 1.5,
          itemPadding: 1.5,
          carImageWidth: 160,
          carImageHeight: 100,
          carTitleSize: 14,
          carSubtitleSize: 12,
          carPriceSize: 14,
          buttonFontSize: 12,
          buttonPadding: "py-2 px-5",
        }
      case "medium":
        return {
          fontSize: 12,
          logoWidth: 45,
          logoHeight: 27,
          itemWidth: "28%",
          itemHeight: 60,
          itemMargin: 1.5,
          itemPadding: 2,
          carImageWidth: 180,
          carImageHeight: 110,
          carTitleSize: 15,
          carSubtitleSize: 13,
          carPriceSize: 15,
          buttonFontSize: 13,
          buttonPadding: "py-2 px-5",
        }
      default: // large
        return {
          fontSize: 13,
          logoWidth: 50,
          logoHeight: 30,
          itemWidth: "28%",
          itemHeight: 65,
          itemMargin: 2,
          itemPadding: 2,
          carImageWidth: 200,
          carImageHeight: 120,
          carTitleSize: 16,
          carSubtitleSize: 14,
          carPriceSize: 16,
          buttonFontSize: 14,
          buttonPadding: "py-2.5 px-6",
        }
    }
  }, [sizeClass])

  useEffect(() => {
    setPriceRanges(carDataService.getPriceRanges(locale))

    if (selectedBrand && selectedModel && selectedCategory && selectedYear) {
      try {
        const filteredCars = carDataService.filterCars({
          brand: selectedBrand.key,
          model: selectedModel.key,
          bodyType: selectedCategory.key,
          year: selectedYear,
        })
        setMatchingCars(filteredCars || [])
      } catch (error) {
        console.error("Error filtering cars:", error)
        setMatchingCars([])
      }
    }
  }, [selectedBrand, selectedModel, selectedCategory, selectedYear, locale])

  const getSelectedCar = () => {
    if (!selectedPrice || matchingCars.length === 0) return null
    return matchingCars[0]
  }

  const selectedCar = getSelectedCar()

  const handlePriceAndFinish = (price) => {
    onSelectPrice(price)
    if (onFinish) onFinish()
  }

  return (
    <View className="flex-1">
      <View className="flex-row flex-wrap justify-start px-2 mb-3">
        {priceRanges.map((price) => {
          const isSelected = selectedPrice?.id === price.id
          const BankLogo = bankLogos[price.id]

          return (
            <TouchableOpacity
              key={String(price.id)}
              className={`rounded-[10px] ${isSelected ? "border-2 border-[#46194F]" : "border border-gray-200"}`}
              style={{
                width: sizes.itemWidth,
                height: sizes.itemHeight,
                margin: sizes.itemMargin * 4,
                padding: sizes.itemPadding * 4,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => handlePriceAndFinish(price)}
            >
              {BankLogo ? (
                <BankLogo width={sizes.logoWidth} height={sizes.logoHeight} />
              ) : (
                <Text
                  style={{
                    fontSize: sizes.fontSize,
                    textAlign: "center",
                    color: "#333",
                    fontFamily: isSelected ? AlmaraiFonts.bold : AlmaraiFonts.regular,
                  }}
                  numberOfLines={2}
                  ellipsizeMode="tail"
                >
                  {price.label || ""}
                </Text>
              )}
            </TouchableOpacity>
          )
        })}
      </View>

      {selectedPrice && selectedCar && (
        <View className="items-center mt-3">
          <Image
            source={selectedCar.image}
            style={{
              width: sizes.carImageWidth,
              height: sizes.carImageHeight,
              resizeMode: "contain",
            }}
          />
          <Text
            style={{
              fontSize: sizes.carTitleSize,
              marginTop: sizeClass === "small" ? 6 : 8,
              color: "#46194F",
              fontFamily: AlmaraiFonts.bold,
              textAlign: "center",
            }}
          >
            {selectedCar.name?.[locale] || ""}
          </Text>
          <Text
            style={{
              fontSize: sizes.carSubtitleSize,
              color: "#666",
              fontFamily: AlmaraiFonts.regular,
              textAlign: "center",
            }}
          >
            {String(selectedCar.specs?.year)} • {selectedCar.specs?.seats?.[locale] || ""}
          </Text>
          <Text
            style={{
              fontSize: sizes.carPriceSize,
              marginTop: sizeClass === "small" ? 3 : 4,
              color: "#46194F",
              fontFamily: AlmaraiFonts.bold,
              textAlign: "center",
            }}
          >
            {selectedCar.cashPrice?.toLocaleString() || "0"} SAR
          </Text>

          <TouchableOpacity
            className={`bg-[#46194F] rounded-lg items-center mt-4 ${
              sizeClass === "small" ? "py-2 px-5" : sizeClass === "medium" ? "py-2 px-5" : "py-2.5 px-6"
            }`}
            onPress={onFinish}
          >
            <Text
              style={{
                color: "#FFFFFF",
                fontSize: sizes.buttonFontSize,
                fontFamily: AlmaraiFonts.bold,
              }}
            >
              {locale === "ar" ? "اختيار السيارة" : "Select Car"}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  )
}

export default PriceSelection
