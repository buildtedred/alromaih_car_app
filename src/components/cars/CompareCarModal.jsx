"use client"

import { View, TouchableOpacity, Image, Dimensions } from "react-native"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { useLocale } from "../../contexts/LocaleContext"
import { useCompare } from "../../contexts/CompareContext"
import AppText from "../common/AppText"
import useBackHandler from "../../hooks/useBackHandler"
import CamPlusIcon from "../../assets/Icon/cam_plus_icon.svg"

export default function CompareCarModal() {
  const { locale, direction } = useLocale()
  const {
    isCompareModalVisible,
    closeCompareModal,
    selectedCarForComparison,
    clearComparison,
    startSelectingSecondCar,
  } = useCompare()
  const screenWidth = Dimensions.get("window").width
  const isRTL = direction === "rtl"

  useBackHandler(() => {
    if (isCompareModalVisible) {
      closeCompareModal()
      clearComparison()
      return true
    }
    return false
  }, [isCompareModalVisible])

  const handleSelectCarPress = () => {
    // Start selecting the second car directly on the current screen
    if (selectedCarForComparison) {
      startSelectingSecondCar(selectedCarForComparison)
    } else {
      closeCompareModal()
    }
  }

  if (!isCompareModalVisible) return null

  return (
    <View className="absolute bottom-0 left-0 right-0 items-center p-4 mb-24">
      <TouchableOpacity
        style={{ width: screenWidth * 0.85 }}
        className="h-[65px] rounded-[10px] bg-[#46194F] flex-row items-center px-4"
        onPress={handleSelectCarPress}
      >
        {isRTL ? (
          <>
            {selectedCarForComparison ? (
              <Image source={selectedCarForComparison.image} className="w-[65px] h-[45px]" resizeMode="contain" />
            ) : (
              <CamPlusIcon width={28} height={28} fill="white" />
            )}
            <Icon name="plus" size={20} color="white" style={{ marginLeft: 8, marginRight: 8 }} />
            <View className="w-[1px] h-[30px] bg-white mx-3" />
            <View className="flex-1 items-end">
              <AppText bold className="text-white text-[14px] text-right">
                {selectedCarForComparison ? "اختر سيارة أخرى للمقارنة" : "قم باختيار سيارة"}
              </AppText>
            </View>
          </>
        ) : (
          <>
            <View className="flex-1 items-start">
              <AppText bold className="text-white text-[14px] text-left">
                {selectedCarForComparison ? "Select another car to compare" : "Select a car"}
              </AppText>
            </View>
            <View className="w-[1px] h-[30px] bg-white mx-3" />
            <Icon name="plus" size={20} color="white" style={{ marginRight: 8 }} />
            {selectedCarForComparison ? (
              <Image source={selectedCarForComparison.image} className="w-[65px] h-[45px]" resizeMode="contain" />
            ) : (
              <CamPlusIcon width={28} height={28} fill="white" />
            )}
          </>
        )}
      </TouchableOpacity>
    </View>
  )
}
