"use client"
import { View, TouchableOpacity, Image, ScrollView } from "react-native"
import { useNavigation, useRoute } from "@react-navigation/native"
import { useLocale } from "../contexts/LocaleContext"
import { useCompare } from "../contexts/CompareContext"
import AppText from "../components/common/AppText"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import useBackHandler from "../hooks/useBackHandler"
import { useCallback } from "react"
import { brandLogos } from "../mock-data"
import VsIcon from "../assets/Icon/vs.svg"
import RiyalIcon from "../assets/Icon/riyal_icon.svg"
import SpecificIcon from "../assets/Icon/specific_icon.svg"
import SeatsIcon from "../assets/Icon/seats_icon.svg"
import SoundIcon from "../assets/Icon/sound_icon.svg"
import ProtectIcon from "../assets/Icon/protect_icon.svg"

export default function CompareDetailsScreen() {
  const { locale } = useLocale()
  const navigation = useNavigation()
  const route = useRoute()
  const { clearComparison } = useCompare()
  const { cars = [] } = route.params || {}

  const truncateText = (text, maxLength = 14) => {
    if (!text) return "";
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  const handleGoBack = useCallback(() => {
    if (navigation && navigation.canGoBack()) {
      navigation.goBack()
      return true
    } else {
      navigation.navigate("AllCarsScreen")
      return true
    }
  }, [navigation])

  useBackHandler(handleGoBack, [handleGoBack])

  if (cars.length !== 2) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <AppText className="text-[#46194F] text-lg">
          {locale === "ar" ? "لا توجد سيارات للمقارنة" : "No cars to compare"}
        </AppText>
        <TouchableOpacity className="mt-4 px-4 py-2 bg-[#46194F] rounded-lg" onPress={handleGoBack}>
          <AppText className="text-white">{locale === "ar" ? "العودة" : "Go Back"}</AppText>
        </TouchableOpacity>
      </View>
    )
  }

  const car1 = cars[0]
  const car2 = cars[1]

  const handleCompareAnotherCar = () => {
    navigation.navigate("CompareScreen")
  }

  const BrandLogo1 = brandLogos[car1.brand]
  const BrandLogo2 = brandLogos[car2.brand]

  return (
    <ScrollView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row justify-center items-center py-2 px-3 relative border-b border-gray-200">
        <TouchableOpacity onPress={handleGoBack} className="absolute left-3">
          <Icon name="close" size={24} color="#46194F" />
        </TouchableOpacity>
        <AppText bold className="text-base text-center text-[#46194F]">
          {truncateText(locale === "ar" ? "قارن بين السيارات" : "Compare Cars")}
        </AppText>
      </View>

      {/* Car Comparison Cards */}
      <View className="px-3 pt-3">
        <View className="flex-row justify-center items-center">
          {/* Car 1 */}
          <View className="w-[42%] bg-white border border-gray-200 rounded-xl overflow-hidden p-3 h-[140px] shadow-sm">
            <View className="items-center justify-center h-[60px]">
              <Image source={car1.image} className="w-[90%] h-[50px]" resizeMode="contain" />
            </View>

            <View className="items-center my-1">
              {BrandLogo1 && <BrandLogo1 width={40} height={12} />}
            </View>

            <View className="flex-row justify-between items-start mt-1">
              <View className="items-start">
                <AppText bold className="text-[#46194F] text-xs">
                  {truncateText(locale === "ar" ? "جيتور T2" : "Jetour T2")}
                </AppText>
                <AppText className="text-[8px] text-gray-500 mt-0.5">
                  {truncateText(locale === "ar" ? "مكينة بنزين كامل" : "Full Gasoline Engine")}
                </AppText>
              </View>

              <View className="items-start">
                <AppText className="text-[8px] text-gray-500">
                  {truncateText(locale === "ar" ? "سعر الكاش" : "Cash Price")}
                </AppText>
                <View className="flex-row items-center">
                  <AppText bold className="text-[#46194F] text-xs">
                    {truncateText("146,000")}
                  </AppText>
                  <RiyalIcon width={10} height={10} fill="#46194F" className="ml-1" />
                </View>
              </View>
            </View>
          </View>

          <View className="z-10 flex items-center justify-center mx-4">
            <VsIcon width={30} height={15} fill="#46194F" />
          </View>

          {/* Car 2 */}
          <View className="w-[42%] bg-white border border-gray-200 rounded-xl overflow-hidden p-3 h-[140px] shadow-sm">
            <View className="items-center justify-center h-[60px]">
              <Image source={car2.image} className="w-[90%] h-[50px]" resizeMode="contain" />
            </View>

            <View className="items-center my-1">
              {BrandLogo2 && <BrandLogo2 width={40} height={12} />}
            </View>

            <View className="flex-row justify-between items-start mt-1">
              <View className="items-start">
                <AppText bold className="text-[#46194F] text-xs">
                  {truncateText(locale === "ar" ? "جيتور T2" : "Jetour T2")}
                </AppText>
                <AppText className="text-[8px] text-gray-500 mt-0.5">
                  {truncateText(locale === "ar" ? "مكينة بنزين كامل" : "Full Gasoline Engine")}
                </AppText>
              </View>

              <View className="items-start">
                <AppText className="text-[8px] text-gray-500">
                  {truncateText(locale === "ar" ? "سعر الكاش" : "Cash Price")}
                </AppText>
                <View className="flex-row items-center">
                  <AppText bold className="text-[#46194F] text-xs">
                    {truncateText("146,000")}
                  </AppText>
                  <RiyalIcon width={8} height={8} fill="#46194F" className="ml-1" />
                </View>
              </View>
            </View>
          </View>
        </View>

        <View className="mt-4 flex items-center justify-center">
          <TouchableOpacity
            className="bg-[#46194F] py-1.5 px-4 w-[45%] rounded-xl"
            onPress={handleCompareAnotherCar}
          >
            <AppText bold className="text-white text-center text-base">
              {(locale === "ar" ? "قارن بسيارة أخرى" : "Compare Another Car")}
            </AppText>
          </TouchableOpacity>
        </View>

        <View className="mt-6">
          <AppText bold className="text-base text-[#46194F] mb-4">
            {truncateText(locale === "ar" ? "صفات السيارة" : "Car Specifications")}
          </AppText>

          {/* Transmission Section */}
          <View className="border border-gray-200 rounded-md mx-2 mb-4">
            <View className="flex-row justify-between items-center p-3">
              <View className="flex-row items-center">
                <SpecificIcon width={24} height={24} fill="#46194F" className="ml-2" />
                <AppText bold className="text-base text-[#46194F] ml-2">
                  {truncateText(locale === "ar" ? "ناقل الحركة" : "Transmission")}
                </AppText>
              </View>
              <TouchableOpacity>
                <Icon name="chevron-up" size={22} color="#46194F" />
              </TouchableOpacity>
            </View>

            <View className="border border-[#46194F] mx-10 mb-10">
              <View className="flex-row justify-between items-center p-3 border-b border-[#46194F]">
                <View className="items-start">
                  <AppText bold className="text-[#46194F] text-xs">
                    {truncateText(locale === "ar" ? "جيتور T2" : "Jetour T2")}
                  </AppText>
                  <AppText className="text-[8px] text-gray-500">
                    {truncateText(locale === "ar" ? "مكينة بنزين كامل" : "Full Gasoline Engine")}
                  </AppText>
                </View>
                <View className="flex-row items-center">{BrandLogo1 && <BrandLogo1 width={60} height={15} />}</View>
              </View>

              <View>
                <View className="flex-row justify-between items-center p-3 border-b border-[#46194F]">
                  <AppText bold className="text-xs text-[#46194F]">
                    {truncateText(locale === "ar" ? "ناقل الحركة" : "Transmission")}
                  </AppText>
                  <AppText className="text-xs text-[#46194F]">
                    {truncateText(locale === "ar" ? "أوتوماتيك" : "Automatic")}
                  </AppText>
                </View>

                <View className="flex-row justify-between items-center p-3 border-b border-[#46194F]">
                  <AppText bold className="text-xs text-[#46194F]">
                    {truncateText(locale === "ar" ? "نوع الجير" : "Gear Type")}
                  </AppText>
                  <AppText className="text-xs text-[#46194F]">
                    {truncateText(locale === "ar" ? "دفع رباعي" : "Four-wheel Drive")}
                  </AppText>
                </View>

                <View className="flex-row justify-between items-center p-3">
                  <AppText bold className="text-xs text-[#46194F]">
                    {truncateText(locale === "ar" ? "وضع القيادة" : "Driving Mode")}
                  </AppText>
                  <View>
                    <AppText className="text-xs text-[#46194F]">
                      {truncateText(locale === "ar" ? "عادي" : "Normal")}
                    </AppText>
                    <AppText className="text-xs text-[#46194F]">
                      {truncateText(locale === "ar" ? "الرمال الطين" : "Sand & Mud")}
                    </AppText>
                  </View>
                </View>
              </View>
            </View>

            <View className="flex items-center justify-center my-4">
              <VsIcon width={40} height={20} fill="#46194F" />
            </View>

            <View className="border border-[#46194F] mx-10 mb-10">
              <View className="flex-row justify-between items-center p-3 border-b border-[#46194F]">
                <View className="items-start">
                  <AppText bold className="text-[#46194F] text-xs">
                    {truncateText(locale === "ar" ? "جيتور T2" : "Jetour T2")}
                  </AppText>
                  <AppText className="text-[8px] text-gray-500">
                    {truncateText(locale === "ar" ? "مكينة بنزين كامل" : "Full Gasoline Engine")}
                  </AppText>
                </View>
                <View className="flex-row items-center">{BrandLogo2 && <BrandLogo2 width={60} height={15} />}</View>
              </View>

              <View>
                <View className="flex-row justify-between items-center p-3 border-b border-[#46194F]">
                  <AppText bold className="text-xs text-[#46194F]">
                    {truncateText(locale === "ar" ? "ناقل الحركة" : "Transmission")}
                  </AppText>
                  <AppText className="text-xs text-[#46194F]">
                    {truncateText(locale === "ar" ? "أوتوماتيك" : "Automatic")}
                  </AppText>
                </View>

                <View className="flex-row justify-between items-center p-3 border-b border-[#46194F]">
                  <AppText bold className="text-xs text-[#46194F]">
                    {truncateText(locale === "ar" ? "نوع الجير" : "Gear Type")}
                  </AppText>
                  <AppText className="text-xs text-[#46194F]">
                    {truncateText(locale === "ar" ? "دفع رباعي" : "Four-wheel Drive")}
                  </AppText>
                </View>

                <View className="flex-row justify-between items-center p-3">
                  <AppText bold className="text-xs text-[#46194F]">
                    {truncateText(locale === "ar" ? "وضع القيادة" : "Driving Mode")}
                  </AppText>
                  <View>
                    <AppText className="text-xs text-[#46194F]">
                      {truncateText(locale === "ar" ? "عادي" : "Normal")}
                    </AppText>
                    <AppText className="text-xs text-[#46194F]">
                      {truncateText(locale === "ar" ? "الرمال الطين" : "Sand & Mud")}
                    </AppText>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* Additional Sections */}
          <View className="border border-gray-200 rounded-lg mb-4">
            <View className="flex-row justify-between items-center p-3">
              <View className="flex-row items-center">
                <SeatsIcon width={24} height={24} fill="#46194F" className="ml-2" />
                <AppText bold className="text-base text-[#46194F] ml-2">
                  {truncateText(locale === "ar" ? "المقاعد" : "Seats")}
                </AppText>
              </View>
              <TouchableOpacity>
                <Icon name="chevron-down" size={24} color="#46194F" />
              </TouchableOpacity>
            </View>
          </View>

          <View className="border border-gray-200 rounded-lg mb-4">
            <View className="flex-row justify-between items-center p-3">
              <View className="flex-row items-center">
                <SoundIcon width={24} height={24} fill="#46194F" className="ml-2" />
                <AppText bold className="text-base text-[#46194F] ml-2">
                  {truncateText(locale === "ar" ? "النظام الصوتي والاتصال" : "Audio & Communication")}
                </AppText>
              </View>
              <TouchableOpacity>
                <Icon name="chevron-down" size={24} color="#46194F" />
              </TouchableOpacity>
            </View>
          </View>

          <View className="border border-gray-200 rounded-lg mb-4">
            <View className="flex-row justify-between items-center p-3">
              <View className="flex-row items-center">
                <ProtectIcon width={24} height={24} fill="#46194F" className="ml-2" />
                <AppText bold className="text-base text-[#46194F] ml-2">
                  {truncateText(locale === "ar" ? "السلامة" : "Safety")}
                </AppText>
              </View>
              <TouchableOpacity>
                <Icon name="chevron-down" size={24} color="#46194F" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Duplicate Sections */}
            <View className="border border-gray-200 rounded-lg mb-4">
            <View className="flex-row justify-between items-center p-3">
              <View className="flex-row items-center">
                <SeatsIcon width={24} height={24} fill="#46194F" className="ml-2" />
                <AppText bold className="text-base text-[#46194F] ml-2">
                  {truncateText(locale === "ar" ? "المقاعد" : "Seats")}
                </AppText>
              </View>
              <TouchableOpacity>
                <Icon name="chevron-down" size={24} color="#46194F" />
              </TouchableOpacity>
            </View>
          </View>

          <View className="border border-gray-200 rounded-lg mb-4">
            <View className="flex-row justify-between items-center p-3">
              <View className="flex-row items-center">
                <SoundIcon width={24} height={24} fill="#46194F" className="ml-2" />
                <AppText bold className="text-base text-[#46194F] ml-2">
                  {truncateText(locale === "ar" ? "النظام الصوتي والاتصال" : "Audio & Communication")}
                </AppText>
              </View>
              <TouchableOpacity>
                <Icon name="chevron-down" size={24} color="#46194F" />
              </TouchableOpacity>
            </View>
          </View>

          <View className="border border-gray-200 rounded-lg mb-28">
            <View className="flex-row justify-between items-center p-3">
              <View className="flex-row items-center">
                <ProtectIcon width={24} height={24} fill="#46194F" className="ml-2" />
                <AppText bold className="text-base text-[#46194F] ml-2">
                  {truncateText(locale === "ar" ? "السلامة" : "Safety")}
                </AppText>
              </View>
              <TouchableOpacity>
                <Icon name="chevron-down" size={24} color="#46194F" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}