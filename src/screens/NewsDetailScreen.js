import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  FlatList,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useLocale } from '../contexts/LocaleContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function NewsDetailScreen() {
  const { params } = useRoute();
  const { news } = params;
  const { locale, direction } = useLocale();
  const isRTL = direction === 'rtl';
  const screenWidth = Dimensions.get('window').width;

  const getLocalized = (val) => (typeof val === 'object' ? val?.[locale] : val);

  return (
    <ScrollView
      className="flex-1 bg-white"
      contentContainerStyle={{ paddingBottom: 60 }}
      style={{ direction: isRTL ? 'rtl' : 'ltr' }}
    >
      {/* Cover Image */}
      <Image source={news.image} className="w-full h-64" resizeMode="cover" />

      {/* Header Info */}
      <View className="px-4 pt-4 pb-2">
        {/* Tags */}
        <View className="flex-row flex-wrap gap-2 mb-3">
          {news.tags?.map((tag, index) => (
            <Text
              key={index}
              className="px-2 py-1 bg-red-100 text-xs text-red-700 font-semibold rounded-full"
            >
              {tag}
            </Text>
          ))}
        </View>

        {/* Title */}
        <Text className="text-2xl font-bold text-gray-900 mb-1">
          {getLocalized(news.title)}
        </Text>

        {/* Author & Date */}
        <View className="flex-row items-center mb-3">
          <Image
            source={news.authorImage}
            className="w-6 h-6 rounded-full mr-2"
          />
          <Text className="text-sm text-gray-700 font-medium">
            {news.author}
          </Text>
          <Text className="text-sm text-gray-500 mx-2">•</Text>
          <Text className="text-sm text-gray-500">{news.date}</Text>
        </View>

        {/* Views + Comments */}
        <View className="flex-row items-center gap-4 mb-4">
          <View className="flex-row items-center gap-1">
            <Icon name="fire" color="red" size={18} />
            <Text className="text-sm text-gray-700">{news.views || '21,051'}</Text>
          </View>
          <View className="flex-row items-center gap-1">
            <Icon name="comment-text-outline" size={18} color="#555" />
            <Text className="text-sm text-gray-700">{news.comments || 0}</Text>
          </View>
        </View>
      </View>

      {/* Full Article */}
      <View className="px-4">
        <Text className="text-base leading-7 text-gray-800 mb-6">
          {getLocalized(news.fullText || news.description)}
        </Text>
      </View>

      {/* Additional Images */}
      {news.additionalImages?.length > 0 && (
        <View className="mb-6 px-4">
          <Text className="text-lg font-bold text-gray-800 mb-2">
            {locale === 'ar' ? 'صور إضافية' : 'Additional Images'}
          </Text>
          <FlatList
            data={news.additionalImages}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <Image
                source={item}
                style={{
                  width: screenWidth * 0.7,
                  height: 140,
                  borderRadius: 12,
                  marginRight: 12,
                }}
                resizeMode="cover"
              />
            )}
          />
        </View>
      )}

      {/* Specifications */}
      {news.specs && (
        <View className="px-4">
          {Object.entries(news.specs).map(([section, content]) => (
            <View key={section} className="mb-6">
              <Text className="text-lg font-bold text-gray-800 mb-2">
                {section}
              </Text>
              {Array.isArray(content) ? (
                content.map((item, index) => (
                  <Text key={index} className="text-sm text-gray-700 mb-1">
                    • {item}
                  </Text>
                ))
              ) : (
                <Text className="text-sm text-gray-700">{content}</Text>
              )}
            </View>
          ))}
        </View>
      )}

      {/* Share Buttons */}
      <View className="px-4 mt-2 mb-6">
        <Text className="text-base font-bold text-gray-800 mb-3">
          {locale === 'ar' ? 'مشاركة الخبر' : 'Share this article'}
        </Text>
        <View className="flex-row gap-4">
          <Icon name="facebook" size={28} color="#1877f2" />
          <Icon name="twitter" size={28} color="#1da1f2" />
          <Icon name="whatsapp" size={28} color="#25d366" />
          <Icon name="google" size={28} color="#db4437" />
        </View>
      </View>

      {/* Comment Box (UI only for now) */}
      <View className="px-4">
        <Text className="text-lg font-bold text-gray-800 mb-2">
          {locale === 'ar' ? 'اترك تعليقًا' : 'Leave a Reply'}
        </Text>
        <TextInput
          placeholder={locale === 'ar' ? 'اكتب تعليقك...' : 'Your Comment'}
          multiline
          numberOfLines={4}
          className="border border-gray-300 p-3 rounded-xl mb-3 text-sm text-gray-700"
        />
        <TextInput
          placeholder={locale === 'ar' ? 'اسمك' : 'Your Name'}
          className="border border-gray-300 p-3 rounded-xl mb-3 text-sm text-gray-700"
        />
        <TextInput
          placeholder={locale === 'ar' ? 'بريدك الإلكتروني' : 'Your Email'}
          className="border border-gray-300 p-3 rounded-xl mb-3 text-sm text-gray-700"
        />
        <TouchableOpacity className="bg-brand-primary py-3 rounded-xl items-center">
          <Text className="text-white font-semibold text-sm">
            {locale === 'ar' ? 'إرسال التعليق' : 'Post Comment'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
