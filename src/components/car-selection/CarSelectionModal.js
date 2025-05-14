"use client"

import { useState, useEffect, useRef, useMemo } from "react"
import { View, TouchableOpacity, Dimensions, ScrollView, Text } from "react-native"
import Modal from "react-native-modal"
import FontAwesome from "react-native-vector-icons/FontAwesome"

import BrandSelection from "./BrandSelection"
import ModelSelection from "./ModelSelection"
import CategorySelection from "./CategorySelection"
import YearSelection from "./YearSelection"
import PriceSelection from "./PriceSelection"
import CarDetailsModal from "./CarDetailsModal"

import { carDataService } from "../../services/carDataService"
import AlmaraiFonts from "../../constants/fonts"
import CheckBoxIcon from "../../assets/Icon/checkbox.svg"

export default function CarSelectionModal({
  isVisible,
  onClose,
  paymentType = "cash",
  locale,
  navigation,
  sizeClass: propSizeClass,
}) {
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedBrand, setSelectedBrand] = useState(null)
  const [selectedModel, setSelectedModel] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedYear, setSelectedYear] = useState(null)
  const [selectedPrice, setSelectedPrice] = useState(null)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [showCarDetails, setShowCarDetails] = useState(false)
  const [selectedCar, setSelectedCar] = useState(null)
  const isMounted = useRef(false)
  const [screenWidth, setScreenWidth] = useState(Dimensions.get("window").width)
  const [screenHeight, setScreenHeight] = useState(Dimensions.get("window").height)

  // Listen for dimension changes
  useEffect(() => {
    const dimensionsHandler = ({ window }) => {
      setScreenWidth(window.width)
      setScreenHeight(window.height)
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
          modalHeight: screenHeight * 0.7, // Reduced from 0.75
          headerHeight: 50, // Reduced from 60
          footerHeight: 50, // Reduced from 60
          stepIndicatorHeight: 60, // Reduced from 80
          titleHeight: 25, // Reduced from 30
          headerFontSize: 18, // Reduced from 24
          titleFontSize: 14, // Reduced from 16
          backButtonSize: 24, // Reduced from 30
          closeButtonSize: 24, // Reduced from 30
          stepDotSize: 20, // Reduced from 28
          stepLineWidth: 40, // Reduced from 60
          stepNumberSize: 10, // Reduced from 12
          stepLabelWidth: 60, // Reduced from 70
          stepLabelHeight: 22, // Reduced from 26
          stepLabelFontSize: 10, // Reduced from 12
          contentPadding: 6, // Reduced from 8
        }
      case "medium":
        return {
          modalHeight: screenHeight * 0.75, // Reduced from 0.75
          headerHeight: 55, // Reduced from 60
          footerHeight: 55, // Reduced from 60
          stepIndicatorHeight: 70, // Reduced from 80
          titleHeight: 28, // Reduced from 30
          headerFontSize: 20, // Reduced from 24
          titleFontSize: 15, // Reduced from 16
          backButtonSize: 26, // Reduced from 30
          closeButtonSize: 26, // Reduced from 30
          stepDotSize: 24, // Reduced from 28
          stepLineWidth: 50, // Reduced from 60
          stepNumberSize: 11, // Reduced from 12
          stepLabelWidth: 65, // Reduced from 70
          stepLabelHeight: 24, // Reduced from 26
          stepLabelFontSize: 11, // Reduced from 12
          contentPadding: 7, // Reduced from 8
        }
      default: // large
        return {
          modalHeight: screenHeight * 0.75,
          headerHeight: 60,
          footerHeight: 60,
          stepIndicatorHeight: 80,
          titleHeight: 30,
          headerFontSize: 22,
          titleFontSize: 16,
          backButtonSize: 28,
          closeButtonSize: 28,
          stepDotSize: 26,
          stepLineWidth: 60,
          stepNumberSize: 12,
          stepLabelWidth: 70,
          stepLabelHeight: 26,
          stepLabelFontSize: 12,
          contentPadding: 8,
        }
    }
  }, [sizeClass, screenHeight, screenWidth])

  useEffect(() => {
    isMounted.current = true
    return () => {
      isMounted.current = false
    }
  }, [])

  useEffect(() => {
    if (isVisible && isMounted.current) {
      setCurrentStep(0)
      setSelectedBrand(null)
      setSelectedModel(null)
      setSelectedCategory(null)
      setSelectedYear(null)
      setSelectedPrice(null)
      setSelectedCar(null)
      setShowCarDetails(false)
      setIsTransitioning(false)
    }
  }, [isVisible])

  const safeStateUpdate = (updater, callback) => {
    if (!isMounted.current || isTransitioning) return
    setIsTransitioning(true)
    updater()
    setTimeout(() => {
      if (isMounted.current) {
        setIsTransitioning(false)
        if (callback) callback()
      }
    }, 50)
  }

  const nextStep = () => {
    safeStateUpdate(() => setCurrentStep((prev) => Math.min(prev + 1, 4)), null)
  }

  const prevStep = () => {
    if (currentStep > 0) {
      safeStateUpdate(() => setCurrentStep((prev) => prev - 1), null)
    } else {
      onClose()
    }
  }

  const handleBrandSelect = (brand) => {
    safeStateUpdate(() => {
      setSelectedBrand(brand)
      setSelectedModel(null)
    }, nextStep)
  }

  const handleModelSelect = (model) => {
    safeStateUpdate(() => setSelectedModel(model), nextStep)
  }

  const handleCategorySelect = (category) => {
    safeStateUpdate(() => setSelectedCategory(category), nextStep)
  }

  const handleYearSelect = (year) => {
    safeStateUpdate(() => setSelectedYear(year), nextStep)
  }

  const handlePriceSelect = (price) => {
    setSelectedPrice(price)
  }

  const handleFinish = () => {
    const fallbackCar = {
      id: "fallback-1",
      brand: selectedBrand?.name || "Brand",
      model: selectedModel?.name || "Model",
      year: selectedYear || "2023",
      category: selectedCategory?.name || "Category",
      price: 100000,
      image: null,
    }

    let carData = fallbackCar

    try {
      const filteredCars = carDataService.filterCars({
        brand: selectedBrand?.key,
        model: selectedModel?.key,
        bodyType: selectedCategory?.key,
        year: selectedYear,
        priceRange: selectedPrice,
      })

      if (filteredCars && filteredCars.length > 0) {
        const car = filteredCars[0]
        carData = {
          id: car.id,
          brand: selectedBrand?.name || "Brand",
          model: selectedModel?.name || "Model",
          year: selectedYear || "2023",
          category: selectedCategory?.name || "Category",
          price: car.cashPrice || 100000,
          image: car.image || null,
        }
      }
    } catch (error) {
      console.error("Error filtering cars:", error)
    }

    setSelectedCar(carData)
    onClose()
    setShowCarDetails(true)
  }

  const closeCarDetails = () => {
    setShowCarDetails(false)
  }

  const stepTitles = [
    locale === "ar" ? "اختر العلامة التجارية" : "Choose the brand",
    locale === "ar" ? "اختر الموديل" : "Choose the model",
    locale === "ar" ? "اختر الفئة" : "Choose the category",
    locale === "ar" ? "اختر السنة" : "Choose the year",
    locale === "ar" ? "اختر السعر" : "Choose the price",
  ]

  const renderStepContent = () => {
    if (isTransitioning) return null
    switch (currentStep) {
      case 0:
        return (
          <BrandSelection
            selectedBrand={selectedBrand}
            onSelectBrand={handleBrandSelect}
            locale={locale}
            sizeClass={sizeClass}
          />
        )
      case 1:
        return (
          <ModelSelection
            selectedBrand={selectedBrand}
            selectedModel={selectedModel}
            onSelectModel={handleModelSelect}
            locale={locale}
            sizeClass={sizeClass}
          />
        )
      case 2:
        return (
          <CategorySelection
            selectedCategory={selectedCategory}
            onSelectCategory={handleCategorySelect}
            locale={locale}
            sizeClass={sizeClass}
          />
        )
      case 3:
        return (
          <YearSelection
            selectedYear={selectedYear}
            onSelectYear={handleYearSelect}
            locale={locale}
            sizeClass={sizeClass}
          />
        )
      case 4:
        return (
          <PriceSelection
            selectedPrice={selectedPrice}
            onSelectPrice={handlePriceSelect}
            selectedBrand={selectedBrand}
            selectedModel={selectedModel}
            selectedCategory={selectedCategory}
            selectedYear={selectedYear}
            onFinish={handleFinish}
            locale={locale}
            sizeClass={sizeClass}
          />
        )
      default:
        return null
    }
  }

  const getStepLabel = (step) => {
    switch (step) {
      case 0:
        return selectedBrand?.name || ""
      case 1:
        return selectedModel?.name || ""
      case 2:
        return selectedCategory?.name || ""
      case 3:
        return selectedYear || ""
      case 4:
        return selectedPrice?.label || ""
      default:
        return ""
    }
  }

  const CONTENT_HEIGHT =
    sizes.modalHeight - sizes.headerHeight - sizes.footerHeight - sizes.stepIndicatorHeight - sizes.titleHeight

  return (
    <>
      <Modal
        isVisible={isVisible}
        backdropOpacity={0}
        style={{ margin: 0, justifyContent: "center", alignItems: "center" }}
        animationIn="fadeIn"
        animationOut="fadeOut"
        useNativeDriver
        hideModalContentWhileAnimating
        onBackdropPress={onClose}
      >
        <View className="w-full bg-white rounded-t-2xl" style={{ height: sizes.modalHeight }}>
          {/* Header */}
          <View className="flex-row items-center justify-between px-4 py-2" style={{ height: sizes.headerHeight }}>
            <TouchableOpacity onPress={prevStep}>
              <Text
                className="font-bold text-[#46194F]"
                style={{
                  fontSize: sizes.backButtonSize,
                  transform: [{ scaleX: locale === "ar" ? -1 : 1 }],
                  fontFamily: AlmaraiFonts.bold,
                }}
              >
                {locale === "ar" ? ">" : "<"}
              </Text>
            </TouchableOpacity>

            <Text
              className="font-bold text-[#46194F] flex-1 mx-2"
              style={{ fontSize: sizes.headerFontSize, fontFamily: AlmaraiFonts.bold }}
            >
              {locale === "ar" ? "استكشف سيارتك" : "Explore Your Car"}
            </Text>

            <TouchableOpacity
              onPress={onClose}
              className="items-center justify-center"
              style={{ width: sizes.closeButtonSize, height: sizes.closeButtonSize }}
            >
              <FontAwesome name="times-circle-o" size={sizes.closeButtonSize} color="#46194F" />
            </TouchableOpacity>
          </View>

          {/* Step Labels & Progress */}
          <View className="px-6 mt-1" style={{ height: sizes.stepIndicatorHeight }}>
            <View className="flex-row justify-center pl-16 gap-2 mb-1">
              {[0, 1, 2, 3, 4].map((step) => {
                const label = getStepLabel(step)
                return (
                  <View key={`label-${step}`} style={{ width: sizes.stepLabelWidth, alignItems: "center" }}>
                    {step < currentStep && label ? (
                      <View
                        className="rounded-[5px] bg-[#46194F]"
                        style={{
                          width: "100%",
                          minHeight: sizes.stepLabelHeight,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Text
                          className="text-white text-center"
                          style={{ fontSize: sizes.stepLabelFontSize, fontFamily: AlmaraiFonts.bold }}
                          numberOfLines={1}
                          ellipsizeMode="tail"
                        >
                          {label}
                        </Text>
                      </View>
                    ) : (
                      <View style={{ height: sizes.stepLabelHeight }} />
                    )}
                  </View>
                )
              })}
            </View>

            {/* Step Indicators */}
            <View className="flex-row items-center justify-center">
              {[0, 1, 2, 3, 4].map((step, index, arr) => (
                <View key={`step-${step}`} className="flex-row items-center">
                  {/* Dot */}
                  <View
                    className="items-center justify-center"
                    style={{ height: sizes.stepDotSize, width: sizes.stepDotSize }}
                  >
                    {currentStep > step ? (
                      <CheckBoxIcon width={sizes.stepDotSize - 2} height={sizes.stepDotSize - 2} />
                    ) : (
                      <View
                        className="bg-[#D8C4E1] rounded-[5px] items-center justify-center"
                        style={{ height: sizes.stepDotSize, width: sizes.stepDotSize }}
                      >
                        <Text
                          className="text-white font-bold"
                          style={{ fontSize: sizes.stepNumberSize, fontFamily: AlmaraiFonts.bold }}
                        >
                          {step + 1}
                        </Text>
                      </View>
                    )}
                  </View>

                  {/* Line (not after the last step) */}
                  {step < arr.length - 1 && (
                    <View
                      className={`h-0.5 ${currentStep > step ? "bg-[#46194F]" : "bg-[#D8C4E1]"}`}
                      style={{ minWidth: sizes.stepLineWidth, maxWidth: sizes.stepLineWidth }}
                    />
                  )}
                </View>
              ))}
            </View>
          </View>

          {/* Title */}
          <View className="px-4 mt-1 mb-1" style={{ height: sizes.titleHeight }}>
            <Text
              className="font-bold text-[#46194F]"
              style={{
                fontSize: sizes.titleFontSize,
                textAlign: locale === "ar" ? "right" : "left",
                fontFamily: AlmaraiFonts.bold,
              }}
            >
              {stepTitles[currentStep]}
            </Text>
          </View>

          {/* Content */}
          <ScrollView
            style={{ height: CONTENT_HEIGHT }}
            contentContainerStyle={{ paddingHorizontal: sizes.contentPadding, paddingBottom: 12 }}
            showsVerticalScrollIndicator={false}
          >
            {renderStepContent()}
          </ScrollView>
        </View>
      </Modal>

      {/* Car Details Modal */}
      <CarDetailsModal
        isVisible={showCarDetails}
        onClose={closeCarDetails}
        carData={selectedCar}
        locale={locale}
        navigation={navigation}
        paymentType={paymentType}
        sizeClass={sizeClass}
      />
    </>
  )
}