import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export const BottomSheetHeader = ({ title, description, onClose }) => {
  return (
    <View className="mb-6">
      <View className="flex-row justify-between items-center mb-2">
        <Text className="text-xl font-bold text-gray-900">{title}</Text>
        <TouchableOpacity onPress={onClose}>
          <Ionicons name="close" size={24} color="#6b7280" />
        </TouchableOpacity>
      </View>
      {description && (
        <Text className="text-sm text-gray-500">{description}</Text>
      )}
    </View>
  );
};