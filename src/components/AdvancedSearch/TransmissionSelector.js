import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const transmissions = ['Automatic', 'Manual'];

export default function TransmissionSelector({ selected, setSelected }) {
  return (
    <View className="mb-6 px-1 p-6 bg-white border rounded-xl border-gray-300 gap-2">
      <View className="flex-row items-center mb-3">
        <View className="w-9 h-9 bg-gray-100 rounded-full items-center justify-center mr-3">
          <Ionicons name="car-sport-outline" size={24} color="#6B7280" />
        </View>
        <Text className="text-lg font-semibold text-brand">Transmission</Text>
      </View>

      <View className="flex-row gap-2">
        {transmissions.map((item) => {
          const isSelected = selected === item;
          return (
            <TouchableOpacity
              key={item}
              onPress={() => setSelected(isSelected ? null : item)}
              className={`flex-1 px-4 py-2 rounded-md border border-gray-200 items-center mr-1 ${
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
