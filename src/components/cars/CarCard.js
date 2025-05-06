import React, { useState } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

import { useLocale } from '../../contexts/LocaleContext';
import { brands, brandLogos } from '../../mock-data';
import { useRecentlyViewed } from '../../contexts/RecentlyViewedContext';
import AppText from '../common/AppText';
import CompareCarIcon from '../../assets/Icon/campare_car.svg'; // ✅ Top-left icon
import RiyalIcon from '../../assets/Icon/riyal_icon.svg';       // ✅ Riyal currency icon

export default function CarCard({ car }) {
  const { locale } = useLocale();
  const navigation = useNavigation();
  const { addToRecentlyViewed } = useRecentlyViewed();
  const [scale] = useState(new Animated.Value(1));

  const getLang = (field) =>
    typeof field === 'object' ? field?.[locale] : field;

  const brandName = brands?.[car.brand]?.[locale] || '';
  const LogoComponent = brandLogos[car.brand];

  const onPressIn = () => {
    Animated.spring(scale, {
      toValue: 1.02,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const goToGallery = () => {
    addToRecentlyViewed(car);
    const { brandLogo, ...serializableCar } = car;
    navigation.navigate('Gallery', { car: serializableCar });
  };

  return (
    <Animated.View
      className="w-[280px] bg-white border-2 border-[#46194F] rounded-xl"
      style={{ transform: [{ scale }] }}
    >
      <TouchableOpacity
        onPress={goToGallery}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        activeOpacity={0.95}
        className="overflow-hidden rounded-2xl"
      >
        {/* Top Icons Row */}
   {/* Top Icons Row */}
<View className="flex-row justify-between items-center px-4 pt-2">
  <Icon name="heart-outline" size={22} color="#46194F" />
  <CompareCarIcon width={22} height={22} />
</View>


        {/* Car Image */}
        <View className="w-full h-28 px-4 mt-2 mb-1">
          <Image
            source={car.image}
            className="w-full h-full"
            resizeMode="contain"
          />
        </View>

        {/* Divider */}
        <View className="h-[1px] bg-[#46194F] my-2" />

        {/* Name + Brand */}
        <View className="flex-row justify-between items-center px-4">
          <View className="items-start">
            <AppText bold style={{ fontSize: 14, color: '#46194F' }}>
              {getLang(car.name)}
            </AppText>
            <AppText style={{ fontSize: 12, color: '#666', marginTop: 2 }}>
              {getLang(car.subtext) ||
                `${locale === 'ar' ? 'لكجري فل كامل' : 'Luxury Full Option'} ${
                  car.specs?.year
                }`}
            </AppText>
          </View>
          {LogoComponent ? (
            <LogoComponent width={75} height={22} />
          ) : (
            <AppText bold style={{ fontSize: 14, color: '#000' }}>
              {brandName}
            </AppText>
          )}
        </View>

        {/* Divider */}
        <View className="h-[1px] bg-[#46194F] my-3 mx-4" />

        {/* Prices Row */}
        <View className="flex-row justify-between items-center px-4 pb-3">
          {/* Cash Price */}
          <View className="items-center flex-1">
            <AppText style={{ fontSize: 12, color: '#666', marginBottom: 4 }}>
              {locale === 'ar' ? 'سعر الكاش' : 'Cash Price'}
            </AppText>
            <View className="flex-row items-center justify-center">
              <AppText bold style={{ fontSize: 16, color: '#46194F', marginRight: 4 }}>
                {car.cashPrice?.toLocaleString()}
              </AppText>
              <RiyalIcon width={20} height={20} />
            </View>
          </View>

          {/* Divider */}
          <View className="w-px h-8 bg-[#46194F] mx-2" />

          {/* Installment */}
          <View className="items-center flex-1">
            <AppText style={{ fontSize: 12, color: '#666', marginBottom: 4 }}>
              {locale === 'ar' ? 'يبدأ القسط من' : 'Installment From'}
            </AppText>
            <View className="flex-row items-center justify-center">
              <AppText bold style={{ fontSize: 16, color: '#46194F', marginRight: 4 }}>
                {car.installmentPrice?.toLocaleString()}
              </AppText>
              <RiyalIcon width={20} height={20} />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}
