import React from 'react';
import { View, ScrollView } from 'react-native';
import AppHeader from '../components/common/AppHeader';
import CategoryTabs from '../components/Category/CategoryTabs';
import FeaturedCars from '../components/cars/FeaturedCars';
import carsData from '../mock-data';

export default function HomeScreen() {
  return (
    <View className="flex-1 bg-[#F9F9F9]">
      {/* App Header */}
      <View className="z-10 bg-white">
        <AppHeader />
      </View>

      {/* Scrollable content */}
      <ScrollView
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Category Tabs */}
        <View className="mt-4 mb-2 px-4">
          <CategoryTabs />
        </View>

        {/* Featured Cars Section */}
        <View className="mt-6">
          <FeaturedCars cars={carsData.slice(0, 6)} />
        </View>
      </ScrollView>
    </View>
  );
}
