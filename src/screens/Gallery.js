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
import RiyalIcon from '../assets/icons/RiyalIcon.svg'; // Add this at top


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
  const [selectedColor, setSelectedColor] = useState(null); // ✅ Declare selectedColor here
  const [selectedMethod, setSelectedMethod] = useState('cash');


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
  }, [activeTab, fullCar]);

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

      <View className="border-2 border-[#46194F] mx-8 mt-6 rounded-2xl px-4 pt-6 pb-4 bg-white relative">

{/* Brand Box */}
<View className="absolute -top-6 left-1/4 right-1/4 z-10">
  <View className="border-2 border-[#46194F] rounded-xl px-6 py-3 bg-white mx-auto items-center">
    <Text className="text-[#000] font-extrabold text-xs text-center">JETOUR</Text>
    <Text className="text-[10px] text-center text-gray-700 -mt-1">Drive Your Future</Text>
  </View>
</View>


{/* Top Icons + Info */}
<View className="flex-row justify-between mt-2 mb-2 items-center">
  <View className="flex-row gap-4">
    <Icon name="heart" size={20} color="#46194F" />
    <ShareIcon width={20} height={20} />
    <PdfIcon width={20} height={20} />
  </View>

  <View className="items-end">
    <Text className="text-xl font-bold text-[#46194F]">جيتور T2</Text>
    <Text className="text-sm text-gray-500">لدكري فل كامل 2025</Text>
  </View>
</View>

{/* Divider */}
<View className="h-[1px] bg-[#46194F] mb-2" />

{/* Price Section */}
<View className="flex-row justify-between items-center">
  {/* Cash Price */}
  <View className="items-center flex-1">
    <Text className="text-sm text-gray-500 mb-1">سعر الكاش</Text>
    <View className="flex-row items-center justify-center gap-1">
      <RiyalIcon width={20} height={20} />
      <Text className="text-xl font-extrabold text-[#46194F]">200000</Text>
    </View>
  </View>

  {/* Divider */}
  <View className="w-[1px] h-12 bg-[#46194F] mx-2" />

  {/* Installment Price */}
  <View className="items-center flex-1">
    <Text className="text-sm text-gray-500 mb-1">بدأ القسط من</Text>
    <View className="flex-row items-center justify-center gap-1">
      <RiyalIcon width={20} height={20} />
      <Text className="text-xl font-extrabold text-[#46194F]">1940</Text>
    </View>
  </View>
</View>



{/* Divider */}
<View className="h-[1px] bg-[#46194F] my-4" />

{/* Colors */}
<View className="items-end">
  <Text className="text-semibold text-gray-500 mb-2 text-end">لون السيارة</Text>
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    className="flex-row px"
    contentContainerStyle={{ gap: 14 }}
  >
    {[
      { color: '#b42f0f', label: 'أحمر' },
      { color: '#d2dce7', label: 'رمادي هاواي' },
      { color: '#8f8f8f', label: 'رمادي' },
      { color: '#4b3b2c', label: 'بني' },
      { color: '#000000', label: 'أسود' },
      { color: '#e7e51b', label: 'أصفر' },
      { color: '#6fa0d9', label: 'أزرق فاتح' },
      { color: '#374259', label: 'أزرق غامق' },
    ].map((item, idx) => {
      const isSelected = selectedColor === item.color;

      return (
        <TouchableOpacity
          key={idx}
          onPress={() => setSelectedColor(item.color)}
          className="items-center justify-center"
        >
          {isSelected ? (
            <View className="flex-row items-center gap-2 px-2 py-1 rounded-lg border border-[#94a3b8] bg-white">
              <Text className="text-xs text-[#374151]">{item.label || 'اللون المحدد'}</Text>
              <View
                className="w-10 h-10 rounded-full"
                style={{ backgroundColor: item.color }}
              />
            </View>
          ) : (
            <View
              className="w-10 h-10 rounded-full border-2 border-white"
              style={{ backgroundColor: item.color }}
            />
          )}
        </TouchableOpacity>
      );
    })}
  </ScrollView>
</View>

</View>









<View className="border-2 border-[#46194F] mx-8 rounded-xl p-4 mt-6">
  <Text className="text-sm text-[#46194F] text-center mb-3">
    اختر الطريقة المناسبة لشراء هذه السيارة؟
  </Text>

  {/* Tabs */}
  <View className="flex-row bg-white rounded-xl overflow-hidden border border-[#46194F] mx-4">
    <TouchableOpacity
      onPress={() => setSelectedMethod('finance')}
      className={`flex-1 py-2 rounded-l-xl ${
        selectedMethod === 'finance' ? 'bg-[#46194F]' : ''
      }`}
    >
      <Text
        className={`text-center font-bold ${
          selectedMethod === 'finance' ? 'text-white' : 'text-[#46194F]'
        }`}
      >
        التمويل
      </Text>
    </TouchableOpacity>
    <TouchableOpacity
      onPress={() => setSelectedMethod('cash')}
      className={`flex-1 py-2 rounded-r-xl ${
        selectedMethod === 'cash' ? 'bg-[#46194F]' : ''
      }`}
    >
      <Text
        className={`text-center font-bold ${
          selectedMethod === 'cash' ? 'text-white' : 'text-[#46194F]'
        }`}
      >
        كاش
      </Text>
    </TouchableOpacity>
  </View>

  {/* Price Info */}
  <View className="items-center mt-3">
    <Text className="text-sm text-[#46194F]">سعر الكاش</Text>
    <View className="flex-row items-center justify-center my-0.5 space-x-1 rtl:space-x-reverse">
      <RiyalIcon width={22} height={22} />
      <Text className="text-2xl font-extrabold text-[#46194F]">
        {fullCar.cashPrice?.toLocaleString()}
      </Text>
    </View>
    <Text className="text-sm text-[#46194F]">شامل الضريبه و اللوحات</Text>
  </View>

 {/* Buy Button */}
<TouchableOpacity className="w-11/12 bg-[#46194F] py-3 px-6 mt-3 rounded-xl self-center">

  <Text className="text-white text-center font-bold">طلب شراء</Text>
</TouchableOpacity>

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
    </ScrollView>
  );
}