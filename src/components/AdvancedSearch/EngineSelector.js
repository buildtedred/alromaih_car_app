
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function EngineSelector({ selected, setSelected, engineOptions }) {
  return (
    <View className="mb-6 px-1 p-6 bg-white border rounded-xl border-gray-300 gap-2">

      <View className="flex-row items-center mb-3">
        <View className="w-9 h-9 bg-gray-100 rounded-full items-center justify-center mr-3">
          <Ionicons name="car-outline" size={22} color="#6B7280" />
        </View>
        <Text className="text-lg font-semibold text-brand">Engine</Text>
      </View>

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
                className={`text-sm ${
                  isSelected ? 'text-white font-semibold' : 'text-gray-800'
                }`}
              >
                {type}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
