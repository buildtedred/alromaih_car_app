import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { Slider } from '@miblanchard/react-native-slider';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function ModelYearRangeSlider({
  min = 1970,
  max = 2025,
  initialValue = [2018, 2024],
  onValueChange,
}) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const handleChange = (val) => {
    setValue(val);
    if (onValueChange) onValueChange(val);
  };

  return (
    <View className="mb-6 px-1 mt-6 p-6 bg-white border border-gray-300">
      {/* Header with Icon and Label */}
      <View className="flex-row items-center mb-3">
        <View className="w-9 h-9 bg-gray-100 rounded-full items-center justify-center mr-3">
          <Ionicons name="calendar-outline" size={18} color="#6B7280" />
        </View>
        <Text className="text-base font-semibold text-[#003366]">Model Year Range</Text>
      </View>

      {/* Year Values Display */}
      <View className="flex-row justify-between items-center px-1 mb-2">
        <View className="flex-1 bg-white px-4 py-2 rounded-md border border-gray-200 items-center mr-1">
          <Text className="text-base text-gray-600">{value[0]}</Text>
        </View>
        <Text className="text-sm text-gray-500 mx-2">to</Text>
        <View className="flex-1 bg-white px-4 py-2 rounded-md border border-gray-200 items-center ml-1">
          <Text className="text-base text-gray-600">{value[1]}</Text>
        </View>
      </View>

      {/* Slider */}
      <Slider
        value={value}
        minimumValue={min}
        maximumValue={max}
        step={1}
        onValueChange={handleChange}
        thumbTintColor="#003366"
        minimumTrackTintColor="#003366"
        maximumTrackTintColor="#E5E7EB"
        trackStyle={{ height: 2 }}
        thumbStyle={{
          width: 20,
          height: 20,
          borderRadius: 10,
          backgroundColor: '#fff',
          borderWidth: 2,
          borderColor: '#003366',
        }}
      />
    </View>
  );
}
