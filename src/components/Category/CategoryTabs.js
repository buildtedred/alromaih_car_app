import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PagerView from 'react-native-pager-view';

import carsData, {
  getBodyTypes,
  getCategories,
  modelIcons,
  bodyTypeIcons,
  categoryIcons,
  filterCarsByModel,
  filterCarsByBodyType,
  filterCarsByCategory,
} from '../../mock-data';

import { useLocale } from '../../contexts/LocaleContext';

const { width } = Dimensions.get('window');

const getModels = (locale) => {
  const seen = new Set();
  return carsData.reduce((acc, car) => {
    if (!seen.has(car.model)) {
      seen.add(car.model);
      acc.push({
        key: car.model,
        name: car.name?.[locale],
        icon: modelIcons?.[car.model], // dynamic icon if available
      });
    }
    return acc;
  }, []);
};

const TABS = [
  { key: 'models', getData: getModels },
  { key: 'bodyTypes', getData: getBodyTypes },
  { key: 'categories', getData: getCategories },
];

const getTabLabel = (key, locale) => {
  const labels = {
    models: { en: 'Models', ar: 'الموديلات' },
    bodyTypes: { en: 'Body Types', ar: 'أنواع الهيكل' },
    categories: { en: 'Categories', ar: 'الفئات' },
  };
  return labels[key][locale];
};

const CategoryTabs = ({ onSelectCategory }) => {
  const { locale } = useLocale();
  const [activeTab, setActiveTab] = useState('models');
  const [pageIndex, setPageIndex] = useState(0);

  const activeTabData = TABS.find(tab => tab.key === activeTab);
  const dataToShow = activeTabData.getData(locale);

  const itemsPerPage = 6; // 3 columns x 2 rows
  const pages = Math.ceil(dataToShow.length / itemsPerPage);
  const pagedData = Array.from({ length: pages }, (_, i) =>
    dataToShow.slice(i * itemsPerPage, i * itemsPerPage + itemsPerPage)
  );

  const getIconForItem = (itemKey) => {
    if (activeTab === 'models') return modelIcons?.[itemKey];
    if (activeTab === 'bodyTypes') return bodyTypeIcons?.[itemKey];
    if (activeTab === 'categories') return categoryIcons?.[itemKey];
    return 'car-sports';
  };

  const handlePress = (itemKey) => {
    if (!onSelectCategory) return;
    let filtered = [];
    if (activeTab === 'models') filtered = filterCarsByModel(itemKey);
    else if (activeTab === 'bodyTypes') filtered = filterCarsByBodyType(itemKey);
    else if (activeTab === 'categories') filtered = filterCarsByCategory(itemKey);
    onSelectCategory(filtered);
  };

  const renderCard = (item, index) => (
    <TouchableOpacity
      key={index}
      onPress={() => handlePress(item.key)}
      className="w-[30%] mx-[1.5%] mb-3 p-4 bg-white rounded-xl shadow items-center"
    >
      <Icon name={getIconForItem(item.key) || 'car-sports'} size={26} color="#46194F" />
      <Text className="mt-2 text-xs font-semibold text-gray-800 text-center">
        {item.name || item.label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View className="mt-4">
   
      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-4 mb-2">
        {TABS.map(({ key }) => (
          <TouchableOpacity
            key={key}
            onPress={() => {
              setActiveTab(key);
              setPageIndex(0);
            }}
            className={`w-[110] items-center py-3 mb-4 font-semibold rounded-[5px] mx-1 ${activeTab === key ? 'bg-[#46194F]' : 'bg-gray-200'}`}
          >
            <Text className={`text-sm font-semibold ${activeTab === key ? 'text-white' : 'text-gray-700'}`}>
              {getTabLabel(key, locale)}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Dynamic PagerView */}
      <PagerView
        style={{ height: 200 }} // Default, will adjust per page
        initialPage={0}
        onPageSelected={(e) => setPageIndex(e.nativeEvent.position)}
      >
        {pagedData.map((page, i) => {
          const rows = Math.ceil(page.length / 3);
          const height = rows * 125; // 125px per row
          return (
            <View
                key={i}
                style={{ height }}
                className="flex-row flex-wrap justify-center px-4"
>              {page.map(renderCard)}
             </View>
          );
        })}
      </PagerView>

      {/* Dots */}
      <View className="flex-row justify-center mt-2">
        {pagedData.map((_, i) => (
          <View
            key={i}
            className={`w-2 h-2 mx-1 rounded-full ${pageIndex === i ? 'bg-[#46194F]' : 'bg-gray-300'}`}
          />
        ))}
      </View>
    </View>
  );
};

export default CategoryTabs;
