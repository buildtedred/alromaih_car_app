"use client"

import { useState, useEffect, useMemo } from "react"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  StatusBar,
  Image,
  ActivityIndicator,
  Dimensions,
} from "react-native"
import { useNavigation } from "@react-navigation/native"
import Feather from "react-native-vector-icons/Feather"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import carsData from "../mock-data"
import { useLocale } from "../contexts/LocaleContext"
import { useTranslation } from "react-i18next"
import { brandLogos } from "../mock-data"
import AlmaraiFonts from "../constants/fonts"

export default function SearchScreen() {
  const navigation = useNavigation()
  const { locale, direction } = useLocale()
  const isRTL = direction === "rtl"
  const { t } = useTranslation()
  const [searchStep, setSearchStep] = useState("brands") // "brands", "models", "results"
  const [isLoading, setIsLoading] = useState(false)
  const [selectedBrand, setSelectedBrand] = useState(null)
  const [selectedModel, setSelectedModel] = useState(null)
  const [query, setQuery] = useState("")
  const [screenWidth, setScreenWidth] = useState(Dimensions.get("window").width)

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
          titleSize: 16,
          subtitleSize: 12,
          brandNameSize: 14,
          brandCountSize: 10,
          logoSize: 50,
          cardHeight: 80,
          cardPadding: 8,
          headerPadding: 12,
          backIconSize: 22,
        }
      case "medium":
        return {
          titleSize: 18,
          subtitleSize: 14,
          brandNameSize: 16,
          brandCountSize: 12,
          logoSize: 60,
          cardHeight: 90,
          cardPadding: 10,
          headerPadding: 14,
          backIconSize: 24,
        }
      default: // large
        return {
          titleSize: 20,
          subtitleSize: 16,
          brandNameSize: 18,
          brandCountSize: 14,
          logoSize: 70,
          cardHeight: 100,
          cardPadding: 12,
          headerPadding: 16,
          backIconSize: 26,
        }
    }
  }, [sizeClass])

  // Group cars by brand with counts
  const brandGroups = useMemo(() => {
    const groups = carsData.reduce((acc, car) => {
      if (!acc[car.brand]) {
        acc[car.brand] = {
          brand: car.brand,
          count: 1,
          logo: brandLogos[car.brand],
          cars: [car],
        }
      } else {
        acc[car.brand].count += 1
        acc[car.brand].cars.push(car)
      }
      return acc
    }, {})

    return Object.values(groups)
  }, [])

  // Get models for selected brand
  const brandModels = useMemo(() => {
    if (!selectedBrand) return []

    const models = carsData
      .filter((car) => car.brand === selectedBrand.brand)
      .reduce((acc, car) => {
        const modelName = car.model || car.name?.en || car.name
        if (!acc.some((m) => m.name === modelName)) {
          acc.push({
            id: car.id,
            name: modelName,
            image: car.image,
            price: car.cashPrice,
          })
        }
        return acc
      }, [])

    return models
  }, [selectedBrand])

  // Handle brand selection
  const handleSelectBrand = (brand) => {
    setIsLoading(true)
    setSelectedBrand(brand)

    // Simulate loading
    setTimeout(() => {
      setSearchStep("models")
      setIsLoading(false)
    }, 500)
  }

  // Handle model selection
  const handleSelectModel = (model) => {
    setIsLoading(true)
    setSelectedModel(model)

    // Simulate loading
    setTimeout(() => {
      // Filter cars by brand and model
      const filteredCars = carsData.filter(
        (car) =>
          car.brand === selectedBrand.brand &&
          (car.model === model.name || car.name?.en === model.name || car.name === model.name),
      )

      // Navigate to results screen
      navigation.navigate("AllCarsScreen", {
        selectedFilters: {
          brand: selectedBrand.brand,
          model: model.name,
        },
        filteredCars: filteredCars,
      })

      setIsLoading(false)
      // Reset search state for next time
      setSearchStep("brands")
      setSelectedBrand(null)
      setSelectedModel(null)
    }, 500)
  }

  // Handle back button
  const handleBack = () => {
    if (searchStep === "models") {
      setSearchStep("brands")
      setSelectedBrand(null)
    } else {
      navigation.goBack()
    }
  }

  // Render brand card
  const renderBrandCard = ({ item }) => (
    <TouchableOpacity
      onPress={() => handleSelectBrand(item)}
      style={{
        height: sizes.cardHeight,
        padding: sizes.cardPadding,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        marginBottom: 12,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "white",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
      }}
    >
      <View style={{ width: sizes.logoSize, height: sizes.logoSize, marginRight: 12 }}>
        {item.logo ? (
          <item.logo width={sizes.logoSize} height={sizes.logoSize} />
        ) : (
          <View
            style={{
              width: sizes.logoSize,
              height: sizes.logoSize,
              borderRadius: sizes.logoSize / 2,
              backgroundColor: "#F3F4F6",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: sizes.brandNameSize, color: "#46194F" }}>{item.brand?.charAt(0)}</Text>
          </View>
        )}
      </View>

      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontSize: sizes.brandNameSize,
            fontFamily: AlmaraiFonts.bold,
            color: "#46194F",
            marginBottom: 4,
          }}
        >
          {item.brand}
        </Text>
        <Text
          style={{
            fontSize: sizes.brandCountSize,
            fontFamily: AlmaraiFonts.regular,
            color: "#6B7280",
          }}
        >
          {item.count} {locale === "ar" ? "سيارة" : "cars"}
        </Text>
      </View>

      <MaterialIcons name={isRTL ? "chevron-left" : "chevron-right"} size={24} color="#46194F" />
    </TouchableOpacity>
  )

  // Render model card
  const renderModelCard = ({ item }) => (
    <TouchableOpacity
      onPress={() => handleSelectModel(item)}
      style={{
        height: sizes.cardHeight,
        padding: sizes.cardPadding,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        marginBottom: 12,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "white",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
      }}
    >
      <Image
        source={item.image}
        style={{
          width: sizes.logoSize,
          height: sizes.logoSize,
          borderRadius: sizes.logoSize / 2,
          marginRight: 12,
        }}
        resizeMode="cover"
      />

      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontSize: sizes.brandNameSize,
            fontFamily: AlmaraiFonts.bold,
            color: "#46194F",
            marginBottom: 4,
          }}
        >
          {item.name}
        </Text>
        <Text
          style={{
            fontSize: sizes.brandCountSize,
            fontFamily: AlmaraiFonts.regular,
            color: "#6B7280",
          }}
        >
          {item.price?.toLocaleString()} {locale === "ar" ? "ريال" : "SAR"}
        </Text>
      </View>

      <MaterialIcons name={isRTL ? "chevron-left" : "chevron-right"} size={24} color="#46194F" />
    </TouchableOpacity>
  )

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar hidden />

      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: sizes.headerPadding,
          paddingVertical: 16,
          borderBottomWidth: 1,
          borderBottomColor: "#E5E7EB",
        }}
      >
        <TouchableOpacity
          onPress={handleBack}
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            borderWidth: 1,
            borderColor: "#E5E7EB",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Feather name={isRTL ? "chevron-right" : "chevron-left"} size={sizes.backIconSize} color="#46194F" />
        </TouchableOpacity>

        <Text
          style={{
            fontSize: sizes.titleSize,
            fontFamily: AlmaraiFonts.bold,
            color: "#46194F",
          }}
        >
          {searchStep === "brands"
            ? locale === "ar"
              ? "اختر العلامة التجارية"
              : "Select Brand"
            : locale === "ar"
              ? "اختر الموديل"
              : "Select Model"}
        </Text>

        <View style={{ width: 40 }} />
      </View>

      {/* Search Input */}
      <View
        style={{
          paddingHorizontal: sizes.headerPadding,
          paddingVertical: 12,
          borderBottomWidth: 1,
          borderBottomColor: "#E5E7EB",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            borderWidth: 2,
            borderColor: "#46194F",
            borderRadius: 10,
            paddingHorizontal: 12,
            paddingVertical: 8,
          }}
        >
          <Feather name="search" size={20} color="#46194F" />
          <TextInput
            style={{
              flex: 1,
              marginLeft: 8,
              fontSize: sizes.subtitleSize,
              fontFamily: AlmaraiFonts.regular,
              color: "#46194F",
              textAlign: isRTL ? "right" : "left",
            }}
            placeholder={
              searchStep === "brands"
                ? locale === "ar"
                  ? "ابحث عن العلامة التجارية..."
                  : "Search for brands..."
                : locale === "ar"
                  ? "ابحث عن الموديل..."
                  : "Search for models..."
            }
            placeholderTextColor="#46194F80"
            value={query}
            onChangeText={setQuery}
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => setQuery("")}>
              <Feather name="x" size={20} color="#46194F" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Content */}
      <View style={{ flex: 1, paddingHorizontal: sizes.headerPadding, paddingTop: 12 }}>
        {isLoading ? (
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <ActivityIndicator size="large" color="#46194F" />
          </View>
        ) : searchStep === "brands" ? (
          <FlatList
            data={brandGroups.filter(
              (group) => query.length === 0 || group.brand.toLowerCase().includes(query.toLowerCase()),
            )}
            renderItem={renderBrandCard}
            keyExtractor={(item) => item.brand}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        ) : (
          <FlatList
            data={brandModels.filter(
              (model) => query.length === 0 || model.name.toLowerCase().includes(query.toLowerCase()),
            )}
            renderItem={renderModelCard}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
            ListHeaderComponent={
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 16,
                  paddingBottom: 8,
                  borderBottomWidth: 1,
                  borderBottomColor: "#E5E7EB",
                }}
              >
                {selectedBrand.logo ? (
                  <selectedBrand.logo width={40} height={40} />
                ) : (
                  <View
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 20,
                      backgroundColor: "#F3F4F6",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text style={{ fontSize: 16, color: "#46194F" }}>{selectedBrand.brand?.charAt(0)}</Text>
                  </View>
                )}
                <Text
                  style={{
                    marginLeft: 8,
                    fontSize: sizes.brandNameSize,
                    fontFamily: AlmaraiFonts.bold,
                    color: "#46194F",
                  }}
                >
                  {selectedBrand.brand}
                </Text>
              </View>
            }
          />
        )}
      </View>
    </SafeAreaView>
  )
}
