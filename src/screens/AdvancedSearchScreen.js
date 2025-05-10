"use client"

import { useState, useMemo, useEffect } from "react"
import { View, ScrollView, TouchableOpacity, Text, Alert, SafeAreaView } from "react-native"
import { useLocale } from "../contexts/LocaleContext"
import { useTranslation } from "react-i18next"
import { useFilters } from "../contexts/FilterContext"
import { useNavigation } from "@react-navigation/native"

import AlmaraiFonts from "../constants/fonts"
import carsData from "../mock-data"

import ModelSelectModal from "../components/AdvancedSearch/ModelSelectModal"
import ModelSelector from "../components/AdvancedSearch/ModelSelector"
import PriceRangeSlider from "../components/AdvancedSearch/PriceRangeSlider"
import ModelYearRangeSlider from "../components/AdvancedSearch/ModelYearRangeSlider"
import TransmissionSelector from "../components/AdvancedSearch/TransmissionSelector"
import EngineSelector from "../components/AdvancedSearch/EngineSelector"
import BrandSelector from "../components/AdvancedSearch/BrandSelector"
import BodyTypeSelector from "../components/AdvancedSearch/BodyTypeSelector"
import CategorySelector from "../components/AdvancedSearch/CategorySelector"

const getDynamicYearRange = () => {
  const years = carsData.map((car) => car.specs?.year).filter(Boolean)
  return [Math.min(...years), Math.max(...years)]
}

const getDynamicPriceRange = () => {
  const prices = carsData.map((car) => car.cashPrice).filter(Boolean)
  return [Math.min(...prices), Math.max(...prices)]
}

export default function AdvancedSearchScreen() {
  const { locale } = useLocale()
  const { t } = useTranslation()
  const { filters, setFilters, setFilteredCars, setIsFiltered, clearFilters } = useFilters()
  const navigation = useNavigation()

  const [minYearDefault, maxYearDefault] = getDynamicYearRange()
  const [minYear, setMinYear] = useState(minYearDefault)
  const [maxYear, setMaxYear] = useState(maxYearDefault)

  const [minPriceDefault, maxPriceDefault] = getDynamicPriceRange()
  const [priceRange, setPriceRange] = useState([minPriceDefault, maxPriceDefault])

  const [selectedBrand, setSelectedBrand] = useState(null)
  const [selectedModels, setSelectedModels] = useState([])
  const [selectedBodyType, setSelectedBodyType] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [modelModalVisible, setModelModalVisible] = useState(false)
  const [modelSearch, setModelSearch] = useState("")
  const [selectedTransmission, setSelectedTransmission] = useState(null)
  const [selectedEngine, setSelectedEngine] = useState(null)

  // Initialize form with existing filters when component mounts
  useEffect(() => {
    if (filters && Object.keys(filters).length > 0) {
      // Set brand if it exists
      if (filters.brand) {
        setSelectedBrand(filters.brand)
      }

      // Set models if they exist
      if (filters.models) {
        if (Array.isArray(filters.models)) {
          setSelectedModels(filters.models)
        } else {
          setSelectedModels(filters.models.split(",").map((m) => m.trim()))
        }
      }

      // Set body type if it exists
      if (filters.bodyType) {
        setSelectedBodyType(filters.bodyType)
      }

      // Set category if it exists
      if (filters.category) {
        setSelectedCategory(filters.category)
      }

      // Set transmission if it exists
      if (filters.transmission) {
        setSelectedTransmission(filters.transmission)
      }

      // Set engine/fuel if it exists
      if (filters.fuel) {
        setSelectedEngine(filters.fuel)
      }

      // Set price range if it exists
      if (filters.price) {
        const [min, max] = filters.price.split("-").map((v) => Number.parseInt(v.replace(/,/g, "")))
        setPriceRange([min, max])
      }

      // Set year range if it exists
      if (filters.year) {
        const [min, max] = filters.year.split("-").map((v) => Number.parseInt(v.trim()))
        setMinYear(min)
        setMaxYear(max)
      }
    }
  }, [filters])

  const engineOptions = useMemo(() => {
    const engines = new Set()
    carsData.forEach((car) => {
      const engine = car?.specs?.fuelType
      if (engine && typeof engine === "object") {
        engines.add(engine[locale])
      } else if (engine) {
        engines.add(engine.toString())
      }
    })
    return Array.from(engines)
  }, [locale])

  const modelOptions = useMemo(() => {
    const seen = new Set()
    return carsData
      .map((car) => {
        const key = car.model
        const name = typeof car.model === "object" ? car.model[locale] : car.model
        return { key, name }
      })
      .filter((m) => {
        if (seen.has(m.key)) return false
        seen.add(m.key)
        return m.name.toLowerCase().includes(modelSearch.toLowerCase())
      })
  }, [modelSearch, locale])

  const toggleModel = (modelKey) => {
    setSelectedModels((prev) => (prev.includes(modelKey) ? prev.filter((m) => m !== modelKey) : [...prev, modelKey]))
  }

  const clearAllFilters = () => {
    setSelectedModels([])
    setModelSearch("")
    setPriceRange([minPriceDefault, maxPriceDefault])
    setMinYear(minYearDefault)
    setMaxYear(maxYearDefault)
    setSelectedTransmission(null)
    setSelectedEngine(null)
    setSelectedBrand(null)
    setSelectedBodyType(null)
    setSelectedCategory(null)

    // Clear filters in context
    clearFilters()
  }

  const handleSearch = () => {
    const noFiltersSelected =
      selectedModels.length === 0 &&
      priceRange[0] === minPriceDefault &&
      priceRange[1] === maxPriceDefault &&
      minYear === minYearDefault &&
      maxYear === maxYearDefault &&
      !selectedBodyType &&
      !selectedCategory &&
      !selectedBrand &&
      !selectedTransmission &&
      !selectedEngine

    if (noFiltersSelected) {
      Alert.alert(t("common.select_filter_alert", "Please select at least one filter."))
      return
    }

    const filterParams = {
      ...(selectedBrand && { brand: selectedBrand }),
      ...(selectedModels.length > 0 && { models: selectedModels }),
      ...(selectedCategory && { category: selectedCategory }),
      ...(selectedBodyType && { bodyType: selectedBodyType }),
      ...(selectedTransmission && { transmission: selectedTransmission }),
      ...(selectedEngine && { fuel: selectedEngine }),
      price: `${priceRange[0]}-${priceRange[1]}`,
      year: `${minYear}-${maxYear}`,
    }

    const filteredCars = carsData.filter((car) => {
      const matchesBrand = !filterParams.brand || car.brand === filterParams.brand
      const matchesModels = !filterParams.models?.length || filterParams.models.includes(car.model)
      const matchesCategory = !filterParams.category || car.category === filterParams.category
      const matchesBodyType = !filterParams.bodyType || car.bodyType === filterParams.bodyType

      const carTransmission =
        typeof car.specs?.transmission === "object" ? car.specs?.transmission[locale] : car.specs?.transmission
      const matchesTransmission =
        !filterParams.transmission || carTransmission?.toLowerCase() === filterParams.transmission.toLowerCase()

      const carFuel = typeof car.specs?.fuelType === "object" ? car.specs?.fuelType[locale] : car.specs?.fuelType
      const matchesFuel = !filterParams.fuel || carFuel?.toLowerCase() === filterParams.fuel.toLowerCase()

      const matchesPrice = car.cashPrice >= priceRange[0] && car.cashPrice <= priceRange[1]
      const matchesYear = car.specs?.year >= minYear && car.specs?.year <= maxYear

      return (
        matchesBrand &&
        matchesModels &&
        matchesCategory &&
        matchesBodyType &&
        matchesTransmission &&
        matchesFuel &&
        matchesPrice &&
        matchesYear
      )
    })

    // Update the filter context
    setFilters(filterParams)
    setFilteredCars(filteredCars)
    setIsFiltered(true)

    // Navigate back to AllCarsScreen
    navigation.goBack()
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      {/* Header */}
      <View style={{ paddingVertical: 10, paddingHorizontal: 14 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <Text style={{ fontSize: 15, fontFamily: AlmaraiFonts.bold, color: "#46194F" }}>
            {t("screens.refine_search.title", "فلتـرة النتـائج")}
          </Text>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ width: 28, height: 28, alignItems: "center", justifyContent: "center" }}
          >
            <Text style={{ fontSize: 22, color: "#46194F", fontFamily: AlmaraiFonts.bold }}>×</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Filters */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 14,
          paddingTop: 10,
          paddingBottom: 90,
          backgroundColor: "#FFFFFF",
        }}
      >
        <View style={{ gap: 12 }}>
          {/* 1. Price Range */}
          <PriceRangeSlider
            min={minPriceDefault}
            max={maxPriceDefault}
            value={priceRange}
            onValueChange={setPriceRange}
          />

          {/* 2. Brand */}
          <View style={{ marginLeft: -8 }}>
            <BrandSelector selected={selectedBrand} setSelected={setSelectedBrand} layout="grid" titlePadding="px-2" />
          </View>

          {/* 3. Model */}
          <ModelSelector
            selectedModels={selectedModels}
            modelOptions={modelOptions}
            toggleModel={toggleModel}
            setModelModalVisible={setModelModalVisible}
          />

          {/* 4. Model Year Range */}
          <ModelYearRangeSlider
            min={minYearDefault}
            max={maxYearDefault}
            value={[minYear, maxYear]}
            onValueChange={(val) => {
              if (Array.isArray(val)) {
                setMinYear(val[0])
                setMaxYear(val[1])
              }
            }}
          />

          {/* 5. Body Type */}
          <BodyTypeSelector selected={selectedBodyType} setSelected={setSelectedBodyType} />

          {/* 6. Category */}
          <CategorySelector selected={selectedCategory} setSelected={setSelectedCategory} />

          {/* 7. Transmission */}
          <TransmissionSelector selected={selectedTransmission} setSelected={setSelectedTransmission} />

          {/* 8. Engine */}
          <EngineSelector
            selected={selectedEngine}
            setSelected={setSelectedEngine}
            engineOptions={engineOptions}
            locale={locale}
          />
        </View>
      </ScrollView>

      {/* Footer Buttons */}
      <View className="absolute bottom-0 left-0 right-0 bg-white px-4 py-2 flex-row border-t border-gray-200 shadow-sm">
        <TouchableOpacity
          onPress={clearAllFilters}
          className="flex-1 mr-2 py-2 rounded-lg bg-white border border-[#46194F] items-center justify-center"
        >
          <Text style={{ fontSize: 14, fontFamily: AlmaraiFonts.regular, color: "#46194F" }}>
            {t("common.clear_all", "Clear All")}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSearch}
          className="flex-1 ml-2 py-2 rounded-lg bg-[#46194F] items-center justify-center"
        >
          <Text style={{ fontSize: 14, fontFamily: AlmaraiFonts.bold, color: "#FFFFFF" }}>
            {t("common.search", "Search")}
          </Text>
        </TouchableOpacity>
      </View>

      <ModelSelectModal
        visible={modelModalVisible}
        onClose={() => setModelModalVisible(false)}
        options={modelOptions}
        toggleModel={toggleModel}
        selectedModels={selectedModels}
        search={modelSearch}
        setSearch={setModelSearch}
      />
    </SafeAreaView>
  )
}
