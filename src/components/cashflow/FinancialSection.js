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
    // Clear error when user types
    if (errors[field]) {
      setErrors({ ...errors, [field]: null })
    }
  }

  const inputStyle = "border border-gray-300 rounded-lg p-3 mb-4 text-right"
  const labelStyle = "text-[#46194F] font-bold mb-1 text-right"
  const dropdownStyle = "border border-gray-300 rounded-lg p-3 mb-1 flex-row justify-between items-center"

  return (
    <View className="px-4 py-6">
      <View className="mb-4">
        <View className="flex-row justify-end items-center mb-1">
          <Text style={{ fontFamily: AlmaraiFonts.bold }} className={labelStyle}>
            {locale === "ar" ? "مبلغ الراتب" : "Salary Amount"}
          </Text>
        </View>
        <View className="relative">
          <TextInput
            value={info.salary}
            onChangeText={(text) => handleChange("salary", text)}
            placeholder={locale === "ar" ? "أدخل مبلغ الراتب" : "Enter salary amount"}
            keyboardType="numeric"
            className={`${inputStyle} ${errors.salary ? "border-red-500" : ""}`}
            style={{ fontFamily: AlmaraiFonts.regular, textAlign: locale === "ar" ? "right" : "left" }}
          />
          <View className="absolute top-3 right-3">
            <FontAwesome name="chevron-up" size={16} color="#46194F" />
          </View>
          <View className="absolute top-3 right-3 mt-4">
            <FontAwesome name="chevron-down" size={16} color="#46194F" />
          </View>
        </View>
        {errors.salary && (
          <Text className="text-red-500 text-right mb-2" style={{ fontFamily: AlmaraiFonts.regular }}>
            {errors.salary}
          </Text>
        )}
      </View>

      <View className="mb-4">
        <View className="flex-row justify-end items-center mb-1">
          <Text style={{ fontFamily: AlmaraiFonts.bold }} className={labelStyle}>
            {locale === "ar" ? "اسم البنك أو الشركة التمويل" : "Bank or Finance Company Name"}
          </Text>
        </View>
        <TouchableOpacity
          className={`${dropdownStyle} ${errors.bank ? "border-red-500" : ""}`}
          onPress={() => setShowBankDropdown(!showBankDropdown)}
        >
          <FontAwesome name="chevron-down" size={16} color="#46194F" />
          <Text
            style={{ fontFamily: AlmaraiFonts.regular, textAlign: "right" }}
            className={info.bank ? "text-black" : "text-gray-400"}
          >
            {info.bank || (locale === "ar" ? "اختر البنك" : "Select bank")}
          </Text>
        </TouchableOpacity>
        {showBankDropdown && (
          <View className="border border-gray-300 rounded-lg mt-1 mb-4 bg-white z-10">
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
        {errors.bank && !showBankDropdown && (
          <Text className="text-red-500 text-right mb-2" style={{ fontFamily: AlmaraiFonts.regular }}>
            {errors.bank}
          </Text>
        )}
      </View>

      <View className="mb-4">
        <View className="flex-row justify-end items-center mb-1">
          <Text style={{ fontFamily: AlmaraiFonts.bold }} className={labelStyle}>
            {locale === "ar" ? "التزامات" : "Obligations"}
          </Text>
        </View>
        <View className="flex-row justify-between mb-4">
          <TouchableOpacity
            className={`flex-1 border rounded-lg p-3 mr-2 flex-row items-center justify-center ${
              info.hasObligations === false ? "bg-[#46194F] border-[#46194F]" : "border-gray-300"
            }`}
            onPress={() => handleChange("hasObligations", false)}
          >
            <Text
              style={{
                fontFamily: AlmaraiFonts.bold,
                color: info.hasObligations === false ? "white" : "#46194F",
              }}
            >
              {locale === "ar" ? "لا" : "No"}
            </Text>
            {info.hasObligations === false && (
              <FontAwesome name="check-circle" size={16} color="white" style={{ marginLeft: 8 }} />
            )}
          </TouchableOpacity>

          <TouchableOpacity
            className={`flex-1 border rounded-lg p-3 ml-2 flex-row items-center justify-center ${
              info.hasObligations === true ? "bg-[#46194F] border-[#46194F]" : "border-gray-300"
            }`}
            onPress={() => handleChange("hasObligations", true)}
          >
            <Text
              style={{
                fontFamily: AlmaraiFonts.bold,
                color: info.hasObligations === true ? "white" : "#46194F",
              }}
            >
              {locale === "ar" ? "نعم" : "Yes"}
            </Text>
            {info.hasObligations === true && (
              <FontAwesome name="check-circle" size={16} color="white" style={{ marginLeft: 8 }} />
            )}
          </TouchableOpacity>
        </View>
        {errors.obligations && (
          <Text className="text-red-500 text-right mb-2" style={{ fontFamily: AlmaraiFonts.regular }}>
            {errors.obligations}
          </Text>
        )}
      </View>

      <View className="mb-4">
        <View className="flex-row justify-end items-center mb-1">
          <Text style={{ fontFamily: AlmaraiFonts.bold }} className={labelStyle}>
            {locale === "ar" ? "الوظيفة" : "Job"}
          </Text>
        </View>
        <TouchableOpacity
          className={`${dropdownStyle} ${errors.job ? "border-red-500" : ""}`}
          onPress={() => setShowJobDropdown(!showJobDropdown)}
        >
          <FontAwesome name="chevron-down" size={16} color="#46194F" />
          <Text
            style={{ fontFamily: AlmaraiFonts.regular, textAlign: "right" }}
            className={info.job ? "text-black" : "text-gray-400"}
          >
            {info.job || (locale === "ar" ? "اختر الوظيفة" : "Select job")}
          </Text>
        </TouchableOpacity>
        {showJobDropdown && (
          <View className="border border-gray-300 rounded-lg mt-1 mb-4 bg-white z-10">
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
        {errors.job && !showJobDropdown && (
          <Text className="text-red-500 text-right mb-2" style={{ fontFamily: AlmaraiFonts.regular }}>
            {errors.job}
          </Text>
        )}
      </View>

      <TouchableOpacity className="bg-[#46194F] rounded-lg py-3 items-center mt-4" onPress={handleSubmit}>
        <Text className="text-white font-bold" style={{ fontFamily: AlmaraiFonts.bold }}>
          {locale === "ar" ? "التالي" : "Next"}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default FinancialSection
