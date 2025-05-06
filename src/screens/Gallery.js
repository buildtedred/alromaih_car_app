import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  FlatList,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useLocale } from '../contexts/LocaleContext';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNFS from 'react-native-fs';
import carsData, { getAllSpecGroups, brandLogos } from '../mock-data';
import Horsepower from '../assets/icons/Horsepower.svg';
import Torque from '../assets/icons/Torque.svg';
import Wheels from '../assets/icons/Wheels.svg';
import ShareIcon from '../assets/icons/ShareIcon.svg';
import PdfIcon from '../assets/icons/PdfIcon.svg';
import ManufacturingYear from '../assets/icons/ManufacturingYear.svg';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CarFeatureIcon1 from '../assets/icons/CarFeatureIcon1.svg';
import CarFeatureIcon2 from '../assets/icons/CarFeatureIcon2.svg';
import CarFeatureIcon3 from '../assets/icons/CarFeatureIcon3.svg';
import CarFeatureIcon4 from '../assets/icons/CarFeatureIcon4.svg';
import CarFeatureIcon5 from '../assets/icons/CarFeatureIcon5.svg';
import RiyalIcon from '../assets/icons/RiyalIcon.svg'; // Add this at top


const { width } = Dimensions.get('window');

export default function GalleryScreen({ route }) {
  const { car } = route.params;
  const [activeTab, setActiveTab] = useState('specs');
  const { locale } = useLocale();

  const fullCar = useMemo(() => {
    const carData = carsData.find((c) => c.id === car.id);
    return {
      ...car,
      image: fromData?.image,
      brandLogo: fromData?.brandLogo,
      additionalImages: fromData?.additionalImages,
    };
  }, [car.id]);

  useEffect(() => {
    setCurrentImages(
      activeTab === 'interior' ? fullCar.interiorImages : fullCar.exteriorImages
    );
  }, [activeTab, fullCar]);

  const getLang = (field) =>
    typeof field === 'object' ? field?.[locale] : field;

  const specGroups = getAllSpecGroups(fullCar, locale);
  const images = [fullCar.image, ...(fullCar.additionalImages || [])].map((img, index) => ({
    id: index + 1,
    source: img,
  }));

  const BrandLogo = brandLogos[fullCar.brand];

  const getFeatureLabel = (key, locale) => {
    const labels = {
      exterior: { en: 'Exterior', ar: 'الخارجية' },
      interior: { en: 'Interior', ar: 'الداخلية' },
      engine: { en: 'Engine', ar: 'المحرك' },
      safety: { en: 'Safety', ar: 'السلامة' },
      technology: { en: 'Technology', ar: 'التقنية' },
      entertainment: { en: 'Entertainment', ar: 'الترفيه' },
      comfort: { en: 'Comfort', ar: 'الراحة' },
      exteriorFeatures: { en: 'Exterior Features', ar: 'ميزات خارجية' },
    };
    return labels[key]?.[locale] || key;
  };

  return (
    <ScrollView className="flex-1 bg-white">
      {/* Tabbed Image Section */}
      <View className="mt-4 w-full items-center">
        <View className="bg-[#EDEDED] rounded-full flex-row overflow-hidden w-60 h-10 mb-3">
          {['exterior', 'interior'].map((type) => {
            const isActive = activeTab === type;
            return (
              <TouchableOpacity
                key={type}
                className={`flex-1 items-center justify-center ${isActive ? 'bg-[#46194F]' : 'bg-transparent'}`}
                onPress={() => setActiveTab(type)}
              >
                <Text className={`font-bold text-sm ${isActive ? 'text-white' : 'text-[#46194F]'}`}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <Animated.FlatList
          data={currentImages}
          keyExtractor={(_, index) => index.toString()}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          snapToInterval={width}
          decelerationRate="fast"
          bounces={false}
          contentContainerStyle={{ width: width * currentImages.length }}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          renderItem={({ item }) => (
            <View style={{ width }} className="items-center justify-center">
              <View className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm" style={{ width: width * 0.9, marginHorizontal: width * 0.05 }}>
                <Image source={item} resizeMode="cover" style={{ width: '100%', height: 210 }} />
              </View>
            </View>
          )}
        />

        <View className="flex-row justify-center mt-3">
          {currentImages.map((_, idx) => {
            const inputRange = [width * (idx - 1), width * idx, width * (idx + 1)];
            const dotOpacity = scrollX.interpolate({ inputRange, outputRange: [0.3, 1, 0.3], extrapolate: 'clamp' });
            return <Animated.View key={idx} style={{ opacity: dotOpacity, backgroundColor: '#46194F', height: 8, width: 8, marginHorizontal: 4, borderRadius: 4, marginVertical: 8, }} />;
          })}
        </View>
      </View>

      <View className="bg-white mx-4 mt-10 rounded-2xl px-4 py-4 shadow-md">
        <View className="flex-row justify-between items-start">
          <View className="flex-1">
            <Text className="text-xl font-bold text-[#46194F] mb-1">
              {getLang(fullCar.name)}
            </Text>
            <Text className="text-sm text-gray-500">
              {getLang(fullCar.modelYear)}
            </Text>
            <Text className="text-2xl font-extrabold text-[#46194F] mt-3">
              {fullCar.cashPrice?.toLocaleString()} {locale === 'en' ? 'SAR' : 'ر.س'}
            </Text>
          </View>

          {BrandLogo && (
            <View className="items-end ml-2">
              <View className="bg-gray-100 px-3 py-2 rounded-xl items-center justify-center mb-2" style={{ elevation: 2 }}>
                <BrandLogo width={75} height={40} />
              </View>
              <View className="bg-[#46194F] px-3 py-1 mt-1 rounded-full">
                <Text className="text-white text-xs font-semibold">
                  {locale === 'en' ? 'From' : 'من'} {fullCar.installmentPrice} {locale === 'en' ? '/mo' : '/شهر'}
                </Text>
              </View>
            </View>
          )}
        </View>
      </View>

      <View className="bg-white mx-4 mt-4 rounded-2xl px-4 py-4 shadow-md">
        <View className="flex-row justify-between">
          {[
            { icon: 'calendar', label: 'year', value: fullCar.specs.year },
            { icon: 'tachometer', label: 'mileage', value: fullCar.specs?.mileage || '0 km' },
            { icon: 'gear', label: 'transmission', value: getLang(fullCar.specs.transmission) },
            { icon: 'users', label: 'seats', value: getLang(fullCar.specs.seats) },
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
            {Object.entries(fullCar.features)
              .filter(([_, enabled]) => enabled)
              .map(([key], idx) => (
                <View key={idx} className="mb-2">
                  <View className="flex-row items-center">
                    <Icon name="check-circle" size={16} color="#46194F" />
                    <Text className="text-gray-800 text-sm ml-2">
                      {getFeatureLabel(key, locale)}
                    </Text>
                  </View>
                </View>
              ))}
          </View>
        )}
      </View>

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