"use client"
import { View, TouchableOpacity, Image } from "react-native"
import Modal from "react-native-modal"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { useNavigation } from "@react-navigation/native"
import { useLocale } from "../../contexts/LocaleContext"
import { useCompare } from "../../contexts/CompareContext"
import AppText from "../common/AppText"
import useBackHandler from "../../hooks/useBackHandler"

export default function CompareResultModal() {
  const { locale } = useLocale()
  const navigation = useNavigation()
  const { isCompareResultModalVisible, closeCompareResultModal, carsToCompare, clearComparison } = useCompare()

  // Use our custom back handler hook
  useBackHandler(() => {
    if (isCompareResultModalVisible) {
      closeCompareResultModal()
      return true // Prevent default behavior
    }
    return false // Let default behavior happen
  }, [isCompareResultModalVisible, closeCompareResultModal])

  if (carsToCompare.length !== 2) return null

  const handleComparePress = () => {
    // First close the modal
    closeCompareResultModal()

    // Then navigate with a slight delay to ensure the modal is closed
    setTimeout(() => {
      try {
        navigation.navigate("CompareDetails", { cars: carsToCompare })
      } catch (error) {
        console.error("Navigation error:", error)
        // Fallback - clear comparison if navigation fails
        clearComparison()
      }
    }, 300)
  }

  return (
    <Modal
      isVisible={isCompareResultModalVisible}
      onBackdropPress={closeCompareResultModal}
      onBackButtonPress={closeCompareResultModal}
      backdropOpacity={0.5}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      style={{ margin: 0, justifyContent: "flex-end" }}
    >
      <View className="bg-white rounded-t-[20px] py-5 px-4 max-h-[80%]">
        {/* Header */}
        <View className="flex-row justify-between items-center mb-5">
          <AppText bold className="text-[18px] text-[#46194F]">
            {locale === "ar" ? "مقارنة السيارات" : "Compare Cars"}
          </AppText>
          <TouchableOpacity onPress={closeCompareResultModal}>
            <Icon name="close" size={24} color="#46194F" />
          </TouchableOpacity>
        </View>

        {/* Cars Container */}
        <View className="flex-row justify-between mb-5">
          {/* First Car */}
          <View className="w-[48%] aspect-square border border-[#E5E7EB] rounded-[10px] p-2.5 justify-center items-center">
            <Image source={carsToCompare[0].image} className="w-[80%] h-[70%]" resizeMode="contain" />
            <AppText className="mt-2.5 text-[14px] text-[#46194F] text-center" numberOfLines={1}>
              {typeof carsToCompare[0].name === "object" ? carsToCompare[0].name[locale] : carsToCompare[0].name}
            </AppText>
          </View>

          {/* Second Car */}
          <View className="w-[48%] aspect-square border border-[#E5E7EB] rounded-[10px] p-2.5 justify-center items-center">
            <Image source={carsToCompare[1].image} className="w-[80%] h-[70%]" resizeMode="contain" />
            <AppText className="mt-2.5 text-[14px] text-[#46194F] text-center" numberOfLines={1}>
              {typeof carsToCompare[1].name === "object" ? carsToCompare[1].name[locale] : carsToCompare[1].name}
            </AppText>
          </View>
        </View>

        {/* Compare Button */}
        <TouchableOpacity
          className="w-full h-[50px] rounded-[10px] bg-[#46194F] justify-center items-center"
          onPress={handleComparePress}
        >
          <AppText bold className="text-white text-[16px]">
            {locale === "ar" ? "قارن الآن" : "Compare Now"}
          </AppText>
        </TouchableOpacity>
      </View>
    </Modal>
  )
}
