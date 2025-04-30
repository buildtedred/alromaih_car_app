import React from 'react';
import { View, Text, TouchableOpacity, Image, useWindowDimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useLocale } from '../../contexts/LocaleContext';

export default function RecommendedCarCard({ car, onPress }) {
  const { locale } = useLocale();
  const { width } = useWindowDimensions();

  const getLocalized = (value) =>
    typeof value === 'object' ? value?.[locale] : value;

  // Responsive values
  const isSmallScreen = width < 400;
  const cardWidth = width * 0.8; // Take 80% of screen width
  const imageSize = isSmallScreen ? 100 : 120;
  const textSize = isSmallScreen ? 'sm' : 'base';
  const priceTextSize = isSmallScreen ? 'sm' : 'base';
  const iconSize = isSmallScreen ? 12 : 14;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.9}
      style={{
        width: cardWidth, // Use fixed width for consistent sizing
        marginRight: 16, // Add spacing between cards
      }}
      className="flex-row bg-white rounded-2xl shadow-md p-3 items-center mb-4"
    >
      {/* Car Image */}
      <Image
        source={car.image}
        resizeMode="contain"
        className="rounded-lg"
        style={{
          width: imageSize,
          height: imageSize * 0.75, // Maintain 4:3 aspect ratio
          marginRight: 12,
        }}
      />

      {/* Car Details */}
      <View className="flex-1">
        {/* Model + 🔥 Badge */}
        <View className="flex-row justify-between items-center mb-1">
          <Text 
            className={`text-${textSize} font-bold text-gray-800`} 
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {getLocalized(car.name)}
          </Text>
        </View>

        {/* Year + Brand */}
        <Text className={`text-${textSize === 'sm' ? 'xs' : 'sm'} text-gray-500 mb-0.5`}>
          {car.specs?.year} | {getLocalized(car.brand)}
        </Text>

        {/* Specs */}
        <Text className={`text-${textSize === 'sm' ? 'xs' : 'sm'} text-gray-500 mb-1`}>
          {getLocalized(car.specs?.transmission)} | {getLocalized(car.specs?.fuelType)}
        </Text>

        {/* Price */}
        <View className="flex-row items-center">
          <Icon name="money" size={iconSize} color="#46194F" />
          <Text className={`ml-1 text-[#46194F] font-bold text-${priceTextSize}`}>
            {car.cashPrice?.toLocaleString()} {locale === 'en' ? 'SAR' : 'ر.س'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}