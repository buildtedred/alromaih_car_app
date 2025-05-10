"use client";

import { useState, useEffect } from "react";
import { View, TouchableOpacity, Image, Text } from "react-native";
import { carDataService } from "../../services/carDataService";
import AlmaraiFonts from "../../constants/fonts";

const CategorySelection = ({ selectedCategory, onSelectCategory, locale }) => {
  const [bodyTypes, setBodyTypes] = useState([]);

  useEffect(() => {
    setBodyTypes(carDataService.getBodyTypes(locale));
  }, [locale]);

  return (
    <View className="flex-1">
      <View className="flex-row flex-wrap justify-start">
        {bodyTypes.map((bodyType) => {
          const isSelected = selectedCategory?.key === bodyType.key;
          return (
            <TouchableOpacity
              key={bodyType.key}
              className={`m-2 p-2 rounded-[10px] items-center justify-center w-[28%] min-h-[70px] ${
                isSelected
                  ? "border-2 border-[#46194F]"
                  : "border border-gray-200"
              }`}
              onPress={() => onSelectCategory(bodyType)}
            >
              {bodyType.icon && (
                <Image
                  source={{ uri: bodyType.icon }}
                  style={{ width: 35, height: 35, marginBottom: 4 }}
                  resizeMode="contain"
                />
              )}
              <Text
                style={{
                  fontSize: 13,
                  color: "#333",
                  textAlign: "center",
                  fontFamily: isSelected
                    ? AlmaraiFonts.bold
                    : AlmaraiFonts.regular,
                }}
              >
                {bodyType.name || ""}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default CategorySelection;
