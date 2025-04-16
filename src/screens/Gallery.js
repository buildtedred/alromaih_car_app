import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useLocale } from '../contexts/LocaleContext';
import { getAllSpecGroups, brandLogos } from '../mock-data';

const { width } = Dimensions.get('window');

export default function GalleryScreen({ route }) {
  const { car } = route.params;
  const [activeTab, setActiveTab] = useState('specs');
  const { locale } = useLocale();

  const getLang = (field) =>
    typeof field === 'object' ? field?.[locale] : field;

  const specGroups = getAllSpecGroups(car, locale);
  const images = [car.image, ...(car.additionalImages || [])].map((img, index) => ({
    id: index + 1,
    source: img,
  }));

  const BrandLogo = brandLogos[car.brand]; // ✅ SVG component (not passed via navigation)

  return (
    <ScrollView className="flex-1 bg-white">
      {/* Image Slider */}
      <View className="h-64 relative">
        <FlatList
          data={images}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={{ width, height: 250 }}>
              <Image
                source={item.source}
                resizeMode="contain"
                style={{
                  width: '80%',
                  height: '80%',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  marginTop: '7%',
                }}
              />
            </View>
          )}
        />
        <View className="absolute bottom-4 right-4 bg-black bg-opacity-50 px-2 py-1 rounded-xl">
          <Text className="text-white text-xs">1/{images.length}</Text>
        </View>
      </View>

      {/* Car Info Card */}
      <View className="bg-white mx-4 mt-10 rounded-2xl px-4 py-4 shadow-md">
  <View className="flex-row justify-between items-start">
    {/* Left Side: Name, Year, Price */}
    <View className="flex-1">
      <Text className="text-xl font-bold text-[#46194F] mb-1">
        {getLang(car.name)}
      </Text>
      <Text className="text-sm text-gray-500">
        {getLang(car.modelYear)}
      </Text>

      {/* ✅ Price stays below name/year */}
      <Text className="text-2xl font-extrabold text-[#46194F] mt-3">
        {car.cashPrice?.toLocaleString()} {locale === 'en' ? 'SAR' : 'ر.س'}
      </Text>
    </View>

    {/* Right Side: Brand Logo + Installment badge under it */}
    {BrandLogo && (
      <View className="items-end ml-2">
        {/* Brand Logo Card */}
        <View className="bg-gray-100 px-3 py-2 rounded-xl items-center justify-center mb-2" style={{ elevation: 2 }}>
          <BrandLogo width={75} height={40} />
        </View>

        {/* ✅ Installment badge under brand logo */}
        <View className="bg-[#46194F] px-3 py-1 mt-1 rounded-full">
          <Text className="text-white text-xs font-semibold">
            {locale === 'en' ? 'From' : 'من'} {car.installmentPrice}{' '}
            {locale === 'en' ? '/mo' : '/شهر'}
          </Text>
        </View>
      </View>
    )}
  </View>
</View>





      {/* Quick Specs */}
      <View className="bg-white mx-4 mt-4 rounded-2xl px-4 py-4 shadow-md">
        <View className="flex-row justify-between">
          {[
            { icon: 'calendar', label: 'year', value: car.specs.year },
            { icon: 'tachometer', label: 'mileage', value: car.specs?.mileage || '0 km' },
            { icon: 'gear', label: 'transmission', value: getLang(car.specs.transmission) },
            { icon: 'users', label: 'seats', value: getLang(car.specs.seats) },
          ].map((item) => (
            <View key={item.label} className="items-center flex-1">
              <View className="bg-gray-100 p-2.5 rounded-full mb-2">
                <Icon name={item.icon} size={20} color="#46194F" />
              </View>
              <Text className="text-gray-500 text-xs mb-1">
                {locale === 'en'
                  ? item.label.charAt(0).toUpperCase() + item.label.slice(1)
                  : item.label === 'year'
                  ? 'السنة'
                  : item.label === 'mileage'
                  ? 'عدد الكيلومترات'
                  : item.label === 'transmission'
                  ? 'ناقل الحركة'
                  : 'المقاعد'}
              </Text>
              <Text className="text-gray-800 font-semibold text-sm">{item.value}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Tabs */}
      <View className="flex-row border-b border-gray-200 mx-4 mt-6">
        {['specs', 'features'].map((tab) => (
          <TouchableOpacity
            key={tab}
            className={`flex-1 py-3 border-b-2 ${activeTab === tab ? 'border-[#46194F]' : 'border-transparent'}`}
            onPress={() => setActiveTab(tab)}
          >
            <Text className={`text-center font-medium ${activeTab === tab ? 'text-[#46194F]' : 'text-gray-500'}`}>
              {locale === 'en'
                ? tab === 'specs'
                  ? 'Specifications'
                  : 'Features'
                : tab === 'specs'
                ? 'المواصفات'
                : 'المميزات'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Tab Content */}
      <View className="p-4">
        {activeTab === 'specs' ? (
          specGroups.map((group) => (
            <View key={group.groupKey} className="mb-6">
              <Text className="text-lg font-bold text-[#46194F] mb-2">
                {group.groupName}
              </Text>
              <View className="bg-gray-50 rounded-lg p-3">
                {group.specs.map((spec) => (
                  <View
                    key={spec.key}
                    className="py-2 border-b border-gray-200 flex-row justify-between"
                  >
                    <Text className="text-sm text-gray-500">{spec.name}</Text>
                    <Text className="text-sm text-gray-800 font-semibold">{spec.value}</Text>
                  </View>
                ))}
              </View>
            </View>
          ))
        ) : (
          <View>
            {Object.entries(car.features)
              .filter(([_, enabled]) => enabled)
              .map(([key], idx) => (
                <View key={idx} className="mb-2">
                  <View className="flex-row items-center">
                    <Icon name="check-circle" size={16} color="#46194F" />
                    <Text className="text-gray-800 text-sm ml-2">
                      {locale === 'en' ? key : `ميزة: ${key}`}
                    </Text>
                  </View>
                </View>
              ))}
          </View>
        )}
      </View>

      {/* CTA */}
      <View className="p-4 bg-gray-50">
        <TouchableOpacity className="bg-[#46194F] p-4 rounded-lg flex-row justify-center items-center">
          <MaterialIcons name="phone" size={20} color="white" />
          <Text className="text-white font-bold text-lg ml-2">
            {locale === 'en' ? 'Contact Sales' : 'اتصل بالمبيعات'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity className="border border-[#46194F] p-4 rounded-lg flex-row justify-center items-center mt-3">
          <MaterialIcons name="schedule" size={20} color="#46194F" />
          <Text className="text-[#46194F] font-bold text-lg ml-2">
            {locale === 'en' ? 'Schedule Test Drive' : 'حجز تجربة قيادة'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
