"use client"

import { useState, useMemo, useEffect } from "react"
import { View, ScrollView, Dimensions, TouchableOpacity, Text } from "react-native"
import BrandSelector from "../components/AdvancedSearch/BrandSelector"
import PopularCars from "../components/cars/PopularCars"
import FeaturedCars from "../components/cars/FeaturedCars"
import SliderBanner from "../components/Home/SliderBanner"
import FinancingPartners from "../components/Home/FinancingPartners"
import CarComparisonNew from "../components/Home/CarComparisonNew"
import carsData from "../mock-data"
import { useNavigation } from "@react-navigation/native"
import { useLocale } from "../contexts/LocaleContext"
import { useCompare } from "../contexts/CompareContext"
import CompareCarModal from "../components/cars/CompareCarModal"
import CompareResultModal from "../components/cars/CompareResultModal"
import CompareDetailsScreen from "./CompareDetailsScreen"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import AlmaraiFonts from "../constants/fonts"

export default function HomeScreen() {
  const navigation = useNavigation()
  const { direction, locale } = useLocale()
  const isRTL = direction === "rtl"
  const [screenWidth, setScreenWidth] = useState(Dimensions.get("window").width)
  const [screenHeight, setScreenHeight] = useState(Dimensions.get("window").height)
  const { carsToCompare, isSelectingSecondCar, cancelSelectingSecondCar, clearComparison } = useCompare()

  // Add state for the CompareDetailsScreen modal
  const [isCompareDetailsModalVisible, setCompareDetailsModalVisible] = useState(false)

  useEffect(() => {
    const dimensionsHandler = ({ window }) => {
      setScreenWidth(window.width)
      setScreenHeight(window.height)
    }

    const subscription = Dimensions.addEventListener("change", dimensionsHandler)

    return () => subscription.remove()
  }, [])

  const sizeClass = useMemo(() => {
    if (screenWidth < 360) return "small"
    if (screenWidth < 480) return "medium"
    return "large"
  }, [screenWidth])

  const sizes = useMemo(() => {
    switch (sizeClass) {
      case "small":
        return {
          sectionSpacing: "mt-2",
          containerPadding: "pb-24",
          brandMargin: 8,
          sectionMargin: "mt-2 mb-2",
          bottomSpacing: "mb-12",
        }
      case "medium":
        return {
          sectionSpacing: "mt-3",
          containerPadding: "pb-32",
          brandMargin: 10,
          sectionMargin: "mt-3 mb-3",
          bottomSpacing: "mb-12",
        }
      default: // large
        return {
          sectionSpacing: "mt-4",
          containerPadding: "pb-40",
          brandMargin: 12,
          sectionMargin: "mt-4 mb-4",
          bottomSpacing: "mb-16",
        }
    }
  }, [sizeClass])

  const [selectedBrand, setSelectedBrand] = useState(null)

  const featuredCars = useMemo(() => {
    const cars = selectedBrand ? carsData.filter((car) => car.brand === selectedBrand) : carsData
    return cars.slice(0, 6)
  }, [selectedBrand])

  const popularCars = useMemo(() => {
    const featuredIds = featuredCars.map((car) => car.id)
    return carsData.filter((car) => !featuredIds.includes(car.id)).slice(0, 6)
  }, [featuredCars])

  const handleBrandSelect = (brandKey) => {
    if (brandKey) {
      navigation.navigate("CarsTab", {
        screen: "AllCarsScreen",
        params: {
          selectedFilters: { brand: brandKey },
        },
      })
    }
  }

  return (
    <View className="flex-1 bg-white">
      {/* Selection Mode Indicator */}
      {isSelectingSecondCar && (
        <View className="absolute top-0 left-0 right-0 z-50 bg-[#46194F] py-2 px-4 flex-row justify-between items-center">
          <View className="flex-row items-center">
            <View className="bg-white rounded-full p-1 mr-2">
              <Icon name="check" size={16} color="black" />
            </View>
            <Text style={{ fontFamily: AlmaraiFonts.bold }} className="text-white">
              {locale === "ar" ? "اختر السيارة الثانية للمقارنة" : "Select second car to compare"}
            </Text>
          </View>
          <TouchableOpacity onPress={cancelSelectingSecondCar}>
            <Icon name="close" size={24} color="white" />
          </TouchableOpacity>
        </View>
      )}

      <View className="z-10 bg-white"></View>

      <ScrollView
        contentContainerStyle={{
          paddingBottom: Number.parseInt(sizes.containerPadding.replace("pb-", "")),
          paddingTop: isSelectingSecondCar ? 40 : 0, // Add padding when selection indicator is visible
        }}
        showsVerticalScrollIndicator={false}
        style={{ writingDirection: isRTL ? "rtl" : "ltr" }}
      >
        <SliderBanner />

        <View
          className={sizes.sectionSpacing}
          style={{
            marginLeft: isRTL ? 0 : sizes.brandMargin,
            marginRight: isRTL ? sizes.brandMargin : 0,
          }}
        >
          <BrandSelector
            selected={selectedBrand}
            setSelected={handleBrandSelect}
            showTitle={true}
            showIcon={true}
            showText={true}
            textClass={sizeClass === "small" ? "text-xs font-semibold" : "text-sm font-semibold"}
            isRTL={isRTL} // ✅ REQUIRED
            titlePadding={sizeClass === "small" ? "px-2" : "px-4"} // more spacious for homepage
          />
        </View>

        <View className={sizes.sectionSpacing}>
          <FeaturedCars
            cars={featuredCars}
            isRTL={isRTL}
            sizeClass={sizeClass} // Pass size class to child component
          />
        </View>

        <View className={sizes.sectionSpacing}>
          <CarComparisonNew
            isRTL={isRTL}
            sizeClass={sizeClass} // Pass size class to child component
          />
        </View>

        <View className={sizes.sectionSpacing}>
          <PopularCars
            cars={popularCars}
            isRTL={isRTL}
            sizeClass={sizeClass} // Pass size class to child component
          />
        </View>

        <View className={`${sizes.sectionSpacing} ${sizes.bottomSpacing}`}>
          <FinancingPartners
            isRTL={isRTL}
            sizeClass={sizeClass} // Pass size class to child component
          />
        </View>
      </ScrollView>

      {/* Add the comparison modals */}
      <CompareCarModal />
      <CompareResultModal
        onCompareNow={() => {
          // Make sure we're passing the cars to the CompareDetailsScreen
          setCompareDetailsModalVisible(true)
        }}
      />
      <CompareDetailsScreen
        visible={isCompareDetailsModalVisible}
        onClose={() => {
          setCompareDetailsModalVisible(false)
          // Clear the comparison when the details screen is closed
          clearComparison()
        }}
        cars={carsToCompare}
      />
    </View>
  )
}
