"use client"

import { useState, useLayoutEffect } from "react"
import { SafeAreaView, View, Text, ScrollView, TouchableOpacity, TextInput } from "react-native"
import { useNavigation } from "@react-navigation/native"

// Custom SVG Icons
import ArrowIcon from "../../assets/icons/Arrow.svg"
import PencilIcon from "../../assets/icons/PencilIcon.svg"
import PlusIcon from "../../assets/icons/PlusIcon.svg"
import PersonalIcon from "../../assets/icons/PersonalIcon.svg"
import PersonalIcon1 from "../../assets/icons/PersonalIcon1.svg"

export default function PersonalInfo() {
  const [gender, setGender] = useState("male")
  const [selectedSector, setSelectedSector] = useState("قطاع حكومي")
  const navigation = useNavigation()
  const sectors = ["قطاع حكومي", "قطاع خاص", "عسكري", "متقاعد"]
  const [jobType, setJobType] = useState("مبيعات")
  const [editingJobType, setEditingJobType] = useState(false)
  const [city, setCity] = useState("الرياض")
  const [editingCity, setEditingCity] = useState(false)
  const [idNumber, setIdNumber] = useState("012354685485656484")
  const [editingIdNumber, setEditingIdNumber] = useState(false)
  const [email, setEmail] = useState("info@alromaihcars.com")
  const [editingEmail, setEditingEmail] = useState(false)
  const [fullName, setFullName] = useState("Alromaih cars")
  const [editingFullName, setEditingFullName] = useState(false)
  const [mobile, setMobile] = useState("0555 555 053")
  const [editingMobile, setEditingMobile] = useState(false)
  const [nationality, setNationality] = useState("")
  const [editingNationality, setEditingNationality] = useState(false)
  const [dateOfBirth, setDateOfBirth] = useState("")
  const [editingDateOfBirth, setEditingDateOfBirth] = useState(false)
  const [salary, setSalary] = useState("")
  const [editingSalary, setEditingSalary] = useState(false)

  // Hide the header when this component mounts
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false, // Hide the navigation header
    })
  }, [navigation])

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="p-5" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 6 }}>
        {/* Header */}
        <View className="flex-row-reverse items-center justify-between mb-5">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowIcon width={20} height={20} />
          </TouchableOpacity>
          <Text className="text-lg font-bold text-[#46194F] text-left" style={{ fontFamily: "Almarai-Bold" }}>
            الملف الشخصي
          </Text>
        </View>

        {/* Rest of your component remains unchanged */}
        {/* Card Container – المعلومات الأساسية */}
        <View className="bg-white border border-gray-300 rounded-xl p-4">
          <Text className="text-base font-bold text-[#46194F] mb-4 text-left" style={{ fontFamily: "Almarai-Bold" }}>
            المعلومات الأساسية
          </Text>

          {/* Email */}
          <View className="mb-4">
            <View className="flex-row-reverse items-center justify-between">
              <TouchableOpacity onPress={() => setEditingEmail(true)} className="mb-1">
                <PencilIcon width={14} height={14} />
              </TouchableOpacity>
              <Text className="text-gray-600 text-sm text-left" style={{ fontFamily: "Almarai-Regular" }}>
                البريد الإلكتروني
              </Text>
            </View>

            {editingEmail ? (
              <TextInput
                value={email}
                onChangeText={setEmail}
                onBlur={() => setEditingEmail(false)}
                placeholder="ادخل البريد الإلكتروني"
                keyboardType="email-address"
                autoCapitalize="none"
                className="border-b border-[#D5BADB] text-right text-black mt-1 pb-1"
                style={{ fontFamily: "Almarai-Bold" }}
                returnKeyType="done"
                onSubmitEditing={() => setEditingEmail(false)}
              />
            ) : (
              <Text className="text-black mt-1 text-left" style={{ fontFamily: "Almarai-Bold" }}>
                {email}
              </Text>
            )}

            <View className="h-px bg-gray-300 mt-2" />
          </View>

          {/* Full Name */}
          <View className="mb-4">
            <View className="flex-row-reverse items-center justify-between">
              <TouchableOpacity onPress={() => setEditingFullName(true)} className="mb-1">
                <PencilIcon width={14} height={14} />
              </TouchableOpacity>
              <Text className="text-sm text-left text-gray-600" style={{ fontFamily: "Almarai-Regular" }}>
                الاسم الكامل
              </Text>
            </View>

            {editingFullName ? (
              <TextInput
                value={fullName}
                onChangeText={setFullName}
                onBlur={() => setEditingFullName(false)}
                placeholder="ادخل الاسم الكامل"
                className="border-b border-[#D5BADB] text-right text-black mt-1 pb-1"
                style={{ fontFamily: "Almarai-Bold" }}
                returnKeyType="done"
                onSubmitEditing={() => setEditingFullName(false)}
              />
            ) : (
              <Text className="text-left text-black mt-1" style={{ fontFamily: "Almarai-Bold" }}>
                {fullName}
              </Text>
            )}

            <View className="h-px bg-gray-300 mt-2" />
          </View>

          {/* Mobile Number */}
          <View className="mb-4">
            <View className="flex-row-reverse items-center justify-between">
              <TouchableOpacity onPress={() => setEditingMobile(true)} className="mb-1">
                <PencilIcon width={12} height={12} />
              </TouchableOpacity>
              <Text className="text-sm text-left text-gray-600" style={{ fontFamily: "Almarai-Regular" }}>
                رقم الجوال
              </Text>
            </View>

            {editingMobile ? (
              <TextInput
                value={mobile}
                onChangeText={setMobile}
                onBlur={() => setEditingMobile(false)}
                placeholder="ادخل رقم الجوال"
                keyboardType="phone-pad"
                className="border-b border-[#D5BADB] text-right text-black mt-1 pb-1"
                style={{ fontFamily: "Almarai-Bold" }}
                returnKeyType="done"
                onSubmitEditing={() => setEditingMobile(false)}
              />
            ) : (
              <Text className="text-left text-black mt-1" style={{ fontFamily: "Almarai-Bold" }}>
                {mobile}
              </Text>
            )}

            <View className="h-px bg-gray-300 mt-2" />
          </View>

          {/* Nationality */}
          <View className="h-px bg-[#D5BADB] my-2" />
          <View className="mb-4">
            <View className="flex-row-reverse items-center justify-between">
              <TouchableOpacity
                onPress={() => setEditingNationality(true)}
                className="flex-row-reverse items-center gap-x-1"
              >
                <PlusIcon width={14} height={14} />
                <Text className="text-[#46194F] text-sm" style={{ fontFamily: "Almarai-Regular" }}>
                  إضافة
                </Text>
              </TouchableOpacity>

              <Text className="text-sm text-black text-left" style={{ fontFamily: "Almarai-Regular" }}>
                الجنسية
              </Text>
            </View>

            {editingNationality ? (
              <TextInput
                value={nationality}
                onChangeText={setNationality}
                onBlur={() => setEditingNationality(false)}
                placeholder="ادخل الجنسية"
                className="border-b border-[#D5BADB] text-right text-black mt-1 pb-1"
                style={{ fontFamily: "Almarai-Bold" }}
                returnKeyType="done"
                onSubmitEditing={() => setEditingNationality(false)}
              />
            ) : nationality !== "" ? (
              <Text className="text-black mt-1 text-left" style={{ fontFamily: "Almarai-Bold" }}>
                {nationality}
              </Text>
            ) : null}

            <View className="h-px bg-gray-300 mt-2" />
          </View>

          {/* Date of Birth */}
          <View className="mb-4">
            <View className="flex-row-reverse items-center justify-between">
              <TouchableOpacity
                onPress={() => setEditingDateOfBirth(true)}
                className="flex-row-reverse items-center gap-x-1"
              >
                <PlusIcon width={14} height={14} />
                <Text className="text-[#46194F] text-sm" style={{ fontFamily: "Almarai-Regular" }}>
                  إضافة
                </Text>
              </TouchableOpacity>

              <Text className="text-sm text-black text-left" style={{ fontFamily: "Almarai-Regular" }}>
                تاريخ الميلاد
              </Text>
            </View>

            {editingDateOfBirth ? (
              <TextInput
                value={dateOfBirth}
                onChangeText={setDateOfBirth}
                onBlur={() => setEditingDateOfBirth(false)}
                placeholder="مثال: 1990-01-01"
                className="border-b border-[#D5BADB] text-right text-black mt-1 pb-1"
                style={{ fontFamily: "Almarai-Bold" }}
                returnKeyType="done"
                onSubmitEditing={() => setEditingDateOfBirth(false)}
              />
            ) : dateOfBirth !== "" ? (
              <Text className="text-black mt-1 text-left" style={{ fontFamily: "Almarai-Bold" }}>
                {dateOfBirth}
              </Text>
            ) : null}

            <View className="h-px bg-gray-300 mt-2" />
          </View>

          {/* Gender - Fixed with conditional icon colors */}
          <Text className="mb-3 text-[#46194F] text-left" style={{ fontFamily: "Almarai-Bold" }}>
            الجنس
          </Text>
          <View className="flex-row justify-start gap-4">
            {/* Female */}
            <TouchableOpacity
              className={`flex-row items-center px-3 py-2 rounded-full border ${
                gender === "female" ? "bg-[#46194F] border-[#46194F]" : "bg-white border-[#46194F]"
              }`}
              onPress={() => setGender("female")}
            >
              <PersonalIcon1
                width={16}
                height={16}
                color={gender === "female" ? "white" : "#46194F"}
                fill={gender === "female" ? "white" : "#46194F"}
              />
              <Text
                className={`ml-2 text-sm ${gender === "female" ? "text-white" : "text-[#46194F]"}`}
                style={{ fontFamily: "Almarai-Bold" }}
              >
                أنثى
              </Text>
            </TouchableOpacity>

            {/* Male */}
            <TouchableOpacity
              className={`flex-row items-center px-3 py-2 rounded-full border ${
                gender === "male" ? "bg-[#46194F] border-[#46194F]" : "bg-white border-[#46194F]"
              }`}
              onPress={() => setGender("male")}
            >
              <PersonalIcon
                width={16}
                height={16}
                color={gender === "male" ? "white" : "#46194F"}
                fill={gender === "male" ? "white" : "#46194F"}
              />
              <Text
                className={`ml-2 text-sm ${gender === "male" ? "text-white" : "text-[#46194F]"}`}
                style={{ fontFamily: "Almarai-Bold" }}
              >
                ذكر
              </Text>
            </TouchableOpacity>
          </View>
          <View className="h-px bg-gray-300 mt-4" />
        </View>

        {/* Divider */}
        <View className="h-px bg-[#D5BADB] my-4" />

        {/* Card Container – المعلومات الإضافية */}
        <View className="bg-white border border-gray-300 rounded-2xl p-4 shadow-sm mb-32">
          <Text className="text-base font-bold text-[#46194F] mb-4 text-left" style={{ fontFamily: "Almarai-Bold" }}>
            المعلومات الإضافية
          </Text>

          {/* ID / Iqama Number */}
          <View className="mb-4">
            <View className="flex-row-reverse items-center justify-between">
              <TouchableOpacity onPress={() => setEditingIdNumber(true)} className="mb-1">
                <PencilIcon width={14} height={14} />
              </TouchableOpacity>
              <Text className="text-gray-600 text-sm text-left" style={{ fontFamily: "Almarai-Regular" }}>
                رقم الهوية / الإقامة
              </Text>
            </View>

            {editingIdNumber ? (
              <TextInput
                value={idNumber}
                onChangeText={setIdNumber}
                onBlur={() => setEditingIdNumber(false)}
                placeholder="ادخل رقم الهوية / الإقامة"
                keyboardType="numeric"
                className="border-b border-[#D5BADB] text-right text-black mt-1 pb-1"
                style={{ fontFamily: "Almarai-Bold" }}
                returnKeyType="done"
                onSubmitEditing={() => setEditingIdNumber(false)}
              />
            ) : (
              <Text className="text-black mt-1 text-left" style={{ fontFamily: "Almarai-Bold" }}>
                {idNumber}
              </Text>
            )}

            <View className="h-px bg-gray-300 mt-2" />
          </View>

          {/* City / Region */}
          <View className="mb-4">
            <View className="flex-row-reverse items-center justify-between">
              <TouchableOpacity onPress={() => setEditingCity(true)} className="mb-1">
                <PencilIcon width={14} height={14} />
              </TouchableOpacity>
              <Text className="text-gray-600 text-sm text-left" style={{ fontFamily: "Almarai-Regular" }}>
                المدينة / المنطقة
              </Text>
            </View>

            {editingCity ? (
              <TextInput
                value={city}
                onChangeText={setCity}
                onBlur={() => setEditingCity(false)}
                placeholder="ادخل اسم المدينة"
                className="border-b border-[#D5BADB] text-right text-black mt-1 pb-1"
                style={{ fontFamily: "Almarai-Bold" }}
                returnKeyType="done"
                onSubmitEditing={() => setEditingCity(false)}
              />
            ) : (
              <Text className="text-black mt-1 text-left" style={{ fontFamily: "Almarai-Bold" }}>
                {city}
              </Text>
            )}

            <View className="h-px bg-gray-300 mt-2" />
          </View>

          {/* Job Type */}
          <View className="mb-4">
            <View className="flex-row-reverse items-center justify-between">
              <TouchableOpacity onPress={() => setEditingJobType(true)} className="mb-1">
                <PencilIcon width={14} height={14} />
              </TouchableOpacity>
              <Text className="text-gray-600 text-sm text-left" style={{ fontFamily: "Almarai-Regular" }}>
                نوع العمل
              </Text>
            </View>

            {editingJobType ? (
              <TextInput
                value={jobType}
                onChangeText={setJobType}
                onBlur={() => setEditingJobType(false)}
                placeholder="ادخل نوع العمل"
                className="border-b border-[#D5BADB] text-right text-black mt-1 pb-1"
                style={{ fontFamily: "Almarai-Bold" }}
                returnKeyType="done"
                onSubmitEditing={() => setEditingJobType(false)}
              />
            ) : (
              <Text className="text-black mt-1 text-left" style={{ fontFamily: "Almarai-Bold" }}>
                {jobType}
              </Text>
            )}

            <View className="h-px bg-gray-300 mt-2" />
          </View>

          {/* Salary */}
          <View className="mb-4">
            <View className="flex-row-reverse items-center justify-between">
              <TouchableOpacity
                onPress={() => setEditingSalary(true)}
                className="flex-row-reverse items-center gap-x-1"
              >
                <PlusIcon width={14} height={14} />
                <Text className="text-[#46194F] text-sm" style={{ fontFamily: "Almarai-Regular" }}>
                  إضافة
                </Text>
              </TouchableOpacity>

              <Text className="text-sm text-black text-left" style={{ fontFamily: "Almarai-Regular" }}>
                الراتب
              </Text>
            </View>

            {editingSalary ? (
              <TextInput
                value={salary}
                onChangeText={setSalary}
                onBlur={() => setEditingSalary(false)}
                placeholder="ادخل الراتب"
                keyboardType="numeric"
                className="border-b border-[#D5BADB] text-right text-black mt-1 pb-1"
                style={{ fontFamily: "Almarai-Bold" }}
                returnKeyType="done"
                onSubmitEditing={() => setEditingSalary(false)}
              />
            ) : salary !== "" ? (
              <Text className="text-black mt-1 text-left" style={{ fontFamily: "Almarai-Bold" }}>
                {salary} ريال
              </Text>
            ) : null}

            <View className="h-px bg-gray-300 mt-2" />
          </View>

          {/* Work Sector (Horizontal Scroll & Selection) */}
          <Text className="text-[#46194F] text-left mb-3 mt-2" style={{ fontFamily: "Almarai-Bold" }}>
            اختر قطاع العمل
          </Text>
          <View className="h-px bg-gray-300 mb-4" />

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ flexDirection: "row-reverse", gap: 8 }}
          >
            {sectors.map((sector) => {
              const isActive = selectedSector === sector
              return (
                <TouchableOpacity
                  key={sector}
                  onPress={() => setSelectedSector(sector)}
                  className={`px-4 py-2 rounded-full border ${
                    isActive ? "bg-[#46194F] border-[#46194F]" : "border-[#46194F]"
                  }`}
                >
                  <Text
                    className={`text-sm ${isActive ? "text-white" : "text-[#46194F]"}`}
                    style={{ fontFamily: "Almarai-Bold" }}
                  >
                    {sector}
                  </Text>
                </TouchableOpacity>
              )
            })}
          </ScrollView>

          <View className="h-px bg-gray-300 mt-4" />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
