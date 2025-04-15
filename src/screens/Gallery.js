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
import { getAllSpecGroups } from '../mock-data';

const { width } = Dimensions.get('window');

const GalleryScreen = ({ route }) => {
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

      {/* Header */}
      <View className="bg-[#46194F] p-4 mt-6">
        <View className="flex-row justify-between items-start">
          <View className="flex-1">
            <Text className="text-2xl font-bold text-white mb-1">
              {getLang(car.name)}
            </Text>
            <Text className="text-base text-white text-opacity-80">
              {getLang(car.modelYear)}
            </Text>
          </View>
          <Image
            source={{ uri: car.brandLogo }}
            className="w-16 h-16"
            resizeMode="contain"
          />
        </View>

        <View className="flex-row items-center mt-4">
          <Text className="text-2xl font-bold text-white">
            {car.cashPrice?.toLocaleString()} {locale === 'en' ? 'SAR' : 'ر.س'}
          </Text>
          <View className="bg-white bg-opacity-20 px-3 py-1.5 rounded-xl ml-3">
            <Text className="text-white font-semibold text-sm">
              {locale === 'en' ? 'From' : 'من'} {car.installmentPrice} {locale === 'en' ? '/mo' : '/شهر'}
            </Text>
          </View>
        </View>
      </View>

      {/* Quick Specs */}
      <View className="flex-row justify-around bg-gray-50 mx-4 rounded-xl p-4 shadow-sm my-4">
        {[
          { icon: 'calendar', label: 'year', value: car.specs.year },
          { icon: 'tachometer', label: 'mileage', value: '0 km' },
          { icon: 'gear', label: 'transmission', value: getLang(car.specs.transmission) },
          { icon: 'users', label: 'seats', value: getLang(car.specs.seats) },
        ].map((item) => (
          <View key={item.label} className="items-center">
            <View className="bg-white p-2.5 rounded-full mb-2">
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

      {/* Tabs */}
      <View className="flex-row border-b border-gray-200 mx-4">
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
                    <Text className="text-sm text-gray-500">
                      {spec.name}
                    </Text>
                    <Text className="text-sm text-gray-800 font-semibold">
                      {spec.value}
                    </Text>
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
      <View className="p-4 bg-gray-50 mt-4">
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
};

export default GalleryScreen;
