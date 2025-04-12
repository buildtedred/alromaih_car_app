import React from 'react';
import { View, Text, ScrollView, Linking, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function ContactUsScreen() {
  const { t } = useTranslation();

  const contactDetails = [
    {
      icon: 'call',
      label: t('contact_us.phone') || 'Phone',
      value: '+966 555 123 456',
      onPress: () => Linking.openURL('tel:+966555123456'),
    },
    {
      icon: 'mail',
      label: t('contact_us.email') || 'Email',
      value: 'info@alromaihcars.com',
      onPress: () => Linking.openURL('mailto:info@alromaihcars.com'),
    },
    {
      icon: 'location',
      label: t('contact_us.address') || 'Address',
      value: 'Riyadh, Saudi Arabia',
      onPress: () => {},
    },
    {
      icon: 'time',
      label: t('contact_us.working_hours') || 'Working Hours',
      value: '9:00 AM - 12:00 PM / 4:00 PM - 9:00 PM',
      onPress: () => {},
    },
    {
      icon: 'logo-facebook',
      label: t('contact_us.facebook') || 'Facebook',
      value: 'facebook.com/alromaihcar',
      onPress: () => Linking.openURL('https://facebook.com/alromaihcar'),
    },
    {
      icon: 'logo-linkedin',
      label: t('contact_us.linkedin') || 'LinkedIn',
      value: 'linkedin.com/company/alromaihcar',
      onPress: () => Linking.openURL('https://linkedin.com/company/alromaihcar'),
    },
    {
      icon: 'logo-instagram',
      label: t('contact_us.instagram') || 'Instagram',
      value: '@alromaihcar',
      onPress: () => Linking.openURL('https://instagram.com/alromaihcar'),
    },
  ];

  return (
    <ScrollView className="flex-1 bg-white px-5 pt-10 pb-16">
      <Text className="text-2xl font-bold text-primary mb-6">
        {t('contact_us.title') || 'Contact Us'}
      </Text>

      {contactDetails.map((item, index) => (
        <TouchableOpacity
          key={index}
          onPress={item.onPress}
          activeOpacity={item.onPress ? 0.7 : 1}
          className="flex-row items-center bg-gray-100 p-4 rounded-2xl mb-4 shadow-sm"
        >
          <Ionicons
            name={item.icon}
            size={24}
            color="#003366"
            style={{ marginHorizontal: 12 }}
          />
          <View className="flex-1">
            <Text className="text-base font-semibold text-gray-800">
              {item.label}
            </Text>
            <Text className="text-sm text-gray-600 mt-1">
              {item.value}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
