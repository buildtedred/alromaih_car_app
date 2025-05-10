"use client"

import { useState } from "react"
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView } from "react-native"
import { useTranslation } from "react-i18next"

// Icons
import BackArrow from "../../assets/icons/Arrow.svg"
import ArrowIcon from "../../assets/Icon/BackArrow.svg"
import ProfileIcon from "../../assets/icons/Profile.svg"
import UserIcon from "../../assets/icons/UserIcon.svg"
import LockIcon from "../../assets/icons/LockIcon.svg"
import DocumentIcon from "../../assets/icons/Document.svg"
import LogoutIcon from "../../assets/icons/Logout.svg"
import LocationIcon from "../../assets/icons/Location.svg"
import CallIcon from "../../assets/icons/Call.svg"

// New Activity Icons
import AccountSettingCar from "../../assets/icons/AccountSettingCar.svg"
import AccountSettingDolar from "../../assets/icons/AccountSettingDolar.svg"
import AccountSettingMyOrder from "../../assets/icons/AccountSettingMyOrder.svg"

export default function AccountScreen({ navigation }) {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState("account")

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="px-4" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 80 }}>
        {/* Header – Text left, Back arrow right */}
        <View className="flex-row items-center justify-between mt-8">
          <Text className="text-lg font-bold text-[#46194F]" style={{ fontFamily: "Almarai-Bold" }}>
            الملف الشخصي
          </Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <BackArrow width={16} height={16} />
          </TouchableOpacity>
        </View>

      {/* Profile Info – Text right, Icon left */}
<TouchableOpacity 
  onPress={() => navigation.navigate("PersonalInfo")} 
  className="flex-row items-center mt-12 px-12 w-full"
  activeOpacity={0.8}
>
  <View className="mr-2">
    <ProfileIcon width={50} height={50} />
  </View>
  <View className="items-end">
    <Text className="text-2xl font-bold text-[#46194F]" style={{ fontFamily: "Almarai-Regular" }}>
      محمد محمد
    </Text>
    <Text className="text-sm text-gray-500" style={{ fontFamily: "Almarai-Regular" }}>
      @mohammedmoh
    </Text>
  </View>
</TouchableOpacity>


        {/* Contact Info */}
        <View className="flex-row-reverse items-center justify-center gap-x-4 mt-3">
          <View className="flex-row items-center gap-x-1 px-1 py-1 rounded-xl bg-white border border-gray-300">
            <LocationIcon width={14} height={14} />
            <Text className="text-sm text-gray-600" style={{ fontFamily: "Almarai-Regular" }}>
              الرياض، السعودية
            </Text>
          </View>
          <View className="flex-row items-center gap-x-1 px-4 py-1 rounded-xl bg-white border border-gray-300">
            <CallIcon width={14} height={14} />
            <Text className="text-sm text-gray-600" style={{ fontFamily: "Almarai-Regular" }}>
              0551648196
            </Text>
          </View>
        </View>

        {/* Toggle Buttons – نشاطي / إعدادات الحساب */}
        <View className="mt-4 flex-row items-center justify-center">
          <View className="flex-row-reverse bg-white border border-gray-200 rounded-full overflow-hidden w-[260px] h-10">
            {/* إعدادات الحساب (Account Settings Tab) */}
            <TouchableOpacity
              onPress={() => setActiveTab("account")}
              className={`flex-1 justify-center items-center ${
                activeTab === "account" ? "bg-[#46194F]" : "bg-transparent"
              } rounded-full`}
            >
              <Text
                className={`text-sm ${activeTab === "account" ? "text-white" : "text-[#46194F]"}`}
                style={{ fontFamily: "Almarai-Bold" }}
              >
                إعدادات الحساب
              </Text>
            </TouchableOpacity>

            {/* نشاطي (My Activities Tab) */}
            <TouchableOpacity
              onPress={() => setActiveTab("activity")}
              className={`flex-1 justify-center items-center ${
                activeTab === "activity" ? "bg-[#46194F]" : "bg-transparent"
              } rounded-full`}
            >
              <Text
                className={`text-sm ${activeTab === "activity" ? "text-white" : "text-[#46194F]"}`}
                style={{ fontFamily: "Almarai-Bold" }}
              >
                نشاطي
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Content based on active tab */}
        {activeTab === "account" ? (
          /* Settings Section */
          <View className="bg-white mt-6 p-4 ml-4 mr-4 rounded-2xl border border-gray-200">
            <Text className="text-left font-bold text-[#46194F] mb-4" style={{ fontFamily: "Almarai-Bold" }}>
              إعدادات الحساب
            </Text>

            {/* Profile Row with Edit */}
            <View className="flex-row items-center justify-between py-2 border-b border-gray-200">
              <View className="flex-row items-center gap-x-2">
                <UserIcon width={15} height={15} />
                <Text className="text-[#46194F] font-bold text-base" style={{ fontFamily: "Almarai-Regular" }}>
                  الملف الشخصي
                </Text>
              </View>
              <View className="flex-row items-center gap-x-1">
                <Text className="text-xs text-gray-400" style={{ fontFamily: "Almarai-Regular" }}>
                  تعديل
                </Text>
                <ArrowIcon width={14} height={14} />
              </View>
            </View>

            {/* Other Setting Rows */}
            {[
              {
                label: "تغيير كلمة المرور",
                icon: <LockIcon width={15} height={15} />,
              },
              { label: "المستندات", icon: <DocumentIcon width={15} height={15} /> },
              { label: "تسجيل الخروج", icon: <LogoutIcon width={15} height={15} /> },
            ].map((item, index) => (
              <TouchableOpacity
                key={index}
                className="flex-row items-center justify-between py-4 border-b border-gray-200"
              >
                <View className="flex-row items-center gap-x-2">
                  {item.icon}
                  <Text className="text-[#46194F] font-bold text-base" style={{ fontFamily: "Almarai-Regular" }}>
                    {item.label}
                  </Text>
                </View>
                <ArrowIcon width={14} height={14} />
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          /* Activities Section */
          <View className="bg-white mt-6 p-4 ml-4 mr-4 rounded-2xl border border-gray-200">
          <Text className="text-right font-bold text-[#46194F] mb-4" style={{ fontFamily: "Almarai-Bold" }}>
            إعدادات الحساب
          </Text>

          {/* My Orders Row */}
          <TouchableOpacity className="flex-row items-center justify-between py-4 border-b border-gray-200">
            <View className="flex-row items-center gap-x-2">
              <AccountSettingMyOrder width={18} height={18} />
              <Text className="text-[#46194F] font-bold text-base" style={{ fontFamily: "Almarai-Regular" }}>
                طلباتي
              </Text>
            </View>
            <ArrowIcon width={12} height={14} />
          </TouchableOpacity>

          {/* Financing Requests Row */}
          <TouchableOpacity className="flex-row items-center justify-between py-4 border-b border-gray-200">
            <View className="flex-row items-center gap-x-2">
              <AccountSettingDolar width={18} height={18} />
              <Text className="text-[#46194F] font-bold text-base" style={{ fontFamily: "Almarai-Regular" }}>
                طلبات التمويل
              </Text>
            </View>
            <ArrowIcon width={12} height={12} />
          </TouchableOpacity>

          {/* Delivery Status Row */}
          <TouchableOpacity className="flex-row items-center justify-between py-4 border-b border-gray-200">
            <View className="flex-row items-center gap-x-2">
              <AccountSettingCar width={18} height={18} />
              <Text className="text-[#46194F] font-bold text-base" style={{ fontFamily: "Almarai-Regular" }}>
                حالة التوصيل
              </Text>
            </View>
            <ArrowIcon width={12} height={12} />
          </TouchableOpacity>
        </View>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}
