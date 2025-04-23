import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function CenterTabIcon({ focused, onPress }) {
  return (
    <View className="items-center justify-center ">
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.9}
        className={`
          absolute -top-8 w-16 h-16 rounded-full bg-[#46194F] 
          justify-center items-center shadow-md
        `}
        style={{
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.2,
          shadowRadius: 4,
          elevation: 8,
        }}
      >
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>

      <Text
        className={`mt-9 text-[14px] font-bold ${
          focused ? 'text-[#46194F]' : 'text-gray-400'
        }`}
      >
        Finance
      </Text>
    </View>
  );
}
