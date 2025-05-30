import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { Slider } from '@miblanchard/react-native-slider';
import { useLocale } from '../../contexts/LocaleContext';

export default function PriceRangeSlider({
  min = 0,
  max = 310000,
  value = [min, max],
  onValueChange,
}) {
  const { locale } = useLocale();
  const [sliderValue, setSliderValue] = useState(value);
  const [lines, setLines] = useState([]);

  useEffect(() => {
    setLines(generateLines());
    setSliderValue(value);
  }, [value]);

  const generateLines = () => {
    return Array.from({ length: 50 }, () => Math.random() * 70 + 30);
  };

  const handleValueChange = (val) => {
    setSliderValue(val);
    if (onValueChange) onValueChange(val);
  };

  return (
    <View className="px-4 py-5 bg-white rounded-xl border border-gray-300 shadow-sm">
      <Text className="text-lg font-semibold text-brand mb-3">
        {locale === 'ar' ? 'نطاق السعر' : 'Price Range'}
      </Text>

      <View className="flex-row items-end justify-between h-20 mb-4 overflow-hidden">
        {lines.map((height, idx) => {
          const percent = (idx / (lines.length - 1)) * (max - min) + min;
          const inRange = percent >= sliderValue[0] && percent <= sliderValue[1];
          return (
            <View
              key={idx}
              className={`flex-1 mx-[1px] rounded ${inRange ? 'bg-brand-primary' : 'bg-gray-200'}`}
              style={{ height: `${height}%` }}
            />
          );
        })}
      </View>

      <Slider
        value={sliderValue}
        minimumValue={min}
        maximumValue={max}
        step={1000}
        animateTransitions
        onValueChange={handleValueChange}
        thumbTintColor="#46194F"
        minimumTrackTintColor="#46194F"
        maximumTrackTintColor="#E5E7EB"
        containerStyle={{ height: 50 }}
        trackStyle={{ height: 4 }}
        thumbStyle={{
          width: 24,
          height: 24,
          borderRadius: 12,
          backgroundColor: '#fff',
          borderWidth: 2,
          borderColor: '#46194F',
          elevation: 2,
        }}
      />

      <View className="flex-row justify-between mt-3">
        <Text className="text-sm text-gray-600">
          {locale === 'ar' ? 'ر.س' : 'SAR'} {Math.round(sliderValue[0]).toLocaleString()}
        </Text>
        <Text className="text-sm text-gray-600">
          {locale === 'ar' ? 'ر.س' : 'SAR'} {Math.round(sliderValue[1]).toLocaleString()}
        </Text>
      </View>
    </View>
  );
}
