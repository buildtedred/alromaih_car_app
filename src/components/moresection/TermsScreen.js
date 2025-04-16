import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import EnglishTerms from '../../assets/images/English-Terms.svg';
import AppFooter from '../../components/common/AppFooter';

export default function TermsScreen() {
  const { t } = useTranslation();

  return (
    <ScrollView className="bg-white px-6 py-6">
      <View className="items-center mb-6">
        <EnglishTerms width={300} height={200} />
      </View>

      {/* Introduction */}
      <View className="mb-8 mx-4">
        <Text className="text-3xl font-bold text-gray-900">
          {t('screens.terms.title')}
        </Text>
        <Text className="text-sm text-gray-800 leading-6 text-justify mt-4">
          {t('screens.terms.intro')}
        </Text>
      </View>

      {/* Terms Sections */}
      <View className="space-y-8 mx-4">
        {[1, 2, 3, 4, 5].map((section) => (
          <View key={section}>
            <Text className="text-base font-bold text-gray-900 mb-2">
              {t(`screens.terms.section${section}.title`)}
            </Text>
            <Text className="text-sm text-gray-800 leading-6 text-justify mb-8">
              {t(`screens.terms.section${section}.body`)}
            </Text>
          </View>
        ))}
      </View>

      {/* Footer Note */}
      <View className="mt-12 mb-10 mx-4">
        <Text className="text-sm text-gray-700 italic leading-relaxed mb-8 text-justify">
          {t('screens.terms.contact')}
        </Text>
      </View>

      <AppFooter />
    </ScrollView>
  );
}
