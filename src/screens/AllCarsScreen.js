"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import {
  View,
  Text,
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity,
  useWindowDimensions,
  Image,
  ScrollView,
} from "react-native"
import { useTranslation } from "react-i18next"
import { useNavigation, useRoute, useFocusEffect } from "@react-navigation/native"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"

import { fetchCars } from "../mock-data"
import AppHeader from "../components/common/AppHeader"
import AllCarCard from "../components/cars/AllCarCard"
import SortBottomSheet from "../components/AdvancedSearch/SortBottomSheet"
import BrandSelector from "../components/AdvancedSearch/BrandSelector"
import { useLocale } from "../contexts/LocaleContext"
import { useFilters } from "../contexts/FilterContext" // Import the filter context
import AlmaraiFonts from "../constants/fonts"

const sliderImages = [
  require("../assets/images/allcar_slide1.png"),
  require("../assets/images/allcar_slide2.png"),
  require("../assets/images/allcar_slide3.png"),
  require("../assets/images/allcar_slide5.png"),
]

const CARS_PER_PAGE = 8

export default function AllCarsScreen() {
  const { t } = useTranslation()
  const navigation = useNavigation()
  const route = useRoute()
  const { width } = useWindowDimensions()
  const { locale } = useLocale()
  const scrollViewRef = useRef(null)

  // Use the filter context
  const {
    filters,
    filteredCars: contextFilteredCars,
    isFiltered,
    setFilters,
    setFilteredCars,
    setIsFiltered,
    clearFilters,
  } = useFilters()

  const [activePair, setActivePair] = useState(0)
  const autoScrollTimer = useRef(null)

  const [allCars, setAllCars] = useState([])
  const [cars, setCars] = useState([])
  const [filteredCars, setLocalFilteredCars] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [activeFilters, setActiveFilters] = useState({})
  const [selectedSortOption, setSelectedSortOption] = useState(null)
  const [isSortModalVisible, setSortModalVisible] = useState(false)
  const [isFiltering, setIsFiltering] = useState(false)
  const [selectedBrand, setSelectedBrand] = useState(null)

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const flatListRef = useRef(null)

  // Track if initial data is loaded
  const initialLoadRef = useRef(false)
  // Track if we're handling a brand selection
  const handlingBrandSelectionRef = useRef(false)
  // Track if we're handling navigation params
  const handlingNavParamsRef = useRef(false)

  const imagePairs = []
  for (let i = 0; i < sliderImages.length; i += 2) {
    if (i + 1 < sliderImages.length) {
      imagePairs.push([sliderImages[i], sliderImages[i + 1]])
    } else {
      imagePairs.push([sliderImages[i], sliderImages[0]])
    }
  }

  useEffect(() => {
    startAutoScroll()
    return () => clearInterval(autoScrollTimer.current)
  }, [activePair])

  const startAutoScroll = () => {
    clearInterval(autoScrollTimer.current)
    autoScrollTimer.current = setInterval(() => {
      setActivePair((prev) => (prev + 1) % imagePairs.length)
    }, 3000)
  }

  // Load cars only once when component mounts
  useEffect(() => {
    const loadCars = async () => {
      if (initialLoadRef.current) return

      try {
        setLoading(true)
        const data = await fetchCars()
        setAllCars(data)
        initialLoadRef.current = true

        // Apply any existing filters from context
        if (isFiltered && contextFilteredCars.length > 0) {
          setLocalFilteredCars(contextFilteredCars)
          setCars(contextFilteredCars.slice(0, CARS_PER_PAGE))
          setTotalPages(Math.ceil(contextFilteredCars.length / CARS_PER_PAGE))
          setActiveFilters(filters)

          // Set selectedBrand if it exists in filters
          if (filters.brand) {
            setSelectedBrand(filters.brand)
          }
        } else {
          // Otherwise use all cars
          setLocalFilteredCars(data)
          setCars(data.slice(0, CARS_PER_PAGE))
          setTotalPages(Math.ceil(data.length / CARS_PER_PAGE))
        }
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadCars()
  }, []) // Empty dependency array - only run once

  // Handle filter changes from context
  useEffect(() => {
    if (!initialLoadRef.current || handlingBrandSelectionRef.current || handlingNavParamsRef.current) return

    if (isFiltered) {
      // Even if contextFilteredCars is empty, we should still show the empty state
      // when filters are applied
      setLocalFilteredCars(contextFilteredCars)
      setCars(contextFilteredCars.slice(0, CARS_PER_PAGE))
      setTotalPages(Math.ceil(contextFilteredCars.length / CARS_PER_PAGE))
      setActiveFilters(filters)

      // Set selectedBrand if it exists in filters
      if (filters.brand && selectedBrand !== filters.brand) {
        setSelectedBrand(filters.brand)
      } else if (!filters.brand && selectedBrand) {
        setSelectedBrand(null)
      }
    } else {
      // If filters are cleared, reset to all cars
      if (allCars.length > 0) {
        setLocalFilteredCars(allCars)
        setCars(allCars.slice(0, CARS_PER_PAGE))
        setTotalPages(Math.ceil(allCars.length / CARS_PER_PAGE))
        setActiveFilters({})
        setSelectedBrand(null)
      }
    }
  }, [isFiltered, contextFilteredCars, filters, allCars])

  // Handle brand selection in the UI
  const handleBrandSelection = useCallback(
    (brand) => {
      handlingBrandSelectionRef.current = true

      if (brand) {
        // Update local state
        setSelectedBrand(brand)
        setActiveFilters((prev) => ({ ...prev, brand }))

        // Update context
        setFilters((prev) => ({ ...prev, brand }))
        setIsFiltered(true)

        // Filter cars
        const brandFilteredCars = allCars.filter((car) => car.brand === brand)
        setFilteredCars(brandFilteredCars)
        setLocalFilteredCars(brandFilteredCars)
        setCars(brandFilteredCars.slice(0, CARS_PER_PAGE))
        setTotalPages(Math.ceil(brandFilteredCars.length / CARS_PER_PAGE))
        setCurrentPage(1)
      } else {
        // Clear brand filter
        setSelectedBrand(null)

        // Remove brand from local filters
        const { brand: localBrand, ...restLocal } = activeFilters
        setActiveFilters(restLocal)

        // Remove brand from context filters
        const { brand: contextBrand, ...restContext } = filters
        setFilters(restContext)

        // If no other filters exist, reset to all cars
        if (Object.keys(restContext).length === 0) {
          setIsFiltered(false)
          setLocalFilteredCars(allCars)
          setCars(allCars.slice(0, CARS_PER_PAGE))
          setTotalPages(Math.ceil(allCars.length / CARS_PER_PAGE))
        } else {
          // Otherwise, apply remaining filters
          applyFiltersAndSort(restContext, selectedSortOption)
        }
        setCurrentPage(1)
      }

      // Scroll to top when brand changes
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({ y: 0, animated: true })
      }

      setTimeout(() => {
        handlingBrandSelectionRef.current = false
      }, 100)
    },
    [allCars, activeFilters, filters, selectedSortOption],
  )

  // Replace the useEffect for selectedBrand with the direct handler
  useEffect(() => {
    // This effect is now empty as we handle brand selection directly in the handler
  }, [selectedBrand])

  // Apply sort option
  useEffect(() => {
    if (selectedSortOption && !handlingBrandSelectionRef.current && !handlingNavParamsRef.current) {
      applyFiltersAndSort(activeFilters, selectedSortOption)
    }
  }, [selectedSortOption])

  // Update displayed cars when page changes
  useEffect(() => {
    const startIndex = (currentPage - 1) * CARS_PER_PAGE
    const endIndex = startIndex + CARS_PER_PAGE
    setCars(filteredCars.slice(startIndex, endIndex))

    // Scroll to top when page changes
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({ offset: 0, animated: true })
    }
  }, [currentPage, filteredCars])

  // Handle navigation params when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      if (!initialLoadRef.current || !allCars.length) return

      // Check if filters were cleared from AdvancedSearchScreen
      if (route.params?.filtersCleared) {
        console.log("Filters were cleared from AdvancedSearchScreen")

        // Reset all filter-related state
        setActiveFilters({})
        setSelectedBrand(null)
        setIsFiltered(false)

        // Reset to all cars
        setLocalFilteredCars(allCars)
        setCars(allCars.slice(0, CARS_PER_PAGE))
        setTotalPages(Math.ceil(allCars.length / CARS_PER_PAGE))
        setCurrentPage(1)

        // Clear the params to prevent re-processing
        navigation.setParams({ filtersCleared: undefined })
        return
      }

      if (route.params?.selectedFilters) {
        handlingNavParamsRef.current = true
        console.log("Received filters from navigation:", route.params.selectedFilters)

        // Update local state
        setActiveFilters(route.params.selectedFilters)

        // Update context state
        setFilters(route.params.selectedFilters)
        setIsFiltered(true)

        // If brand filter is present, set the selectedBrand state
        if (route.params.selectedFilters.brand) {
          setSelectedBrand(route.params.selectedFilters.brand)
        }

        // Filter the cars
        let filtered = [...allCars]

        // Apply all filters from the params
        if (route.params.selectedFilters.brand) {
          filtered = filtered.filter((car) => car.brand === route.params.selectedFilters.brand)
        }

        if (route.params.selectedFilters.models) {
          const modelArr = Array.isArray(route.params.selectedFilters.models)
            ? route.params.selectedFilters.models
            : route.params.selectedFilters.models.split(",").map((m) => m.trim())

          filtered = filtered.filter((car) => modelArr.includes(car.model))
        }

        if (route.params.selectedFilters.category) {
          filtered = filtered.filter((car) => car.category === route.params.selectedFilters.category)
        }

        if (route.params.selectedFilters.bodyType) {
          filtered = filtered.filter((car) => car.bodyType === route.params.selectedFilters.bodyType)
        }

        // Always update the filtered cars list, even if it's empty
        setLocalFilteredCars(filtered)
        setFilteredCars(filtered)
        setCars(filtered.slice(0, CARS_PER_PAGE))
        setTotalPages(Math.ceil(filtered.length / CARS_PER_PAGE))
        setCurrentPage(1)

        // Clear the params to prevent re-processing
        navigation.setParams({ selectedFilters: undefined })

        setTimeout(() => {
          handlingNavParamsRef.current = false
        }, 100)
      }
    }, [route.params, allCars]),
  )

  // Check filter context state when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      // If filters are cleared but UI hasn't updated, reset the UI
      if (!isFiltered && Object.keys(activeFilters).length > 0) {
        setActiveFilters({})
        setSelectedBrand(null)

        if (allCars.length > 0) {
          setLocalFilteredCars(allCars)
          setCars(allCars.slice(0, CARS_PER_PAGE))
          setTotalPages(Math.ceil(allCars.length / CARS_PER_PAGE))
        }
      }
    }, [isFiltered, activeFilters, allCars]),
  )

  const applyFiltersAndSort = (filters, sortOption) => {
    setIsFiltering(true)
    let newList = [...allCars]

    if (filters.brand) {
      newList = newList.filter((car) => car.brand === filters.brand)
    }

    if (filters.models) {
      // Handle both string and array formats for models
      const modelArr = Array.isArray(filters.models) ? filters.models : filters.models.split(",").map((m) => m.trim())

      newList = newList.filter((car) => modelArr.includes(car.model))
    }

    if (filters.category) {
      newList = newList.filter((car) => car.category === filters.category)
    }

    if (filters.bodyType) {
      newList = newList.filter((car) => car.bodyType === filters.bodyType)
    }

    if (filters.transmission) {
      newList = newList.filter((car) => {
        const carTransmission =
          typeof car.specs?.transmission === "object" ? car.specs?.transmission[locale] : car.specs?.transmission

        return carTransmission?.toLowerCase() === filters.transmission.toLowerCase()
      })
    }

    if (filters.fuel) {
      newList = newList.filter((car) => {
        const carFuel = typeof car.specs?.fuelType === "object" ? car.specs?.fuelType[locale] : car.specs?.fuelType

        return carFuel?.toLowerCase() === filters.fuel.toLowerCase()
      })
    }

    if (filters.price) {
      const [min, max] = filters.price.split("-").map((v) => Number.parseInt(v.replace(/,/g, "")))
      newList = newList.filter((car) => car.cashPrice >= min && car.cashPrice <= max)
    }

    if (filters.year) {
      const [min, max] = filters.year.split("-").map((v) => Number.parseInt(v.trim()))
      newList = newList.filter((car) => car.specs?.year >= min && car.specs?.year <= max)
    }

    if (sortOption === "price_low") {
      newList.sort((a, b) => (a.cashPrice || 0) - (b.cashPrice || 0))
    } else if (sortOption === "price_high") {
      newList.sort((a, b) => (b.cashPrice || 0) - (a.cashPrice || 0))
    } else if (sortOption === "year_newest") {
      newList.sort((a, b) => (b.specs?.year || 0) - (a.specs?.year || 0))
    } else if (sortOption === "year_oldest") {
      newList.sort((a, b) => (a.specs?.year || 0) - (b.specs?.year || 0))
    }

    // Always update the filtered cars list, even if it's empty
    setLocalFilteredCars(newList)
    setFilteredCars(newList)
    setTotalPages(Math.ceil(newList.length / CARS_PER_PAGE))
    setIsFiltering(false)
  }

  const handlePress = (car) => {
    navigation.navigate("Gallery", { car })
  }

  const renderSlideCard = (image, index) => {
    const backgroundColor = index % 2 === 0 ? "#46194F" : "#8BC6B9"
    return (
      <View
        key={`slide-${activePair}-${index}`}
        style={{
          width: width * 0.485,
          height: 140,
          borderRadius: 10,
          overflow: "hidden",
          backgroundColor,
          marginHorizontal: width * 0.003,
        }}
      >
        <Image
          source={image}
          style={{
            width: "100%",
            height: "100%",
            resizeMode: "cover",
            borderRadius: 10,
          }}
        />
      </View>
    )
  }

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return
    setCurrentPage(page)
  }

  const renderPaginationItem = (pageNumber) => {
    const isActive = pageNumber === currentPage
    return (
      <TouchableOpacity
        key={`page-${pageNumber}`}
        onPress={() => handlePageChange(pageNumber)}
        style={{
          width: 30,
          height: 30,
          borderRadius: 15,
          backgroundColor: isActive ? "#46194F" : "white",
          borderWidth: 1,
          borderColor: "#46194F",
          justifyContent: "center",
          alignItems: "center",
          marginHorizontal: 4,
        }}
      >
        <Text
          style={{
            color: isActive ? "white" : "#46194F",
            fontWeight: isActive ? "bold" : "normal",
          }}
        >
          {pageNumber}
        </Text>
      </TouchableOpacity>
    )
  }

  const renderPagination = () => {
    if (totalPages <= 1) return null

    const pageNumbers = []
    const maxVisiblePages = 5

    // Always show first page
    pageNumbers.push(1)

    // Calculate range of pages to show
    let startPage = Math.max(2, currentPage - 1)
    let endPage = Math.min(totalPages - 1, currentPage + 1)

    // Adjust if we're at the beginning
    if (currentPage <= 2) {
      endPage = Math.min(totalPages - 1, maxVisiblePages - 1)
    }

    // Adjust if we're at the end
    if (currentPage >= totalPages - 2) {
      startPage = Math.max(2, totalPages - maxVisiblePages + 2)
    }

    // Add ellipsis after first page if needed
    if (startPage > 2) {
      pageNumbers.push("...")
    }

    // Add middle pages
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i)
    }

    // Add ellipsis before last page if needed
    if (endPage < totalPages - 1) {
      pageNumbers.push("...")
    }

    // Always show last page if there is more than one page
    if (totalPages > 1) {
      pageNumbers.push(totalPages)
    }

    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          paddingVertical: 16,
          marginBottom: 20,
        }}
      >
        <TouchableOpacity
          onPress={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          style={{
            width: 30,
            height: 30,
            borderRadius: 15,
            backgroundColor: "white",
            borderWidth: 1,
            borderColor: "#46194F",
            justifyContent: "center",
            alignItems: "center",
            marginHorizontal: 4,
            opacity: currentPage === 1 ? 0.5 : 1,
          }}
        >
          <Icon name="chevron-left" size={20} color="#46194F" />
        </TouchableOpacity>

        {pageNumbers.map((page, index) => {
          if (page === "...") {
            return (
              <Text
                key={`ellipsis-${index}`}
                style={{
                  marginHorizontal: 4,
                  color: "#46194F",
                }}
              >
                ...
              </Text>
            )
          }
          return renderPaginationItem(page)
        })}

        <TouchableOpacity
          onPress={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          style={{
            width: 30,
            height: 30,
            borderRadius: 15,
            backgroundColor: "white",
            borderWidth: 1,
            borderColor: "#46194F",
            justifyContent: "center",
            alignItems: "center",
            marginHorizontal: 4,
            opacity: currentPage === totalPages ? 0.5 : 1,
          }}
        >
          <Icon name="chevron-right" size={20} color="#46194F" />
        </TouchableOpacity>
      </View>
    )
  }

  if (loading) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#46194F" />
      </SafeAreaView>
    )
  }

  if (error) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-white">
        <Text className="text-red-500 text-lg">{t("common.loading_error")}</Text>
      </SafeAreaView>
    )
  }

  // Check if there are any active filters in either local state or context
  const hasActiveFilters = Object.keys(activeFilters).length > 0 || isFiltered
  const filterCount = Object.keys(filters).length || Object.keys(activeFilters).length

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 }}
      >
        <View className="mb-4 flex-row justify-center">
          {imagePairs[activePair].map((img, index) => renderSlideCard(img, index))}
        </View>

        {/* Sort & Filter */}
        <View className="flex-row justify-between items-center px-4 pb-4">
          <TouchableOpacity
            onPress={() => setSortModalVisible(true)}
            style={{
              flex: 1,
              borderWidth: 2,
              borderColor: "#46194F",
              backgroundColor: selectedSortOption ? "#f5f0f7" : "white",
              borderRadius: 6,
              paddingVertical: 8,
              marginRight: 8,
            }}
          >
            <View className="flex-row items-center justify-center">
              <Icon name="sort" size={20} color="#46194F" />
              <Text
                style={{
                  color: "#46194F",
                  fontWeight: "500",
                  marginLeft: 8,
                }}
              >
                {t("common.sort_by")}
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("AdvancedSearch")}
            style={{
              flex: 1,
              borderWidth: 2,
              borderColor: "#46194F",
              backgroundColor: hasActiveFilters ? "#f5f0f7" : "white",
              borderRadius: 6,
              paddingVertical: 8,
              position: "relative",
            }}
          >
            <View className="flex-row items-center justify-center">
              <Icon name="filter-variant" size={20} color="#46194F" />
              <Text
                style={{
                  color: "#46194F",
                  fontWeight: "500",
                  marginLeft: 8,
                }}
              >
                {t("common.filter_results")}
              </Text>
              {hasActiveFilters && (
                <View
                  style={{
                    position: "absolute",
                    top: -8,
                    right: -8,
                    backgroundColor: "#46194F",
                    borderRadius: 10,
                    width: 20,
                    height: 20,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ color: "white", fontSize: 12, fontWeight: "bold" }}>{filterCount}</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        </View>

        {/* Brand Filter */}
        <View className="mb-4">
          <View className="px-4 mb-2">
            <Text
              style={{
                fontSize: 15,
                fontFamily: AlmaraiFonts.bold,
                color: "#46194F",
                width: "100%",
              }}
            >
              {t("common.brand_instruction")}
            </Text>
          </View>
          <BrandSelector selected={selectedBrand} setSelected={handleBrandSelection} showTitle={false} />
        </View>

        {/* Car Grid */}
        <View style={{ padding: 4, flexDirection: "row", flexWrap: "wrap" }}>
          {cars.length > 0 ? (
            cars.map((item) => (
              <View key={item.id} style={{ width: "50%", padding: 4 }}>
                <AllCarCard car={item} onPress={() => handlePress(item)} />
              </View>
            ))
          ) : (
            <View style={{ width: "100%", alignItems: "center", justifyContent: "center", paddingVertical: 40 }}>
              <Icon name="car-off" size={40} color="#9ca3af" />
              <Text style={{ marginTop: 8, color: "#6b7280", textAlign: "center" }}>
                {hasActiveFilters
                  ? t("common.no_cars_match_filters", "No cars match your selected filters")
                  : t("common.no_cars_found", "No cars found")}
              </Text>
              {hasActiveFilters && (
                <TouchableOpacity
                  onPress={() => {
                    clearFilters()
                    setActiveFilters({})
                    setSelectedBrand(null)
                    setIsFiltered(false)
                    setLocalFilteredCars(allCars)
                    setCars(allCars.slice(0, CARS_PER_PAGE))
                    setTotalPages(Math.ceil(allCars.length / CARS_PER_PAGE))
                  }}
                  style={{
                    marginTop: 16,
                    paddingHorizontal: 16,
                    paddingVertical: 8,
                    backgroundColor: "#46194F",
                    borderRadius: 8,
                  }}
                >
                  <Text style={{ color: "white", fontFamily: AlmaraiFonts.regular }}>
                    {t("common.clear_filters", "Clear Filters")}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        </View>

        {/* Pagination */}
        {renderPagination()}
      </ScrollView>

      <SortBottomSheet
        isVisible={isSortModalVisible}
        onClose={() => setSortModalVisible(false)}
        onSelect={setSelectedSortOption}
        selectedOption={selectedSortOption}
      />

      {isFiltering && (
        <View className="absolute inset-0 justify-center items-center bg-black bg-opacity-10 z-10">
          <ActivityIndicator size="large" color="#46194F" />
        </View>
      )}
    </SafeAreaView>
  )
}
