"use client"

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import AlmaraiFonts from '../../constants/fonts';

export default function EngineSelector({ selected, setSelected, engineOptions }) {
  const { t } = useTranslation();

  return (
    <View className="mb-6 px-1 p-6 bg-white border rounded-xl border-gray-300 gap-2">
      {/* Header Title */}
      <View className="flex-row items-center mb-3">
        <Text
          className="text-lg text-brand"
          style={{ fontFamily: AlmaraiFonts.bold }}
        >
          {t('car_specs.engine', { defaultValue: 'Engine' })}
        </Text>
      </View>

      {/* Option Buttons */}
      <View className="flex-row flex-wrap gap-2">
        {engineOptions.map((type) => {
          const isSelected = selected === type;
          return (
            <TouchableOpacity
              key={type}
              onPress={() => setSelected(isSelected ? null : type)}
              className={`px-4 py-2 rounded-md border border-gray-300 ${
                isSelected ? 'bg-brand' : 'bg-gray-100'
              }`}
            >
              <Text
                className={`text-sm ${isSelected ? 'text-white' : 'text-gray-800'}`}
                style={{
                  fontFamily: isSelected ? AlmaraiFonts.bold : AlmaraiFonts.regular,
                }}
              >
                {t(`car_specs.${type}`, { defaultValue: type })}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
