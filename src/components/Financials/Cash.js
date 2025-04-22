import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Cash = ({ onPress }) => {
  return (
    <TouchableOpacity 
      className="bg-gray-50 rounded-lg shadow-sm overflow-hidden"
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View className="p-3 flex-row items-center justify-between">
        <View className="flex-row items-center">
          <View>
            <Text className="text-sm font-bold text-gray-800">Cash Payment</Text>
            <Text className="text-xs text-gray-500">Pay the full amount upfront</Text>
          </View>
        </View>
        <View className="flex-row items-center">
          <View className="bg-red-50 px-2 py-1 rounded-full mr-2">
            <Text className="text-[10px] text-red-500 font-medium">10% OFF</Text>
          </View>
          <Icon name="chevron-forward" size={16} color="#9CA3AF" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Cash;