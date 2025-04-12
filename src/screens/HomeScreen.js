import React, { useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import AppHeader from '../components/common/AppHeader';
import FeaturedCars from '../components/cars/FeaturedCars';
import { useTranslation } from 'react-i18next';
import carsData from '../mock-data';
import CategoryTabs from '../components/Category/CategoryTabs';

export default function HomeScreen() {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState('models'); // Default to 'models'

  const handleSearch = (text) => {
    // Optional search logic
  };

  const extractCategoryData = (key) => {
    const unique = new Set();
    carsData.forEach((car) => {
      if (key === 'models') unique.add(car.name.en);
      if (key === 'bodyTypes' && car.bodyType) unique.add(car.bodyType);
    });
    return Array.from(unique);
  };

  const renderCategoryItems = (title) => (
    <View className="bg-white shadow-sm p-4 mt-4 rounded-md mx-4">
      <Text className="text-lg font-semibold text-[#46194F] mb-2">
        {t('all')} {t(title)}
      </Text>
      <FlatList
        horizontal
        data={extractCategoryData(title)}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <View className="bg-[#F3EDF7] rounded-lg px-4 py-2 mr-3">
            <Text className="text-[#46194F] font-medium">{item}</Text>
          </View>
        )}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );

  return (
    <FlatList
      data={[]} // Dummy
      keyExtractor={() => 'dummy'}
      renderItem={null}
      ListHeaderComponent={
        <>
          <AppHeader onSearchChange={handleSearch} />

          <View className="mt-4 mb-2 px-4">
            <CategoryTabs selected={selectedCategory} onSelect={setSelectedCategory} />
          </View>

          {renderCategoryItems(selectedCategory)}

          <View className="mt-6">
            <FeaturedCars cars={carsData} />
          </View>
        </>
      }
    />
  );
}
