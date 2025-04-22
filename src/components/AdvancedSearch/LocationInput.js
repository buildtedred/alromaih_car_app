import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function LocationInput({ location, setLocation }) {
  const cities = [
    { key: 'riyadh', label: 'Riyadh' },
    { key: 'arar', label: 'Ar Ar' },
  ];

  const handleSelect = (key) => {
    if (typeof setLocation === 'function') {
      // Toggle: if already selected, deselect
      setLocation(location === key ? null : key);
    }
  };

  return (
    <View className="mb-6">
      <Text className="text-[16px] font-semibold text-gray-800 mb-3">Select Location</Text>

      <View className="flex-row bg-white border border-brand rounded-xl overflow-hidden">
        {cities.map((city, index) => {
          const isSelected = location === city.key;
          return (
            <React.Fragment key={city.key}>
              <TouchableOpacity
                onPress={() => handleSelect(city.key)}
                className={`flex-1 py-3 flex-row items-center justify-center ${
                  isSelected ? 'bg-brand' : 'bg-white'
                }`}
              >
                <Ionicons
                  name="location-outline"
                  size={18}
                  color={isSelected ? '#fff' : '#46194F'}
                />
                <Text
                  className={`ml-1 font-medium text-[15px] ${
                    isSelected ? 'text-white' : 'text-brand'
                  }`}
                >
                  {city.label}
                </Text>
              </TouchableOpacity>

              {index === 0 && (
                <View className="w-[1px] bg-brand-dark my-2" />
              )}
            </React.Fragment>
          );
        })}
      </View>
    </View>
  );
}
