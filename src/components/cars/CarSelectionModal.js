"use client"
import { useState, useEffect } from "react"
import { View, Modal, TouchableOpacity, ScrollView, Dimensions } from "react-native"
import { useLocale } from "../../contexts/LocaleContext"
import AppText from "../common/AppText"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import Ionicons from "react-native-vector-icons/Ionicons"
import PlusIcon from "../../assets/Icon/plus.svg"

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window')

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

  const getLocalizedText = (textObj) => {
    if (!textObj) return ""
    if (typeof textObj === "string") return textObj
    return textObj[locale] || textObj.en || ""
  }

  useEffect(() => {
    if (initialSelectedCars.length === 2) {
      const newSelections = initialSelectedCars.map((car) => ({
        brand: car.brand,
        model: getLocalizedText(car.name),
        year: "2023",
      }))
      setCarSelections(newSelections)
    }
  }, [initialSelectedCars])

  useEffect(() => {
    import("../../mock-data").then((data) => {
      const carsData = data.default || []
      setCars(carsData)
      const uniqueBrands = [...new Set(carsData.map((car) => car.brand))]
      setBrands(uniqueBrands)
      const yearsList = []
      for (let i = 2023; i >= 2015; i--) {
        yearsList.push(i.toString())
      }
      setYears(yearsList)
    })
  }, [])

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
      <View className={`bg-white rounded-xl p-4 border border-gray-200 justify-between${index === 0 ? '' : ' mb-4'}`}>
        <TouchableOpacity
          className="flex-row justify-center items-center mb-4"
          onPress={() => setActiveCarIndex(index)}
        >
          <MaterialCommunityIcons
            name="car"
            size={13}
            color="#46194F"
            style={{ marginRight: isRTL ? 0 : 8, marginLeft: isRTL ? 8 : 0 }}
          />
          <AppText className="text-[#46194F] text-base font-almarai-bold" style={{ fontSize: 9 }}>
            {locale === "ar"
              ? `أضف السيارة ${index === 0 ? "الأولى" : "الثانية"}`
              : `Add ${index === 0 ? "First" : "Second"} Car`}
          </AppText>
        </TouchableOpacity>

        <View className="w-full mb-3 relative">
          <TouchableOpacity
            className={`flex-row ${isRTL ? "flex-row-reverse" : ""} justify-between items-center border border-gray-300 rounded-[10px] p-1 bg-white`}
            style={{ borderRadius: 5 }}
            onPress={() => {
              setActiveCarIndex(index)
              setShowBrandDropdown(!showBrandDropdown)
              setShowModelDropdown(false)
              setShowYearDropdown(false)
            }}
          >
            <FontAwesome
              name="chevron-down"
              size={13}
              color="#46194F"
              style={{ marginLeft: isRTL ? 8 : 0, marginRight: isRTL ? 0 : 8 }}
            />
            <AppText className={`text-gray-800 ${isRTL ? "text-right" : "text-left"} flex-1 font-almarai`} style={{ fontSize: 9 }}>
              {currentSelection.brand || (locale === "ar" ? "الشركة المصنعة" : "Manufacturing Company")}
            </AppText>
          </TouchableOpacity>

          {isActive && showBrandDropdown && (
            <View className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-[10px] z-10 shadow-md mt-1">
              <ScrollView className="max-h-[150px]">
                {brands.map((brand) => (
                  <TouchableOpacity
                    key={brand}
                    className="p-3 border-b border-gray-200"
                    onPress={() => handleSelectBrand(brand)}
                  >
                    <AppText className={`font-almarai ${isRTL ? "text-right" : "text-left"}`} style={{ fontSize: 7 }}>
                      {brand}
                    </AppText>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}
        </View>

        <View className="w-full mb-3 relative">
          <TouchableOpacity
            className={`flex-row ${isRTL ? "flex-row-reverse" : ""} justify-between items-center border rounded-[10px] p-1 ${
              currentSelection.brand ? "bg-[#46194F] border-[#46194F]" : "bg-gray-100 border-gray-300"
            }`}
            style={{ borderRadius: 5 }}
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
              size={13}
              color={currentSelection.brand ? "white" : "#AAAAAA"}
              style={{ marginLeft: isRTL ? 8 : 0, marginRight: isRTL ? 0 : 8 }}
            />
            <AppText
              className={`${isRTL ? "text-right" : "text-left"} flex-1 font-almarai ${currentSelection.brand ? "text-white" : "text-gray-400"}`}
              style={{ fontSize: 9 }}
            >
              {currentSelection.model || (locale === "ar" ? "الطراز" : "Model")}
            </AppText>
          </TouchableOpacity>

          {isActive && showModelDropdown && (
            <View className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-[10px] z-10 shadow-md mt-1">
              <ScrollView className="max-h-[150px]">
                {models.map((model) => (
                  <TouchableOpacity
                    key={model}
                    className="p-3 border-b border-gray-200"
                    onPress={() => handleSelectModel(model)}
                  >
                    <AppText className={`font-almarai ${isRTL ? "text-right" : "text-left"}`} style={{ fontSize: 7 }}>
                      {model}
                    </AppText>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}
        </View>

        <View className="w-full mb-3 relative">
          <TouchableOpacity
            className={`flex-row ${isRTL ? "flex-row-reverse" : ""} justify-between items-center border border-gray-300 rounded-[10px] p-1 bg-white`}
            style={{ borderRadius: 5 }}
            onPress={() => {
              setActiveCarIndex(index)
              setShowYearDropdown(!showYearDropdown)
              setShowBrandDropdown(false)
              setShowModelDropdown(false)
            }}
          >
            <FontAwesome
              name="chevron-down"
              size={13}
              color="#46194F"
              style={{ marginLeft: isRTL ? 8 : 0, marginRight: isRTL ? 0 : 8 }}
            />
            <AppText className={`text-gray-800 ${isRTL ? "text-right" : "text-left"} flex-1 font-almarai`} style={{ fontSize: 9 }}>
              {currentSelection.year || (locale === "ar" ? "السنة" : "Year")}
            </AppText>
          </TouchableOpacity>

          {isActive && showYearDropdown && (
            <View className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-[10px] z-10 shadow-md mt-1">
              <ScrollView className="max-h-[150px]">
                {years.map((year) => (
                  <TouchableOpacity
                    key={year}
                    className="p-3 border-b border-gray-200"
                    onPress={() => handleSelectYear(year)}
                  >
                    <AppText className={`font-almarai ${isRTL ? "text-right" : "text-left"}`} style={{ fontSize: 7 }}>
                      {year}
                    </AppText>
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
    <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onClose}>
      <View
        style={{
          position: "absolute",
          top: 80,
          bottom: 60,
          left: 0,
          right: 0,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "transparent",
          zIndex: 1000,
        }}
        pointerEvents="box-none"
      >
        <View
          className="bg-white rounded-xl border-2 border-[#46194F] overflow-hidden"
          style={{
            width: SCREEN_WIDTH * 0.92,
            height: SCREEN_HEIGHT * 0.78 - 20,
            maxHeight: SCREEN_HEIGHT * 0.85 - 20,
            marginBottom: 38,
            borderColor: '#E5E7EB',
          }}
        >
          <View className=" relative">
            <TouchableOpacity onPress={onClose} className={`absolute ${isRTL ? "right-4" : "left-4"} top-4 z-10`}>
              <Ionicons name="close-circle-outline" size={20} color="#000" />
            </TouchableOpacity>
            <View className="items-center">
              <AppText bold className="text-lg text-[#46194F] text-center font-almarai-bold" style={{ fontSize: 11 }}>
                {locale === "ar" ? "قارن بين السيارات" : "Compare Cars"}
              </AppText>
              <AppText className="text-xs text-gray-600 text-center mt-1 font-almarai" style={{ fontSize: 8 }}>
                {locale === "ar"
                  ? "اختر سيارتين للمقارنة تناسب رغبتك"
                  : "Choose two cars for comparison that suit your desire"}
              </AppText>
            </View>
          </View>

          <ScrollView 
            className="flex-1" 
            contentContainerStyle={{ padding: 16 }}
            showsVerticalScrollIndicator={false}
          >
            {renderCarSelectionSection(0)}

            {renderCarSelectionSection(1)}

            <View className="items-center">
              <TouchableOpacity className="w-7 h-7 rounded-full justify-center items-center">
                <PlusIcon width={13} height={13} />
              </TouchableOpacity>
            </View>

            <View className="items-center">
              <TouchableOpacity
                className={`rounded-[10px] items-center justify-center ${
                  areAllSelectionsComplete() ? "bg-[#46194F]" : "bg-gray-300"
                }`}
                style={{ height: 32, width: 100, padding: 8 }}
                onPress={handleShowComparison}
                disabled={!areAllSelectionsComplete()}
              >
                <AppText className="text-white font-almarai-bold" style={{ fontSize: 11 }}>
                  {locale === "ar" ? "عرض المقارنة" : "Show Comparison"}
                </AppText>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  )
}

export default CarSelectionModal