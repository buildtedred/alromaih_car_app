"use client"

import { useState, useEffect, useMemo } from "react"
import { View, ScrollView, TouchableOpacity, ActivityIndicator, Dimensions, Text } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useTranslation } from "react-i18next"
import { useLocale } from "../contexts/LocaleContext"

import CarSelectionModal from "../components/car-selection/CarSelectionModal"
import CashFlowModal from "../components/cashflow/CashFlowModal"

import CashIcon from "../assets/icons/cash.svg"
import FinanceIcon from "../assets/icons/finance.svg"
import CarDiscoverSvg from "../assets/images/cardescover.svg"
import AlmaraiFonts from "../constants/fonts"

export default function CarDiscoverScreen() {
  const { t } = useTranslation()
  const navigation = useNavigation()
  const { locale, direction } = useLocale()
  const isRTL = direction === "rtl"

  const [loading, setLoading] = useState(true)
  const [isFinanceModalVisible, setFinanceModalVisible] = useState(false)
  const [isCashModalVisible, setCashModalVisible] = useState(false)
  const [activeButton, setActiveButton] = useState(null)
  const [screenWidth, setScreenWidth] = useState(Dimensions.get("window").width)

  // Debug logging
  useEffect(() => {
    console.log("Finance Modal Visible:", isFinanceModalVisible)
  }, [isFinanceModalVisible])

  useEffect(() => {
    console.log("Cash Modal Visible:", isCashModalVisible)
  }, [isCashModalVisible])

  // Listen for dimension changes
  useEffect(() => {
    const dimensionsHandler = ({ window }) => {
      setScreenWidth(window.width)
    }

    const subscription = Dimensions.addEventListener("change", dimensionsHandler)

    return () => subscription.remove()
  }, [])

  // Determine size class based on screen width
  const sizeClass = useMemo(() => {
    if (screenWidth < 360) return "small"
    if (screenWidth < 480) return "medium"
    return "large"
  }, [screenWidth])

  // Get responsive values based on size class
  const sizes = useMemo(() => {
    switch (sizeClass) {
      case "small":
        return {
          svgSize: screenWidth * 0.5, // Further reduced from 0.65
          titleSize: 16, // Reduced from 18
          subtitleSize: 14, // Reduced from 15
          descriptionSize: 12, // Reduced from 13
          buttonTextSize: 14, // Reduced from 16
          iconSize: 20, // Reduced to match smaller container
          buttonMinWidth: 130, // Adjusted for better fit
          buttonGap: 0.5,
        }
      case "medium":
        return {
          svgSize: screenWidth * 0.7, // Further reduced from 0.7
          titleSize: 18,
          subtitleSize: 14,
          descriptionSize: 12,
          buttonTextSize: 12,
          iconSize: 18, // Reduced to match smaller container
          buttonMinWidth: 120, // Adjusted for better fit
          buttonGap: 0.5,
        }
      default: // large
        return {
          svgSize: screenWidth * 0.6, // Further reduced from 0.75
          titleSize: 18, // Reduced from 22
          subtitleSize: 16, // Reduced from 17
          descriptionSize: 14, // Reduced from 15
          buttonTextSize: 16, // Reduced from 18
          iconSize: 22, // Reduced to match smaller container
          buttonMinWidth: 140, // Adjusted for better fit
          buttonGap: 1,
        }
    }
  }, [sizeClass, screenWidth])

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const closeFinanceModal = () => {
    console.log("Closing finance modal")
    setFinanceModalVisible(false)
  }

  const closeCashModal = () => {
    console.log("Closing cash modal")
    setCashModalVisible(false)
  }

  if (loading) {
    return (
      <View className="flex-1 bg-white">
   
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#46194F" />
        </View>
      </View>
    )
  }

  return (
    <View className="flex-1 bg-white">


      <ScrollView
        showsVerticalScrollIndicator={false}
        className="pb-5"
        style={{ writingDirection: isRTL ? "rtl" : "ltr" }}
      >
        <View
          className={`items-center justify-center ${sizeClass === "small" ? "mt-3 mb-1" : sizeClass === "medium" ? "mt-4 mb-2" : "mt-5 mb-3"}`}
        >
          <CarDiscoverSvg width={sizes.svgSize} height={sizes.svgSize} />
        </View>

        <View className="px-4 mt-1 mb-1">
          <Text
            className="text-[#46194F] text-center w-full"
            style={{
              fontSize: sizes.titleSize,
              lineHeight: sizes.titleSize * 1.3,
              fontFamily: AlmaraiFonts.bold,
              marginBottom: sizeClass === "small" ? 1 : 2,
              textAlign: isRTL ? "center" : "center",
            }}
          >
            {locale === "ar" ? "اعثر على سيارتك المثالية\nبخطوات بسيطة" : "Find your ideal car\nin simple steps"}
          </Text>

          <View className="mt-1">
            <Text
              className="text-[#46194F] text-center"
              style={{
                fontSize: sizes.subtitleSize,
                fontFamily: AlmaraiFonts.bold,
                marginBottom: sizeClass === "small" ? 0.5 : 1,
                textAlign: isRTL ? "center" : "center",
              }}
            >
              {locale === "ar" ? "اختر طريقة الدفع" : "Choose Payment Method"}
            </Text>

            <Text
              className="text-[#46194F] text-center self-center"
              style={{
                fontSize: sizes.descriptionSize,
                lineHeight: sizes.descriptionSize * 1.3,
                fontFamily: AlmaraiFonts.regular,
                marginBottom: sizeClass === "small" ? 2 : 3,
                width: "80%",
                textAlign: isRTL ? "center" : "center",
              }}
            >
              {locale === "ar"
                ? "اختر الطريقة التي تناسبك لامتلاك سيارتك الجديدة التمويل المرن أو الدفع النقدي المباشر"
                : "Choose the method that suits you to own your new car, either through flexible financing or direct cash payment"}
            </Text>

            <View className="flex-row justify-center mt-1">
              <TouchableOpacity
                className={`rounded-lg py-1.5 px-2 bg-white shadow-md ${
                  activeButton === "cash" ? "border-2 border-[#46194F]" : "border border-gray-200"
                }`}
                style={{
                  minWidth: sizes.buttonMinWidth,
                  marginHorizontal: sizes.buttonGap * 2,
                }}
                onPress={() => {
                  console.log("Cash button pressed")
                  setActiveButton("cash")
                  setCashModalVisible(true) // Open cash modal
                }}
              >
                <View className={`flex-row items-center ${isRTL ? "justify-end" : "justify-start"} gap-1.5`}>
                  <Text
                    className="text-[#46194F] font-bold"
                    style={{
                      fontSize: sizes.buttonTextSize,
                      fontFamily: AlmaraiFonts.bold,
                    }}
                  >
                    {locale === "ar" ? "كاش" : "Cash"}
                  </Text>
                  <View className="bg-white w-5 h-5 rounded-md justify-center items-center">
                    <CashIcon width={sizes.iconSize} height={sizes.iconSize} />
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                className={`rounded-lg py-1.5 px-2 bg-white shadow-md ${
                  activeButton === "finance" ? "border-2 border-[#46194F]" : "border border-gray-200"
                }`}
                style={{
                  minWidth: sizes.buttonMinWidth,
                  marginHorizontal: sizes.buttonGap * 2,
                }}
                onPress={() => {
                  console.log("Finance button pressed")
                  setActiveButton("finance")
                  setFinanceModalVisible(true) // Open finance modal
                }}
              >
                <View className={`flex-row items-center ${isRTL ? "justify-end" : "justify-start"} gap-1.5`}>
                  <Text
                    className="text-[#46194F] font-bold"
                    style={{
                      fontSize: sizes.buttonTextSize,
                      fontFamily: AlmaraiFonts.bold,
                    }}
                  >
                    {locale === "ar" ? "تمويل" : "Finance"}
                  </Text>
                  <View className="bg-[#46194F] w-5 h-5 rounded-md justify-center items-center">
                    <FinanceIcon width={sizes.iconSize} height={sizes.iconSize} fill="#FFFFFF" />
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Finance flow modal */}
      <CarSelectionModal
        isVisible={isFinanceModalVisible}
        onClose={closeFinanceModal}
        paymentType="finance"
        locale={locale}
        navigation={navigation}
        sizeClass={sizeClass}
      />

      {/* Cash flow modal */}
      <CashFlowModal
        isVisible={isCashModalVisible}
        onClose={closeCashModal}
        locale={locale}
        navigation={navigation}
        sizeClass={sizeClass}
      />
    </View>
  )
}
