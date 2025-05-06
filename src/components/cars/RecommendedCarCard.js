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
  const cardWidth = width * 0.8; // 80% of screen
  const imageSize = isSmallScreen ? 100 : 120;
  const textSize = isSmallScreen ? 'text-sm' : 'text-base';
  const subtitleSize = isSmallScreen ? 'text-xs' : 'text-sm';
  const priceTextSize = isSmallScreen ? 'text-sm' : 'text-base';
  const iconSize = isSmallScreen ? 12 : 14;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.9}
      style={{ width: cardWidth, marginRight: 16 }}
      className="flex-row bg-white rounded-2xl shadow-md p-3 items-center mb-4"
    >
      
      <Image
        source={car.image}
        resizeMode="contain"
        className="rounded-lg"
        style={{
          width: imageSize,
          height: imageSize * 0.75,
          marginRight: 12,
        }}
      />

    
      <View className="flex-1">
        
        <View className="flex-row justify-between items-center mb-1">
          <Text
            className={`${textSize} font-bold text-gray-800`}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {getLocalized(car.name)}
          </Text>
        </View>

   
        <Text className={`${subtitleSize} text-gray-500 mb-0.5`}>
          {car.specs?.year} | {getLocalized(car.brand)}
        </Text>

       
        <Text className={`${subtitleSize} text-gray-500 mb-1`}>
          {getLocalized(car.specs?.transmission)} | {getLocalized(car.specs?.fuelType)}
        </Text>

        
        <View className="flex-row items-center">
          <Icon name="money" size={iconSize} color="#46194F" />
          <Text className={`ml-1 text-[#46194F] font-bold ${priceTextSize}`}>
            {car.cashPrice?.toLocaleString()} {locale === 'en' ? 'SAR' : 'ر.س'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
