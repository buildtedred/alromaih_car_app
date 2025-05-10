"use client";

import { useState, useEffect } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { carDataService } from "../../services/carDataService";
import AlmaraiFonts from "../../constants/fonts";

const ModelSelection = ({ selectedBrand, selectedModel, onSelectModel, locale }) => {
  const [models, setModels] = useState([]);

  useEffect(() => {
    try {
      if (selectedBrand) {
        const modelsData = carDataService.getModelsByBrand(selectedBrand.key, locale);
        setModels(modelsData || []);
      } else {
        setModels([]);
      }
    } catch (error) {
      console.error("Error loading models:", error);
      setModels([]);
    }
  }, [selectedBrand, locale]);

  const handleSelectModel = (model) => {
    try {
      onSelectModel(model);
    } catch (error) {
      console.error("Error selecting model:", error);
    }
  };

  if (!models || models.length === 0) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text
          style={{
            fontSize: 14,
            fontFamily: AlmaraiFonts.regular,
            color: "#777",
            textAlign: "center",
          }}
        >
          {locale === "ar"
            ? "لا توجد موديلات متاحة لهذه العلامة"
            : "No models available for the selected brand"}
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1">
      <View className="flex-row flex-wrap justify-start">
        {models.map((model) => {
          if (!model || !model.key) return null;

          const modelName = model.name ? model.name.replace(/-/g, " ") : "";
          const isSelected = selectedModel?.key === model.key;

          return (
            <TouchableOpacity
              key={model.key}
              className={`m-2 p-2 rounded-[10px] items-center justify-center w-[28%] min-h-[70px] ${
                isSelected
                  ? "border-2 border-[#46194F]"
                  : "border border-gray-200"
              }`}
              onPress={() => handleSelectModel(model)}
            >
              <Text
                style={{
                  fontSize: 13,
                  textAlign: "center",
                  textTransform: "capitalize",
                  color: "#333",
                  fontFamily: isSelected
                    ? AlmaraiFonts.bold
                    : AlmaraiFonts.regular,
                }}
              >
                {modelName}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default ModelSelection;
