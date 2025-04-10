import React from 'react';
import { View, ScrollView, Text } from 'react-native';
import AppHeader from '../components/common/AppHeader';
import FeaturedCars from '../components/cars/FeaturedCars';
import { useTranslation } from 'react-i18next';
import carsData from '../mock-data';

export default function HomeScreen() {
  const { t } = useTranslation();

  const handleSearch = (text) => {
    // Search functionality can be added here
  };

  return (
    <ScrollView className="bg-gray-100">
      <AppHeader onSearchChange={handleSearch} />
      <View className="">
        <FeaturedCars cars={carsData} />
      </View>
    </ScrollView>
  );
}