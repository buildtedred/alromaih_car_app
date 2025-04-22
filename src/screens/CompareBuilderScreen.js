import React, { useState, useMemo, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fetchCars, getBrands, getModelsByBrand } from '../mock-data';
import { useLocale } from '../contexts/LocaleContext';

export default function CompareBuilderScreen() {
  const { language } = useLocale();
  const navigation = useNavigation();

  const [carsToCompare, setCarsToCompare] = useState([
    { brand: '', model: '', year: '', showBrand: false, showModel: false, showYear: false },
    { brand: '', model: '', year: '', showBrand: false, showModel: false, showYear: false },
  ]);
  const [carsData, setCarsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchCars();
        setCarsData(data);
      } catch (error) {
        console.error('Error loading car data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  const availableBrands = useMemo(() => {
    if (!carsData.length) return [];
    const uniqueBrands = [...new Set(carsData.map(car => car.brand))];
    return getBrands(language).filter(brand => uniqueBrands.includes(brand.key));
  }, [carsData, language]);

  const getAvailableModels = (brandKey) => {
    if (!brandKey || !carsData.length) return [];
    const modelsForBrand = getModelsByBrand(brandKey, language);
    return modelsForBrand.filter(model => carsData.some(car => car.brand === brandKey && car.model === model.key));
  };

  const getAvailableYears = (brand, model) => {
    if (!brand || !model || !carsData.length) return [];
    return Array.from(new Set(carsData.filter(car => car.brand === brand && car.model === model).map(car => car.specs?.year))).sort((a, b) => b - a);
  };

  const handleUpdate = (index, field, value) => {
    const updated = [...carsToCompare];
    updated[index][field] = value;
    if (field === 'brand') {
      updated[index].model = '';
      updated[index].year = '';
    } else if (field === 'model') {
      updated[index].year = '';
    }
    setCarsToCompare(updated);
  };

  const toggleDropdown = (index, dropdownKey) => {
    const updated = [...carsToCompare];
    updated[index][dropdownKey] = !updated[index][dropdownKey];
    if (updated[index][dropdownKey]) {
      Object.keys(updated[index]).forEach(key => {
        if (key.startsWith('show') && key !== dropdownKey) {
          updated[index][key] = false;
        }
      });
    }
    setCarsToCompare(updated);
  };

  const handleAddCar = () => {
    if (carsToCompare.length < 5) {
      setCarsToCompare([...carsToCompare, { brand: '', model: '', year: '', showBrand: false, showModel: false, showYear: false }]);
    }
  };

  const handleRemoveCar = (index) => {
    if (carsToCompare.length > 2) {
      const updated = [...carsToCompare];
      updated.splice(index, 1);
      setCarsToCompare(updated);
    }
  };

  const handleShowComparison = () => {
    const selectedCars = carsToCompare.filter(c => c.brand && c.model && c.year);
    if (selectedCars.length >= 2) {
      const fullCarObjects = selectedCars.map(sc =>
        carsData.find(c => c.brand === sc.brand && c.model === sc.model && c.specs?.year === sc.year)
      ).filter(Boolean);

      // Strip out brandLogo (component functions) to prevent non-serializable warning
      const sanitized = fullCarObjects.map(({ brand, model, specs, name, image }) => ({
        brand,
        model,
        specs,
        name,
        image,
      }));

      navigation.navigate('CompareScreen', { selectedCars: sanitized });
    }
  };

  const canCompare = carsToCompare.filter(c => c.brand && c.model && c.year).length >= 2;

  if (isLoading) {
    return (
      <View className="flex-1 bg-white justify-center items-center">
        <Text className="text-lg">Loading car data...</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-white px-4 py-6">
      <Text className="text-3xl font-bold text-center text-brand mb-6 uppercase">Compare Cars</Text>

      <View className="flex-row flex-wrap justify-between mb-8">
        {carsToCompare.map((car, index) => (
          <View key={index} className="w-[48%] mb-4 bg-brand-light border border-brand-dark rounded-2xl p-3">
            <Text className="text-lg font-semibold text-center text-brand mb-3">Car {index + 1}</Text>

            <Text className="text-xs text-gray-500 mb-1">Brand</Text>
            <TouchableOpacity onPress={() => toggleDropdown(index, 'showBrand')} className={`bg-white border border-gray-300 rounded-lg px-4 py-3 mb-2`}>
              <Text className={`${car.brand ? 'text-gray-800' : 'text-gray-400'}`}>{car.brand ? availableBrands.find(b => b.key === car.brand)?.name || car.brand : 'Select Brand'}</Text>
            </TouchableOpacity>
            {car.showBrand && (
              <View className="bg-white border border-gray-300 rounded-lg mb-3 max-h-40">
                {availableBrands.map(brand => (
                  <TouchableOpacity key={brand.key} onPress={() => { handleUpdate(index, 'brand', brand.key); toggleDropdown(index, 'showBrand'); }} className="px-4 py-2">
                    <Text className="text-gray-800">{brand.name[language] || brand.key}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            <Text className="text-xs text-gray-500 mb-1">Model</Text>
            <TouchableOpacity disabled={!car.brand} onPress={() => toggleDropdown(index, 'showModel')} className={`bg-white border ${car.brand ? 'border-gray-300' : 'border-gray-200'} rounded-lg px-4 py-3 mb-2`}>
              <Text className={`${car.model ? 'text-gray-800' : 'text-gray-400'}`}>{car.model || 'Select Model'}</Text>
            </TouchableOpacity>
            {car.showModel && car.brand && (
              <View className="bg-white border border-gray-300 rounded-lg mb-3 max-h-40">
                {getAvailableModels(car.brand).map(model => (
                  <TouchableOpacity key={model.key} onPress={() => { handleUpdate(index, 'model', model.key); toggleDropdown(index, 'showModel'); }} className="px-4 py-2">
                    <Text className="text-gray-800">{model.name[language] || model.key}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            <Text className="text-xs text-gray-500 mb-1">Year</Text>
            <TouchableOpacity disabled={!car.model} onPress={() => toggleDropdown(index, 'showYear')} className={`bg-white border ${car.model ? 'border-gray-300' : 'border-gray-200'} rounded-lg px-4 py-3 mb-2`}>
              <Text className={`${car.year ? 'text-gray-800' : 'text-gray-400'}`}>{car.year || 'Select Year'}</Text>
            </TouchableOpacity>
            {car.showYear && car.model && (
              <View className="bg-white border border-gray-300 rounded-lg mb-3 max-h-40">
                {getAvailableYears(car.brand, car.model).map(year => (
                  <TouchableOpacity key={year} onPress={() => { handleUpdate(index, 'year', year); toggleDropdown(index, 'showYear'); }} className="px-4 py-2">
                    <Text className="text-gray-800">{year}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {carsToCompare.length > 2 && (
              <TouchableOpacity onPress={() => handleRemoveCar(index)} className="mt-4 bg-red-100 px-4 py-2 rounded-full">
                <Text className="text-red-600 text-center text-sm">Remove</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </View>

      {carsToCompare.length < 5 && (
        <TouchableOpacity onPress={handleAddCar} className="mb-6 flex-row items-center justify-center">
          <View className="bg-brand w-6 h-6 rounded-full flex items-center justify-center mr-2">
            <Text className="text-white text-lg">+</Text>
          </View>
          <Text className="text-brand font-medium text-base">Add Another Car</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity onPress={handleShowComparison} disabled={!canCompare} className={`py-4 rounded-full ${canCompare ? 'bg-brand' : 'bg-gray-400'}`}>
        <Text className="text-white text-center text-lg font-bold">
          {canCompare ? `Compare ${carsToCompare.filter(c => c.brand && c.model && c.year).length} Cars` : 'Select 2 or more cars to compare'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
