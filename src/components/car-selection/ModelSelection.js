"use client"

import { useState, useEffect, useMemo } from "react"
import { View, TouchableOpacity, Text, Dimensions } from "react-native"
import { carDataService } from "../../services/carDataService"
import AlmaraiFonts from "../../constants/fonts"

const ModelSelection = ({ selectedBrand, selectedModel, onSelectModel, locale, sizeClass: propSizeClass }) => {
  const [models, setModels] = useState([])
  const [screenWidth, setScreenWidth] = useState(Dimensions.get("window").width)

  // Listen for dimension changes
  useEffect(() => {
    const dimensionsHandler = ({ window }) => {
      setScreenWidth(window.width)
    }

    const subscription = Dimensions.addEventListener("change", dimensionsHandler)

    return () => subscription.remove()
  }, [])

  // Determine size class based on screen width if not provided by parent
  const sizeClass = useMemo(() => {
    if (propSizeClass) return propSizeClass
    if (screenWidth < 360) return "small"
    if (screenWidth < 480) return "medium"
    return "large"
  }, [screenWidth, propSizeClass])

  // Get responsive values based on size class
  const sizes = useMemo(() => {
    switch (sizeClass) {
      case "small":
        return {
          fontSize: 11,
          itemWidth: "30%", // Slightly wider on small screens
          itemHeight: 55,
          itemMargin: 1.5,
          itemPadding: 1.5,
          noDataFontSize: 12,
        }
      case "medium":
        return {
          fontSize: 12,
          itemWidth: "28%",
          itemHeight: 60,
          itemMargin: 1.5,
          itemPadding: 2,
          noDataFontSize: 13,
        }
      default: // large
        return {
          fontSize: 13,
          itemWidth: "28%",
          itemHeight: 65,
          itemMargin: 2,
          itemPadding: 2,
          noDataFontSize: 14,
        }
    }
  }, [sizeClass])

  useEffect(() => {
    try {
      if (selectedBrand) {
        const modelsData = carDataService.getModelsByBrand(selectedBrand.key, locale)
        setModels(modelsData || [])
      } else {
        setModels([])
      }
    } catch (error) {
      console.error("Error loading models:", error)
      setModels([])
    }
  }, [selectedBrand, locale])

  const handleSelectModel = (model) => {
    try {
      onSelectModel(model)
    } catch (error) {
      console.error("Error selecting model:", error)
    }
  }

  if (!models || models.length === 0) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text
          style={{
            fontSize: sizes.noDataFontSize,
            fontFamily: AlmaraiFonts.regular,
            color: "#777",
            textAlign: "center",
          }}
        >
          {locale === "ar" ? "لا توجد موديلات متاحة لهذه العلامة" : "No models available for the selected brand"}
        </Text>
      </View>
    )
  }

  return (
    <View className="flex-1">
      <View className="flex-row flex-wrap justify-start px-2">
        {models.map((model) => {
          if (!model || !model.key) return null

          const modelName = model.name ? model.name.replace(/-/g, " ") : ""
          const isSelected = selectedModel?.key === model.key

          return (
            <TouchableOpacity
              key={model.key}
              className={`rounded-[10px] items-center justify-center ${
                isSelected ? "border-2 border-[#46194F]" : "border border-gray-200"
              }`}
              style={{
                width: sizes.itemWidth,
                minHeight: sizes.itemHeight,
                margin: sizes.itemMargin * 4,
                padding: sizes.itemPadding * 4,
              }}
              onPress={() => handleSelectModel(model)}
            >
              <Text
                style={{
                  fontSize: sizes.fontSize,
                  textAlign: "center",
                  textTransform: "capitalize",
                  color: "#333",
                  fontFamily: isSelected ? AlmaraiFonts.bold : AlmaraiFonts.regular,
                }}
                numberOfLines={2}
                ellipsizeMode="tail"
              >
                {modelName}
              </Text>
            </TouchableOpacity>
          )
        })}
      </View>
    </View>
  )
}

export default ModelSelection
