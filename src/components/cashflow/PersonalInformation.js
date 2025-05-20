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
    if (errors[field]) {
      setErrors({ ...errors, [field]: null })
    }
  }

  const direction = locale === "ar" ? "flex-row-reverse" : "flex-row"
  const textAlign = locale === "ar" ? "right" : "left"
  const iconMargin = {
    marginLeft: locale === "ar" ? 0 : 6,
    marginRight: locale === "ar" ? 6 : 0,
  }

  const inputStyle = `border border-gray-300 rounded-l px-4 py-2.5 text-sm`

  return (
    <View className="px-4 py-4">

      {/* Name */}
      <View className="mb-3">
        <View className={`items-center mb-0.5 gap-1 ${direction}`}>
          <FontAwesome name="user" size={12} color="#46194F" style={iconMargin} />
          <Text className="text-[#46194F] text-sm font-bold" style={{ fontFamily: AlmaraiFonts.bold }}>
            {locale === "ar" ? "الاسم" : "Name"}
          </Text>
        </View>
        <TextInput
          value={info.name}
          onChangeText={(text) => handleChange("name", text)}
          placeholder={locale === "ar" ? "أدخل اسمك الكامل" : "Enter your full name"}
          className={`${inputStyle} ${errors.name ? "border-red-500" : ""}`}
          style={{ fontFamily: AlmaraiFonts.regular, textAlign }}
        />
        {errors.name && (
          <Text className="text-red-500 text-sm mt-0.5" style={{ fontFamily: AlmaraiFonts.regular, textAlign }}>
            {errors.name}
          </Text>
        )}
      </View>

      {/* Email */}
      <View className="mb-3">
        <View className={`items-center mb-0.5 gap-1 ${direction}`}>
          <FontAwesome name="envelope" size={12} color="#46194F" style={iconMargin} />
          <Text className="text-[#46194F] text-sm font-bold" style={{ fontFamily: AlmaraiFonts.bold }}>
            {locale === "ar" ? "البريد الإلكتروني" : "Email"}
          </Text>
        </View>
        <TextInput
          value={info.email}
          onChangeText={(text) => handleChange("email", text)}
          placeholder={locale === "ar" ? "أدخل بريدك الإلكتروني" : "Enter your email"}
          keyboardType="email-address"
          className={`${inputStyle} ${errors.email ? "border-red-500" : ""}`}
          style={{ fontFamily: AlmaraiFonts.regular, textAlign }}
        />
        {errors.email && (
          <Text className="text-red-500 text-sm mt-0.5" style={{ fontFamily: AlmaraiFonts.regular, textAlign }}>
            {errors.email}
          </Text>
        )}
      </View>

      {/* ID Number */}
      <View className="mb-3">
        <View className={`items-center mb-0.5 gap-1 ${direction}`}>
          <FontAwesome name="id-card" size={12} color="#46194F" style={iconMargin} />
          <Text className="text-[#46194F] text-sm font-bold" style={{ fontFamily: AlmaraiFonts.bold }}>
            {locale === "ar" ? "رقم الهوية الوطنية" : "ID Number"}
          </Text>
        </View>
        <TextInput
          value={info.idNumber}
          onChangeText={(text) => handleChange("idNumber", text)}
          placeholder={locale === "ar" ? "أدخل رقم الهوية الوطنية" : "Enter your ID number"}
          keyboardType="numeric"
          className={`${inputStyle} ${errors.idNumber ? "border-red-500" : ""}`}
          style={{ fontFamily: AlmaraiFonts.regular, textAlign }}
        />
        {errors.idNumber && (
          <Text className="text-red-500 text-sm mt-0.5" style={{ fontFamily: AlmaraiFonts.regular, textAlign }}>
            {errors.idNumber}
          </Text>
        )}
      </View>

      {/* Phone */}
      <View className="mb-3">
        <View className={`items-center mb-0.5 gap-1 ${direction}`}>
          <FontAwesome name="phone" size={12} color="#46194F" style={iconMargin} />
          <Text className="text-[#46194F] text-sm font-bold" style={{ fontFamily: AlmaraiFonts.bold }}>
            {locale === "ar" ? "رقم الهاتف" : "Phone Number"}
          </Text>
        </View>
        <TextInput
          value={info.phone}
          onChangeText={(text) => handleChange("phone", text)}
          placeholder={locale === "ar" ? "أدخل رقم هاتفك" : "Enter your phone number"}
          keyboardType="phone-pad"
          className={`${inputStyle} ${errors.phone ? "border-red-500" : ""}`}
          style={{ fontFamily: AlmaraiFonts.regular, textAlign }}
        />
        {errors.phone && (
          <Text className="text-red-500 text-sm mt-0.5" style={{ fontFamily: AlmaraiFonts.regular, textAlign }}>
            {errors.phone}
          </Text>
        )}
      </View>

      {/* Success Check Icon + Text */}
      <View className={`flex-row items-center mb-3 ${locale === "ar" ? "justify-end" : "justify-start"}`}>
        <FontAwesome
          name="check-circle"
          size={12}
          color="#00C853"
          style={{
            marginLeft: locale === "ar" ? 0 : 6,
            marginRight: locale === "ar" ? 6 : 0,
          }}
        />
        <Text className="text-[#00C853] text-xs" style={{ fontFamily: AlmaraiFonts.regular }}>
        </Text>
      </View>

      {/* Submit Button */}
      <TouchableOpacity className="bg-[#46194F] rounded-xl py-2 px-6 items-center self-start" onPress={handleSubmit}>
        <Text className="text-white font-bold text-base" style={{ fontFamily: AlmaraiFonts.bold }}>
          {locale === "ar" ? "التالي" : "Next"}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default PersonalInformation
