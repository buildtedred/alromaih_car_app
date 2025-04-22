import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import Privacy from '../../assets/images/Privacy.svg';
import AppFooter from '../../components/common/AppFooter';
import { useTranslation } from 'react-i18next'; // Import useTranslation hook

export default function PrivacyScreen() {
  const { t } = useTranslation(); // Initialize the t function

  return (
    <ScrollView className="bg-white px-6 py-6">
      {/* Image at the top */}
      <View className="items-center mb-6">
        <Privacy width={300} height={200} />
      </View>

      {/* Introduction paragraph with margins */}
      <View className="mb-8 mx-4">
        <Text className="text-3xl font-bold text-gray-900">{t('screens.privacy.title')}</Text>
        <Text className="text-sm text-gray-800 leading-6 text-justify mt-4">
          {t('screens.privacy.introduction')}
        </Text>
      </View>

      {/* Terms Sections with margins */}
      <View className="space-y-8 mx-4">
        {/* Section 1 */}
        <View>
          <Text className="text-base font-bold text-gray-900 mb-2">{t('screens.privacy.section1_title')}</Text>
          <Text className="text-sm text-gray-800 leading-6 text-justify mb-8">
            {t('screens.privacy.section1_content')}
          </Text>
        </View>

        {/* Section 2 */}
        <View>
          <Text className="text-base font-bold text-gray-900 mb-2">{t('screens.privacy.section2_title')}</Text>
          <Text className="text-sm text-gray-800 leading-6 text-justify mb-8">
            {t('screens.privacy.section2_content')}
          </Text>
        </View>

        {/* Section 3 */}
        <View>
          <Text className="text-base font-bold text-gray-900 mb-2">{t('screens.privacy.section3_title')}</Text>
          <Text className="text-sm text-gray-800 leading-6 text-justify mb-8">
            {t('screens.privacy.section3_content')}
          </Text>
        </View>

        {/* Section 4 */}
        <View>
          <Text className="text-base font-bold text-gray-900 mb-2">{t('screens.privacy.section4_title')}</Text>
          <Text className="text-sm text-gray-800 leading-6 text-justify mb-8">
            {t('screens.privacy.section4_content')}
          </Text>
        </View>

        {/* Section 5 */}
        <View>
          <Text className="text-base font-bold text-gray-900 mb-2">{t('screens.privacy.section5_title')}</Text>
          <Text className="text-sm text-gray-800 leading-6 text-justify mb-8">
            {t('screens.privacy.section5_content')}
          </Text>
        </View>

        {/* Section 6 */}
        <View>
          <Text className="text-base font-bold text-gray-900 mb-2">{t('screens.privacy.section6_title')}</Text>
          <Text className="text-sm text-gray-800 leading-6 text-justify mb-8">
            {t('screens.privacy.section6_content')}
          </Text>
        </View>
      </View>

      <AppFooter />
    </ScrollView>
  );
}
