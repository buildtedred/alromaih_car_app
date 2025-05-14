"use client"
import { View, ScrollView, TouchableOpacity, Image } from "react-native"
import { useNavigation, useRoute } from "@react-navigation/native"
import { useLocale } from "../contexts/LocaleContext"
import { useCompare } from "../contexts/CompareContext"
import AppText from "../components/common/AppText"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import useBackHandler from "../hooks/useBackHandler"

export default function CompareDetailsScreen() {
  const { locale } = useLocale()
  const navigation = useNavigation()
  const route = useRoute()
  const { clearComparison } = useCompare()
  const { cars = [] } = route.params || {}

  // Use our custom back handler hook
  useBackHandler(() => {
    handleGoBack()
    return true // Prevent default behavior
  }, [])

  const handleGoBack = () => {
    // Navigate back to the previous screen
    if (navigation.canGoBack()) {
      navigation.goBack()
    } else {
      // Fallback if there's no screen to go back to
      navigation.navigate("AllCarsScreen")
    }
  }

  if (cars.length !== 2) {
    // Handle invalid state
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

  const getLang = (field) => (typeof field === "object" ? field?.[locale] : field)

  // Define comparison categories
  const categories = [
    {
      title: locale === "ar" ? "المواصفات العامة" : "General Specifications",
      items: [
        {
          label: locale === "ar" ? "السنة" : "Year",
          car1Value: car1.specs?.year,
          car2Value: car2.specs?.year,
        },
        {
          label: locale === "ar" ? "ناقل الحركة" : "Transmission",
          car1Value: getLang(car1.specs?.transmission),
          car2Value: getLang(car2.specs?.transmission),
        },
        {
          label: locale === "ar" ? "نوع الوقود" : "Fuel Type",
          car1Value: getLang(car1.specs?.fuelType),
          car2Value: getLang(car2.specs?.fuelType),
        },
      ],
    },
    {
      title: locale === "ar" ? "الأسعار" : "Pricing",
      items: [
        {
          label: locale === "ar" ? "سعر الكاش" : "Cash Price",
          car1Value: car1.cashPrice?.toLocaleString(),
          car2Value: car2.cashPrice?.toLocaleString(),
          isPrice: true,
        },
        {
          label: locale === "ar" ? "القسط الشهري" : "Monthly Installment",
          car1Value: car1.installmentPrice?.toLocaleString(),
          car2Value: car2.installmentPrice?.toLocaleString(),
          isPrice: true,
        },
      ],
    },
  ]

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row justify-between items-center p-4 border-b border-gray-200">
        <TouchableOpacity onPress={handleGoBack}>
          <Icon name="arrow-left" size={24} color="#46194F" />
        </TouchableOpacity>
        <AppText bold className="text-[18px] text-[#46194F]">
          {locale === "ar" ? "مقارنة السيارات" : "Car Comparison"}
        </AppText>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView className="flex-1">
        {/* Car Headers */}
        <View className="flex-row border-b border-gray-200 pb-4">
          <View className="w-[30%]" />
          <View className="w-[35%] items-center">
            <Image source={car1.image} className="w-[80%] h-[80px]" resizeMode="contain" />
            <AppText bold className="text-[14px] text-[#46194F] text-center mt-2" numberOfLines={2}>
              {getLang(car1.name)}
            </AppText>
          </View>
          <View className="w-[35%] items-center">
            <Image source={car2.image} className="w-[80%] h-[80px]" resizeMode="contain" />
            <AppText bold className="text-[14px] text-[#46194F] text-center mt-2" numberOfLines={2}>
              {getLang(car2.name)}
            </AppText>
          </View>
        </View>

        {/* Comparison Categories */}
        {categories.map((category, categoryIndex) => (
          <View key={categoryIndex} className="mb-6">
            <View className="bg-[#F5F0F7] p-3">
              <AppText bold className="text-[16px] text-[#46194F]">
                {category.title}
              </AppText>
            </View>

            {category.items.map((item, itemIndex) => (
              <View key={itemIndex} className="flex-row border-b border-gray-200 py-3">
                <View className="w-[30%] px-3 justify-center">
                  <AppText className="text-[14px] text-gray-700">{item.label}</AppText>
                </View>
                <View className="w-[35%] items-center justify-center">
                  <View className="flex-row items-center">
                    {item.isPrice && <Icon name="currency-riyal" size={16} color="#46194F" />}
                    <AppText className="text-[14px] text-[#46194F]">{item.car1Value || "-"}</AppText>
                  </View>
                </View>
                <View className="w-[35%] items-center justify-center">
                  <View className="flex-row items-center">
                    {item.isPrice && <Icon name="currency-riyal" size={16} color="#46194F" />}
                    <AppText className="text-[14px] text-[#46194F]">{item.car2Value || "-"}</AppText>
                  </View>
                </View>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  )
}
