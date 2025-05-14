"use client";

import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useLocale } from "../contexts/LocaleContext";
import AppHeader from "../components/common/AppHeader";

// 🔤 Centralized font constants
const AlmaraiFonts = {
  regular: 'Almarai-Regular',
  bold: 'Almarai-Bold'
};

export default function ChatScreen() {
  const { locale } = useLocale();
  const isRTL = locale === "ar";

  const arabicParagraph = `جيتور T2 هي واحدة من السيارات المتميزة التي تقدمها جيتور للسوق السعودي. تجمع هذه السيارة بين التصميم العصري والتكنولوجيا المتقدمة، مما يجعلها خيارًا مثاليًا لمن يبحثون عن الأداء والراحة في نفس الوقت. تتميز بمقصورة فسيحة، وميزات أمان متعددة، مع نظام ترفيهي متطور يدعم البلوتوث والشاشات الذكية. بفضل محركها القوي واقتصادها في استهلاك الوقود، تعتبر جيتور T2 سيارة مثالية للعائلات والشباب على حد سواء.`;

  const englishParagraph = `The Jetour T2 is one of the standout SUVs offered by Jetour in the Saudi market. It combines modern design with cutting-edge technology, making it an ideal choice for those seeking performance and comfort. With a spacious cabin, multiple safety features, and an advanced infotainment system that supports Bluetooth and smart screens, the T2 is built for families and young drivers alike. It also features strong engine performance and fuel efficiency, offering great value for its class.`;

  const paragraph = locale === 'ar' ? arabicParagraph : englishParagraph;

  return (
    <View className="flex-1 bg-gray-50">
      
      <ScrollView contentContainerStyle={{ padding: 16 }} className="flex-1">
        <View className="space-y-6">

          {/* 🔹 Font Test Labels */}
          <View className="space-y-2">
            <Text className="text-xl font-bold" style={{ textAlign: isRTL ? 'right' : 'left' }}>
              {locale === 'ar' ? 'مقارنة بين الخط الافتراضي وخط المراعي' : 'Comparison: Default vs Almarai Fonts'}
            </Text>
          </View>

          {/* 🔸 Paragraph with Default Font */}
          <View className="space-y-2">
            <Text className="text-base text-gray-700" style={{ textAlign: isRTL ? 'right' : 'left' }}>
              {locale === 'ar' ? '✦ الفقرة باستخدام الخط الافتراضي:' : '✦ Paragraph with Default Font:'}
            </Text>
            <Text className="text-lg text-gray-900" style={{ lineHeight: 30, textAlign: isRTL ? 'right' : 'left' }}>
              {paragraph}
            </Text>
          </View>

          {/* 🔸 Paragraph with Almarai Font */}
          <View className="space-y-2 mt-4">
            <Text className="text-base text-gray-700" style={{ textAlign: isRTL ? 'right' : 'left' }}>
              {locale === 'ar' ? '✦ الفقرة باستخدام خط المراعي:' : '✦ Paragraph with Almarai Font:'}
            </Text>
            <Text
              className="text-lg text-gray-900"
              style={{
                fontFamily: AlmaraiFonts.regular,
                lineHeight: 30,
                textAlign: isRTL ? 'right' : 'left',
              }}
            >
              {paragraph}
            </Text>
          </View>

        </View>
      </ScrollView>
    </View>
  );
}
