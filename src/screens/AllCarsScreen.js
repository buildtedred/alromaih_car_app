import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { fetchCars } from '../mock-data';
import AppHeader from '../components/common/AppHeader';
import AllCarCard from '../components/cars/AllCarCard';
import SortBottomSheet from '../components/AdvancedSearch/SortBottomSheet';

export default function AllCarsScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const route = useRoute();

  const [allCars, setAllCars] = useState([]);
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [activeFilters, setActiveFilters] = useState(route.params?.selectedFilters || {});
  const [selectedSortOption, setSelectedSortOption] = useState(null);
  const [isSortModalVisible, setSortModalVisible] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);

  useEffect(() => {
    const loadCars = async () => {
      try {
        setLoading(true);
        const data = await fetchCars();
        setAllCars(data);

        if (route.params?.filteredCars) {
          setCars(route.params.filteredCars);
        } else {
          setCars(data);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadCars();
  }, [route.params?.filteredCars]);

  useEffect(() => {
    if (route.params?.selectedFilters) {
      setActiveFilters(route.params.selectedFilters);
    }
  }, [route.params?.selectedFilters]);

  useEffect(() => {
    applyFiltersAndSort(activeFilters, selectedSortOption);
  }, [selectedSortOption, activeFilters]);

  const applyFiltersAndSort = (filters, sortOption) => {
    setIsFiltering(true);
    let newList = [...allCars];

    if (route.params?.filteredCars) {
      newList = [...route.params.filteredCars];
    }

    if (filters.brand) {
      newList = newList.filter((car) => car.brand === filters.brand);
    }
    if (filters.models) {
      const modelArr = filters.models.split(',').map((m) => m.trim());
      newList = newList.filter((car) => modelArr.includes(car.model));
    }
    if (filters.category) {
      newList = newList.filter((car) => car.category === filters.category);
    }
    if (filters.bodyType) {
      newList = newList.filter((car) => car.bodyType === filters.bodyType);
    }
    if (filters.location) {
      newList = newList.filter(
        (car) => car.specs?.location?.toLowerCase() === filters.location.toLowerCase()
      );
    }
    if (filters.transmission) {
      newList = newList.filter(
        (car) => car.specs?.transmission?.toLowerCase() === filters.transmission.toLowerCase()
      );
    }
    if (filters.fuel) {
      newList = newList.filter(
        (car) => car.specs?.fuelType?.toLowerCase() === filters.fuel.toLowerCase()
      );
    }
    if (filters.price) {
      const [min, max] = filters.price.split('-').map((v) => parseInt(v.replace(/,/g, '')));
      newList = newList.filter((car) => car.cashPrice >= min && car.cashPrice <= max);
    }
    if (filters.year) {
      const [min, max] = filters.year.split('-').map((v) => parseInt(v.trim()));
      newList = newList.filter((car) => car.specs?.year >= min && car.specs?.year <= max);
    }

    if (sortOption) {
      if (sortOption === 'price_low') {
        newList.sort((a, b) => (a.cashPrice || 0) - (b.cashPrice || 0));
      } else if (sortOption === 'price_high') {
        newList.sort((a, b) => (b.cashPrice || 0) - (a.cashPrice || 0));
      } else if (sortOption === 'year_newest') {
        newList.sort((a, b) => (b.specs?.year || 0) - (a.specs?.year || 0));
      } else if (sortOption === 'year_oldest') {
        newList.sort((a, b) => (a.specs?.year || 0) - (b.specs?.year || 0));
      }
    }

    setCars(newList);
    setIsFiltering(false);
  };

  const handlePress = (car) => {
    navigation.navigate('Gallery', { car });
  };

  if (loading) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#003366" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-white">
        <Text className="text-red-500 text-lg">{t('common.loading_error')}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <AppHeader />

      {/* Sort & Filter Buttons */}
      <View className="flex-row justify-between items-center px-4 pt-4 pb-2">
        <TouchableOpacity
          onPress={() => setSortModalVisible(true)}
          className="flex-row items-center bg-gray-100 rounded-full px-4 py-2 shadow-sm"
        >
          <View className="bg-white p-1 rounded-full shadow">
            <Icon name="sort" size={20} color="#003366" />
          </View>
          <Text className="ml-2 text-gray-900 font-semibold text-base">
            {selectedSortOption ? t('common.sorted') : t('common.sort')}
          </Text>
          {selectedSortOption && (
            <View className="ml-2 w-2 h-2 bg-[#003366] rounded-full" />
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('AdvancedSearch')}
          className="flex-row items-center bg-gray-100 rounded-full px-4 py-2 shadow-sm relative"
        >
          <View className="bg-white p-1 rounded-full shadow">
            <Icon name="filter-variant" size={20} color="#003366" />
          </View>
          <Text className="ml-2 text-gray-900 font-semibold text-base">
            {t('common.filter')}
          </Text>
          {Object.keys(activeFilters).length > 0 && (
            <View className="absolute -top-2 -right-2 bg-red-600 rounded-full w-5 h-5 items-center justify-center">
              <Text className="text-white text-xs font-bold">
                {Object.keys(activeFilters).length}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Header All Cars Title */}
      <View className="px-4 pt-2 pb-4">
        <Text className="text-2xl font-bold text-gray-800">
          {t('screens.all_cars.title')}
        </Text>
        <Text className="text-gray-500 text-sm mt-1">
          {cars.length} {cars.length === 1 ? t('common.result') : t('common.results')}
        </Text>
      </View>

      {/* Sort Bottom Sheet */}
      <SortBottomSheet
        isVisible={isSortModalVisible}
        onClose={() => setSortModalVisible(false)}
        onSelect={(option) => setSelectedSortOption(option)}
        selectedOption={selectedSortOption}
      />

      {/* Filtering Loading */}
      {isFiltering && (
        <View className="absolute inset-0 justify-center items-center bg-black bg-opacity-10 z-10">
          <ActivityIndicator size="large" color="#3b82f6" />
        </View>
      )}

      {/* Car Cards */}
      <FlatList
        data={cars}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingHorizontal: '4%', paddingBottom: 24 }}
        renderItem={({ item }) => (
          <View style={{ width: '100%' }}>
            <AllCarCard car={item} onPress={() => handlePress(item)} />
          </View>
        )}
        ListEmptyComponent={
          <View className="flex-1 justify-center items-center py-20">
            <Icon name="car-off" size={40} color="#9ca3af" />
            <Text className="text-lg text-gray-600 mt-4">
              {t('common.no_results')}
            </Text>
          </View>
        }
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}
