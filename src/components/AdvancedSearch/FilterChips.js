import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default function FilterChips({ title, options, selected, setSelected }) {
  return (
    <View className="mb-6">
      <Text className="text-[16px] font-semibold text-gray-800 mb-3">{title}</Text>
      <View className="flex-row flex-wrap gap-3">
        {options.map((item) => (
          <TouchableOpacity
            key={item.key}
            onPress={() => setSelected(selected === item.key ? null : item.key)}
            className={`px-4 py-[10px] rounded-full flex-row items-center ${
              selected === item.key ? 'bg-[#003366]' : 'bg-white border border-gray-300'
            }`}
          >
            <Text className={`text-sm ${selected === item.key ? 'text-white' : 'text-gray-700'}`}>
              {item.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
