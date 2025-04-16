import React, { useState, useMemo } from 'react';
import { View, ScrollView, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useLocale } from '../contexts/LocaleContext';

import carsData from '../mock-data';

import ModelSelectModal from '../components/AdvancedSearch/ModelSelectModal';
import ModelSelector from '../components/AdvancedSearch/ModelSelector';
import LocationInput from '../components/AdvancedSearch/LocationInput';
import PriceRangeSlider from '../components/AdvancedSearch/PriceRangeSlider';
import ModelYearRangeSlider from '../components/AdvancedSearch/ModelYearRangeSlider';
import TransmissionSelector from '../components/AdvancedSearch/TransmissionSelector';
import EngineSelector from '../components/AdvancedSearch/EngineSelector';
import BrandSelector from '../components/AdvancedSearch/BrandSelector';
import BodyTypeSelector from '../components/AdvancedSearch/BodyTypeSelector';
import CategorySelector from '../components/AdvancedSearch/CategorySelector';

const getDynamicYearRange = () => {
  const years = carsData.map((car) => car.specs?.year).filter(Boolean);
  return [Math.min(...years), Math.max(...years)];
};

const getDynamicPriceRange = () => {
  const prices = carsData.map((car) => car.cashPrice).filter(Boolean);
  return [Math.min(...prices), Math.max(...prices)];
};

export default function AdvancedSearchScreen() {
  const { locale } = useLocale();
  const navigation = useNavigation();

  const [minYearDefault, maxYearDefault] = getDynamicYearRange();
  const [minYear, setMinYear] = useState(minYearDefault);
  const [maxYear, setMaxYear] = useState(maxYearDefault);

  const [minPriceDefault, maxPriceDefault] = getDynamicPriceRange();
  const [priceRange, setPriceRange] = useState([minPriceDefault, maxPriceDefault]);

  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedModels, setSelectedModels] = useState([]);
  const [selectedBodyType, setSelectedBodyType] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [location, setLocation] = useState('');
  const [modelModalVisible, setModelModalVisible] = useState(false);
  const [modelSearch, setModelSearch] = useState('');
  const [selectedTransmission, setSelectedTransmission] = useState(null);
  const [selectedEngine, setSelectedEngine] = useState(null);

  const engineOptions = useMemo(() => {
    const engines = new Set();
    carsData.forEach((car) => {
      const engine = car?.specs?.fuelType;
      if (engine && typeof engine === 'object') {
        engines.add(engine[locale]);
      } else if (engine) {
        engines.add(engine.toString());
      }
    });
    return Array.from(engines);
  }, [locale]);

  const modelOptions = useMemo(() => {
    const allModels = carsData.map((car) => ({
      key: car.model,
      name: typeof car.model === 'object' ? car.model[locale] : car.model,
    }));

    const unique = [];
    const seen = new Set();
    for (const m of allModels) {
      if (!seen.has(m.key)) {
        seen.add(m.key);
        unique.push(m);
      }
    }

    return unique.filter((m) => m.name.toLowerCase().includes(modelSearch.toLowerCase()));
  }, [modelSearch, locale]);

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
    setPriceRange([minPriceDefault, maxPriceDefault]);
    setMinYear(minYearDefault);
    setMaxYear(maxYearDefault);
    setSelectedTransmission(null);
    setSelectedEngine(null);
    setSelectedBrand(null);
    setSelectedBodyType(null);
    setSelectedCategory(null);
  };

  const handleSearch = () => {
    let filtered = carsData.filter((car) => {
      const matchModel = selectedModels.length === 0 || selectedModels.includes(car.model);
      const matchLocation = !location || car.specs?.location?.toLowerCase() === location.toLowerCase();
      const matchPrice = car.cashPrice >= priceRange[0] && car.cashPrice <= priceRange[1];
      const matchYear = car.specs?.year >= minYear && car.specs?.year <= maxYear;
      const matchBodyType = !selectedBodyType || car.bodyType === selectedBodyType;
      const matchCategory = !selectedCategory || car.category === selectedCategory;
      const matchBrand = !selectedBrand || car.brand === selectedBrand;

      return (
        matchModel &&
        matchLocation &&
        matchPrice &&
        matchYear &&
        matchBodyType &&
        matchCategory &&
        matchBrand
      );
    });

    if (selectedTransmission) {
      filtered = filtered.filter(
        (car) =>
          car.specs?.transmission?.[locale]?.toLowerCase() ===
          selectedTransmission.toLowerCase()
      );
    }

    if (selectedEngine) {
      filtered = filtered.filter(
        (car) =>
          car.specs?.fuelType?.[locale]?.toLowerCase() ===
          selectedEngine.toLowerCase()
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
        <LocationInput location={location} setLocation={setLocation} />

        <BrandSelector selected={selectedBrand} setSelected={setSelectedBrand} />
        <BodyTypeSelector selected={selectedBodyType} setSelected={setSelectedBodyType} />
        <CategorySelector selected={selectedCategory} setSelected={setSelectedCategory} />

        <ModelSelector
          selectedModels={selectedModels}
          modelOptions={modelOptions}
          toggleModel={toggleModel}
          setModelModalVisible={setModelModalVisible}
        />

        <PriceRangeSlider
          min={minPriceDefault}
          max={maxPriceDefault}
          value={priceRange}
          onValueChange={setPriceRange}
        />

        <ModelYearRangeSlider
          min={minYearDefault}
          max={maxYearDefault}
          value={[minYear, maxYear]}
          onValueChange={(val) => {
            if (Array.isArray(val)) {
              setMinYear(val[0]);
              setMaxYear(val[1]);
            }
          }}
        />

        <TransmissionSelector
          selected={selectedTransmission}
          setSelected={setSelectedTransmission}
        />

        <EngineSelector
          selected={selectedEngine}
          setSelected={setSelectedEngine}
          engineOptions={engineOptions}
          locale={locale}
        />
      </ScrollView>

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
