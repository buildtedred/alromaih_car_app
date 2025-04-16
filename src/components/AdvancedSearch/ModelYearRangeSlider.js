import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { Slider } from '@miblanchard/react-native-slider';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function ModelYearRangeSlider({
  min = 1970,
  max = 2025,
  value = [2018, 2024],
  onValueChange,
}) {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value); // sync with parent if reset
  }, [value]);

  const handleChange = (val) => {
    setLocalValue(val); // update for real-time UI feedback
    if (onValueChange) onValueChange(val); // notify parent
  };

  return (
    <View className="mb-6 px-1 mt-6 p-6 bg-white border rounded-xl border-gray-300 ">
      {/* Header */}
      <View className="flex-row items-center mb-3">
        <View className="w-9 h-9 bg-gray-100 rounded-full items-center justify-center mr-3">
          <Ionicons name="calendar-outline" size={22} color="#6B7280" />
        </View>
        <Text className="text-lg font-semibold text-brand">Model Year Range</Text>
      </View>

      {/* Year Display */}
      <View className="flex-row justify-between items-center px-1 mb-2">
        <View className="flex-1 bg-white px-4 py-2 rounded-md border border-gray-200 items-center mr-1">
          <Text className="text-base text-gray-600">{localValue[0]}</Text>
        </View>
        <Text className="text-sm text-gray-500 mx-2">to</Text>
        <View className="flex-1 bg-white px-4 py-2 rounded-md border border-gray-200 items-center ml-1">
          <Text className="text-base text-gray-600">{localValue[1]}</Text>
        </View>
      </View>

      {/* Slider */}
      <View className="px-2 mt-3">
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
          containerStyle={{ height: 50, justifyContent: 'center' }}
          trackStyle={{ height: 4, borderRadius: 2 }}
          thumbStyle={{
            width: 24,
            height: 24,
            borderRadius: 12,
            backgroundColor: '#fff',
            borderWidth: 2,
            borderColor: '#003366',
            elevation: 2,
          }}
        />
      </View>
    </View>
  );
}
