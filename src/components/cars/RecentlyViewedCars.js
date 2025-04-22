import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, useWindowDimensions } from 'react-native';
import { useLocale } from '../../contexts/LocaleContext';
import { useRecentlyViewed } from '../../contexts/RecentlyViewedContext';

export default function RecentlyViewedCars({ navigation }) {
  const { locale } = useLocale();
  const { recentlyViewed } = useRecentlyViewed();
  const { width } = useWindowDimensions();

  if (recentlyViewed.length === 0) return null;

  const getLocalized = (value) =>
    typeof value === 'object' ? value?.[locale] : value;

  const handlePress = (car) => {
    const { brandLogo, image, ...serializableCar } = car;
    navigation.navigate('Gallery', { car: serializableCar });
  };

  // Responsive values
  const isSmallScreen = width < 375;
  const cardWidth = isSmallScreen ? 180 : 210;
  const imageHeight = isSmallScreen ? 24 : 28;
  const textSize = isSmallScreen ? 'xs' : 'sm';
  const headerPadding = isSmallScreen ? 'px-4' : 'px-4';
  const listPadding = isSmallScreen ? 12 : 16;

  return (
    <View className="mt-6">
      {/* Section Header */}
      <View className={`flex-row justify-between items-center ${headerPadding} mb-3`}>
        <Text className="text-xl font-bold text-gray-900">
          {locale === 'ar' ? 'تمت مشاهدتها مؤخرًا' : 'Recently Viewed'}
        </Text>
        <TouchableOpacity>
          <Text className="text-base font-medium" style={{ color: '#46194F' }}>
            {locale === 'ar' ? 'عرض الكل' : 'View All'}
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={recentlyViewed}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingLeft: listPadding,
          paddingRight: listPadding / 2,
        }}
        ItemSeparatorComponent={() => <View className="w-3" />}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handlePress(item)}
            className="bg-white rounded-2xl shadow-md overflow-hidden"
            style={{ width: cardWidth }}
          >
            {/* Car Image */}
            <View className="p-2 items-center justify-center">
              <Image
                source={item.image}
                resizeMode="contain"
                className="w-full"
                style={{ height: imageHeight * 4 }}
              />
            </View>

            {/* Text Section */}
            <View className="bg-white px-3 pb-2">
              {/* Model + Brand */}
              <View className="flex-row justify-between items-center mb-1">
                <Text
                  className="text-[#46194F] font-bold text-sm"
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {getLocalized(item.name)}
                </Text>
                <Text className="text-[#46194F] text-xs font-medium">
                  {getLocalized(item.brand)}
                </Text>
              </View>

              {/* Price + Year */}
              <View className="flex-row justify-between items-center">
                <Text className="text-[#46194F] text-sm font-semibold">
                  {item.cashPrice?.toLocaleString()} {locale === 'en' ? 'SAR' : 'ر.س'}
                </Text>
                <Text className="text-[#46194F] text-xs font-medium">
                  {item.specs?.year}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
