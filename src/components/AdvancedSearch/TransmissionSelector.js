import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const transmissions = ['Automatic', 'Manual'];

export default function TransmissionSelector({ selected, setSelected }) {
  return (
    <View className="mb-6">
      {/* Title & Icon */}
      <View className="flex-row items-center mb-3">
        <View className="w-9 h-9 bg-gray-100 rounded-full items-center justify-center mr-3">
          <Ionicons name="car-sport-outline" size={18} color="#6B7280" />
        </View>
        <Text className="text-base font-semibold text-brand">Transmission</Text>
      </View>

      {/* Selector Pills */}
      <View className="flex-row gap-2">
        {transmissions.map((item) => {
          const isSelected = selected === item;
          return (
            <TouchableOpacity
              key={item}
              onPress={() => setSelected(isSelected ? null : item)}
              className={`px-4 py-2 rounded-full ${
                isSelected ? 'bg-brand' : 'bg-gray-100'
              }`}
            >
              <Text
                className={`text-sm ${
                  isSelected ? 'text-white font-semibold' : 'text-gray-700'
                }`}
              >
                {item}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
