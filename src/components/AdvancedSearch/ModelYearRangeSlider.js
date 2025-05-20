"use client"

import { useState, useEffect } from "react"
import { View, Text, TouchableOpacity, ScrollView } from "react-native"
import { useLocale } from "../../contexts/LocaleContext"
import AlmaraiFonts from "../../constants/fonts"

export default function YearSelector({ min = 1970, max = 2025, value = null, onValueChange }) {
  const [selectedYear, setSelectedYear] = useState(value)
  const { locale } = useLocale()

  // Generate years array dynamically based on min and max
  const generateYears = () => {
    const yearsArray = []
    // Generate years in descending order (newest first)
    for (let year = max; year >= min; year--) {
      yearsArray.push(year)
    }
    return yearsArray
  }

  const years = generateYears()

  // Update selected year when value prop changes (for reset functionality)
  useEffect(() => {
    setSelectedYear(value)
  }, [value])

  const handleYearSelect = (year) => {
    // If the year is already selected, deselect it
    const newValue = selectedYear === year ? null : year
    setSelectedYear(newValue)

    // For compatibility with the existing code, pass an array [year, year] if a year is selected
    // or [min, max] if no year is selected (to show all years)
    if (onValueChange) {
      if (newValue === null) {
        onValueChange([min, max])
      } else {
        onValueChange([newValue, newValue])
      }
    }
  }

  return (
    <View className="mb-6 mt-6 p-6 px-4 bg-white rounded-xl border border-gray-300">
      {/* Title */}
      <View className="flex-row items-center mb-4">
        <Text style={{ fontFamily: AlmaraiFonts.bold }} className="text-lg text-[#46194F]">
          {locale === "ar" ? "السنة" : "Year"}
        </Text>
      </View>

      {/* Year Options - Horizontal Scrollable Row */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingRight: 16,
          paddingBottom: 8,
        }}
        className="flex-row"
      >
        {years.map((year) => (
          <TouchableOpacity
            key={year}
            onPress={() => handleYearSelect(year)}
            className="flex-row items-center bg-white py-2 px-4 rounded-[10px] border border-gray-300 mr-3 min-w-[90px] justify-between"
          >
            <Text style={{ fontFamily: AlmaraiFonts.regular }} className="text-sm text-[#46194F]">
              {year}
            </Text>
            <View className="w-5 h-5 rounded-full border border-[#46194F] justify-center items-center ml-2">
              {selectedYear === year && <View className="w-3 h-3 rounded-full bg-[#46194F]" />}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  )
}
