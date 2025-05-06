"use client";

import { useState, useMemo } from "react";
import { View, ScrollView } from "react-native";
import AppHeader from "../components/common/AppHeader";
import BrandSelector from "../components/AdvancedSearch/BrandSelector";
import PopularCars from "../components/cars/PopularCars";
import FeaturedCars from "../components/cars/FeaturedCars";
// import RecentlyViewedCars from "../components/cars/RecentlyViewedCars";
// import RecommendedCars from "../components/cars/RecommendedCars";
// import NewsSection from "../components/Home/NewsSection";
import SliderBanner from "../components/Home/SliderBanner";
import FinancingPartners from "../components/Home/FinancingPartners";
import CarComparisonNew from "../components/Home/CarComparisonNew";
import carsData from "../mock-data";
import { useNavigation } from "@react-navigation/native";
import { useLocale } from "../contexts/LocaleContext";

export default function HomeScreen() {
  const navigation = useNavigation();
  const { direction } = useLocale();
  const isRTL = direction === "rtl";

  const [selectedBrand, setSelectedBrand] = useState(null);

  const featuredCars = useMemo(() => {
    const cars = selectedBrand
      ? carsData.filter((car) => car.brand === selectedBrand)
      : carsData;
    return cars.slice(0, 6);
  }, [selectedBrand]);

  const popularCars = useMemo(() => {
    const featuredIds = featuredCars.map((car) => car.id);
    return carsData
      .filter((car) => !featuredIds.includes(car.id))
      .slice(0, 6);
  }, [featuredCars]);

  const handleBrandSelect = (brandKey) => {
    if (brandKey) {
      navigation.navigate("CarsTab", {
        screen: "AllCarsScreen",
        params: {
          selectedFilters: { brand: brandKey },
        },
      });
    }
  };

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="z-10 bg-white">
        <AppHeader />
      </View>

      <ScrollView
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
        style={{ writingDirection: isRTL ? "rtl" : "ltr" }} // ✅ Controls scroll start direction
      >
        {/* Top banner */}
        <SliderBanner />

        {/* Brands */}
        <View className="mt-4">
        <BrandSelector
  selected={selectedBrand}
  setSelected={handleBrandSelect}
  showTitle={true}
  showIcon={true}
  showText={true}
  textClass="text-sm font-semibold"
  isRTL={isRTL} // ✅ REQUIRED
/>

        </View>

        {/* Featured Cars */}
        <View className="mt-4">
          <FeaturedCars cars={featuredCars} isRTL={isRTL} />
        </View>

        {/* Recommended Cars (optional) */}
        {/* <View className="mt-4">
          <RecommendedCars isRTL={isRTL} />
        </View> */}

        {/* Recently Viewed (optional) */}
        {/* <View className="mt-4 mb-4">
          <RecentlyViewedCars navigation={navigation} isRTL={isRTL} />
        </View> */}

        {/* Compare Cars Section */}
        <View className="mt-4">
          <CarComparisonNew isRTL={isRTL} />
        </View>

        {/* Popular Cars */}
        <View className="mt-4">
          <PopularCars cars={popularCars} isRTL={isRTL} />
        </View>

        {/* Finance Partners */}
        <View className="mt-4 mb-16">
          <FinancingPartners isRTL={isRTL} />
        </View>

        {/* News Section (optional) */}
        {/* <View className="mt-16 mb-8">
          <NewsSection />
        </View> */}
      </ScrollView>
      
    </View>
  );
}
