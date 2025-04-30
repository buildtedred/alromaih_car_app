import React from 'react';
import { ScrollView, View, SafeAreaView } from 'react-native';
import CarReviewPage from '../components/BrowserMoreSection/CarReviewPage';
import PopularReviewCar from '../components/BrowserMoreSection/PopularReviewCar';

export default function ReviewScreen() {
  return (
    <SafeAreaView className="flex-1 bg-gray-100 ">
      <ScrollView className="flex-1">
        <CarReviewPage />
        <View className="mt-12">
          <PopularReviewCar />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
