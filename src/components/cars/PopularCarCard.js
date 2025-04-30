import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useLocale } from '../../contexts/LocaleContext';

export default function PopularCarCard({ car, onPress }) {
  const { locale } = useLocale();
  const { width } = useWindowDimensions();

  const getLocalized = (value) => {
    if (!value) return '';
    return typeof value === 'object' ? value[locale] : value;
  };

  // Responsive values
  const cardWidth = width * 0.8;
  const imageSize = width < 400 ? 100 : 120;
  const textSize = width < 400 ? 'text-sm' : 'text-base';

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.9}
      style={{
        width: cardWidth,
        marginRight: 16,
      }}
      className="bg-white rounded-2xl shadow-md flex-row py-3 mb-4 items-center"
    >
      {/* Car Image */}
      <Image
        source={car.image}
        resizeMode="contain"
        className="rounded-lg"
        style={{
          width: imageSize,
          height: imageSize * 0.875,
          marginLeft: 12,
          marginRight: 12,
        }}
      />

      {/* Car Info */}
      <View className="flex-1 pr-2">
        {/* Name and Brand */}
        <Text
          className={`${textSize} font-bold text-gray-900 mb-1`}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {getLocalized(car.name)}{' '}
          <Text className="text-gray-500 font-normal">| {getLocalized(car.brand)}</Text>
        </Text>

        {/* Price */}
        <Text className="text-lg font-bold text-[#46194F] mb-2">
          {car.cashPrice?.toLocaleString()} {locale === 'en' ? 'SAR' : 'ر.س'}
        </Text>

        {/* Specs */}
        <View className="flex-row flex-wrap justify-between">
          {car.specs?.fuelType && (
            <View className="w-[48%] flex-row items-center mb-2">
              <Icon name="gas-station" size={14} color="#777" />
              <Text className="text-xs text-gray-600 ml-1">
                {getLocalized(car.specs.fuelType)}
              </Text>
            </View>
          )}

          {car.specs?.year && (
            <View className="w-[48%] flex-row items-center mb-2">
              <Icon name="calendar" size={14} color="#777" />
              <Text className="text-xs text-gray-600 ml-1">{car.specs.year}</Text>
            </View>
          )}

          {car.specs?.mileage && (
            <View className="w-[48%] flex-row items-center mb-2">
              <Icon name="speedometer" size={14} color="#777" />
              <Text className="text-xs text-gray-600 ml-1">
                {getLocalized(car.specs.mileage)}
              </Text>
            </View>
          )}

          {car.specs?.location && (
            <View className="w-[48%] flex-row items-center mb-2">
              <Icon name="map-marker" size={14} color="#777" />
              <Text className="text-xs text-gray-600 ml-1">
                {getLocalized(car.specs.location)}
              </Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}
