import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useTranslation } from 'react-i18next';

// Icons (updated to match first design exactly)
import BackArrow from '../../assets/icons/Arrow.svg';
import ProfileIcon from '../../assets/icons/Profile.svg';
import UserIcon from '../../assets/icons/UserIcon.svg';
import LockIcon from '../../assets/icons/LockIcon.svg';
import DocumentIcon from '../../assets/icons/Document.svg';
import LogoutIcon from '../../assets/icons/Logout.svg';
import LocationIcon from '../../assets/icons/Location.svg';
import CallIcon from '../../assets/icons/Call.svg';

export default function AccountScreen({ navigation }) {
  const { t } = useTranslation();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="px-4" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 80 }}>
        {/* Header */}
        <View className="flex-row items-center justify-between mt-4">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <BackArrow width={24} height={24} />
          </TouchableOpacity>
          <Text className="text-lg font-bold text-[#46194F]" style={{ fontFamily: 'Almarai-Bold' }}>
            الملف الشخصي
          </Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Profile Section */}
        <View className="items-center mt-6">
          <ProfileIcon width={80} height={80} />
          <Text className="text-2xl font-bold text-[#46194F] mt-3" style={{ fontFamily: 'Almarai-Regular' }}>
            محمد محمد
          </Text>
          <Text className="text-sm text-gray-500" style={{ fontFamily: 'Almarai-Regular' }}>
            @mohammedmoh
          </Text>

          {/* Location and Phone */}
          <View className="flex-row gap-x-2 mt-3">
            <View className="flex-row items-center gap-x-1 bg-white border border-gray-300 px-3 py-1 rounded-full">
              <LocationIcon width={14} height={14} />
              <Text className="text-sm text-gray-600" style={{ fontFamily: 'Almarai-Regular' }}>
                الرياض، السعودية
              </Text>
            </View>
            <View className="flex-row items-center gap-x-1 bg-white border border-gray-300 px-3 py-1 rounded-full">
              <CallIcon width={14} height={14} />
              <Text className="text-sm text-gray-600" style={{ fontFamily: 'Almarai-Regular' }}>
                0551548196
              </Text>
            </View>
          </View>

          {/* Buttons */}
          <View className="flex-row gap-x-2 mt-4">
            <TouchableOpacity className="bg-[#46194F] px-6 py-2 rounded-full">
              <Text className="text-white text-sm" style={{ fontFamily: 'Almarai-Bold' }}>
                إعدادات الحساب
              </Text>
            </TouchableOpacity>
            <TouchableOpacity className="border border-[#46194F] px-6 py-2 rounded-full">
              <Text className="text-[#46194F] text-sm" style={{ fontFamily: 'Almarai-Bold' }}>
                نشط
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Settings Card */}
        <View className="bg-white mt-6 p-4 rounded-2xl shadow border border-gray-200">
          <Text className="text-right text-sm text-[#46194F] font-bold mb-4" style={{ fontFamily: 'Almarai-Bold' }}>
            إعدادات الحساب
          </Text>

          {/* Rows */}
          {[
            { label: 'الملف الشخصي', icon: <UserIcon width={18} height={18} /> },
            { label: 'تغيير كلمة المرور', icon: <LockIcon width={18} height={18} /> },
            { label: 'المستندات', icon: <DocumentIcon width={18} height={18} /> },
            { label: 'تسجيل الخروج', icon: <LogoutIcon width={18} height={18} /> },
          ].map((item, idx) => (
            <TouchableOpacity
              key={idx}
              className="flex-row items-center justify-start py-3 border-b border-gray-200 gap-x-2"
            >
              {item.icon}
              <Text className="text-[#46194F] font-bold text-base" style={{ fontFamily: 'Almarai-Regular' }}>
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}