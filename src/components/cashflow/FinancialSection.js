"use client"

import { useState } from "react"
import { View, TextInput, TouchableOpacity, Text } from "react-native"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import AlmaraiFonts from "../../constants/fonts"

const FinancialSection = ({ info, onChange, onSubmit, locale }) => {
  const [errors, setErrors] = useState({})
  const [showBankDropdown, setShowBankDropdown] = useState(false)
  const [showJobDropdown, setShowJobDropdown] = useState(false)

  const banks = [
    "البنك الأهلي السعودي",
    "بنك الرياض",
    "البنك السعودي الفرنسي",
    "البنك السعودي البريطاني",
    "البنك العربي الوطني",
  ]

  const jobs = ["موظف حكومي", "موظف قطاع خاص", "أعمال حرة", "متقاعد", "أخرى"]

  const validate = () => {
    const newErrors = {}
    if (!info.salary) newErrors.salary = locale === "ar" ? "مبلغ الراتب مطلوب" : "Salary amount is required"
    if (!info.bank) newErrors.bank = locale === "ar" ? "اسم البنك مطلوب" : "Bank name is required"
    if (info.hasObligations === null)
      newErrors.obligations = locale === "ar" ? "يرجى تحديد التزاماتك" : "Please specify your obligations"
    if (!info.job) newErrors.job = locale === "ar" ? "الوظيفة مطلوبة" : "Job is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (validate()) {
      onSubmit()
    }
  }

  const handleChange = (field, value) => {
    onChange({ ...info, [field]: value })
    if (errors[field]) {
      setErrors({ ...errors, [field]: null })
    }
  }

  const inputStyle = "border border-gray-300 rounded-[5px] px-4 py-2 text-right text-sm"
  const labelStyle = "text-[#46194F] font-bold mb-1 text-right"
  const dropdownStyle = "border border-gray-300 rounded-[5px] px-4 py-2 text-sm flex-row justify-between items-center"
  const isRTL = locale === "ar"

  return (
    <View className="px-4 py-6">

      {/* Salary */}
      <View className="mb-3 relative">
        <Text style={{ fontFamily: AlmaraiFonts.bold }} className={labelStyle}>
          {locale === "ar" ? "مبلغ الراتب" : "Salary Amount"}
        </Text>
        <TextInput
          value={info.salary}
          onChangeText={(text) => handleChange("salary", text)}
          placeholder={locale === "ar" ? "أدخل مبلغ الراتب" : "Enter salary amount"}
          keyboardType="numeric"
          className={`${inputStyle} ${errors.salary ? "border-red-500" : ""}`}
          style={{
            fontFamily: AlmaraiFonts.regular,
            textAlign: isRTL ? "right" : "left",
            paddingRight: isRTL ? 36 : 12,
            paddingLeft: isRTL ? 12 : 36,
          }}
        />
        <View
          className="absolute"
          style={{
            top: 30,
            right: isRTL ? 12 : undefined,
            left: !isRTL ? 12 : undefined,
            height: 15,
            justifyContent: "space-between",
          }}
        >
          <FontAwesome name="chevron-up" size={12} color="#46194F" />
          <FontAwesome name="chevron-down" size={12} color="#46194F" />
        </View>
      </View>

      {/* Bank */}
      <View className="mb-3">
        <Text style={{ fontFamily: AlmaraiFonts.bold }} className={labelStyle}>
          {isRTL ? "اسم البنك أو الشركة التمويل" : "Bank or Finance Company Name"}
        </Text>
        <TouchableOpacity
          className={`${dropdownStyle} ${errors.bank ? "border-red-500" : ""}`}
          onPress={() => setShowBankDropdown(!showBankDropdown)}
        >
          <Text
            style={{ fontFamily: AlmaraiFonts.regular, textAlign: "right" }}
            className={info.bank ? "text-black" : "text-gray-400"}
          >
            {info.bank || (isRTL ? "اختر البنك" : "Select bank")}
          </Text>
          <FontAwesome name="chevron-down" size={14} color="#46194F" />
        </TouchableOpacity>
        {showBankDropdown && (
          <View className="border border-gray-300 rounded-[5px] mt-1 mb-2 bg-white z-10">
            {banks.map((bank, index) => (
              <TouchableOpacity
                key={index}
                className="p-3 border-b border-gray-200"
                onPress={() => {
                  handleChange("bank", bank)
                  setShowBankDropdown(false)
                }}
              >
                <Text style={{ fontFamily: AlmaraiFonts.regular, textAlign: "right" }}>{bank}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
{/* Obligations */}
<View className="mb-3">
  <Text style={{ fontFamily: AlmaraiFonts.bold }} className={labelStyle}>
    {isRTL ? "التزامات" : "Obligations"}
  </Text>

  <View className="flex-row justify-between">
    {/* YES on the right now */}
    <TouchableOpacity
      className={`flex-1 border rounded-[5px] p-2 ml-1 flex-row items-center justify-center ${
        info.hasObligations === true ? "bg-[#46194F] border-[#46194F]" : "border-gray-300"
      }`}
      onPress={() => handleChange("hasObligations", true)}
    >
      {info.hasObligations === true && (
        <FontAwesome name="check-circle" size={14} color="white" style={{ marginHorizontal: 6 }} />
      )}
      <Text
        style={{
          fontFamily: AlmaraiFonts.bold,
          color: info.hasObligations === true ? "white" : "#46194F",
        }}
      >
        {isRTL ? "نعم" : "Yes"}
      </Text>
    </TouchableOpacity>

    {/* NO on the left now */}
    <TouchableOpacity
      className={`flex-1 border rounded-[5px] p-2 mr-1 flex-row items-center justify-center ${
        info.hasObligations === false ? "bg-[#46194F] border-[#46194F]" : "border-gray-300"
      }`}
      onPress={() => handleChange("hasObligations", false)}
    >
      {info.hasObligations === false && (
        <FontAwesome name="times-circle" size={14} color="white" style={{ marginHorizontal: 6 }} />
      )}
      <Text
        style={{
          fontFamily: AlmaraiFonts.bold,
          color: info.hasObligations === false ? "white" : "#46194F",
        }}
      >
        {isRTL ? "لا" : "No"}
      </Text>
    </TouchableOpacity>
  </View>
</View>


      {/* Job */}
      <View className="mb-3">
        <Text style={{ fontFamily: AlmaraiFonts.bold }} className={labelStyle}>
          {isRTL ? "الوظيفة" : "Job"}
        </Text>
        <TouchableOpacity
          className={`${dropdownStyle} ${errors.job ? "border-red-500" : ""}`}
          onPress={() => setShowJobDropdown(!showJobDropdown)}
        >
          <Text
            style={{ fontFamily: AlmaraiFonts.regular, textAlign: "right" }}
            className={info.job ? "text-black" : "text-gray-400"}
          >
            {info.job || (isRTL ? "اختر الوظيفة" : "Select job")}
          </Text>
          <FontAwesome name="chevron-down" size={14} color="#46194F" />
        </TouchableOpacity>
        {showJobDropdown && (
          <View className="border border-gray-300 rounded-[5px] mt-1 mb-2 bg-white z-10">
            {jobs.map((job, index) => (
              <TouchableOpacity
                key={index}
                className="p-3 border-b border-gray-200"
                onPress={() => {
                  handleChange("job", job)
                  setShowJobDropdown(false)
                }}
              >
                <Text style={{ fontFamily: AlmaraiFonts.regular, textAlign: "right" }}>{job}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      {/* Submit Button */}
      <TouchableOpacity className="bg-[#46194F] rounded-xl py-2 px-6 items-center self-start mt-6" onPress={handleSubmit}>
        <Text className="text-white font-bold" style={{ fontFamily: AlmaraiFonts.bold }}>
          {isRTL ? "التالي" : "Next"}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default FinancialSection
