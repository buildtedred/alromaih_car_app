import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useLocale } from '../../contexts/LocaleContext';

export default function AllCarCard({ car, onPress }) {
  const { locale } = useLocale();

  // Helper to safely get localized or plain string
  const getLocalized = (value) => {
    if (!value) return '';
    return typeof value === 'object' ? value[locale] : value;
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-white rounded-2xl shadow px-4 py-3 mb-4 mx-1"
    >
      <View className="flex-row items-center">
        {/* Car Image */}
        <Image
          source={car.image}
          resizeMode="contain"
          style={{ width: 120, height: 100, marginRight: 12 }}
        />

        {/* Info Section */}
        <View className="flex-1">
          {/* Car Name */}
          <Text className="text-base font-semibold text-gray-800 mb-0.5" numberOfLines={1}>
            {getLocalized(car.name)}
          </Text>

          {/* Price */}
          <Text className="text-lg font-bold text-[#003366] mb-1.5">
            PKR {car.cashPrice.toLocaleString()} lacs
          </Text>

          {/* 4 Specs Row */}
          <View className="flex-row flex-wrap justify-between mt-2">
  {/* Fuel */}
  {car.specs?.fuelType && (
    <View className="w-[48%] flex-row items-center mb-2">
      <Icon name="gas-station" size={14} color="#777" style={{ marginRight: 4 }} />
      <Text className="text-xs text-gray-600">{getLocalized(car.specs.fuelType)}</Text>
    </View>
  )}

  {/* Year */}
  {car.specs?.year && (
    <View className="w-[48%] flex-row items-center mb-2">
      <Icon name="calendar" size={14} color="#777" style={{ marginRight: 4 }} />
      <Text className="text-xs text-gray-600">{car.specs.year}</Text>
    </View>
  )}

  {/* Mileage */}
  {car.specs?.mileage && (
    <View className="w-[48%] flex-row items-center mb-2">
      <Icon name="speedometer" size={14} color="#777" style={{ marginRight: 4 }} />
      <Text className="text-xs text-gray-600">{getLocalized(car.specs.mileage)}</Text>
    </View>
  )}

  {/* Location */}
  {car.specs?.location && (
    <View className="w-[48%] flex-row items-center mb-2">
      <Icon name="map-marker" size={14} color="#777" style={{ marginRight: 4 }} />
      <Text className="text-xs text-gray-600">{getLocalized(car.specs.location)}</Text>
    </View>
  )}
</View>

        </View>
      </View>
    </TouchableOpacity>
  );
}
