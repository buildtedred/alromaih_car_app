import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  useWindowDimensions,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import CarCard from '../components/cars/CarCard';
import { fetchCars } from '../mock-data';
import AppHeader from '../components/common/AppHeader';

export default function AllCarsScreen() {
  const { t } = useTranslation();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { width } = useWindowDimensions();

  useEffect(() => {
    const loadCars = async () => {
      try {
        const data = await fetchCars();
        setCars(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadCars();
  }, []);

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
    <SafeAreaView className="flex-1 bg-gray-100">
      <AppHeader />

      <View className="px-4 pt-4 pb-2">
        <Text className="text-2xl font-bold text-gray-800 mb-4">
          {t('screens.all_cars.title')}
        </Text>
      </View>

      <FlatList
        data={cars}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 24,
        }}
        renderItem={({ item }) => (
          <View
            style={{
              width: '100%',
              maxWidth: 400,
              paddingHorizontal: 13,
            }}
          >
            <CarCard car={item} />
          </View>
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View className="flex-1 justify-center items-center py-20">
            <Text className="text-lg text-gray-600">
              {t('screens.all_cars.no_cars')}
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}
