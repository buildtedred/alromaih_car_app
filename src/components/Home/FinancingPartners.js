"use client";
import React from "react";
import { View, Text, FlatList } from "react-native";
import { useLocale } from "../../contexts/LocaleContext";
import NCBLogo from "../../assets/banks/ncb_logo.svg";
import AlmaraiFonts from "../../constants/fonts";

const financingPartners = [
  { id: "1", subtext: "شركاؤنا" },
  { id: "2", subtext: "شركاؤنا" },
  { id: "3", subtext: "شركاؤنا" },
  { id: "4", subtext: "شركاؤنا" },
  { id: "5", subtext: "شركاؤنا" },
];

export default function FinancingPartners({ isRTL }) {
  const { locale } = useLocale();

  const ItemSeparatorComponent = () => <View className="w-4 mb-32" />;

  const renderItem = ({ item }) => (
    <View className="bg-white rounded-xl p-2 items-center justify-center h-[90px] w-[140px] border border-gray-200 shadow-sm">
      <NCBLogo width={100} height={60} style={{ marginBottom: 1 }} />
      <Text
        style={{
          fontSize: 13,
          fontFamily: AlmaraiFonts.regular,
          color: "#6b7280",
          textAlign: "center",
        }}
      >
        {item.subtext}
      </Text>
    </View>
  );

  const data = isRTL ? [...financingPartners].reverse() : financingPartners;

  return (
    <View className=" bg-white">
      <View className="px-5">
        <Text
          style={{
            fontSize: 15,
            fontFamily: AlmaraiFonts.bold,
            color: "#9C27B0",
            textAlign: "center",
            marginBottom: 8,
          }}
        >
          {locale === "ar" ? "شركاء التمويل" : "Financing Partners"}
        </Text>

        <Text
          style={{
            fontSize: 14,
            fontFamily: AlmaraiFonts.regular,
            color: "#4B5563", // ✅ visible on white
            textAlign: "center",
         
          }}
        >
          {locale === "ar"
            ? "نتعاون مع أفضل البنوك وشركات التمويل في المملكة"
            : "We cooperate with the best banks and financing companies in the Kingdom"}
        </Text>
      </View>

      <FlatList
        horizontal
        inverted={isRTL}
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ItemSeparatorComponent={ItemSeparatorComponent}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 12 }}
      />
    </View>
  );
}
