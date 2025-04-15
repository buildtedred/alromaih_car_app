import React, { useState, useMemo } from 'react';
import { View, ScrollView, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useLocale } from '../contexts/LocaleContext';

import carsData, { brands, getModelsByBrand } from '../mock-data';
import ModelSelectModal from '../components/AdvancedSearch/ModelSelectModal';
import ModelSelector from '../components/AdvancedSearch/ModelSelector';
import LocationInput from '../components/AdvancedSearch/LocationInput';
import PriceRangeSlider from '../components/AdvancedSearch/PriceRangeSlider';
import ModelYearRangeSlider from '../components/AdvancedSearch/ModelYearRangeSlider';
import TransmissionSelector from '../components/AdvancedSearch/TransmissionSelector';

export default function AdvancedSearchScreen() {
  const { locale } = useLocale();
  const navigation = useNavigation();

  const [minYear, setMinYear] = useState(2018);
  const [maxYear, setMaxYear] = useState(2024);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedModels, setSelectedModels] = useState([]);
  const [location, setLocation] = useState('');
  const [modelModalVisible, setModelModalVisible] = useState(false);
  const [modelSearch, setModelSearch] = useState('');
  const [priceRange, setPriceRange] = useState([50000, 250000]);
  const [selectedTransmission, setSelectedTransmission] = useState(null);

  const modelOptions = useMemo(() => {
    const models = selectedBrand
      ? getModelsByBrand(selectedBrand, locale)
      : Object.keys(brands).flatMap((brandKey) => getModelsByBrand(brandKey, locale));

    return models.filter((m) =>
      m.name.toLowerCase().includes(modelSearch.toLowerCase())
    );
  }, [selectedBrand, modelSearch, locale]);

  const toggleModel = (modelKey) => {
    setSelectedModels((prev) =>
      prev.includes(modelKey)
        ? prev.filter((m) => m !== modelKey)
        : [...prev, modelKey]
    );
  };

  const clearModels = () => {
    setSelectedModels([]);
    setModelSearch('');
    setLocation('');
    setPriceRange([50000, 250000]);
    setMinYear(2018);
    setMaxYear(2024);
    setSelectedTransmission(null);
  };

  const handleSearch = () => {
    let filtered = carsData.filter((car) => {
      const matchModel = selectedModels.length === 0 || selectedModels.includes(car.model);
      const matchLocation =
        !location || car.specs?.location?.toLowerCase() === location.toLowerCase();
      const matchPrice = car.cashPrice >= priceRange[0] && car.cashPrice <= priceRange[1];
      const matchYear = car.specs?.year >= minYear && car.specs?.year <= maxYear;
      return matchModel && matchLocation && matchPrice && matchYear;
    });

    if (selectedTransmission) {
      filtered = filtered.filter(
        (car) =>
          car.specs?.transmission?.[locale]?.toLowerCase() ===
          selectedTransmission.toLowerCase()
      );
    }

    navigation.navigate('FilteredCars', {
      filteredCars: filtered,
      query: 'Advanced Filter',
    });
  };

  return (
    <View className="flex-1 bg-[#F9FAFB]">
      <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 20, paddingBottom: 100 }}>
        {/* Location Input */}
        <LocationInput location={location} setLocation={setLocation} />

        {/* Model Selector */}
        <ModelSelector
          selectedModels={selectedModels}
          modelOptions={modelOptions}
          toggleModel={toggleModel}
          setModelModalVisible={setModelModalVisible}
        />

        {/* Price Range Slider */}
        <PriceRangeSlider
          min={50000}
          max={250000}
          value={priceRange}
          onValueChange={setPriceRange}
        />

        {/* Model Year Range Slider */}
        <ModelYearRangeSlider
          initialValue={[minYear, maxYear]}
          onValueChange={(val) => {
            setMinYear(val[0]);
            setMaxYear(val[1]);
          }}
        />

        {/* Transmission Selector */}
        <TransmissionSelector
          selected={selectedTransmission}
          setSelected={setSelectedTransmission}
        />
      </ScrollView>

      {/* Action Buttons - Fixed to bottom */}
      <View className="absolute bottom-0 left-0 right-0 bg-white px-4 py-4 flex-row border-t border-gray-200">
        <TouchableOpacity
          onPress={clearModels}
          className="flex-1 mr-2 py-3 rounded-xl bg-brand-light border border-brand-dark items-center"
        >
          <Text className="text-brand font-medium text-base">Clear All</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleSearch}
          className="flex-1 ml-2 py-3 rounded-xl bg-brand items-center"
        >
          <Text className="text-white font-semibold text-base">Search</Text>
        </TouchableOpacity>
      </View>

      {/* Model Modal */}
      <ModelSelectModal
        visible={modelModalVisible}
        onClose={() => setModelModalVisible(false)}
        options={modelOptions}
        toggleModel={toggleModel}
        selectedModels={selectedModels}
        search={modelSearch}
        setSearch={setModelSearch}
      />
    </View>
  );
}
