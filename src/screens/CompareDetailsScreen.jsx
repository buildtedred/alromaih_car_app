"use client"
import { useState, useEffect } from "react"
import { View, TouchableOpacity, Image, ScrollView, Dimensions, Animated, Easing } from "react-native"
import { useLocale } from "../contexts/LocaleContext"
import AppText from "../components/common/AppText"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { brandLogos } from "../mock-data"
import VsIcon from "../assets/Icon/vs.svg"
import RiyalIcon from "../assets/Icon/riyal_icon.svg"
import SpecificIcon from "../assets/Icon/specific_icon.svg"
import SeatsIcon from "../assets/Icon/seats_icon.svg"
import SoundIcon from "../assets/Icon/sound_icon.svg"
import ProtectIcon from "../assets/Icon/protect_icon.svg"
import CarSelectionModal from "../components/cars/CarSelectionModal"

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window")

export default function CompareDetailsScreen({ visible, onClose, cars = [] }) {
  const { locale } = useLocale()
  const [displayedCars, setDisplayedCars] = useState(cars)
  const [showCarSelection, setShowCarSelection] = useState(!cars || cars.length !== 2)
  const [slideAnim] = useState(new Animated.Value(SCREEN_HEIGHT))
  const [isButtonPressed, setIsButtonPressed] = useState(false)

  const handleClose = () => {
    Animated.timing(slideAnim, {
      toValue: SCREEN_HEIGHT,
      duration: 1000,
      easing: Easing.in(Easing.exp),
      useNativeDriver: true,
    }).start(() => {
      onClose()
    })
  }

  const handleCompareAnotherCar = () => {
    setIsButtonPressed(true)
    setShowCarSelection(true)
  }

  useEffect(() => {
    if (cars && cars.length === 2) {
      setDisplayedCars(cars)
      setShowCarSelection(false)
      setIsButtonPressed(false)
    } else {
      setShowCarSelection(true)
    }
  }, [cars])

  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1000,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }).start()
    } else {
      Animated.timing(slideAnim, {
        toValue: SCREEN_HEIGHT,
        duration: 1000,
        easing: Easing.in(Easing.exp),
        useNativeDriver: true,
      }).start(() => {
        // Optional callback when animation completes
      })
    }
  }, [visible])

  const handleSelectCars = (selectedCars) => {
    if (selectedCars && selectedCars.length === 2) {
      setDisplayedCars(selectedCars)
      setShowCarSelection(false)
      setIsButtonPressed(false)
    }
  }

  const truncateText = (text, maxLength = 14) => {
    if (!text) return ""
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "..."
    }
    return text
  }

  const car1 = displayedCars[0]
  const car2 = displayedCars[1]

  const BrandLogo1 = car1 && brandLogos[car1.brand]
  const BrandLogo2 = car2 && brandLogos[car2.brand]

  if (!visible) return null

  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1000,
        backgroundColor: "transparent",
      }}
      pointerEvents="box-none"
    >
      {/* Car Selection Modal fallback */}
      {showCarSelection && <CarSelectionModal visible={true} onClose={onClose} onSelectCars={handleSelectCars} />}
      {/* Only show comparison UI if we have two cars */}
      {!showCarSelection && (
        <Animated.View
          className="bg-white rounded-t-xl"
          style={{
            width: "100%",
            flex: 1,
            transform: [{ translateY: slideAnim }],
            shadowColor: "#000",
            shadowOffset: { width: 0, height: -3 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 5,
          }}
        >
          {/* Header */}
          <View className="flex-row justify-between items-center p-4 border-b border-gray-200">
            <AppText bold className="text-lg text-[#46194F]">
              {locale === "ar" ? "مقارنة السيارات" : "Car Comparison"}
            </AppText>
            <TouchableOpacity onPress={handleClose}>
              <Icon name="close" size={24} color="#46194F" />
            </TouchableOpacity>
          </View>
          {/* ...rest of the comparison UI... */}
          <ScrollView className="p-4" showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
            {/* Car Comparison Cards */}
            <View className="flex-row justify-center items-center mb-6">
              {/* Car 1 */}
              <View className="w-[42%] bg-white border border-gray-200 rounded-xl overflow-hidden p-3 h-[140px] shadow-sm">
                <View className="items-center justify-center h-[60px]">
                  <Image source={car1.image} className="w-[90%] h-[50px]" resizeMode="contain" />
                </View>

                <View className="items-center my-1">{BrandLogo1 && <BrandLogo1 width={40} height={12} />}</View>

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
                      {locale === "ar" ? "سعر الكاش" : "Cash Price"}
                    </AppText>
                    <View className="flex-row items-center">
                      <AppText bold className="text-[#46194F] text-xs">
                        {"146,000"}
                      </AppText>
                      <RiyalIcon width={10} height={10} fill="#46194F" style={{ marginLeft: 4 }} />
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

                <View className="items-center my-1">{BrandLogo2 && <BrandLogo2 width={40} height={12} />}</View>

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
                      {locale === "ar" ? "سعر الكاش" : "Cash Price"}
                    </AppText>
                    <View className="flex-row items-center">
                      <AppText bold className="text-[#46194F] text-xs">
                        {"146,000"}
                      </AppText>
                      <RiyalIcon width={8} height={8} fill="#46194F" style={{ marginLeft: 4 }} />
                    </View>
                  </View>
                </View>
              </View>
            </View>

            <View className="mt-4 flex items-center justify-center">
              <TouchableOpacity
                className={`${
                  isButtonPressed ? "bg-[#46194F]" : "bg-white border border-[#46194F]"
                } py-2 px-7 rounded-xl`}
                onPress={handleCompareAnotherCar}
              >
                <AppText
                  bold
                  className={`${isButtonPressed ? "text-white" : "text-[#46194F]"} text-center text-base`}
                >
                  {locale === "ar" ? "قارن سيارة أخرى" : "Compare Another Car"}
                </AppText>
              </TouchableOpacity>
            </View>

            <View className="mt-6">
              <AppText bold className="text-base text-[#46194F] mb-4">
                {locale === "ar" ? "صفات السيارة" : "Car Specifications"}
              </AppText>

              {/* Transmission Section */}
              <View className="border border-gray-200 rounded-md mx-2 mb-4">
                <View className="flex-row justify-between items-center p-3">
                  <View className="flex-row items-center">
                    <SpecificIcon width={24} height={24} fill="#46194F" style={{ marginLeft: 8 }} />
                    <AppText bold className="text-base text-[#46194F] ml-2">
                      {locale === "ar" ? "ناقل الحركة" : "Transmission"}
                    </AppText>
                  </View>
                  <TouchableOpacity>
                    <Icon name="chevron-up" size={22} color="#46194F" style={{ marginRight: 8 }} />
                  </TouchableOpacity>
                </View>

                <View className="border border-[#46194F] mx-10 mb-10">
                  <View className="flex-row justify-between items-center p-3 border-b border-[#46194F]">
                    <View className="items-start">
                      <AppText bold className="text-[#46194F] text-xs">
                        {locale === "ar" ? "جيتور T2" : "Jetour T2"}
                      </AppText>
                      <AppText className="text-[8px] text-gray-500">
                        {locale === "ar" ? "مكينة بنزين كامل" : "Full Gasoline Engine"}
                      </AppText>
                    </View>
                    <View className="flex-row items-center">{BrandLogo1 && <BrandLogo1 width={60} height={15} />}</View>
                  </View>

                  <View>
                    <View className="flex-row justify-between items-center p-3 border-b border-[#46194F]">
                      <AppText bold className="text-xs text-[#46194F]">
                        {locale === "ar" ? "ناقل الحركة" : "Transmission"}
                      </AppText>
                      <AppText className="text-xs text-[#46194F]">
                        {locale === "ar" ? "أوتوماتيك" : "Automatic"}
                      </AppText>
                    </View>

                    <View className="flex-row justify-between items-center p-3 border-b border-[#46194F]">
                      <AppText bold className="text-xs text-[#46194F]">
                        {locale === "ar" ? "نوع الجير" : "Gear Type"}
                      </AppText>
                      <AppText className="text-xs text-[#46194F]">
                        {locale === "ar" ? "دفع رباعي" : "Four-wheel Drive"}
                      </AppText>
                    </View>

                    <View className="flex-row justify-between items-center p-3">
                      <AppText bold className="text-xs text-[#46194F]">
                        {locale === "ar" ? "وضع القيادة" : "Driving Mode"}
                      </AppText>
                      <View>
                        <AppText className="text-xs text-[#46194F]">{locale === "ar" ? "عادي" : "Normal"}</AppText>
                        <AppText className="text-xs text-[#46194F]">
                          {locale === "ar" ? "الرمال الطين" : "Sand & Mud"}
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
                        {locale === "ar" ? "جيتور T2" : "Jetour T2"}
                      </AppText>
                      <AppText className="text-[8px] text-gray-500">
                        {locale === "ar" ? "مكينة بنزين كامل" : "Full Gasoline Engine"}
                      </AppText>
                    </View>
                    <View className="flex-row items-center">{BrandLogo2 && <BrandLogo2 width={60} height={15} />}</View>
                  </View>

                  <View>
                    <View className="flex-row justify-between items-center p-3 border-b border-[#46194F]">
                      <AppText bold className="text-xs text-[#46194F]">
                        {locale === "ar" ? "ناقل الحركة" : "Transmission"}
                      </AppText>
                      <AppText className="text-xs text-[#46194F]">
                        {locale === "ar" ? "أوتوماتيك" : "Automatic"}
                      </AppText>
                    </View>

                    <View className="flex-row justify-between items-center p-3 border-b border-[#46194F]">
                      <AppText bold className="text-xs text-[#46194F]">
                        {locale === "ar" ? "نوع الجير" : "Gear Type"}
                      </AppText>
                      <AppText className="text-xs text-[#46194F]">
                        {locale === "ar" ? "دفع رباعي" : "Four-wheel Drive"}
                      </AppText>
                    </View>

                    <View className="flex-row justify-between items-center p-3">
                      <AppText bold className="text-xs text-[#46194F]">
                        {locale === "ar" ? "وضع القيادة" : "Driving Mode"}
                      </AppText>
                      <View>
                        <AppText className="text-xs text-[#46194F]">{locale === "ar" ? "عادي" : "Normal"}</AppText>
                        <AppText className="text-xs text-[#46194F]">
                          {locale === "ar" ? "الرمال الطين" : "Sand & Mud"}
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
                    <SeatsIcon width={24} height={24} fill="#46194F" style={{ marginLeft: 8 }} />
                    <AppText bold className="text-base text-[#46194F] ml-2">
                      {locale === "ar" ? "المقاعد" : "Seats"}
                    </AppText>
                  </View>
                  <TouchableOpacity>
                    <Icon name="chevron-down" size={24} color="#46194F" style={{ marginRight: 8 }} />
                  </TouchableOpacity>
                </View>
              </View>

              <View className="border border-gray-200 rounded-lg mb-4">
                <View className="flex-row justify-between items-center p-3">
                  <View className="flex-row items-center">
                    <SoundIcon width={24} height={24} fill="#46194F" style={{ marginLeft: 8 }} />
                    <AppText bold className="text-base text-[#46194F] ml-2">
                      {locale === "ar" ? "النظام الصوتي والاتصال" : "Audio & Communication"}
                    </AppText>
                  </View>
                  <TouchableOpacity>
                    <Icon name="chevron-down" size={24} color="#46194F" style={{ marginRight: 8 }} />
                  </TouchableOpacity>
                </View>
              </View>

              <View className="border border-gray-200 rounded-lg mb-4">
                <View className="flex-row justify-between items-center p-3">
                  <View className="flex-row items-center">
                    <ProtectIcon width={24} height={24} fill="#46194F" style={{ marginLeft: 8 }} />
                    <AppText bold className="text-base text-[#46194F] ml-2">
                      {locale === "ar" ? "السلامة" : "Safety"}
                    </AppText>
                  </View>
                  <TouchableOpacity>
                    <Icon name="chevron-down" size={24} color="#46194F" style={{ marginRight: 8 }} />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Duplicate Sections */}
              <View className="border border-gray-200 rounded-lg mb-4">
                <View className="flex-row justify-between items-center p-3">
                  <View className="flex-row items-center">
                    <SeatsIcon width={24} height={24} fill="#46194F" style={{ marginLeft: 8 }} />
                    <AppText bold className="text-base text-[#46194F] ml-2">
                      {locale === "ar" ? "المقاعد" : "Seats"}
                    </AppText>
                  </View>
                  <TouchableOpacity>
                    <Icon name="chevron-down" size={24} color="#46194F" style={{ marginRight: 8 }} />
                  </TouchableOpacity>
                </View>
              </View>

              <View className="border border-gray-200 rounded-lg mb-4">
                <View className="flex-row justify-between items-center p-3">
                  <View className="flex-row items-center">
                    <SoundIcon width={24} height={24} fill="#46194F" style={{ marginLeft: 8 }} />
                    <AppText bold className="text-base text-[#46194F] ml-2">
                      {locale === "ar" ? "النظام الصوتي والاتصال" : "Audio & Communication"}
                    </AppText>
                  </View>
                  <TouchableOpacity>
                    <Icon name="chevron-down" size={24} color="#46194F" style={{ marginRight: 8 }} />
                  </TouchableOpacity>
                </View>
              </View>

              <View className="border border-gray-200 rounded-lg mb-28">
                <View className="flex-row justify-between items-center p-3">
                  <View className="flex-row items-center">
                    <ProtectIcon width={24} height={24} fill="#46194F" style={{ marginLeft: 8 }} />
                    <AppText bold className="text-base text-[#46194F] ml-2">
                      {locale === "ar" ? "السلامة" : "Safety"}
                    </AppText>
                  </View>
                  <TouchableOpacity>
                    <Icon name="chevron-down" size={24} color="#46194F" style={{ marginRight: 8 }} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>
        </Animated.View>
      )}
    </View>
  )
}
