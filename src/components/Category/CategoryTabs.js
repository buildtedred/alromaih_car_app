import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Dimensions, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PagerView from 'react-native-pager-view';
import carsData, {
  getBodyTypes,
  getCategories,
  filterCarsByModel,
  filterCarsByBodyType,
  filterCarsByCategory,
} from '../../mock-data';
import { useLocale } from '../../contexts/LocaleContext';

const { width } = Dimensions.get('window');

const CategoryTabs = ({ onSelectCategory }) => {
  const { locale } = useLocale();
  const [activeTab, setActiveTab] = useState('models');
  const [pageIndex, setPageIndex] = useState(0);

  const getData = () => {
    if (activeTab === 'models') {
      return [...new Set(carsData.map((car) => car.name?.[locale]))].map((name) => ({
        label: name,
        key: name,
        icon: 'car-sports',
      }));
    } else if (activeTab === 'bodyTypes') {
      return getBodyTypes(locale);
    } else if (activeTab === 'categories') {
      return getCategories(locale);
    }
    return [];
  };

  const handlePress = (itemKey) => {
    if (!onSelectCategory) return;
    let filtered = [];
    if (activeTab === 'models') filtered = filterCarsByModel(itemKey);
    else if (activeTab === 'bodyTypes') filtered = filterCarsByBodyType(itemKey);
    else if (activeTab === 'categories') filtered = filterCarsByCategory(itemKey);
    onSelectCategory(filtered);
  };

  const itemsPerPage = 6; // 3 columns * 2 rows
  const numColumns = 3;

  const dataToShow = getData();
  const pages = Math.ceil(dataToShow.length / itemsPerPage);
  const pagedData = Array.from({ length: pages }, (_, i) =>
    dataToShow.slice(i * itemsPerPage, i * itemsPerPage + itemsPerPage)
  );

  const renderCard = (item, index) => (
    <TouchableOpacity
      key={index}
      onPress={() => handlePress(item.key)}
      className="w-[30%] mx-[1.5%] mb-3 p-4 bg-white rounded-xl shadow items-center"
    >
      <Icon name={item.icon || 'car'} size={26} color="#46194F" />
      <Text className="mt-2 text-xs font-semibold text-gray-800 text-center">
        {item.name || item.label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View className="mt-4">
      {/* Tabs */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-4 mb-2">
        {['models', 'bodyTypes', 'categories'].map((key) => (
          <TouchableOpacity
            key={key}
            onPress={() => {
              setActiveTab(key);
              setPageIndex(0);
            }}
            className={`px-4 py-2 rounded-full mx-1 ${
              activeTab === key ? 'bg-[#46194F]' : 'bg-gray-200'
            }`}
          >
            <Text
              className={`text-sm font-semibold ${
                activeTab === key ? 'text-white' : 'text-gray-700'
              }`}
            >
              {key === 'models'
                ? locale === 'ar'
                  ? 'الموديلات'
                  : 'Models'
                : key === 'bodyTypes'
                ? locale === 'ar'
                  ? 'أنواع الهيكل'
                  : 'Body Types'
                : locale === 'ar'
                ? 'الفئات'
                : 'Categories'}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Swipeable Pages */}
      <PagerView
        style={{ height: 280 }}
        initialPage={0}
        onPageSelected={(e) => setPageIndex(e.nativeEvent.position)}
      >
        {pagedData.map((page, i) => (
          <View key={i} className="flex-row flex-wrap justify-between px-4">
            {page.map(renderCard)}
          </View>
        ))}
      </PagerView>

      {/* Dots */}
      <View className="flex-row justify-center mt-2">
        {pagedData.map((_, i) => (
          <View
            key={i}
            className={`w-2 h-2 mx-1 rounded-full ${
              pageIndex === i ? 'bg-[#46194F]' : 'bg-gray-300'
            }`}
          />
        ))}
      </View>
    </View>
  );
};

export default CategoryTabs;
