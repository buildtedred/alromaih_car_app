"use client"
import { useState, useEffect } from "react"
import { View, Modal, TouchableOpacity, ScrollView } from "react-native"
import { useLocale } from "../../contexts/LocaleContext"
import AppText from "../common/AppText"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import Ionicons from "react-native-vector-icons/Ionicons"

const CarSelectionModal = ({ visible, onClose, onSelectCars, initialSelectedCars = [] }) => {
  const { locale } = useLocale()
  const isRTL = locale === "ar"
  const [cars, setCars] = useState([])
  const [brands, setBrands] = useState([])
  const [models, setModels] = useState([])
  const [years, setYears] = useState([])

  const [showBrandDropdown, setShowBrandDropdown] = useState(false)
  const [showModelDropdown, setShowModelDropdown] = useState(false)
  const [showYearDropdown, setShowYearDropdown] = useState(false)

  const [carSelections, setCarSelections] = useState([
    { brand: null, model: null, year: null },
    { brand: null, model: null, year: null },
  ])
  const [activeCarIndex, setActiveCarIndex] = useState(0)

  // Helper function to get localized text
  const getLocalizedText = (textObj) => {
    if (!textObj) return ""
    if (typeof textObj === "string") return textObj
    return textObj[locale] || textObj.en || ""
  }

  // Initialize with passed cars
  useEffect(() => {
    if (initialSelectedCars.length === 2) {
      const newSelections = initialSelectedCars.map((car) => ({
        brand: car.brand,
        model: getLocalizedText(car.name),
        year: "2023", // Default year
      }))
      setCarSelections(newSelections)
    }
  }, [initialSelectedCars])

  // Fetch cars data
  useEffect(() => {
    import("../../mock-data").then((data) => {
      const carsData = data.default || []
      setCars(carsData)

      // Extract unique brands
      const uniqueBrands = [...new Set(carsData.map((car) => car.brand))]
      setBrands(uniqueBrands)

      // Extract years
      const yearsList = []
      for (let i = 2023; i >= 2015; i--) {
        yearsList.push(i.toString())
      }
      setYears(yearsList)
    })
  }, [])

  // Update models when brand changes
  useEffect(() => {
    const currentSelection = carSelections[activeCarIndex]
    if (currentSelection.brand) {
      const brandModels = [
        ...new Set(cars.filter((car) => car.brand === currentSelection.brand).map((car) => getLocalizedText(car.name))),
      ]
      setModels(brandModels)
    } else {
      setModels([])
    }
  }, [carSelections, activeCarIndex, cars])

  const handleSelectBrand = (brand) => {
    const updatedSelections = [...carSelections]
    updatedSelections[activeCarIndex] = {
      ...updatedSelections[activeCarIndex],
      brand: brand,
      model: null,
    }
    setCarSelections(updatedSelections)
    setShowBrandDropdown(false)
  }

  const handleSelectModel = (model) => {
    const updatedSelections = [...carSelections]
    updatedSelections[activeCarIndex] = {
      ...updatedSelections[activeCarIndex],
      model: model,
    }
    setCarSelections(updatedSelections)
    setShowModelDropdown(false)
  }

  const handleSelectYear = (year) => {
    const updatedSelections = [...carSelections]
    updatedSelections[activeCarIndex] = {
      ...updatedSelections[activeCarIndex],
      year: year,
    }
    setCarSelections(updatedSelections)
    setShowYearDropdown(false)
  }

  const handleShowComparison = () => {
    const selectedCars = []

    for (const selection of carSelections) {
      if (selection.brand && selection.model) {
        const selectedCar = cars.find(
          (car) => car.brand === selection.brand && getLocalizedText(car.name) === selection.model,
        )
        if (selectedCar) {
          selectedCars.push(selectedCar)
        }
      }
    }

    if (selectedCars.length === 2) {
      onSelectCars(selectedCars)
      onClose()
    }
  }

  const renderCarSelectionSection = (index) => {
    const currentSelection = carSelections[index]
    const isActive = activeCarIndex === index

    return (
      <View className="bg-white rounded-xl p-4 mb-4 border border-gray-200">
        <TouchableOpacity
          className="flex-row justify-center items-center mb-4"
          onPress={() => setActiveCarIndex(index)}
        >
          <MaterialCommunityIcons
            name="car"
            size={24}
            color="#46194F"
            style={{ marginRight: isRTL ? 0 : 8, marginLeft: isRTL ? 8 : 0 }}
          />
          <AppText className="text-[#46194F] text-base font-almarai-bold">
            {locale === "ar"
              ? `أضف السيارة ${index === 0 ? "الأولى" : "الثانية"}`
              : `Add ${index === 0 ? "First" : "Second"} Car`}
          </AppText>
        </TouchableOpacity>

        {/* Brand Dropdown */}
        <View className="w-full mb-3 relative">
          <TouchableOpacity
            className={`flex-row ${isRTL ? "flex-row-reverse" : ""} justify-between items-center border border-gray-300 rounded-lg p-3 bg-white`}
            onPress={() => {
              setActiveCarIndex(index)
              setShowBrandDropdown(!showBrandDropdown)
              setShowModelDropdown(false)
              setShowYearDropdown(false)
            }}
          >
            <FontAwesome
              name="chevron-down"
              size={16}
              color="#46194F"
              style={{ marginLeft: isRTL ? 8 : 0, marginRight: isRTL ? 0 : 8 }}
            />
            <AppText className={`text-gray-800 ${isRTL ? "text-right" : "text-left"} flex-1 font-almarai`}>
              {currentSelection.brand || (locale === "ar" ? "الشركة المصنعة" : "Manufacturing Company")}
            </AppText>
          </TouchableOpacity>

          {isActive && showBrandDropdown && (
            <View className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-lg z-10 shadow-md">
              <ScrollView className="max-h-[200px]">
                {brands.map((brand) => (
                  <TouchableOpacity
                    key={brand}
                    className="p-3 border-b border-gray-200"
                    onPress={() => handleSelectBrand(brand)}
                  >
                    <AppText className={`font-almarai ${isRTL ? "text-right" : "text-left"}`}>{brand}</AppText>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}
        </View>

        {/* Model Dropdown */}
        <View className="w-full mb-3 relative">
          <TouchableOpacity
            className={`flex-row ${isRTL ? "flex-row-reverse" : ""} justify-between items-center border rounded-lg p-3 ${
              currentSelection.brand ? "bg-[#46194F] border-[#46194F]" : "bg-gray-100 border-gray-300"
            }`}
            onPress={() => {
              setActiveCarIndex(index)
              setShowModelDropdown(!showModelDropdown)
              setShowBrandDropdown(false)
              setShowYearDropdown(false)
            }}
            disabled={!currentSelection.brand}
          >
            <FontAwesome
              name="chevron-down"
              size={16}
              color={currentSelection.brand ? "white" : "#AAAAAA"}
              style={{ marginLeft: isRTL ? 8 : 0, marginRight: isRTL ? 0 : 8 }}
            />
            <AppText
              className={`${isRTL ? "text-right" : "text-left"} flex-1 font-almarai ${currentSelection.brand ? "text-white" : "text-gray-400"}`}
            >
              {currentSelection.model || (locale === "ar" ? "الطراز" : "Model")}
            </AppText>
          </TouchableOpacity>

          {isActive && showModelDropdown && (
            <View className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-lg z-10 shadow-md">
              <ScrollView className="max-h-[200px]">
                {models.map((model) => (
                  <TouchableOpacity
                    key={model}
                    className="p-3 border-b border-gray-200"
                    onPress={() => handleSelectModel(model)}
                  >
                    <AppText className={`font-almarai ${isRTL ? "text-right" : "text-left"}`}>{model}</AppText>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}
        </View>

        {/* Year Dropdown */}
        <View className="w-full mb-3 relative">
          <TouchableOpacity
            className={`flex-row ${isRTL ? "flex-row-reverse" : ""} justify-between items-center border border-gray-300 rounded-lg p-3 bg-white`}
            onPress={() => {
              setActiveCarIndex(index)
              setShowYearDropdown(!showYearDropdown)
              setShowBrandDropdown(false)
              setShowModelDropdown(false)
            }}
          >
            <FontAwesome
              name="chevron-down"
              size={16}
              color="#46194F"
              style={{ marginLeft: isRTL ? 8 : 0, marginRight: isRTL ? 0 : 8 }}
            />
            <AppText className={`text-gray-800 ${isRTL ? "text-right" : "text-left"} flex-1 font-almarai`}>
              {currentSelection.year || (locale === "ar" ? "السنة" : "Year")}
            </AppText>
          </TouchableOpacity>

          {isActive && showYearDropdown && (
            <View className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-lg z-10 shadow-md">
              <ScrollView className="max-h-[200px]">
                {years.map((year) => (
                  <TouchableOpacity
                    key={year}
                    className="p-3 border-b border-gray-200"
                    onPress={() => handleSelectYear(year)}
                  >
                    <AppText className={`font-almarai ${isRTL ? "text-right" : "text-left"}`}>{year}</AppText>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}
        </View>
      </View>
    )
  }

  const areAllSelectionsComplete = () => {
    return carSelections.every((selection) => selection.brand && selection.model)
  }

  return (
    <Modal visible={visible} animationType="slide" transparent={false} onRequestClose={onClose}>
      <View className="flex-1 bg-white" style={{ direction: isRTL ? "rtl" : "ltr" }}>
        {/* Header */}
        <View className="p-4 border-b border-gray-200 relative">
          <TouchableOpacity onPress={onClose} className={`absolute ${isRTL ? "right-4" : "left-4"} top-4 z-10`}>
            <Ionicons name="close-circle-outline" size={24} color="#000" />
          </TouchableOpacity>
          <View className="items-center">
            <AppText bold className="text-lg text-[#46194F] text-center font-almarai-bold">
              {locale === "ar" ? "قارن بين السيارات" : "Compare Cars"}
            </AppText>
            <AppText className="text-xs text-gray-600 text-center mt-1 font-almarai">
              {locale === "ar"
                ? "اختر سيارتين للمقارنة تناسب رغبتك"
                : "Choose two cars for comparison that suit your desire"}
            </AppText>
          </View>
        </View>

        <ScrollView className="flex-1 p-4">
          {/* Car Selection Sections */}
          {renderCarSelectionSection(0)}

          {/* Add Button */}
          <View className="items-center my-2">
            <TouchableOpacity className="w-10 h-10 rounded-full border border-[#46194F] justify-center items-center">
              <Ionicons name="add" size={24} color="#46194F" />
            </TouchableOpacity>
          </View>

          {renderCarSelectionSection(1)}

          {/* Show Comparison Button */}
          <TouchableOpacity
            className={`rounded-lg p-4 w-full items-center mt-4 ${
              areAllSelectionsComplete() ? "bg-[#46194F]" : "bg-gray-300"
            }`}
            onPress={handleShowComparison}
            disabled={!areAllSelectionsComplete()}
          >
            <AppText className="text-white font-almarai-bold">
              {locale === "ar" ? "عرض المقارنة" : "Show Comparison"}
            </AppText>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </Modal>
  )
}

export default CarSelectionModal
