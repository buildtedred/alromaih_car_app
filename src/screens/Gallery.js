import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useLocale } from '../contexts/LocaleContext';
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
import RiyalIcon from '../assets/icons/RiyalIcon.svg';
import JetourLogo from "../assets/brands/jetour_logo.svg";
import CarCard from '../components/cars/CarCard'; // Import CarCard component

const limitWords = (text, maxWords) => {
  const words = text.trim().split(/\s+/);
  if (words.length <= maxWords) return text;
  return words.slice(0, maxWords).join(' ') + '...';
};


const { width } = Dimensions.get('window');

const SECTIONS = [
  {
    key: 'transmission',
    title: 'ناقل الحركة',
    icon: 'car-shift-pattern',
    data: [
      { label: 'ناقل الحركة', value: 'اوتوماتيك' },
      { label: 'نوع الجر', value: 'دفع رباعي' },
      { label: 'وضع القيادة', value: 'عادي رياضي الرمال الطين' },
    ],
  },
];

export default function GalleryScreen({ route }) {
  const { car } = route.params;
  const [activeTab, setActiveTab] = useState('exterior');
  const { locale } = useLocale();
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentImages, setCurrentImages] = useState([]);
  const [expanded, setExpanded] = useState('transmission');
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedMethod, setSelectedMethod] = useState('cash');
  const [similarCars, setSimilarCars] = useState([]);

  const fullCar = useMemo(() => {
    const fromData = carsData.find((c) => c.id === car.id);
    return {
      ...car,
      image: fromData?.image,
      brandLogo: fromData?.brandLogo,
      additionalImages: fromData?.additionalImages,
      interiorImages: fromData?.interiorImages || [],
      exteriorImages: [fromData?.image, ...(fromData?.additionalImages || [])],
    };
  }, [car.id]);

  useEffect(() => {
    setCurrentImages(
      activeTab === 'interior' ? fullCar.interiorImages : fullCar.exteriorImages
    );
    
    // Find similar cars (same brand or similar price range)
    const similar = carsData
      .filter(c => c.id !== car.id && (c.brand === car.brand || 
        Math.abs(c.cashPrice - car.cashPrice) < 20000))
      .slice(0, 4);
    setSimilarCars(similar);
  }, [activeTab, fullCar, car.id, car.brand, car.cashPrice]);

  const getLang = (field) =>
    typeof field === 'object' ? field?.[locale] : field;

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
            <View style={{ width }} className="items-center justify-center ">
              <View className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm pl-4 px-4" style={{ width: width * 0.9, marginHorizontal: width * 0.05 }}>
                <Image source={item} resizeMode="contain" style={{ width: '100%', height: 210  }} />
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

 <View className="flex-row-reverse justify-between items-end px-2 gap-2 mt-4 ml-4 mr-2">

  {/* === Left Card: Purchase Method === */}
  <View className="w-1/2 max-w-[180px] h-[180px] bg-white rounded-2xl border-2 border-[#46194F] p-2 justify-between">

    <View>
      <Text className="text-[11px] text-[#46194F] text-center mb-1">
        اختر الطريقة المناسبة لشراء هذه السيارة؟
      </Text>

      <View className="flex-row bg-white rounded-3xl overflow-hidden border border-[#46194F] mb-2">
        <TouchableOpacity
          onPress={() => setSelectedMethod('cash')}
          className={`flex-1  ${selectedMethod === 'cash' ? 'bg-[#46194F]' : ''}`}
        >
          <Text className={`text-center text-[11px] font-bold ${selectedMethod === 'cash' ? 'text-white' : 'text-[#46194F]'}`}>
            كاش
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedMethod('finance')}
          className={`flex-1  ${selectedMethod === 'finance' ? 'bg-[#46194F]' : ''}`}
        >
          <Text className={`text-center text-[11px] font-bold ${selectedMethod === 'finance' ? 'text-white' : 'text-[#46194F]'}`}>
            التمويل
          </Text>
        </TouchableOpacity>
      </View>

      <View className="items-center">
        <Text className="text-xs text-[#46194F] mb-1">سعر الكاش</Text>
        <View className="flex-row-reverse items-center justify-center gap-2 mb-1">
          <RiyalIcon width={12} height={12} />
          <Text className="text-sm font-extrabold text-[#46194F]">146,000</Text>
        </View>
        <Text className="text-[10px] text-[#46194F] text-center leading-4 w-full" numberOfLines={2}>
          شامل الضريبه و اللوحات
        </Text>
      </View>
    </View>

    <TouchableOpacity className="bg-[#46194F] py-1.5 rounded-xl">
      <Text className="text-white text-center text-xs font-bold">طلب شراء</Text>
    </TouchableOpacity>
  </View>

  {/* === Right Card: Car Info === */}
  <View className="w-1/2 max-w-[180px] h-[180px] bg-white rounded-2xl border-2 border-[#46194F] p-2 justify-between">

    <View>
      <View className="flex-row-reverse justify-between items-end mb-2">
        <View className="items-end">
          <JetourLogo width={48} height={24} />
          <View className="flex-row-reverse gap-1 mt-1">
            <Icon name="heart" size={10} color="#46194F" />
            <ShareIcon width={10} height={10} />
            <PdfIcon width={11} height={11} />
          </View>
        </View>

        <View className="items-start w-[100px]">
          <Text numberOfLines={1} ellipsizeMode="tail" className="text-[10px] font-bold text-[#46194F] truncate w-full">
            جيتور T2
          </Text>
          <Text className="text-xs text-gray-500 mt-0.5 w-full">
            {limitWords("لدكري فل كامل 2025", 2)}
          </Text>
        </View>
      </View>

      <View className="h-[1px] bg-[#46194F] my-2" />

      <View className="flex-row justify-between items-center mb-2">
        <View className="flex-1 items-center">
          <Text className="text-[10px] text-gray-500 mb-1 text-start">سعر الكاش</Text>
          <View className="flex-row gap-1 justify-center items-center">
            <Text className="text-sm font-extrabold text-[#46194F]">146,000</Text>
            <RiyalIcon width={12} height={12} />
          </View>
        </View>

        <View className="w-[1px] h-8 bg-[#46194F] mx-2" />

        <View className="flex-1 items-center">
          <Text className="text-[10px] text-gray-500 mb-1 text-start">بدأ القسط من</Text>
          <View className="flex-row gap-1 justify-center items-center">
            <Text className="text-sm font-extrabold text-[#46194F]">1,940</Text>
            <RiyalIcon width={12} height={12} />
          </View>
        </View>
      </View>

      <View className="h-[1px] bg-[#46194F] my-2" />

      <View className="items-start">
        <Text className="text-xs text-gray-500 mb-1 text-start">لون السيارة</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 4, justifyContent: 'center', flexDirection: 'row' }}
        >
          {['#4b3b2c', '#8f8f8f', '#d2dce7', '#e7e51b', '#b42f0f'].map((color, idx) => (
            <View
              key={idx}
              className="w-5 h-5 rounded-full border border-white"
              style={{ backgroundColor: color }}
            />
          ))}
        </ScrollView>
      </View>
    </View>

  </View>
</View>

      {/* Car Quick Info Section */}
      <View className="px-4 mt-6 mb-4">
        <Text className="text-[#46194F] text-sm font-bold mb-3 text-right">معلومات السيارة</Text>
        <View className="flex-row justify-between">
          {[{
            icon: <ManufacturingYear width={26} height={26} />,
            label: 'سنه الصنع',
            value: '2025'
          }, {
            icon: <Wheels width={26} height={26} />,
            label: 'عجلات',
            value: '20 انش'
          }, {
            icon: <Torque width={26} height={26} />,
            label: 'عزم الدوران',
            value: '390 نيوتن'
          }, {
            icon: <Horsepower width={26} height={26} />,
            label: 'القوة',
            value: '251 حصان'
          }].map((item, idx) => (
            <View
              key={idx}
              className="bg-white border border-[#E5E5E5] rounded-xl px-3 py-2 items-center flex-1 mx-1"
            >
              <View className="mb-2">{item.icon}</View>
              <Text className="text-xs text-[#46194F] font-semibold mb-1 text-center">{item.label}</Text>
              <Text className="text-[11px] text-gray-700 font-medium text-center">{item.value}</Text>
            </View>
          ))}
        </View>
      </View>

      <View className="px-6 py-6">
  <Text className="text-[#46194F] text-lg font-bold mb-4 text-right">صفات السيارة</Text>
  {[
    {
      key: 'transmission',
      title: 'ناقل الحركة',
      icon: <CarFeatureIcon1 width={22} height={22} />,
      data: [
        { label: 'ناقل الحركة', value: 'اوتوماتيك' },
        { label: 'نوع الجر', value: 'دفع رباعي' },
        { label: 'وضع القيادة', value: 'عادي رياضي الرمال الطين' },
      ],
    },
    { key: 'comfort', title: 'السهولة والراحة', icon: <CarFeatureIcon2 width={22} height={22} /> },
    { key: 'seats1', title: 'المقاعد', icon: <CarFeatureIcon3 width={22} height={22} /> },
    { key: 'audio1', title: 'النظام الصوتي والاتصال', icon: <CarFeatureIcon4 width={22} height={22} /> },
    { key: 'safety1', title: 'السلامة', icon: <CarFeatureIcon5 width={22} height={22} /> },
    { key: 'seats2', title: 'المقاعد', icon: <CarFeatureIcon3 width={22} height={22} /> },
    { key: 'audio2', title: 'النظام الصوتي والاتصال', icon: <CarFeatureIcon4 width={22} height={22} /> },
    { key: 'safety2', title: 'السلامة', icon: <CarFeatureIcon5 width={22} height={22} /> },
  ].map((section) => (
    <View key={section.key} className="mb-3 rounded-xl border border-[#e5e5e5] bg-white">
      <TouchableOpacity
        onPress={() => setExpanded((prev) => (prev === section.key ? null : section.key))}
        className="flex-row justify-between items-center p-4"
      >
        <View className="flex-row items-center gap-2">
          <MaterialCommunityIcons
            name={expanded === section.key ? 'chevron-up' : 'chevron-down'}
            size={20}
            color="#46194F"
          />
          <Text className="text-[#46194F] font-semibold">{section.title}</Text>
        </View>
        {section.icon}
      </TouchableOpacity>
      {expanded === section.key && section.data && section.data.length > 0 && (
        <View className="bg-white px-4 pb-4">
          {section.data.map((item, index) => (
            <View
              key={index}
              className="flex-row justify-between items-start py-2 border-b border-[#46194F]"
            >
              <Text className="text-right text-[#46194F] font-normal w-1/2">{item.value}</Text>
              <Text className="text-left text-[#46194F] font-normal w-1/2">{item.label}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  ))}
</View>

      {/* Similar Cars Section */}
      <View className="px-4 pb-8">
        <Text className="text-[#46194F] text-lg font-bold mb-4 text-right">
          {locale === "ar" ? "سيارات مشابهة" : "Similar Cars"}
        </Text>
        
        <FlatList
          data={similarCars}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
           contentContainerStyle={{ paddingHorizontal: 4, paddingBottom: 70 }}
          renderItem={({ item }) => <CarCard car={item} />}
          ListEmptyComponent={
            <View className="items-center justify-center p-4 w-full">
              <Text className="text-gray-500">
                {locale === "ar" ? "لا توجد سيارات مشابهة" : "No similar cars found"}
              </Text>
            </View>
          }
        />
      </View>
    </ScrollView>
  );
}