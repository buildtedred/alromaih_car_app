"use client"

import { View, Text, TouchableOpacity } from "react-native"
import AlmaraiFonts from "../../constants/fonts"
import CarIcon from "../../assets/Icon/CarIcon.svg"
import DoubleRiyal from "../../assets/Icon/DoubleRiyal.svg"
import Men from "../../assets/Icon/Men.svg"
import MenUser from "../../assets/Icon/MenUser.svg"

const PrintConfirm = ({ buyerType, personalInfo, financialInfo, onPrint, locale }) => {
  const isArabic = locale === "ar"

  return (
    <View className="bg-white px-6 py-8 rounded-xl shadow-md">
      {/* Step Tracker (Optional Top Bar) */}
      <View className="flex-row justify-center mb-6">
      
      </View>

      {/* Header Row */}
      <View className="flex-row-reverse justify-between items-center mb-6">
        {/* Buyer Type */}
        <View className="flex-row items-center gap-1">
          <Men width={18} height={18} />
          <Text
            className="text-sm font-bold text-[#46194F] "
            style={{ fontFamily: AlmaraiFonts.bold }}
          >
            نوع المشتري: {buyerType === "individual" ? "للأفراد" : "للشركات"}
          </Text>
        </View>

        {/* Car Info */}
        <View className="flex-row items-center gap-2">
          <CarIcon width={18} height={18} />
          <Text
            className="text-sm font-bold text-[#46194F] mr-2"
            style={{ fontFamily: AlmaraiFonts.bold }}
          >
            السيارة: جيتور للذكرى ....
          </Text>
        </View>
      </View>

      {/* Two Column Layout */}
      <View className="flex-row-reverse justify-between gap-20">
        {/* Left Column: Financial Section */}
        <View className="flex-1">
          <View className="flex-row items-center mb-3 ml-1 ">
            <DoubleRiyal width={18} height={18} />
            <Text
              className="text-sm font-bold text-[#46194F]  ml-2"
              style={{ fontFamily: AlmaraiFonts.bold }}
            >
              القسم المالي
            </Text>
          </View>

          {[
            { key: "salary", label: "مبلغ الراتب" },
            { key: "bank", label: "اسم البنك و الشركة للتمويل" },
            { key: "hasObligations", label: "إلتزامات" },
            { key: "job", label: "الوظيفة" }
          ].map((item, idx) => {
            const value =
              item.key === "hasObligations"
                ? financialInfo.hasObligations === true
                  ? "نعم"
                  : financialInfo.hasObligations === false
                    ? "لا"
                    : "......."
                : financialInfo[item.key] || "......."

            return (
              <View className="mb-3" key={idx}>
                <Text
                  className="text-xs font-bold text-[#46194F] mb-1 text-left ml-8 "
                  style={{ fontFamily: AlmaraiFonts.bold }}
                >
                  {item.label}:
                </Text>
                <Text
                  className="text-xs text-gray-700 text-left ml-8"
                  style={{ fontFamily: AlmaraiFonts.regular }}
                >
                  {value}
                </Text>
              </View>
            )
          })}
        </View>

        {/* Right Column: Personal Info */}
        <View className="flex-1">
          <View className="flex-row items-center mb-3 gap-2">
            <MenUser width={18} height={18} />
            <Text
              className="text-sm font-bold text-[#46194F]  "
              style={{ fontFamily: AlmaraiFonts.bold }}
            >
              المعلومات الشخصية
            </Text>
          </View>

          {[
            { key: "name", label: "الاسم" },
            { key: "email", label: "البريد الإلكتروني" },
            { key: "phone", label: "رقم الهاتف" },
            { key: "idNumber", label: "رقم الهوية الوطنية" }
          ].map((item, idx) => (
            <View className="mb-3" key={idx}>
              <Text
                className="text-xs font-bold text-[#46194F] mb-1 text-left ml-6"
                style={{ fontFamily: AlmaraiFonts.bold }}
              >
                {item.label}:
              </Text>
              <Text
                className="text-xs text-gray-700 text-left ml-6"
                style={{ fontFamily: AlmaraiFonts.regular }}
              >
                {personalInfo[item.key] || "......."}
              </Text>
            </View>
          ))}
        </View>
      </View>
<View className="items-center mt-6">
  <TouchableOpacity
    onPress={onPrint}
    className="bg-[#46194F] px-6 py-3 rounded-[5px] items-center justify-center"
  >
    <Text
      className="text-white text-sm"
      style={{ fontFamily: AlmaraiFonts.bold }}
    >
      طباعة الورق
    </Text>
  </TouchableOpacity>
</View>

    </View>
  )
}

export default PrintConfirm
