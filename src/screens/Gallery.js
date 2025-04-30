import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Alert,
  LayoutAnimation,
  UIManager,
  Platform,
  PermissionsAndroid
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useLocale } from '../contexts/LocaleContext';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNFS from 'react-native-fs';
import carsData, { getAllSpecGroups, brandLogos } from '../mock-data';

const { width } = Dimensions.get('window');

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

async function requestStoragePermission() {
  if (Platform.OS !== 'android') return true;
  
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: "Storage Permission",
        message: "App needs access to storage to save PDFs",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK"
      }
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch (err) {
    console.warn(err);
    return false;
  }
}

export default function GalleryScreen({ route }) {
  const { car } = route.params;
  const { locale } = useLocale();
  const [activeTab, setActiveTab] = useState('specs');
  const [openGroups, setOpenGroups] = useState({});

  const fullCar = useMemo(() => {
    const carData = carsData.find((c) => c.id === car.id);
    return {
      ...car,
      image: carData?.image,
      brandLogo: carData?.brandLogo,
      additionalImages: carData?.additionalImages,
    };
  }, [car.id]);

  const getLang = (field) => (typeof field === 'object' ? field?.[locale] : field);
  const specGroups = getAllSpecGroups(fullCar, locale);
  const BrandLogo = brandLogos[fullCar.brand];

  const getFeatureLabel = (key) => {
    const labels = {
      exterior: { en: 'Exterior', ar: 'الخارجية' },
      interior: { en: 'Interior', ar: 'الداخلية' },
      engine: { en: 'Engine', ar: 'المحرك' },
      safety: { en: 'Safety', ar: 'السلامة' },
      technology: { en: 'Technology', ar: 'التقنية' },
      entertainment: { en: 'Entertainment', ar: 'الترفيه' },
      comfort: { en: 'Comfort', ar: 'الراحة' },
      exteriorFeatures: { en: 'Exterior Features', ar: 'ميزات خارجية' },
    };
    return labels[key]?.[locale] || key;
  };

  const toggleGroup = (key) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpenGroups((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const getImageBase64 = async (imageSource) => {
    try {
      const assetSource = Image.resolveAssetSource(imageSource);
      let imageUri = assetSource.uri;
      
      // Handle Android assets differently in release mode
      if (Platform.OS === 'android' && !imageUri.startsWith('file://')) {
        if (imageUri.includes('img_')) {
          // For images stored in android/app/src/main/res/drawable
          const imageName = imageUri.split('/').pop().split('.')[0];
          imageUri = `file:///android_res/drawable/${imageName}.png`;
        } else {
          // For other bundled assets
          imageUri = `asset:/${assetSource.uri}`;
        }
      }

      // Read the image file
      const base64Image = await RNFS.readFile(imageUri, 'base64');
      return `data:image/jpeg;base64,${base64Image}`;
    } catch (error) {
      console.error('Error processing image:', error);
      return null;
    }
  };

  const generatePDF = async () => {
    try {
      const hasPermission = await requestStoragePermission();
      if (!hasPermission) {
        Alert.alert(
          locale === 'en' ? 'Permission Required' : 'يوجد صلاحية مطلوبة',
          locale === 'en' ? 'Storage permission is required to save PDF' : 'يجب منح صلاحية التخزين لحفظ ملف PDF'
        );
        return;
      }

      const carName = getLang(fullCar.name);
      let mainImageTag = '';

      try {
        const base64Image = await getImageBase64(fullCar.image);
        if (base64Image) {
          mainImageTag = `<img src="${base64Image}" style="width: 100%; max-height: 300px; margin: 10px 0; object-fit: contain;" />`;
        } else {
          throw new Error('Could not process image');
        }
      } catch (innerError) {
        console.warn('Image not available for PDF:', innerError);
        mainImageTag = `<div style="height: 100px; background: #f0f0f0; display: flex; align-items: center; justify-content: center; margin: 10px 0;">
          <span>${locale === 'en' ? 'Image not available' : 'الصورة غير متوفرة'}</span>
        </div>`;
      }

      // Generate additional images HTML if they exist
      let additionalImagesHtml = '';
      if (fullCar.additionalImages && fullCar.additionalImages.length > 0) {
        for (const img of fullCar.additionalImages) {
          try {
            const base64Image = await getImageBase64(img);
            if (base64Image) {
              additionalImagesHtml += `<img src="${base64Image}" style="width: 100%; max-height: 250px; margin: 10px 0; object-fit: contain;" />`;
            }
          } catch (error) {
            console.warn('Error processing additional image:', error);
          }
        }
      }

      const htmlContent = `
        <html>
          <head>
            <meta charset="UTF-8">
            <style>
              body { font-family: Arial; padding: 20px; }
              h1 { text-align: center; color: #46194F; }
              h2 { color: #46194F; margin-top: 20px; }
              h3 { color: #555; margin-top: 15px; }
              ul { padding-left: 20px; }
              li { margin-bottom: 5px; }
              .spec-item { display: flex; justify-content: space-between; margin-bottom: 5px; }
              .spec-name { color: #666; }
              .spec-value { font-weight: bold; color: #333; }
            </style>
          </head>
          <body>
            <h1>${carName}</h1>
            ${mainImageTag}
            ${additionalImagesHtml}
            
            <h2>${locale === 'en' ? 'Specifications' : 'المواصفات'}</h2>
            ${specGroups.map(group => `
              <h3>${group.groupName}</h3>
              <ul>
                ${group.specs.map(spec => `
                  <li>
                    <div class="spec-item">
                      <span class="spec-name">${spec.name}:</span>
                      <span class="spec-value">${spec.value}</span>
                    </div>
                  </li>
                `).join('')}
              </ul>
            `).join('')}
            
            <h2>${locale === 'en' ? 'Features' : 'المميزات'}</h2>
            <ul>
              ${Object.entries(fullCar.features)
                .filter(([_, enabled]) => enabled)
                .map(([key]) => `<li>${getFeatureLabel(key)}</li>`)
                .join('')}
            </ul>
          </body>
        </html>
      `;

      const options = {
        html: htmlContent,
        fileName: `${carName.replace(/\s+/g, '_')}_Specs`,
        directory: Platform.OS === 'android' ? RNFS.DownloadDirectoryPath : RNFS.DocumentDirectoryPath,
        base64: false,
        padding: 10,
      };

      const pdf = await RNHTMLtoPDF.convert(options);
      
      // For Android, we need to explicitly move to downloads
      if (Platform.OS === 'android') {
        const downloadsPath = `${RNFS.DownloadDirectoryPath}/${carName.replace(/\s+/g, '_')}_Specs.pdf`;
        await RNFS.moveFile(pdf.filePath, downloadsPath);
      }

      Alert.alert(
        locale === 'en' ? 'Success' : 'نجاح',
        locale === 'en' 
          ? `PDF saved to ${Platform.OS === 'android' ? 'Downloads' : 'Documents'} folder!` 
          : `تم حفظ ملف PDF في مجلد ${Platform.OS === 'android' ? 'التنزيلات' : 'المستندات'}!`
      );
    } catch (error) {
      console.error('PDF Generation Error:', error);
      Alert.alert(
        locale === 'en' ? 'Error' : 'خطأ',
        locale === 'en' ? 'Failed to generate or save PDF' : 'فشل في إنشاء أو حفظ ملف PDF'
      );
    }
  };

  // Rest of your component code remains the same...
  const images = [fullCar.image, ...(fullCar.additionalImages || [])].map((img, index) => ({
    id: index + 1,
    source: img,
  }));


  return (
    <ScrollView className="flex-1 bg-white">
      <View className="h-64 relative">
        <FlatList
          data={images}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={{ width, height: 250 }}>
              <Image
                source={item.source}
                resizeMode="contain"
                style={{
                  width: '80%',
                  height: '80%',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  marginTop: '7%',
                }}
              />
            </View>
          )}
        />
        <View className="absolute bottom-4 right-4 bg-black bg-opacity-50 px-2 py-1 rounded-xl">
          <Text className="text-white text-xs">1/{images.length}</Text>
        </View>
      </View>

      <View className="bg-white mx-4 mt-8 rounded-2xl p-4 shadow-md">
        <View className="flex-row justify-between items-start">
          <View className="flex-1">
            <Text className="text-xl font-bold text-[#46194F] mb-1">{getLang(fullCar.name)}</Text>
            <Text className="text-sm text-gray-500">{getLang(fullCar.modelYear)}</Text>
            <Text className="text-2xl font-extrabold text-[#46194F] mt-3">
              {fullCar.cashPrice?.toLocaleString()} {locale === 'en' ? 'SAR' : 'ر.س'}
            </Text>
          </View>

          {BrandLogo && (
            <View className="items-end ml-2">
              <View className="bg-gray-100 px-3 py-2 rounded-xl mb-2" style={{ elevation: 2 }}>
                <BrandLogo width={75} height={40} />
              </View>
              <View className="bg-[#46194F] px-3 py-1 mt-1 rounded-full">
                <Text className="text-white text-xs font-semibold">
                  {locale === 'en' ? 'From' : 'من'} {fullCar.installmentPrice} {locale === 'en' ? '/mo' : '/شهر'}
                </Text>
              </View>
            </View>
          )}
        </View>
      </View>

      <View className="flex-row border-b border-gray-200 mx-4 mt-6">
        {['specs', 'features'].map((tab) => (
          <TouchableOpacity
            key={tab}
            className={`flex-1 py-3 border-b-2 ${activeTab === tab ? 'border-[#46194F]' : 'border-transparent'}`}
            onPress={() => setActiveTab(tab)}
          >
            <Text className={`text-center font-semibold ${activeTab === tab ? 'text-[#46194F]' : 'text-gray-500'}`}>
              {tab === 'specs' ? (locale === 'en' ? 'Specifications' : 'المواصفات') : (locale === 'en' ? 'Features' : 'المميزات')}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View className="p-4">
        {activeTab === 'specs' ? (
          specGroups.map((group) => (
            <View key={group.groupKey} className="mb-6">
              <TouchableOpacity
                className="flex-row justify-between items-center bg-gray-100 px-4 py-3 rounded-lg"
                onPress={() => toggleGroup(group.groupKey)}
              >
                <Text className="text-[#46194F] font-semibold">{group.groupName}</Text>
                <MaterialIcons
                  name={openGroups[group.groupKey] ? 'expand-less' : 'expand-more'}
                  size={24}
                  color="#46194F"
                />
              </TouchableOpacity>

              {openGroups[group.groupKey] && (
                <View className="bg-white border-t border-gray-200">
                  {group.specs.map((spec) => (
                    <View
                      key={spec.key}
                      className="py-3 flex-row justify-between border-b border-gray-100 px-2"
                    >
                      <Text className="text-gray-600 text-sm">{spec.name}</Text>
                      <Text className="text-gray-800 font-semibold text-sm">{spec.value}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          ))
        ) : (
          <View>
            {Object.entries(fullCar.features)
              .filter(([_, enabled]) => enabled)
              .map(([key], idx) => (
                <View key={idx} className="flex-row items-center mb-3">
                  <Icon name="check-circle" size={18} color="#46194F" />
                  <Text className="text-gray-800 ml-2">{getFeatureLabel(key)}</Text>
                </View>
              ))}
          </View>
        )}
      </View>

      <View className="p-4 bg-gray-50">
        <TouchableOpacity className="bg-[#46194F] p-4 rounded-lg flex-row justify-center items-center mb-3">
          <MaterialIcons name="phone" size={20} color="white" />
          <Text className="text-white font-bold text-lg ml-2">
            {locale === 'en' ? 'Contact Sales' : 'اتصل بالمبيعات'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity className="border border-[#46194F] p-4 rounded-lg flex-row justify-center items-center mb-3">
          <MaterialIcons name="schedule" size={20} color="#46194F" />
          <Text className="text-[#46194F] font-bold text-lg ml-2">
            {locale === 'en' ? 'Schedule Test Drive' : 'حجز تجربة قيادة'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={generatePDF}
          className="border border-[#46194F] p-4 rounded-lg flex-row justify-center items-center"
        >
          <MaterialIcons name="picture-as-pdf" size={20} color="#46194F" />
          <Text className="text-[#46194F] font-bold text-lg ml-2">
            {locale === 'en' ? 'Download Car PDF' : 'تحميل مواصفات السيارة'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
