"use client"
import { View, ScrollView, TouchableOpacity, Image, StyleSheet } from "react-native"
import { useNavigation, useRoute } from "@react-navigation/native"
import { useLocale } from "../contexts/LocaleContext"
import { useCompare } from "../contexts/CompareContext"
import AppText from "../components/common/AppText"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import useBackHandler from "../hooks/useBackHandler"
import { useCallback, useEffect, useState } from "react"
import { brandLogos } from "../mock-data"
import LinearGradient from "react-native-linear-gradient"

export default function CompareDetailsScreen() {
  const { locale } = useLocale()
  const navigation = useNavigation()
  const route = useRoute()
  const { clearComparison } = useCompare()
  const { cars = [] } = route.params || {}
  const [expandedGroups, setExpandedGroups] = useState({})

  // Handle back button press
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

  useEffect(() => {
    return () => {
      // Cleanup if needed
    }
  }, [])

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

  const getLang = (field) => (typeof field === "object" ? field?.[locale] : field)

  const toggleGroup = (groupKey) => {
    setExpandedGroups(prev => ({
      ...prev,
      [groupKey]: !prev[groupKey]
    }))
  }

  // Define comparison categories
  const categories = [
    {
      key: "general",
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
      key: "pricing",
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

  const getMaxValue = (items, itemIndex) => {
    const values = items.map(item => {
      const val1 = parseFloat(item.car1Value?.toString().replace(/[^0-9.]/g, '')) || 0
      const val2 = parseFloat(item.car2Value?.toString().replace(/[^0-9.]/g, '')) || 0
      return Math.max(val1, val2)
    })
    return values[itemIndex] || 1
  }

  const BrandLogo1 = brandLogos[car1.brand]
  const BrandLogo2 = brandLogos[car2.brand]

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header with cars */}
      <View className="bg-white pt-4 pb-2 shadow-md z-20">
        <AppText bold className="text-xl text-center text-[#46194F] mb-2">
          {locale === "ar" ? "مقارنة السيارات" : "Car Comparison"}
        </AppText>
        
        <View className="flex-row justify-around items-center px-2">
          {/* Car 1 */}
          <View className="items-center w-[45%] bg-white py-3 rounded-xl border border-gray-100 shadow-sm">
            <Image source={car1.image} className="w-28 h-20 rounded-lg mb-1" resizeMode="contain" />
            {BrandLogo1 && <BrandLogo1 width={60} height={20} style={{ marginBottom: 4 }} />}
            <AppText bold className="text-sm text-[#46194F] capitalize">{car1.brand}</AppText>
            <AppText className="text-xs text-gray-500 mt-1 text-center px-1">
              {getLang(car1.name)}
            </AppText>
          </View>

          {/* Car 2 */}
          <View className="items-center w-[45%] bg-white py-3 rounded-xl border border-gray-100 shadow-sm">
            <Image source={car2.image} className="w-28 h-20 rounded-lg mb-1" resizeMode="contain" />
            {BrandLogo2 && <BrandLogo2 width={60} height={20} style={{ marginBottom: 4 }} />}
            <AppText bold className="text-sm text-[#46194F] capitalize">{car2.brand}</AppText>
            <AppText className="text-xs text-gray-500 mt-1 text-center px-1">
              {getLang(car2.name)}
            </AppText>
          </View>
        </View>

        {/* VS separator */}
        <View className="flex-row justify-center items-center mt-3 mb-2">
          <View className="flex-1 h-px bg-gray-200" />
          <View className="mx-3 bg-[#46194F] rounded-full w-8 h-8 items-center justify-center">
            <AppText bold className="text-white">VS</AppText>
          </View>
          <View className="flex-1 h-px bg-gray-200" />
        </View>
      </View>

      {/* Comparison sections */}
      <ScrollView className="flex-1 px-4 pt-2" contentContainerStyle={{ paddingBottom: 20 }}>
        {categories.map((category, categoryIndex) => (
          <View key={categoryIndex} className="mb-4 bg-white rounded-xl shadow-sm overflow-hidden">
            <TouchableOpacity
              onPress={() => toggleGroup(category.key)}
              className="flex-row justify-between items-center px-4 py-3 bg-gray-50"
              activeOpacity={0.7}
            >
              <AppText bold className="text-sm text-[#46194F]">
                {category.title}
              </AppText>
              <Icon
                name={expandedGroups[category.key] ? "chevron-up" : "chevron-down"}
                size={20}
                color="#46194F"
              />
            </TouchableOpacity>

            {expandedGroups[category.key] && (
              <View className="px-4 pt-3 pb-4">
                {category.items.map((item, itemIndex) => {
                  const max = getMaxValue(category.items, itemIndex)
                  const val1 = parseFloat(item.car1Value?.toString().replace(/[^0-9.]/g, '')) || 0
                  const val2 = parseFloat(item.car2Value?.toString().replace(/[^0-9.]/g, '')) || 0
                  const percentage1 = max ? Math.min((val1 / max) * 100, 100) : 100
                  const percentage2 = max ? Math.min((val2 / max) * 100, 100) : 100

                  return (
                    <View key={itemIndex} className="mb-4">
                      <AppText className="text-xs text-gray-500 mb-2">
                        {item.label}
                      </AppText>
                      <View className="flex-row items-center justify-between">
                        {/* Car 1 Value */}
                        <View className="w-[48%]">
                          <View className="h-1.5 rounded-full bg-gray-100 mb-1 overflow-hidden">
                            <LinearGradient
                              colors={['#46194F', '#C6AECC']}
                              start={{ x: 0, y: 0 }}
                              end={{ x: 1, y: 0 }}
                              style={{ 
                                width: `${percentage1}%`, 
                                height: '100%', 
                                borderRadius: 9999 
                              }}
                            />
                          </View>
                          <View className="flex-row items-center justify-center mt-1">
                            {item.isPrice && <Icon name="currency-riyal" size={14} color="#46194F" />}
                            <AppText className="text-xs text-center text-[#46194F] ml-1">
                              {item.car1Value || "-"}
                            </AppText>
                          </View>
                        </View>

                        {/* Car 2 Value */}
                        <View className="w-[48%]">
                          <View className="h-1.5 rounded-full bg-gray-100 mb-1 overflow-hidden">
                            <LinearGradient
                              colors={['#46194F', '#C6AECC']}
                              start={{ x: 0, y: 0 }}
                              end={{ x: 1, y: 0 }}
                              style={{ 
                                width: `${percentage2}%`, 
                                height: '100%', 
                                borderRadius: 9999 
                              }}
                            />
                          </View>
                          <View className="flex-row items-center justify-center mt-1">
                            {item.isPrice && <Icon name="currency-riyal" size={14} color="#46194F" />}
                            <AppText className="text-xs text-center text-[#46194F] ml-1">
                              {item.car2Value || "-"}
                            </AppText>
                          </View>
                        </View>
                      </View>
                    </View>
                  )
                })}
              </View>
            )}
          </View>
        ))}

        {/* Download PDF Button */}
        <TouchableOpacity
          className="bg-[#46194F] p-4 rounded-xl mt-6 mb-8 mx-8"
          onPress={() => {
            // Add your PDF generation logic here
          }}
        >
          <AppText bold className="text-white text-lg text-center">
            {locale === "ar" ? "تحميل PDF" : "Download PDF"}
          </AppText>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  shadowProp: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
})