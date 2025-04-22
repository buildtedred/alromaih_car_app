import React from 'react';
import { View, FlatList, Text, SafeAreaView } from 'react-native';
import AllCarCard from '../components/cars/AllCarCard';
import { useNavigation, useRoute } from '@react-navigation/native';
import AppHeader from '../components/common/AppHeader';
import carsData from '../mock-data';

export default function FilteredCarsScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { filteredCars = [] } = route.params || {};

  const completeCars = filteredCars.map((partialCar) => {
    const fullCar = carsData.find((c) => c.id === partialCar.id);
    return {
      ...partialCar,
      image: fullCar?.image,
      additionalImages: fullCar?.additionalImages,
      brand: fullCar?.brand, // ✅ keep only serializable values
      specs: fullCar?.specs,
      name: fullCar?.name,
      modelYear: fullCar?.modelYear,
      installmentPrice: fullCar?.installmentPrice,
      cashPrice: fullCar?.cashPrice,
      features: fullCar?.features
    };
  });

  return (
    <SafeAreaView className="flex-1 bg-white">
      <AppHeader />
      <View className="px-4 pt-4 pb-2">
        <Text className="text-2xl font-bold text-gray-800 mb-4">Filtered Cars</Text>
      </View>

      <FlatList
        data={completeCars}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 24 }}
        renderItem={({ item }) => (
          <AllCarCard
            car={item}
            onPress={() => navigation.navigate('Gallery', { car: item })}
          />
        )}
        ListEmptyComponent={
          <View className="flex-1 justify-center items-center py-20">
            <Text className="text-lg text-gray-600">No cars match your search.</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}
