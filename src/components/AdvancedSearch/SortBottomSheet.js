import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialIcons';

const sortOptions = [
  { 
    key: 'price_low', 
    label: 'Price: Low to High',
    icon: 'attach-money' 
  },
  { 
    key: 'price_high', 
    label: 'Price: High to Low',
    icon: 'attach-money' 
  },
  { 
    key: 'year_newest', 
    label: 'Year: Newest First',
    icon: 'calendar-today' 
  },
  { 
    key: 'year_oldest', 
    label: 'Year: Oldest First',
    icon: 'calendar-today' 
  },
];

export default function SortBottomSheet({ isVisible, onClose, onSelect, selectedOption }) {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onSwipeComplete={onClose}
      swipeDirection={['down']}
      style={{ justifyContent: 'flex-end', margin: 0 }}
    >
      <View className="bg-white rounded-t-2xl pb-6">
        <View className="p-4 border-b border-gray-200">
          <Text className="text-lg font-bold text-gray-900">Sort By</Text>
        </View>
        
        {sortOptions.map((option) => (
          <TouchableOpacity
            key={option.key}
            onPress={() => {
              onSelect(option.key);
              onClose();
            }}
            className={`flex-row items-center px-6 py-4 ${option.key === selectedOption ? 'bg-blue-50' : ''}`}
          >
            <Icon 
              name={option.icon} 
              size={20} 
              color={option.key === selectedOption ? '#3b82f6' : '#6b7280'} 
              className="mr-3"
            />
            <Text className={`text-base ${option.key === selectedOption ? 'text-blue-600 font-medium' : 'text-gray-800'}`}>
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </Modal>
  );
}