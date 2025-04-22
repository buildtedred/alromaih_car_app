// ✅ FeaturedCars.js
import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import CarCard from './CarCard';

const FeaturedCars = ({ cars }) => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  return (
    <View>
      <View className="flex-row justify-between items-center px-4 mb-3">
        <Text className="text-xl font-bold text-gray-900">
          {t('screens.home.title', { defaultValue: 'Featured Cars' })}
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('AllCars')}>
          <Text className="text-sm font-medium" style={{ color: '#46194F' }}>
            {t('common.view_all', { defaultValue: 'View All' })}
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        horizontal
        data={cars.slice(0, 6)}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ marginHorizontal: 8 }}>
            <CarCard car={item} />
          </View>
        )}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 8 }}
      />
    </View>
  );
};

export default FeaturedCars;