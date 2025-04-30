import React from 'react';
import { View, Text, FlatList, TouchableOpacity, useWindowDimensions } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { useRecentlyViewed } from '../../contexts/RecentlyViewedContext';
import PopularCarCard from './PopularCarCard';

export default function PopularCars({ cars, isRTL }) {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { width } = useWindowDimensions();
  const { addToRecentlyViewed } = useRecentlyViewed();

  const handleCarPress = (car) => {
    addToRecentlyViewed(car);
    const { brandLogo, image, ...safeCar } = car;
    navigation.navigate('Gallery', { car: safeCar });
  };

  // Reverse data only in RTL
  const data = isRTL ? [...cars.slice(0, 6)].reverse() : cars.slice(0, 6);

  return (
    <View>
      {/* Keep title aligned LTR always */}
      <View className="flex-row justify-between items-center px-4 mb-3">
        <Text className="text-xl font-bold text-gray-900">
          {t('home.popularCars', { defaultValue: 'Popular Cars' })}
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('AllCars')}>
          <Text className="text-sm font-medium" style={{ color: '#46194F' }}>
            {t('common.view_all', { defaultValue: 'View All' })}
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        horizontal
        inverted={isRTL} // Flip scroll direction
        data={data}
        keyExtractor={(item) => item.id?.toString()}
        renderItem={({ item }) => (
          <PopularCarCard car={item} onPress={() => handleCarPress(item)} />
        )}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ 
          paddingHorizontal: 16, // Match recommended cars padding
          paddingVertical: 8,
        }}
        snapToInterval={width * 0.8 + 16} // Card width + margin
        decelerationRate="fast"
      />
    </View>
  );
}