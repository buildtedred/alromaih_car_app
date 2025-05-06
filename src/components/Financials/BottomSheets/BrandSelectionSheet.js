import React from 'react';
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import Modal from 'react-native-modal';
import { getBrands } from '../../../mock-data';
import { useLocale } from '../../../contexts/LocaleContext';
import { BottomSheetHeader } from '../../common/BottomSheetHeader';

export default function BrandSelectionSheet({ isVisible, onClose, onSelectBrand }) {
  const { locale } = useLocale();
  const [loading, setLoading] = React.useState(false);
  const [brands, setBrands] = React.useState([]);

  React.useEffect(() => {
    const loadBrands = async () => {
      try {
        setLoading(true);
        const brandData = getBrands(locale);
        setBrands(brandData);
      } catch (error) {
        console.error('Failed to load brands:', error);
      } finally {
        setLoading(false);
      }
    };

    if (isVisible) loadBrands();
  }, [isVisible, locale]);

  const handleBrandSelect = (brand) => {
    console.log('Brand selected:', brand.name);
    onSelectBrand(brand); // Let parent handle the flow
  };

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      style={{ justifyContent: 'flex-end', margin: 0 }}
      backdropTransitionOutTiming={0}
      animationIn="slideInUp"
      animationOut="slideOutDown"
    >
      <View className="bg-white rounded-t-3xl px-6 pt-6 pb-8 max-h-[80%]">
        <BottomSheetHeader
          title={locale === 'ar' ? 'اختر العلامة التجارية' : 'Select Brand'}
          description={locale === 'ar' ? 'اختر العلامة التي تفضلها لسيارتك' : 'Choose your preferred brand'}
          onClose={onClose}
        />

        {loading ? (
          <View className="flex-1 justify-center items-center py-10">
            <ActivityIndicator size="large" color="#46194F" />
          </View>
        ) : (
          <FlatList
            data={brands}
            keyExtractor={(item) => item.key}
            numColumns={3}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 16 }}
            columnWrapperStyle={{ justifyContent: 'space-between' }}
            renderItem={({ item }) => (
              <TouchableOpacity
                className="items-center mb-5 w-[30%] active:opacity-70"
                onPress={() => handleBrandSelect(item)}
                activeOpacity={0.7}
              >
                <View className="w-12 h-12 items-center justify-center">
                  <item.logo width={48} height={48} />
                </View>
                <Text className="text-xs mt-2 font-semibold text-gray-700 text-center">
                  {item.name}
                </Text>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    </Modal>
  );
}