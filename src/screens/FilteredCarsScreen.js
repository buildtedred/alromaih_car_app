import React from 'react';
import { View, FlatList, Text, SafeAreaView } from 'react-native';
import AllCarCard from '../components/cars/AllCarCard';
import { useNavigation, useRoute } from '@react-navigation/native';
import AppHeader from '../components/common/AppHeader';

export default function FilteredCarsScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { filteredCars = [] } = route.params || {};

  return (
    <SafeAreaView className="flex-1 bg-white">
      <AppHeader />
      <View className="px-4 pt-4 pb-2">
        <Text className="text-2xl font-bold text-gray-800 mb-4">Filtered Cars</Text>
      </View>
      <FlatList
        data={filteredCars}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 24 }}
        renderItem={({ item }) => (
          <AllCarCard car={item} onPress={() => navigation.navigate('Gallery', { car: item })} />
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
