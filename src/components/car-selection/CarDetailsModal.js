"use client"

import { useState, useEffect, useMemo } from "react"
import { View, TouchableOpacity, Dimensions, Text, Image, ScrollView } from "react-native"
import Modal from "react-native-modal"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import AlmaraiFonts from "../../constants/fonts"
import RiyalIcon from "../../assets/Icon/riyal_icon.svg"
import JetourLogo from "../../assets/brands/jetour.svg"
import CheckBoxIcon from "../../assets/Icon/checkbox.svg"

const CarDetailsModal = ({
  isVisible,
  onClose,
  carData,
  locale,
  navigation,
  paymentType,
  sizeClass: propSizeClass,
}) => {
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
          modalHeight: screenHeight * 0.7,
          headerFontSize: 18,
          titleFontSize: 14,
          backButtonSize: 22,
          closeButtonSize: 18,
          closeButtonContainerSize: 28,
          stepLabelWidth: 50,
          stepLabelHeight: 22,
          stepLabelFontSize: 10,
          stepDotSize: 20,
          stepLineWidth: 40,
          cardTitleSize: 12, // Scaled down from medium
          cardSubtitleSize: 9, // Scaled down from medium
          logoWidth: 50, // Scaled down from medium
          logoHeight: 15, // Scaled down from medium
          priceLabelSize: 9, // Scaled down from medium
          priceValueSize: 11, // Scaled down from medium
          riyalIconSize: 14, // Scaled down from medium
          smallRiyalIconSize: 14, // Scaled down from medium
          carImageWidth: screenWidth * 0.55, // Scaled down from medium
          carImageHeight: 130, // Scaled down from medium
          buttonWidth: 90, // Scaled down from medium
          buttonFontSize: 11, // Scaled down from medium
          contentPadding: 3,
          sectionSpacing: 4,
        }
      case "medium":
        return {
          modalHeight: screenHeight * 0.75,
          headerFontSize: 20,
          titleFontSize: 16,
          backButtonSize: 24,
          closeButtonSize: 19,
          closeButtonContainerSize: 30,
          stepLabelWidth: 55,
          stepLabelHeight: 24,
          stepLabelFontSize: 11,
          stepDotSize: 22,
          stepLineWidth: 50,
          cardTitleSize: 14,
          cardSubtitleSize: 10,
          logoWidth: 60,
          logoHeight: 18,
          priceLabelSize: 10,
          priceValueSize: 12,
          riyalIconSize: 16,
          smallRiyalIconSize: 16,
          carImageWidth: screenWidth * 0.60,
          carImageHeight: 150,
          buttonWidth: 100,
          buttonFontSize: 12,
          contentPadding: 3.5,
          sectionSpacing: 5,
        }
      default: // large
        return {
          modalHeight: screenHeight * 0.75,
          headerFontSize: 22,
          titleFontSize: 18,
          backButtonSize: 26,
          closeButtonSize: 20,
          closeButtonContainerSize: 32,
          stepLabelWidth: 60,
          stepLabelHeight: 26,
          stepLabelFontSize: 12,
          stepDotSize: 24,
          stepLineWidth: 60,
          cardTitleSize: 16, // Scaled up from medium
          cardSubtitleSize: 12, // Scaled up from medium
          logoWidth: 70, // Scaled up from medium
          logoHeight: 21, // Scaled up from medium
          priceLabelSize: 12, // Scaled up from medium
          priceValueSize: 14, // Scaled up from medium
          riyalIconSize: 18, // Scaled up from medium
          smallRiyalIconSize: 18, // Scaled up from medium
          carImageWidth: screenWidth * 0.65, // Scaled up from medium
          carImageHeight: 170, // Scaled up from medium
          buttonWidth: 120, // Scaled up from medium
          buttonFontSize: 14, // Scaled up from medium
          contentPadding: 4,
          sectionSpacing: 6,
        }
    }
  }, [sizeClass, screenWidth, screenHeight])

  if (!carData) return null

  const handleViewDetails = () => {
    onClose()
    navigation.navigate("CarDetails", {
      carId: carData.id,
      brand: carData.brand,
      model: carData.model,
      year: carData.year,
      category: carData.category,
      price: carData.price,
      paymentType,
    })
  }

  const cashPrice =
    typeof carData.price === "number" ? carData.price : Number.parseInt(carData.price?.replace(/[^0-9]/g, "") || "0")

  const monthlyPayment = Math.round(cashPrice / 60).toLocaleString()

  const selectedValues = [
    carData.brand || "",
    carData.model || "",
    carData.category || "",
    carData.year || "",
    cashPrice.toLocaleString() || "",
  ]

  return (
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
        <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
          {/* Header */}
          <View className="flex-row items-center justify-between px-4 py-2">
            <TouchableOpacity onPress={onClose}>
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
              className="font-bold text-[#46194F] flex-1 ml-2"
              style={{
                fontSize: sizes.titleFontSize,
                fontFamily: AlmaraiFonts.bold,
              }}
            >
              {locale === "ar" ? "استكشف سيارتك" : "Explore Your Car"}
            </Text>

            <TouchableOpacity
              onPress={onClose}
              className=" rounded-md items-center justify-center"
              style={{
                width: sizes.closeButtonContainerSize,
                height: sizes.closeButtonContainerSize,
              }}
            >
              <FontAwesome name="times-circle-o" size={sizes.closeButtonSize} color="#46194F" />
            </TouchableOpacity>
          </View>

          {/* Selected Values and Step Indicators */}
          <View className="px-3 mt-2">
            <View className="flex-row justify-center gap-4 mb-2">
              {selectedValues.map((label, index) => (
                <View key={`label-${index}`} style={{ width: sizes.stepLabelWidth, alignItems: "center" }}>
                  {label ? (
                    <View
                      className="px-1 rounded-[5px] bg-[#46194F]"
                      style={{
                        width: "100%",
                        minHeight: sizes.stepLabelHeight,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        className="text-white text-center"
                        style={{
                          fontSize: sizes.stepLabelFontSize,
                          fontFamily: AlmaraiFonts.bold,
                        }}
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
              ))}
            </View>

            {/* Step Indicators with checkbox */}
            <View className="flex-row items-center justify-center mb-3">
              {[0, 1, 2, 3, 4].map((step, index, arr) => (
                <View key={`step-${step}`} className="flex-row items-center">
                  <View
                    className="items-center justify-center"
                    style={{ height: sizes.stepDotSize, width: sizes.stepDotSize }}
                  >
                    <CheckBoxIcon width={sizes.stepDotSize - 2} height={sizes.stepDotSize - 2} />
                  </View>
                  {step < arr.length - 1 && (
                    <View
                      className="h-0.5 bg-[#46194F]"
                      style={{ minWidth: sizes.stepLineWidth, maxWidth: sizes.stepLineWidth }}
                    />
                  )}
                </View>
              ))}
            </View>
          </View>

          {/* Car Details Content */}
          <View className="items-center w-full mt-1">
            <View className="flex-1 px-3 rounded-lg" style={{ maxWidth: screenWidth * 0.9 }}>
              {/* Detail Card */}
              <View className="border-2 rounded-[10px] mt-2 overflow-hidden border-[#46194F]">
                <View className="p-3 border-b border-[#46194F]">
                  <View className="flex-row items-center justify-between">
                    <View>
                      <Text
                        className="font-bold text-[#46194F]"
                        style={{
                          fontSize: sizes.cardTitleSize,
                          fontFamily: AlmaraiFonts.bold,
                        }}
                      >
                        {locale === "ar" ? `${carData.model} ${carData.brand}` : `${carData.brand} ${carData.model}`}
                      </Text>
                      <Text
                        className="text-gray-600"
                        style={{
                          fontSize: sizes.cardSubtitleSize,
                          fontFamily: AlmaraiFonts.regular,
                        }}
                      >
                        {locale === "ar" ? `الدفعي كامل ${carData.year}` : `Full payment ${carData.year}`}
                      </Text>
                    </View>
                    <View className="justify-center items-center">
                      <JetourLogo width={sizes.logoWidth} height={sizes.logoHeight} />
                    </View>
                  </View>
                </View>

                {/* Price Info */}
                <View className="flex-row border-b border-[#46194F]">
                  <View className="flex-1 p-3 items-center">
                    <Text
                      className="text-gray-600"
                      style={{
                        fontSize: sizes.priceLabelSize,
                        fontFamily: AlmaraiFonts.regular,
                      }}
                    >
                      {locale === "ar" ? "سعر الكاش" : "Cash price"}
                    </Text>
                    <View className="flex-row items-center mt-1">
                      <Text
                        className="font-bold text-[#46194F]"
                        style={{
                          fontSize: sizes.priceValueSize,
                          fontFamily: AlmaraiFonts.bold,
                        }}
                      >
                        {cashPrice.toLocaleString()}
                      </Text>
                      <View className="ml-1">
                        <RiyalIcon width={sizes.riyalIconSize} height={sizes.riyalIconSize} />
                      </View>
                    </View>
                  </View>

                  <View className="w-0.5 bg-[#46194F]" />

                  <View className="flex-1 p-3 items-center">
                    <Text
                      className="text-gray-600"
                      style={{
                        fontSize: sizes.priceLabelSize,
                        fontFamily: AlmaraiFonts.regular,
                      }}
                    >
                      {locale === "ar" ? "القسط من" : "Monthly from"}
                    </Text>
                    <View className="flex-row items-center mt-1">
                      <Text
                        className="font-bold text-[#46194F]"
                        style={{
                          fontSize: sizes.priceValueSize,
                          fontFamily: AlmaraiFonts.bold,
                        }}
                      >
                        {monthlyPayment}
                      </Text>
                      <View className="ml-1">
                        <RiyalIcon width={sizes.smallRiyalIconSize} height={sizes.smallRiyalIconSize} />
                      </View>
                    </View>
                  </View>
                </View>
              </View>

              {/* Car Image */}
              <View className="items-center justify-center mt-4 mb-2">
                <Image
                  source={carData.image || require("../../assets/images/car1.png")}
                  style={{
                    width: sizes.carImageWidth,
                    height: sizes.carImageHeight,
                  }}
                  resizeMode="contain"
                />
              </View>

              {/* View Details Button */}
              <TouchableOpacity
                className="bg-[#46194F] rounded-[10px] py-3 px-6 items-center mx-auto"
                style={{ minWidth: sizes.buttonWidth }}
                onPress={handleViewDetails}
              >
                <Text
                  className="text-white font-bold"
                  style={{
                    fontSize: sizes.buttonFontSize,
                    fontFamily: AlmaraiFonts.bold,
                  }}
                >
                  {locale === "ar" ? "تفاصيل السيارة" : "Car Details"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </Modal>
  )
}

export default CarDetailsModal
