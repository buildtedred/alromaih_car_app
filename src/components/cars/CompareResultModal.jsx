"use client"
import { View, TouchableOpacity, Image, Dimensions } from "react-native"
import { useLocale } from "../../contexts/LocaleContext"
import { useCompare } from "../../contexts/CompareContext"
import AppText from "../common/AppText"
import useBackHandler from "../../hooks/useBackHandler"
import CompareVsIcon from "../../assets/Icon/campar_vs.svg"

export default function CompareResultModal({ onCompareNow }) {
  const { locale } = useLocale()
  const { isResultModalVisible, closeResultModal, carsToCompare } = useCompare()
  const screenWidth = Dimensions.get("window").width

  const handleGoBack = () => {
    closeResultModal()
  }

  useBackHandler(handleGoBack, [handleGoBack])

  const handleComparePress = () => {
    // Just close the result modal without clearing the comparison
    // This ensures the cars remain selected when opening the details screen
    closeResultModal()

    // Call the onCompareNow callback to open the CompareDetailsScreen
    if (onCompareNow) {
      onCompareNow()
    }
  }

  if (carsToCompare.length !== 2 || !isResultModalVisible) return null

  return (
    <View className="absolute bottom-0 left-0 right-0 flex items-center p-4 mb-24">
      <TouchableOpacity
        style={{ width: screenWidth * 0.85 }}
        className="h-[65px] rounded-[10px] bg-[#46194F] flex-row items-center px-4"
        onPress={handleComparePress}
      >
        {/* Your exact design implementation remains unchanged */}
        {locale === "ar" ? (
          <>
            <View className="bg-white rounded-[5px] py-1 px-2">
              <AppText bold className="text-[#46194F] text-[10px]">
                ابدأ المقارنة الآن
              </AppText>
            </View>
            <View className="w-[1px] h-[30px] bg-white mx-3" />
            <View className="flex-1 flex-row justify-end items-center">
              <Image source={carsToCompare[0].image} className="w-[65px] h-[45px]" resizeMode="contain" />
              <View className="mx-1.5 bg-white rounded-full p-0.5 z-20">
                <CompareVsIcon width={20} height={20} />
              </View>
              <Image source={carsToCompare[1].image} className="w-[65px] h-[45px]" resizeMode="contain" />
            </View>
          </>
        ) : (
          <>
            <View className="flex-1 flex-row items-center">
              <Image source={carsToCompare[0].image} className="w-[65px] h-[45px]" resizeMode="contain" />
              <View className="mx-1.5 bg-white rounded-full p-0.5 z-20">
                <CompareVsIcon width={20} height={20} />
              </View>
              <Image source={carsToCompare[1].image} className="w-[65px] h-[45px]" resizeMode="contain" />
            </View>
            <View className="w-[1px] h-[30px] bg-white mx-3" />
            <View className="bg-white rounded-[5px] py-1 px-2">
              <AppText bold className="text-[#46194F] text-[10px]">
                Compare Now
              </AppText>
            </View>
          </>
        )}
      </TouchableOpacity>
    </View>
  )
}
