"use client";

import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { Slider } from "@miblanchard/react-native-slider";
import { useLocale } from "../../contexts/LocaleContext";
import AlmaraiFonts from "../../constants/fonts";

export default function ModelYearRangeSlider({
  min = 1970,
  max = 2025,
  value = [2018, 2024],
  onValueChange,
}) {
  const [localValue, setLocalValue] = useState(value);
  const { locale } = useLocale();

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleChange = (val) => {
    setLocalValue(val);
    if (onValueChange) onValueChange(val);
  };

  return (
    <View
      style={{
        marginBottom: 24,
        marginTop: 24,
        padding: 24,
        paddingHorizontal: 8,
        backgroundColor: "white",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#D1D5DB",
      }}
    >
      {/* Title */}
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 12 }}>
        <Text
          style={{
            fontSize: 18,
            fontFamily: AlmaraiFonts.bold,
            color: "#46194F",
          }}
        >
          {locale === "ar" ? "نطاق سنة الموديل" : "Model Year Range"}
        </Text>
      </View>

      {/* Value Boxes */}
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
        <View
          style={{
            flex: 1,
            backgroundColor: "white",
            paddingVertical: 8,
            paddingHorizontal: 16,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: "#D1D5DB",
            alignItems: "center",
            marginRight: 4,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontFamily: AlmaraiFonts.regular,
              color: "#4B5563",
            }}
          >
            {localValue[0]}
          </Text>
        </View>
        <Text
          style={{
            marginHorizontal: 8,
            fontSize: 14,
            color: "#6B7280",
            fontFamily: AlmaraiFonts.regular,
          }}
        >
          {locale === "ar" ? "إلى" : "to"}
        </Text>
        <View
          style={{
            flex: 1,
            backgroundColor: "white",
            paddingVertical: 8,
            paddingHorizontal: 16,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: "#D1D5DB",
            alignItems: "center",
            marginLeft: 4,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontFamily: AlmaraiFonts.regular,
              color: "#4B5563",
            }}
          >
            {localValue[1]}
          </Text>
        </View>
      </View>

      {/* Slider */}
      <View style={{ marginTop: 12, paddingHorizontal: 8 }}>
        <Slider
          value={localValue}
          minimumValue={min}
          maximumValue={max}
          step={1}
          onValueChange={handleChange}
          animateTransitions
          thumbTintColor="#46194F"
          minimumTrackTintColor="#46194F"
          maximumTrackTintColor="#E5E7EB"
          containerStyle={{ height: 50, justifyContent: "center" }}
          trackStyle={{ height: 4, borderRadius: 2 }}
          thumbStyle={{
            width: 24,
            height: 24,
            borderRadius: 12,
            backgroundColor: "#fff",
            borderWidth: 2,
            borderColor: "#003366",
            elevation: 2,
          }}
        />
      </View>
    </View>
  );
}
