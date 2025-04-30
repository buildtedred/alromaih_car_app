import React from 'react';
import { View, Text, FlatList, TouchableOpacity, useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import RecommendedCarCard from './RecommendedCarCard';
import carsData from '../../mock-data';

export default function RecommendedCars({ isRTL }) {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { width } = useWindowDimensions();

  const recommendedCars = carsData.slice(2, 8);
  const data = isRTL ? [...recommendedCars].reverse() : recommendedCars;

  const handlePress = (car) => {
    const { brandLogo, image, ...serializableCar } = car;
    navigation.navigate('Gallery', { car: serializableCar });
  };

  return (
    <View className="mt-4">
      {/* Header */}
      <View className="flex-row justify-between items-center px-4 mb-3">
        <Text className="text-xl font-bold text-gray-900">
          {t('home.recommended', { defaultValue: 'Recommended for You' })}
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('AllCars')}>
          <Text className="text-sm font-medium" style={{ color: '#46194F' }}>
            {t('common.view_all', { defaultValue: 'View All' })}
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={data}
        horizontal
        inverted={isRTL}
        keyExtractor={(item) => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ 
          paddingHorizontal: 16, // Add padding to both sides
          paddingVertical: 8,
        }}
        snapToInterval={width * 0.8 + 16} // Card width + margin
        decelerationRate="fast"
        renderItem={({ item }) => (
          <RecommendedCarCard car={item} onPress={() => handlePress(item)} />
        )}
      />
    </View>
  );
}