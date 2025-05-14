"use client"

import { View, TouchableOpacity, Text } from "react-native"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import AlmaraiFonts from "../../constants/fonts"

const PrintConfirm = ({ buyerType, personalInfo, financialInfo, onPrint, locale }) => {
  const labelStyle = "text-[#46194F] font-bold"
  const valueStyle = "text-gray-700 mb-2"

  return (
    <View className="px-4 py-6">
      <View className="mb-6">
        <View className="flex-row justify-between items-center mb-4">
          <View className="flex-row items-center">
            <FontAwesome name="car" size={20} color="#46194F" />
            <Text className="text-[#46194F] font-bold ml-2" style={{ fontFamily: AlmaraiFonts.bold }}>
              {locale === "ar" ? "السيارة: جيتور للذكرى T1 2025" : "Car: Jetour T1 2025"}
            </Text>
          </View>

          <View className="flex-row items-center">
            <FontAwesome name="user" size={20} color="#46194F" />
            <Text className="text-[#46194F] font-bold mr-2" style={{ fontFamily: AlmaraiFonts.bold }}>
              {locale === "ar"
                ? `نوع المشتري: ${buyerType === "individual" ? "للأفراد" : "للشركات"}`
                : `Buyer Type: ${buyerType === "individual" ? "For Individuals" : "For Companies"}`}
            </Text>
          </View>
        </View>

        <View className="border-b border-gray-200 pb-4 mb-4">
          <View className="flex-row items-center mb-2">
            <FontAwesome name="user-circle" size={20} color="#46194F" />
            <Text className="text-[#46194F] font-bold mr-2 ml-2" style={{ fontFamily: AlmaraiFonts.bold }}>
              {locale === "ar" ? "المعلومات الشخصية" : "Personal Information"}
            </Text>
          </View>

          <View className="flex-row justify-between mb-1">
            <Text className={valueStyle} style={{ fontFamily: AlmaraiFonts.regular }}>
              {personalInfo.name || "---"}
            </Text>
            <Text className={labelStyle} style={{ fontFamily: AlmaraiFonts.bold }}>
              {locale === "ar" ? "الاسم" : "Name"}
            </Text>
          </View>

          <View className="flex-row justify-between mb-1">
            <Text className={valueStyle} style={{ fontFamily: AlmaraiFonts.regular }}>
              {personalInfo.email || "---"}
            </Text>
            <Text className={labelStyle} style={{ fontFamily: AlmaraiFonts.bold }}>
              {locale === "ar" ? "البريد الإلكتروني" : "Email"}
            </Text>
          </View>

          <View className="flex-row justify-between mb-1">
            <Text className={valueStyle} style={{ fontFamily: AlmaraiFonts.regular }}>
              {personalInfo.phone || "---"}
            </Text>
            <Text className={labelStyle} style={{ fontFamily: AlmaraiFonts.bold }}>
              {locale === "ar" ? "رقم الهاتف" : "Phone Number"}
            </Text>
          </View>

          <View className="flex-row justify-between mb-1">
            <Text className={valueStyle} style={{ fontFamily: AlmaraiFonts.regular }}>
              {personalInfo.idNumber || "---"}
            </Text>
            <Text className={labelStyle} style={{ fontFamily: AlmaraiFonts.bold }}>
              {locale === "ar" ? "رقم الهوية الوطنية" : "ID Number"}
            </Text>
          </View>
        </View>

        {buyerType === "individual" && (
          <View className="border-b border-gray-200 pb-4 mb-4">
            <View className="flex-row items-center mb-2">
              <FontAwesome name="money" size={20} color="#46194F" />
              <Text className="text-[#46194F] font-bold mr-2 ml-2" style={{ fontFamily: AlmaraiFonts.bold }}>
                {locale === "ar" ? "القسم المالي" : "Financial Section"}
              </Text>
            </View>

            <View className="flex-row justify-between mb-1">
              <Text className={valueStyle} style={{ fontFamily: AlmaraiFonts.regular }}>
                {financialInfo.salary || "---"}
              </Text>
              <Text className={labelStyle} style={{ fontFamily: AlmaraiFonts.bold }}>
                {locale === "ar" ? "مبلغ الراتب" : "Salary Amount"}
              </Text>
            </View>

            <View className="flex-row justify-between mb-1">
              <Text className={valueStyle} style={{ fontFamily: AlmaraiFonts.regular }}>
                {financialInfo.bank || "---"}
              </Text>
              <Text className={labelStyle} style={{ fontFamily: AlmaraiFonts.bold }}>
                {locale === "ar" ? "اسم البنك والشركة التمويل" : "Bank and Finance Company Name"}
              </Text>
            </View>

            <View className="flex-row justify-between mb-1">
              <Text className={valueStyle} style={{ fontFamily: AlmaraiFonts.regular }}>
                {financialInfo.hasObligations === true
                  ? locale === "ar"
                    ? "نعم"
                    : "Yes"
                  : financialInfo.hasObligations === false
                    ? locale === "ar"
                      ? "لا"
                      : "No"
                    : "---"}
              </Text>
              <Text className={labelStyle} style={{ fontFamily: AlmaraiFonts.bold }}>
                {locale === "ar" ? "التزامات" : "Obligations"}
              </Text>
            </View>

            <View className="flex-row justify-between mb-1">
              <Text className={valueStyle} style={{ fontFamily: AlmaraiFonts.regular }}>
                {financialInfo.job || "---"}
              </Text>
              <Text className={labelStyle} style={{ fontFamily: AlmaraiFonts.bold }}>
                {locale === "ar" ? "الوظيفة" : "Job"}
              </Text>
            </View>
          </View>
        )}
      </View>

      <TouchableOpacity className="bg-[#46194F] rounded-lg py-3 items-center mt-4" onPress={onPrint}>
        <Text className="text-white font-bold" style={{ fontFamily: AlmaraiFonts.bold }}>
          {locale === "ar" ? "طباعة الورق" : "Print Paper"}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default PrintConfirm
