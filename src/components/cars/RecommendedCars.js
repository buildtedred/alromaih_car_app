// ✅ RecommendedCars.js
import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useLocale } from '../../contexts/LocaleContext';
import RecommendedCarCard from './RecommendedCarCard';
import carsData from '../../mock-data';

export default function RecommendedCars() {
  const { t } = useTranslation();
  const { locale } = useLocale();
  const navigation = useNavigation();

  const recommendedCars = carsData.slice(2, 8);

  const handlePress = (car) => {
    const { brandLogo, image, ...serializableCar } = car;
    navigation.navigate('Gallery', { car: serializableCar });
  };

  return (
    <View className="mt-4">
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
        data={recommendedCars}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 12 }}
        renderItem={({ item }) => (
          <RecommendedCarCard car={item} onPress={() => handlePress(item)} />
        )}
      />
    </View>
  );
}
