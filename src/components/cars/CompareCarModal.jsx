"use client"
import { View, TouchableOpacity, Image } from "react-native"
import Modal from "react-native-modal"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { useNavigation } from "@react-navigation/native"
import { useLocale } from "../../contexts/LocaleContext"
import { useCompare } from "../../contexts/CompareContext"
import AppText from "../common/AppText"
import useBackHandler from "../../hooks/useBackHandler"

export default function CompareCarModal() {
  const { locale } = useLocale()
  const navigation = useNavigation()
  const { isCompareModalVisible, closeCompareModal, selectedCarForComparison } = useCompare()

  // Use our custom back handler hook
  useBackHandler(() => {
    if (isCompareModalVisible) {
      closeCompareModal()
      return true // Prevent default behavior
    }
    return false // Let default behavior happen
  }, [isCompareModalVisible, closeCompareModal])

  const handleAddCarPress = () => {
    // Close the modal first
    closeCompareModal()

    // Use setTimeout to ensure the modal is closed before navigation
    setTimeout(() => {
      try {
        // Navigate to AllCarsScreen with minimal parameters
        navigation.navigate("AllCarsScreen", { selectingForComparison: true })
      } catch (error) {
        console.error("Navigation error:", error)
      }
    }, 300)
  }

  return (
    <Modal
      isVisible={isCompareModalVisible}
      onBackdropPress={closeCompareModal}
      onBackButtonPress={closeCompareModal}
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
          <TouchableOpacity onPress={closeCompareModal}>
            <Icon name="close" size={24} color="#46194F" />
          </TouchableOpacity>
        </View>

        {/* Cars Container */}
        <View className="flex-row justify-between mb-5">
          {/* Selected Car */}
          <View className="w-[48%] aspect-square border border-[#E5E7EB] rounded-[10px] p-2.5 justify-center items-center">
            {selectedCarForComparison && (
              <>
                <Image source={selectedCarForComparison.image} className="w-[80%] h-[70%]" resizeMode="contain" />
                <AppText className="mt-2.5 text-[14px] text-[#46194F] text-center" numberOfLines={1}>
                  {typeof selectedCarForComparison.name === "object"
                    ? selectedCarForComparison.name[locale]
                    : selectedCarForComparison.name}
                </AppText>
              </>
            )}
          </View>

          {/* Add Car Button */}
          <TouchableOpacity
            className="w-[48%] aspect-square border border-[#46194F] border-dashed rounded-[10px] p-2.5 justify-center items-center"
            onPress={handleAddCarPress}
          >
            <View className="w-[50px] h-[50px] rounded-full bg-[#F5F0F7] justify-center items-center mb-2.5">
              <Icon name="plus" size={30} color="#46194F" />
            </View>
            <AppText className="text-[12px] text-[#46194F] text-center">
              {locale === "ar" ? "قم باختيار أي سيارة أخرى" : "Select another car"}
            </AppText>
          </TouchableOpacity>
        </View>

        {/* Purple Banner */}
        <TouchableOpacity
          className="w-full h-[80px] rounded-[10px] overflow-hidden bg-[#46194F]"
          onPress={handleAddCarPress}
        >
          <View className="flex-row w-full h-full">
            <View className="flex-[3] justify-center px-4">
              <AppText bold className="text-white text-[16px] text-right">
                {locale === "ar" ? "الآن قم باختيار أي سيارة أخرى" : "Now select another car"}
              </AppText>
            </View>
            <View className="flex-1 justify-center items-center">
              <Image source={require("../../assets/images/car1.png")} className="w-full h-[80%]" resizeMode="contain" />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </Modal>
  )
}
