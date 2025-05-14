"use client";

import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";
import AlmaraiFonts from "../../constants/fonts";

export default function TransmissionSelector({ selected, setSelected }) {
  const { t } = useTranslation();

  const transmissions = [
    { key: "automatic", label: t("car_specs.automatic", { defaultValue: "Automatic" }) },
    { key: "manual", label: t("car_specs.manual", { defaultValue: "Manual" }) },
  ];

  return (
    <View className="mb-6 px-1 p-6 bg-white border rounded-xl border-gray-300 gap-2">
      <View className="flex-row items-center mb-3">
        <Text
          className="text-lg text-brand"
          style={{
            fontFamily: AlmaraiFonts.bold,
          }}
        >
          {t("car_specs.transmission", { defaultValue: "Transmission" })}
        </Text>
      </View>

      <View className="flex-row gap-2">
        {transmissions.map((item) => {
          const isSelected = selected === item.key;
          return (
            <TouchableOpacity
              key={item.key}
              onPress={() => setSelected(isSelected ? null : item.key)}
              className={`flex-1 px-4 py-2 rounded-md border border-gray-200 items-center mr-1 ${
                isSelected ? "bg-brand" : "bg-gray-100"
              }`}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: isSelected ? AlmaraiFonts.bold : AlmaraiFonts.regular,
                  color: isSelected ? "#FFFFFF" : "#374151",
                }}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
