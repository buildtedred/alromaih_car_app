import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

export default function CarReviewPage() {
  const navigation = useNavigation();

  const handleSelectModel = () => {
    navigation.navigate('CarModelSelectScreen');
  };

  const handleSearch = () => {
    navigation.navigate('CarReviewSearchResults');
  };

  const handleReview = () => {
    navigation.navigate('WriteCarReview');
  };

  return (
    <View className="bg-white  mt-6 p-4 shadow-md ">
      <Text className="text-2xl font-bold text-center text-gray-900 mb-6">
        Car Reviews
      </Text>

      <TouchableOpacity
        onPress={handleSelectModel}
        activeOpacity={0.9}
        className="bg-white border border-gray-300 rounded-xl px-4 py-4 flex-row justify-between items-center mb-4"
      >
        <Text className="text-gray-400 text-base">Select car model</Text>
        <Icon name="chevron-down" size={22} color="#9CA3AF" />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleSearch}
        activeOpacity={0.9}
        className="bg-blue-600 rounded-xl py-4 mb-3"
      >
        <Text className="text-white text-center text-base font-semibold">
          Search
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleReview}
        activeOpacity={0.9}
        className="bg-blue-600 rounded-xl py-4"
      >
        <Text className="text-white text-center text-base font-semibold">
          Review
        </Text>
      </TouchableOpacity>
    </View>
  );
}
