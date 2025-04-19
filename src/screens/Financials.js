import React from 'react';
import { SafeAreaView, View, Text, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Cash from '../components/Financials/Cash';
import FinanceOption from '../components/Financials/FinanceOption';
import FinanceImage from '../assets/financeImage.svg';

const Financials = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView className="flex-1 bg-[#f4f2f9]">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="p-4">
        <View className="bg-white rounded-2xl p-4 shadow-md">
          <Text className="text-xl font-bold text-purple-900">Choose Payment Method</Text>
          <Text className="text-base text-gray-600 mt-2">
            Choose the way that suits you to own your new car whether through convenient financing or direct cash payment.
          </Text>

          <View className="flex-col mt-6">
            <View className="mb-4">
              <Cash onPress={() => navigation.navigate('CashBrand')} />
            </View>
            <FinanceOption />
          </View>

          <View className="items-center mt-6">
            <FinanceImage width={310} height={310} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Financials;