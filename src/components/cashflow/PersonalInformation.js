"use client"

import { useState } from "react"
import { View, TextInput, TouchableOpacity, Text } from "react-native"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import AlmaraiFonts from "../../constants/fonts"

const PersonalInformation = ({ info, onChange, onSubmit, locale }) => {
  const [errors, setErrors] = useState({})

  const validate = () => {
    const newErrors = {}
    if (!info.name) newErrors.name = locale === "ar" ? "الاسم مطلوب" : "Name is required"
    if (!info.email) newErrors.email = locale === "ar" ? "البريد الإلكتروني مطلوب" : "Email is required"
    else if (!/\S+@\S+\.\S+/.test(info.email))
      newErrors.email = locale === "ar" ? "البريد الإلكتروني غير صالح" : "Email is invalid"
    if (!info.idNumber) newErrors.idNumber = locale === "ar" ? "رقم الهوية مطلوب" : "ID number is required"
    if (!info.phone) newErrors.phone = locale === "ar" ? "رقم الهاتف مطلوب" : "Phone number is required"

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

  return (
    <View className="px-4 py-6">
      <View className="mb-4">
        <View className="flex-row justify-end items-center mb-1">
          <Text style={{ fontFamily: AlmaraiFonts.bold }} className={labelStyle}>
            {locale === "ar" ? "الاسم" : "Name"}
          </Text>
          <FontAwesome name="user" size={16} color="#46194F" style={{ marginLeft: 8 }} />
        </View>
        <TextInput
          value={info.name}
          onChangeText={(text) => handleChange("name", text)}
          placeholder={locale === "ar" ? "أدخل اسمك الكامل" : "Enter your full name"}
          className={`${inputStyle} ${errors.name ? "border-red-500" : ""}`}
          style={{ fontFamily: AlmaraiFonts.regular, textAlign: locale === "ar" ? "right" : "left" }}
        />
        {errors.name && (
          <Text className="text-red-500 text-right mb-2" style={{ fontFamily: AlmaraiFonts.regular }}>
            {errors.name}
          </Text>
        )}
      </View>

      <View className="mb-4">
        <View className="flex-row justify-end items-center mb-1">
          <Text style={{ fontFamily: AlmaraiFonts.bold }} className={labelStyle}>
            {locale === "ar" ? "البريد الإلكتروني" : "Email"}
          </Text>
          <FontAwesome name="envelope" size={16} color="#46194F" style={{ marginLeft: 8 }} />
        </View>
        <TextInput
          value={info.email}
          onChangeText={(text) => handleChange("email", text)}
          placeholder={locale === "ar" ? "أدخل بريدك الإلكتروني" : "Enter your email"}
          keyboardType="email-address"
          className={`${inputStyle} ${errors.email ? "border-red-500" : ""}`}
          style={{ fontFamily: AlmaraiFonts.regular, textAlign: locale === "ar" ? "right" : "left" }}
        />
        {errors.email && (
          <Text className="text-red-500 text-right mb-2" style={{ fontFamily: AlmaraiFonts.regular }}>
            {errors.email}
          </Text>
        )}
      </View>

      <View className="mb-4">
        <View className="flex-row justify-end items-center mb-1">
          <Text style={{ fontFamily: AlmaraiFonts.bold }} className={labelStyle}>
            {locale === "ar" ? "رقم الهوية الوطنية" : "ID Number"}
          </Text>
          <FontAwesome name="id-card" size={16} color="#46194F" style={{ marginLeft: 8 }} />
        </View>
        <TextInput
          value={info.idNumber}
          onChangeText={(text) => handleChange("idNumber", text)}
          placeholder={locale === "ar" ? "أدخل رقم الهوية الوطنية" : "Enter your ID number"}
          keyboardType="numeric"
          className={`${inputStyle} ${errors.idNumber ? "border-red-500" : ""}`}
          style={{ fontFamily: AlmaraiFonts.regular, textAlign: locale === "ar" ? "right" : "left" }}
        />
        {errors.idNumber && (
          <Text className="text-red-500 text-right mb-2" style={{ fontFamily: AlmaraiFonts.regular }}>
            {errors.idNumber}
          </Text>
        )}
      </View>

      <View className="mb-4">
        <View className="flex-row justify-end items-center mb-1">
          <Text style={{ fontFamily: AlmaraiFonts.bold }} className={labelStyle}>
            {locale === "ar" ? "رقم الهاتف" : "Phone Number"}
          </Text>
          <FontAwesome name="phone" size={16} color="#46194F" style={{ marginLeft: 8 }} />
        </View>
        <TextInput
          value={info.phone}
          onChangeText={(text) => handleChange("phone", text)}
          placeholder={locale === "ar" ? "أدخل رقم هاتفك" : "Enter your phone number"}
          keyboardType="phone-pad"
          className={`${inputStyle} ${errors.phone ? "border-red-500" : ""}`}
          style={{ fontFamily: AlmaraiFonts.regular, textAlign: locale === "ar" ? "right" : "left" }}
        />
        {errors.phone && (
          <Text className="text-red-500 text-right mb-2" style={{ fontFamily: AlmaraiFonts.regular }}>
            {errors.phone}
          </Text>
        )}
      </View>

      <View className="flex-row justify-end items-center mb-4">
        <FontAwesome name="check-circle" size={16} color="#00C853" />
      </View>

      <TouchableOpacity className="bg-[#46194F] rounded-lg py-3 items-center mt-4" onPress={handleSubmit}>
        <Text className="text-white font-bold" style={{ fontFamily: AlmaraiFonts.bold }}>
          {locale === "ar" ? "التالي" : "Next"}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default PersonalInformation
