import React from 'react';
import { View, Text, Image, ScrollView, Dimensions } from 'react-native';
import { useTranslation } from 'react-i18next';

import LocationPin from '../../assets/images/LocationPin.svg';
import Car from '../../assets/images/Car.svg';
import Handshake from '../../assets/images/Handshake.svg';
import MobileMap from '../../assets/images/MobileMap.svg';
import SteeringWheel from '../../assets/images/SteeringWheel.svg';
import Coin from '../../assets/images/Coin.svg';
import AppFooter from '../../components/common/AppFooter';

const AboutScreen = () => {
  const { t } = useTranslation();
  const { width } = Dimensions.get('window');

  return (
    <ScrollView
      className="flex-1 bg-gray-100"
      contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Hero Image */}
      <View className="px-4 pt-4">
        <Image
          source={require('../../assets/images/companyimg.jpg')}
          className="w-full rounded-2xl"
          style={{ height: width * 0.6 }}
          resizeMode="cover"
        />
      </View>

      {/* Main Card */}
      <View className="bg-white mx-4 my-4 p-4 rounded-2xl shadow-md">
        <Text className="text-xl font-bold text-blue-900 mb-4">
          {t('screens.about.heading')}
        </Text>
        <Text className="text-lg text-gray-700 mb-6">
          {t('screens.about.description')}
        </Text>

        <View className="flex-row justify-center items-center mb-4">
          <LocationPin width={60} height={60} style={{ marginHorizontal: 10 }} />
          <Car width={160} height={150} style={{ marginHorizontal: 10 }} />
          <LocationPin width={60} height={60} style={{ marginHorizontal: 10 }} />
        </View>
      </View>

      {/* Vision */}
      <View className="bg-white mx-4 my-2 p-4 rounded-2xl shadow-md">
        <Text className="text-xl font-bold text-blue-900 mb-3">
          {t('screens.about.vision_title')}
        </Text>
        <Text className="text-base text-gray-700 mb-2">
          {t('screens.about.vision_main')}
        </Text>
        <Text className="text-base text-gray-700 mb-4">
          {t('screens.about.vision_extra')}
        </Text>

        <View className="flex-row justify-center items-center">
          <MobileMap width={180} height={180} />
        </View>
      </View>

      {/* Values */}
      <View className="bg-white mx-4 my-2 p-4 rounded-2xl shadow-md">
        <Text className="text-xl font-bold text-blue-900 mb-3">
          {t('screens.about.values_description')}
        </Text>
        <Text className="text-base text-gray-700 mb-4">
          {t('screens.about.values')}
        </Text>

        <View className="flex-row justify-center items-center">
          <Handshake width={180} height={180} />
        </View>
      </View>

      {/* Experience */}
      <View className="bg-white mx-4 my-2 p-4 rounded-2xl shadow-md">
        <Text className="text-xl font-bold text-blue-900 mb-3">
          {t('screens.about.experience_title')}
        </Text>
        <Text className="text-base text-gray-700 mb-4">
          {t('screens.about.experience')}
        </Text>

        <View className="flex-row justify-center items-center">
          <SteeringWheel width={180} height={180} />
        </View>
      </View>

      {/* Financing */}
      <View className="bg-white mx-4 my-2 p-4 rounded-2xl shadow-md">
        <Text className="text-xl font-bold text-blue-900 mb-3">
          {t('screens.about.financing_title')}
        </Text>
        <Text className="text-base text-gray-700 mb-2">
          {t('screens.about.financing_sub')}
        </Text>
        <Text className="text-base text-gray-700 mb-4 text-center italic">
          {t('screens.about.financing_note')}
        </Text>

        <View className="flex-row justify-center items-center">
          <Coin width={180} height={180} />
        </View>
      </View>

      <View className="pb-8" />
      <AppFooter />
    </ScrollView>
  );
};

export default AboutScreen;
