import React, { useState, useMemo } from 'react';
import { View, ScrollView } from 'react-native';
import AppHeader from '../components/common/AppHeader';
import CategoryTabs from '../components/Category/CategoryTabs';
import BrandSelector from '../components/AdvancedSearch/BrandSelector';
import PopularCars from '../components/cars/PopularCars';
import FeaturedCars from '../components/cars/FeaturedCars';
import RecentlyViewedCars from '../components/cars/RecentlyViewedCars';
import RecommendedCars from '../components/cars/RecommendedCars';
import NewsSection from '../components/Home/NewsSection';
import carsData from '../mock-data';
import { useNavigation } from '@react-navigation/native';
import { useLocale } from '../contexts/LocaleContext';

export default function HomeScreen() {
  const navigation = useNavigation();
  const { direction } = useLocale();
  const isRTL = direction === 'rtl';

  const [selectedBrand, setSelectedBrand] = useState(null);

  const featuredCars = useMemo(() => {
    const cars = selectedBrand
      ? carsData.filter((car) => car.brand === selectedBrand)
      : carsData;
    return cars.slice(0, 6);
  }, [selectedBrand]);

  const popularCars = useMemo(() => {
    const featuredIds = featuredCars.map((car) => car.id);
    return carsData.filter((car) => !featuredIds.includes(car.id)).slice(0, 6);
  }, [featuredCars]);

  const handleBrandSelect = (brandKey) => {
    if (brandKey) {
      const brandFilteredCars = carsData
        .filter((car) => car.brand === brandKey)
        .map((car) => ({ id: car.id }));

      navigation.navigate('FilteredCars', { filteredCars: brandFilteredCars });
    }
  };

  const handleCategorySelect = (filtered) => {
    const filteredCars = filtered.map((car) => ({ id: car.id }));
    navigation.navigate('FilteredCars', { filteredCars });
  };

  return (
    <View className="flex-1 bg-[#F9F9F9]">
      <View className="z-10 bg-white">
        <AppHeader />
      </View>

      <ScrollView
        contentContainerStyle={{ paddingBottom: 40 }}
        style={{ direction: isRTL ? 'rtl' : 'ltr' }}
        showsVerticalScrollIndicator={false}
      >
        <View className="mt-6 mb-4 rounded-2xl px-2">
          <CategoryTabs
            onSelectCategory={handleCategorySelect}
            navigation={navigation}
            isRTL={isRTL}
          />
        </View>

        <View className="mt-6 px-2 pt-6 bg-white">
          <BrandSelector
            selected={selectedBrand}
            setSelected={handleBrandSelect}
            showTitle={false}
            showIcon={false}
            showText={true}
            textClass="text-sm font-semibold"
          />
        </View>

        <View className="mt-4">
          <PopularCars cars={popularCars} isRTL={isRTL} />
        </View>

        <View className="mt-4">
          <RecommendedCars isRTL={isRTL} />
        </View>

        <View className="mt-4 mb-4">
          <RecentlyViewedCars navigation={navigation} isRTL={isRTL} />
        </View>

        <View className="mt-4">
          <FeaturedCars cars={featuredCars} isRTL={isRTL} />
        </View>

        <View className="mt-16 mb-8">
        <NewsSection />
        </View>


      </ScrollView>
    </View>
  );
}
