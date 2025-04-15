import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import CarCard from './CarCard';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

const FeaturedCars = ({ cars }) => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  return (
    <View>
      {/* Header section with title and "See All" button */}
      <View className="flex-row justify-between items-center mb-4 px-2">
        <Text className="text-2xl font-bold">
          {t('screens.home.title')}
        </Text>

        <TouchableOpacity onPress={() => navigation.navigate('All Cars')}>
          <Text className="text-blue-600 text-base font-medium">
            {t('common.see_all') || 'See All'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Cars List */}
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
