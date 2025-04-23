import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import carsData from '../mock-data';
import { useLocale } from '../contexts/LocaleContext';
import { useTranslation } from 'react-i18next';

const popularCars = ['Daihatsu Mira', 'Honda City', 'Honda Civic', 'Suzuki Alto'];

export default function SearchScreen() {
  const navigation = useNavigation();
  const { locale } = useLocale();
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState(['All Cars']);
  const [suggestions, setSuggestions] = useState([]);

  const getLocalized = (value) => {
    if (!value) return '';
    return typeof value === 'object' ? value[locale] : value;
  };

  const filterCars = (term) => {
    const lower = term.toLowerCase();
    return carsData.filter((car) => {
      return (
        getLocalized(car.name).toLowerCase().includes(lower) ||
        car.brand?.toLowerCase().includes(lower) ||
        car.model?.toLowerCase().includes(lower) ||
        getLocalized(car.specs?.fuelType)?.toLowerCase().includes(lower) ||
        getLocalized(car.specs?.location)?.toLowerCase().includes(lower)
      );
    });
  };

  useEffect(() => {
    if (!query) {
      setSuggestions([]);
      return;
    }
    const results = filterCars(query);
    setSuggestions(results.slice(0, 5));
  }, [query]);

  const handleSubmit = (term) => {
    if (!term) return;
    const results = filterCars(term);

    navigation.navigate('FilteredCars', {
      filteredCars: results,
      query: term,
    });

    setRecentSearches((prev) => [term, ...prev.filter((item) => item !== term)]);
    setQuery('');
    setSuggestions([]);
  };

  const handleAdvancedSearch = () => {
    navigation.navigate('AdvancedSearch');
  };

  return (
    <SafeAreaView className="flex-1 bg-white px-4 pt-6">
      {/* Search Input */}
      <View className="flex-row items-center mb-4 bg-gray-100 rounded-xl px-3 py-2">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={22} color="#333" />
        </TouchableOpacity>
        <TextInput
          className="ml-3 flex-1 text-sm text-gray-800"
          placeholder={t('common.search_placeholder')}
          autoFocus
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={() => handleSubmit(query)}
        />
      </View>

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <View className="bg-white mb-4 rounded-lg shadow px-3 py-2">
          {suggestions.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => handleSubmit(getLocalized(item.name))}
              className="py-2"
            >
              <Text className="text-sm text-gray-800">{getLocalized(item.name)}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Recent Searches */}
      <View className="mb-6">
        <View className="flex-row justify-between items-center mb-2">
          <Text className="text-gray-700 font-semibold text-base">
            {t('screens.search.recent_searches', { defaultValue: 'Recent searches' })}
          </Text>
          <TouchableOpacity>
            <Text className="text-blue-500 text-sm">
              {t('common.view_all', { defaultValue: 'View All' })}
            </Text>
          </TouchableOpacity>
        </View>
        {recentSearches.map((item, idx) => (
          <TouchableOpacity
            key={idx}
            onPress={() => handleSubmit(item)}
            className="bg-gray-100 rounded-xl px-4 py-3 mb-2"
          >
            <Text className="text-gray-800">{item}</Text>
            <Text className="text-gray-500 text-xs">
              {t('screens.search.recent_filter_note', {
                defaultValue: 'All Cities, Any Price, Any Year',
              })}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity onPress={handleAdvancedSearch} className="mb-4">
        <Text className="text-center text-blue-600 font-semibold">
          {t('screens.search.advanced_search', { defaultValue: 'Advanced Search' })}
        </Text>
      </TouchableOpacity>

      {/* Popular Cars */}
      <Text className="text-gray-700 font-semibold text-base mb-2">
        {t('screens.search.popular', { defaultValue: 'Popular Used Cars' })}
      </Text>
      <FlatList
        data={popularCars}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handleSubmit(item)}
            className="border-b border-gray-200 py-3"
          >
            <Text className="text-gray-800">{item}</Text>
          </TouchableOpacity>
        )}
        keyboardShouldPersistTaps="handled"
      />
    </SafeAreaView>
  );
}
