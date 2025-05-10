"use client";

import { useState, useEffect } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { carDataService } from "../../services/carDataService";
import AlmaraiFonts from "../../constants/fonts";

const YearSelection = ({ selectedYear, onSelectYear, locale }) => {
  const [years, setYears] = useState([]);

  useEffect(() => {
    setYears(carDataService.getYears());
  }, []);

  return (
    <View className="flex-1">
      <View className="flex-row flex-wrap justify-start">
        {years.map((year) => (
          <TouchableOpacity
            key={String(year)}
            className={`m-2 p-2 rounded-[10px] items-center justify-center w-[28%] min-h-[70px] ${
              selectedYear === year
                ? "border-2 border-[#46194F]"
                : "border border-gray-200"
            }`}
            onPress={() => onSelectYear(year)}
          >
            <Text
              style={{
                fontSize: 13,
                color: "#333",
                textAlign: "center",
                fontFamily:
                  selectedYear === year
                    ? AlmaraiFonts.bold
                    : AlmaraiFonts.regular,
              }}
            >
              {String(year)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default YearSelection;
