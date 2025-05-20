"use client"

import { useState, useEffect, useMemo } from "react"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Dimensions,
  StatusBar,
} from "react-native"
import { useNavigation } from "@react-navigation/native"
import Feather from "react-native-vector-icons/Feather"
import Modal from "react-native-modal"
import carsData from "../mock-data"
import { useLocale } from "../contexts/LocaleContext"
import { useTranslation } from "react-i18next"
import { brandLogos } from "../mock-data"
import AlmaraiFonts from "../constants/fonts"
import { useFilters } from "../contexts/FilterContext"
import LogoSvg from "../assets/Icon/logo.svg"

const SearchScreen = ({ isVisible, onClose }) => {
  console.log("SearchScreen rendered, isVisible:", isVisible)
  const navigation = useNavigation()
  const { locale, direction } = useLocale()
  const { filters, setFilters, setFilteredCars, setIsFiltered, clearFilters } = useFilters()
  const isRTL = direction === "rtl"
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(false)
  const [selectedBrand, setSelectedBrand] = useState(null)
  const [query, setQuery] = useState("")
  const [screenWidth, setScreenWidth] = useState(Dimensions.get("window").width)
  const [screenHeight, setScreenHeight] = useState(Dimensions.get("window").height)
  const [currentView, setCurrentView] = useState("brands") // "brands" or "models"
  const [backButtonPressed, setBackButtonPressed] = useState(false) // New state for back button

  // Listen for dimension changes
  useEffect(() => {
    const dimensionsHandler = ({ window }) => {
      setScreenWidth(window.width)
      setScreenHeight(window.height)
    }

    const subscription = Dimensions.addEventListener("change", dimensionsHandler)
    return () => subscription.remove()
  }, [])

  // Reset state when modal is closed
  useEffect(() => {
    if (!isVisible) {
      setSelectedBrand(null)
      setQuery("")
      setCurrentView("brands")
    }
  }, [isVisible])

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

  // Filtered brands based on search query
  const filteredBrands = useMemo(() => {
    return brandGroups.filter((group) => query.length === 0 || group.brand.toLowerCase().includes(query.toLowerCase()))
  }, [brandGroups, query])

  // Filtered models based on search query
  const filteredModels = useMemo(() => {
    return brandModels.filter((model) => query.length === 0 || model.name.toLowerCase().includes(query.toLowerCase()))
  }, [brandModels, query])

  // Handle brand selection
  const handleSelectBrand = (brand) => {
    setSelectedBrand(brand)
    setQuery("")
    setCurrentView("models")
  }

  // Handle model selection
  const handleSelectModel = (model) => {
    setIsLoading(true)

    // Simulate loading
    setTimeout(() => {
      try {
        // First clear any existing filters
        clearFilters()

        // Filter cars by brand and model
        const filteredCars = carsData.filter(
          (car) =>
            car.brand === selectedBrand.brand &&
            (car.model === model.name || car.name?.en === model.name || car.name === model.name),
        )

        // Set filters in context
        const filterParams = {
          brand: selectedBrand.brand,
          models: [model.name], // Always use array
        }

        // Update filter context
        setFilters(filterParams)
        setFilteredCars(filteredCars)
        setIsFiltered(true)

        // Close the modal
        onClose()

        // ✅ Navigate directly to AllCarsScreen inside CarsTab
        navigation.navigate("CarsTab", {
          screen: "AllCarsScreen",
          params: { selectedFilters: filterParams },
        })
      } catch (error) {
        console.error("Error applying filters:", error)
      } finally {
        setIsLoading(false)
        setSelectedBrand(null)
        setCurrentView("brands")
      }
    }, 500)
  }

  // Handle back button
  const handleBack = () => {
    if (currentView === "models") {
      setCurrentView("brands")
      setSelectedBrand(null)
      setQuery("")
    } else {
      onClose()
    }
  }

  // Popular car categories
  const carCategories = [
    { id: 1, name: locale === "ar" ? "فورد إكسبلورر" : "Ford Explorer" },
    { id: 2, name: locale === "ar" ? "هوندا أكورد" : "Honda Accord" },
    { id: 3, name: locale === "ar" ? "كيا سبورتاج" : "Kia Sportage" },
    { id: 4, name: locale === "ar" ? "هيونداي سوناتا" : "Hyundai Sonata" },
    { id: 5, name: locale === "ar" ? "نيسان التيما" : "Nissan Altima" },
    { id: 6, name: locale === "ar" ? "شيفروليه تاهو" : "Chevrolet Tahoe" },
  ]

  // Calculate pill width to fit 4 in a row with spacing
  const pillWidth = (screenWidth - 32 - 24) / 4 // 32 for container padding, 24 for gaps (8px × 3)

  // Render brand grid item
  const renderBrandGridItem = ({ item, index }) => (
    <TouchableOpacity
      onPress={() => handleSelectBrand(item)}
      style={{
        width: (screenWidth - 56) / 2,
        marginBottom: 12,
        padding: 8,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        borderRadius: 8,
        backgroundColor: "white",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      {/* Logo on the left */}
      <View style={{ marginRight: 6 }}>
        {item.logo ? (
          <item.logo width={40} height={22} />
        ) : (
          <View
            style={{
              width: 40,
              height: 22,
              backgroundColor: "#F3F4F6",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 4,
            }}
          >
            <Text style={{ fontSize: 12, color: "#46194F" }}>{item.brand?.charAt(0)}</Text>
          </View>
        )}
      </View>

      {/* Brand name and model count on the right */}
      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontSize: 12,
            fontFamily: AlmaraiFonts.bold,
            color: "#333",
          }}
          numberOfLines={1}
        >
          {item.brand}
        </Text>
        <Text
          style={{
            fontSize: 10,
            fontFamily: AlmaraiFonts.regular,
            color: "#666",
          }}
          numberOfLines={1}
        >
          {locale === "ar" ? "عدد الموديلات" : "no. of models"} {item.count}
        </Text>
      </View>
    </TouchableOpacity>
  )

  // Render model card
  const renderModelCard = ({ item }) => (
    <TouchableOpacity
      onPress={() => handleSelectModel(item)}
      style={{
        width: (screenWidth - 64) / 3,
        marginBottom: 10,
        marginRight: 8,
        padding: 6,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        borderRadius: 8,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text
        style={{
          fontSize: 11,
          fontFamily: AlmaraiFonts.bold,
          color: "#333",
          marginBottom: 2,
          textAlign: "center",
        }}
        numberOfLines={1}
      >
        {item.name}
      </Text>
      <Text
        style={{
          fontSize: 11,
          fontFamily: AlmaraiFonts.bold,
          color: "#46194F",
          textAlign: "center",
        }}
        numberOfLines={1}
      >
        {item.price?.toLocaleString()} {locale === "ar" ? "ريال" : "SAR"}
      </Text>
    </TouchableOpacity>
  )

  return (
    <Modal
      isVisible={isVisible}
      style={{
        margin: 0,
        padding: 0,
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "stretch",
      }}
      animationIn="fadeIn"
      animationOut="fadeOut"
      backdropOpacity={1}
      backdropColor="white"
      coverScreen={true}
      deviceHeight={screenHeight}
      deviceWidth={screenWidth}
      statusBarTranslucent={true}
      hasBackdrop={false}
      useNativeDriver={true}
    >
      <View
        style={{
          flex: 1,
          width: screenWidth,
          height: screenHeight,
          backgroundColor: "white",
          margin: 0,
          padding: 0,
        }}
      >
        <StatusBar backgroundColor="white" barStyle="dark-content" />

        {/* Logo */}
        <View style={{ alignItems: "center", paddingVertical: 10, marginTop: 10 }}>
          <LogoSvg width={100} height={35} />
        </View>

        {/* Search Bar */}
        <View
          style={{
            paddingHorizontal: 16,
            paddingBottom: 8,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {/* Back Button (Circular) with pressed state */}
          <TouchableOpacity
            onPress={handleBack}
            onPressIn={() => setBackButtonPressed(true)}
            onPressOut={() => setBackButtonPressed(false)}
            activeOpacity={0.9}
            style={{
              width: 32,
              height: 32,
              borderRadius: 16,
              backgroundColor: backButtonPressed ? "#46194F" : "#F9FAFB",
              alignItems: "center",
              justifyContent: "center",
              marginRight: 10,
              borderWidth: 1,
              borderColor: "#46194F",
            }}
          >
            <Feather name="arrow-left" size={14} color={backButtonPressed ? "white" : "#46194F"} />
          </TouchableOpacity>

          {/* Search Input with Button */}
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              borderWidth: 1,
              borderColor: "#46194F",
              borderRadius: 20,
              backgroundColor: "#F9FAFB",
              overflow: "hidden",
              height: 32,
            }}
          >
            <TextInput
              style={{
                flex: 1,
                fontSize: 12,
                fontFamily: AlmaraiFonts.regular,
                color: "#333",
                textAlign: isRTL ? "right" : "left",
                paddingVertical: 0,
                paddingHorizontal: 16,
                height: 32,
              }}
              placeholder={
                currentView === "brands"
                  ? locale === "ar"
                    ? "اختر الموديل"
                    : "Choose model"
                  : locale === "ar"
                    ? "اختر الموديل"
                    : "Choose model"
              }
              placeholderTextColor="#999"
              value={query}
              onChangeText={setQuery}
            />
            <TouchableOpacity
              style={{
                width: 36,
                height: 32,
                backgroundColor: "#46194F",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Feather name="search" size={16} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        {currentView === "brands" ? (
          <>
            {/* Popular Search Text */}
            <View style={{ paddingHorizontal: 16, paddingTop: 8 }}>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: AlmaraiFonts.bold,
                  color: "#333",
                  textAlign: isRTL ? "right" : "left",
                  marginBottom: 12,
                }}
              >
                {locale === "ar" ? "السيارات الأكثر بحثاً" : "Popular Searches"}
              </Text>

              {/* Category Pills - Grid Layout */}
              <View style={{ flexDirection: "row", flexWrap: "wrap", marginBottom: 8 }}>
                {carCategories.map((category, index) => (
                  <TouchableOpacity
                    key={category.id}
                    style={{
                      width: pillWidth,
                      paddingHorizontal: 8,
                      paddingVertical: 6,
                      backgroundColor: "#F3E5F5",
                      borderRadius: 20,
                      marginRight: index % 4 === 3 ? 0 : 8,
                      marginBottom: 8,
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 11,
                        fontFamily: AlmaraiFonts.regular,
                        color: "#46194F",
                        textAlign: "center",
                      }}
                      numberOfLines={1}
                    >
                      {category.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Brands Content */}
            <View style={{ flex: 1, paddingHorizontal: 16, paddingTop: 16 }}>
              {isLoading ? (
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                  <ActivityIndicator size="large" color="#46194F" />
                </View>
              ) : (
                <>
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: AlmaraiFonts.bold,
                      color: "#333",
                      textAlign: isRTL ? "right" : "left",
                      marginBottom: 16,
                    }}
                  >
                    {locale === "ar" ? "اختر حسب العلامة التجارية" : "Choose by Brand"}
                  </Text>
                  <FlatList
                    key="brands-grid"
                    data={filteredBrands}
                    renderItem={renderBrandGridItem}
                    keyExtractor={(item) => item.brand}
                    numColumns={2}
                    columnWrapperStyle={{ justifyContent: "space-between" }}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 16 }}
                  />
                </>
              )}
            </View>
          </>
        ) : (
          <>
            {/* Models Content */}
            <View style={{ flex: 1, paddingHorizontal: 16, paddingTop: 16 }}>
              {isLoading ? (
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                  <ActivityIndicator size="large" color="#46194F" />
                </View>
              ) : (
                <>
                  {/* Brand Header */}
                  <View style={{ marginBottom: 16 }}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontFamily: AlmaraiFonts.bold,
                        color: "#333",
                        textAlign: isRTL ? "right" : "left",
                        marginBottom: 12,
                      }}
                    >
                      {locale === "ar" ? "اختر حسب العلامة التجارية" : "Choose by Brand"}
                    </Text>

                    {/* Brand Info Row */}
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      {/* Brand Logo with Border */}
                      <View
                        style={{
                          width: 80,
                          height: 45,
                          borderWidth: 1,
                          borderColor: "#E5E7EB",
                          borderRadius: 6,
                          padding: 4,
                          backgroundColor: "white",
                          alignItems: "center",
                          justifyContent: "center",
                          marginRight: 10,
                        }}
                      >
                        {selectedBrand?.logo ? (
                          <selectedBrand.logo width={70} height={35} />
                        ) : (
                          <View
                            style={{
                              width: 70,
                              height: 35,
                              backgroundColor: "#F3F4F6",
                              alignItems: "center",
                              justifyContent: "center",
                              borderRadius: 4,
                            }}
                          >
                            <Text style={{ fontSize: 16, color: "#46194F" }}>{selectedBrand?.brand?.charAt(0)}</Text>
                          </View>
                        )}
                      </View>

                      {/* Brand Name and Model Count */}
                      <View>
                        <Text
                          style={{
                            fontSize: 14,
                            fontFamily: AlmaraiFonts.bold,
                            color: "#46194F",
                          }}
                        >
                          {selectedBrand?.brand}
                        </Text>
                        <Text
                          style={{
                            fontSize: 12,
                            fontFamily: AlmaraiFonts.regular,
                            color: "#666",
                            marginTop: 2,
                          }}
                        >
                          {locale === "ar" ? "عدد الموديلات" : "no. of models"} {selectedBrand?.count}
                        </Text>
                      </View>
                    </View>
                  </View>

                  {/* Models Grid */}
                  <FlatList
                    key="models-grid"
                    data={filteredModels}
                    renderItem={renderModelCard}
                    keyExtractor={(item) => item.id.toString()}
                    numColumns={3}
                    columnWrapperStyle={{ justifyContent: "flex-start" }}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 16 }}
                    ListEmptyComponent={
                      <View style={{ padding: 20, alignItems: "center" }}>
                        <Text style={{ fontFamily: AlmaraiFonts.regular, color: "#666" }}>
                          {locale === "ar" ? "لا توجد موديلات متطابقة" : "No matching models found"}
                        </Text>
                      </View>
                    }
                  />
                </>
              )}
            </View>
          </>
        )}
      </View>
    </Modal>
  )
}

export default SearchScreen
