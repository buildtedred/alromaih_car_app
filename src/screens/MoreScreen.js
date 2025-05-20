import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useTranslation } from 'react-i18next';

// Icons
import AboutIcon from '../assets/icons/AboutIcon.svg';
import ContactUs from '../assets/icons/ContactUs.svg';
import FaqHelp from '../assets/icons/FaqHelp.svg';
import LanguageIcon from '../assets/icons/LanguageIcon.svg';
import MyOrder from '../assets/icons/MyOrder.svg';
import PrivacyPolice from '../assets/icons/PrivacyPolice.svg';
import Profile from '../assets/icons/Profile.svg';
import TermCondition from '../assets/icons/TermCondition.svg';
import ArrowIcon from '../assets/Icon/BackArrow.svg';

export default function MoreScreen({ navigation }) {
  const { t } = useTranslation();
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);

  // Row builder (icon and text on left, arrow on right)
  const renderRow = (IconComponent, label, navigateTo) => (
    <TouchableOpacity
      className="flex-row justify-between items-center border-b border-gray-200 py-3 "
      onPress={() => navigateTo && navigation.navigate(navigateTo)}
    >
      {/* Icon + Text (left side) */}
      <View className="flex-row items-center gap-x-2">
        <IconComponent width={22} height={22} />
        <Text className="text-base text-gray-800 text-left" style={{ fontFamily: 'Almarai-Regular' }}>
          {label}
        </Text>
      </View>

      {/* Right Arrow */}
      <ArrowIcon width={16} height={16} />
    </TouchableOpacity>
  );

  return (
    <ScrollView
      className="bg-gray-50 px-4"
      contentContainerStyle={{ paddingBottom: 40, flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Account Section */}
      <View className="bg-white rounded-xl p-4 mb-6 shadow-sm">
        <Text className="text-sm font-bold text-gray-500 mb-2 text-left" style={{ fontFamily: 'Almarai-Bold' }}>
          {t('screens.more.account')}
        </Text>

        <View className="flex-row items-center justify-between mb-4">
          <View className="flex-row items-center">
            <Profile width={40} height={40} />
            <View className="ml-3">
              <Text className="text-base font-semibold text-gray-800 text-left" style={{ fontFamily: 'Almarai-Bold' }}>
                Mohammad Mohammad
              </Text>
              <Text className="text-xs text-gray-400 text-left" style={{ fontFamily: 'Almarai-Regular' }}>
                email.account@here
              </Text>
            </View>
          </View>
          <TouchableOpacity
                 className="bg-[#46194F] px-4 py-1.5 rounded-xl"
                 onPress={() => navigation.navigate('AccountScreen')}
                 >
                 <Text className="text-white text-sm" style={{ fontFamily: 'Almarai-Bold' }}>
                  {t('screens.more.edit')}
                 </Text>
          </TouchableOpacity>

        </View>

        {renderRow(MyOrder, t('screens.more.my_orders'), 'MyOrders')}
      </View>

      {/* App Information Section */}
      <View className="bg-white rounded-xl p-4 mb-16 shadow-sm">
        <Text className="text-sm font-bold text-gray-500 mb-4 text-left" style={{ fontFamily: 'Almarai-Bold' }}>
          {t('screens.more.app_info')}
        </Text>

        {renderRow(AboutIcon, t('screens.more.about'), 'About')}
        {renderRow(TermCondition, t('screens.more.terms'), 'Terms')}
        {renderRow(PrivacyPolice, t('screens.more.privacy'), 'Privacy')}
        {renderRow(ContactUs, t('screens.more.contact_us'), 'ContactUs')}
        {renderRow(FaqHelp, t('screens.more.faq'), 'FAQ')}
        {renderRow(LanguageIcon, t('screens.more.language'), null)}

        {/* Notifications Switch */}
        <View className="flex-row items-center justify-between pt-4">
          {/* Text on the left */}
          <Text className="text-base text-gray-800 text-left" style={{ fontFamily: 'Almarai-Regular' }}>
            {t('screens.more.notifications')}
          </Text>

          {/* Switch on the right with styled container */}
          <View
            style={{
              borderWidth: 2,
              borderColor: '#46194F',
              borderRadius: 14,
              padding: 0,
              backgroundColor: '#E0CFE8',
            }}
          >
            <Switch
              value={notificationsEnabled}
              onValueChange={() => setNotificationsEnabled(!notificationsEnabled)}
              thumbColor="#46194F"
              trackColor={{ false: '#E0CFE8', true: '#E0CFE8' }}
              ios_backgroundColor="#E0CFE8"
              style={{ transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }] }}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
