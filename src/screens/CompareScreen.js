import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { getAllSpecGroups, brandLogos } from '../mock-data';
import { useLocale } from '../contexts/LocaleContext';
import { useTranslation } from 'react-i18next';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNFS from 'react-native-fs';

export default function CompareScreen() {
  const route = useRoute();
  const { selectedCars = [] } = route.params || {};
  const { language } = useLocale();
  const { t } = useTranslation();
  const [expandedGroups, setExpandedGroups] = useState({});

  if (!selectedCars.length || selectedCars.length < 2) {
    return (
      <View className="flex-1 items-center justify-center bg-white px-4">
        <Text className="text-lg font-semibold text-gray-600">
          {t('compare.select_two_cars')}
        </Text>
      </View>
    );
  }

  const specGroups = getAllSpecGroups(selectedCars[0], language);

  const getMaxValue = (groupIndex, specIndex) => {
    const values = selectedCars.map(
      (car) => getAllSpecGroups(car, language)[groupIndex]?.specs[specIndex]?.value
    );
    const numericValues = values
      .map((val) => parseFloat((typeof val === 'object' ? val?.[language] : val)?.toString().replace(/[^0-9.]/g, '')))
      .filter((val) => !isNaN(val));
    return numericValues.length ? Math.max(...numericValues) : null;
  };

  const toggleGroup = (groupKey) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [groupKey]: !prev[groupKey],
    }));
  };

  const generateComparePDF = async () => {
    try {
      const carImages = selectedCars.map(
        (car) => Image.resolveAssetSource(car.image)?.uri
      );

      const htmlContent = `
        <html>
          <head>
            <style>
              body { font-family: Arial; padding: 15px; }
              h1, h2 { color: #46194F; }
              .car { margin-bottom: 20px; text-align: center; }
              img { width: 90%; height: auto; margin-top: 10px; }
              .spec-table { width: 100%; border-collapse: collapse; margin-top: 15px; }
              .spec-table th, .spec-table td { border: 1px solid #ccc; padding: 8px; font-size: 12px; }
              .spec-table th { background: #46194F; color: white; }
              .group-title { margin-top: 20px; font-size: 18px; color: #46194F; }
            </style>
          </head>
          <body>
            <h1>${t('compare.pdf_title')}</h1>

            ${selectedCars.map((car, idx) => `
              <div class="car">
                <h2>${car.name?.[language]}</h2>
                <img src="${carImages[idx]}" />
              </div>
            `).join('')}

            ${specGroups.map(group => `
              <div class="group">
                <h3 class="group-title">${group.groupName}</h3>
                <table class="spec-table">
                  <tr>
                    <th>${t('compare.specification')}</th>
                    ${selectedCars.map(car => `<th>${car.name?.[language]}</th>`).join('')}
                  </tr>
                  ${group.specs.map((spec, specIdx) => `
                    <tr>
                      <td>${spec.name}</td>
                      ${selectedCars.map(car => {
                        const specData = getAllSpecGroups(car, language)[specGroups.indexOf(group)]?.specs[specIdx];
                        let value = specData?.value ?? '—';
                        if (typeof value === 'object') value = value[language] ?? '—';
                        return `<td>${value}</td>`;
                      }).join('')}
                    </tr>
                  `).join('')}
                </table>
              </div>
            `).join('')}
          </body>
        </html>
      `;

      const pdf = await RNHTMLtoPDF.convert({
        html: htmlContent,
        fileName: 'Car-Comparison-Details',
        directory: 'Documents',
        base64: false,
      });

      const downloadsPath = `${RNFS.DownloadDirectoryPath}/Car-Comparison-Details.pdf`;
      await RNFS.moveFile(pdf.filePath, downloadsPath);

      Alert.alert(t('compare.success'), t('compare.pdf_saved'));
    } catch (error) {
      console.error('PDF Generation Error:', error);
      Alert.alert(t('compare.error'), t('compare.pdf_failed'));
    }
  };

  return (
    <View className="flex-1 bg-gray-50">
      <View className="bg-white pt-4 pb-2 shadow-md z-20">
        <Text className="text-xl font-bold text-center text-brand-primary mb-2">
          {t('compare.title')}
        </Text>
        <View className="flex-row justify-around items-center px-2">
          {selectedCars.map((car, idx) => {
            const BrandLogo = brandLogos[car.brand];
            return (
              <View key={idx} className="items-center w-[45%] bg-white py-3 rounded-xl border border-gray-100 shadow-sm">
                {car.image && (
                  <Image source={car.image} className="w-28 h-20 rounded-lg mb-1" resizeMode="contain" />
                )}
                {BrandLogo && <BrandLogo width={60} height={20} style={{ marginBottom: 4 }} />}
                <Text className="text-sm font-bold text-brand-primary capitalize">{car.brand}</Text>
                <Text className="text-xs text-gray-500 mt-1 text-center px-1">{car.name?.[language]}</Text>
              </View>
            );
          })}
        </View>
        <View className="flex-row justify-center items-center mt-3 mb-2">
          <View className="flex-1 h-px bg-gray-200" />
          <View className="mx-3 bg-brand-primary rounded-full w-8 h-8 items-center justify-center">
            <Text className="text-white font-bold">{t('compare.vs')}</Text>
          </View>
          <View className="flex-1 h-px bg-gray-200" />
        </View>
      </View>

      <ScrollView className="flex-1 px-4 pt-2" contentContainerStyle={{ paddingBottom: 20 }}>
        {specGroups.map((group, gIndex) => (
          <View key={gIndex} className="mb-4 bg-white rounded-xl shadow-sm overflow-hidden">
            <TouchableOpacity
              onPress={() => toggleGroup(group.groupKey)}
              className="flex-row justify-between items-center px-4 py-3 bg-gray-50"
              activeOpacity={0.7}
            >
              <Text className="text-sm font-bold text-brand-primary">{group.groupName}</Text>
              <Ionicons
                name={expandedGroups[group.groupKey] ? 'chevron-up' : 'chevron-down'}
                size={18}
                color="#46194F"
              />
            </TouchableOpacity>

            {expandedGroups[group.groupKey] && (
              <View className="px-4 pt-3 pb-4">
                {group.specs.map((spec, sIndex) => {
                  const max = getMaxValue(gIndex, sIndex);
                  return (
                    <View key={sIndex} className="mb-4">
                      <Text className="text-xs font-medium text-gray-500 mb-2">{spec.name}</Text>
                      <View className="flex-row items-center justify-between">
                        {selectedCars.map((car, index) => {
                          const specData = getAllSpecGroups(car, language)[gIndex]?.specs[sIndex];
                          let value = specData?.value ?? '—';
                          if (typeof value === 'object') value = value[language] ?? '—';
                          const numeric = parseFloat(value?.toString().replace(/[^0-9.]/g, ''));
                          const percentage = max && !isNaN(numeric) ? Math.min((numeric / max) * 100, 100) : 100;
                          return (
                            <View key={index} className="w-[48%]">
                              <View className="h-1.5 rounded-full bg-gray-100 mb-1 overflow-hidden">
                                <LinearGradient
                                  colors={['#46194F', '#C6AECC']}
                                  start={{ x: 0, y: 0 }}
                                  end={{ x: 1, y: 0 }}
                                  style={{ width: `${percentage}%`, height: '100%', borderRadius: 9999 }}
                                />
                              </View>
                              <Text className="text-xs text-center font-medium text-brand-primary mt-1">
                                {value}
                              </Text>
                            </View>
                          );
                        })}
                      </View>
                    </View>
                  );
                })}
              </View>
            )}
          </View>
        ))}

        <TouchableOpacity
          onPress={generateComparePDF}
          className="bg-[#46194F] p-4 rounded-xl mt-6 mb-8 mx-8"
        >
          <Text className="text-white font-bold text-lg text-center">
            {t('compare.download_pdf')}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  shadowProp: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
});
