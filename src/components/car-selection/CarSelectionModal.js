"use client";

import { useState, useEffect, useRef } from "react";
import { View, TouchableOpacity, Dimensions, ScrollView, Text } from "react-native";
import Modal from "react-native-modal";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import BrandSelection from "./BrandSelection";
import ModelSelection from "./ModelSelection";
import CategorySelection from "./CategorySelection";
import YearSelection from "./YearSelection";
import PriceSelection from "./PriceSelection";
import CarDetailsModal from "./CarDetailsModal";

import { carDataService } from "../../services/carDataService";
import AlmaraiFonts from "../../constants/fonts";
import CheckBoxIcon from "../../assets/Icon/checkbox.svg"; // ✅ Imported your custom checkbox icon

const { height } = Dimensions.get("window");
const MODAL_HEIGHT = height * 0.75;

const CarSelectionModal = ({ isVisible, onClose, paymentType = "cash", locale, navigation }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showCarDetails, setShowCarDetails] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (isVisible && isMounted.current) {
      setCurrentStep(0);
      setSelectedBrand(null);
      setSelectedModel(null);
      setSelectedCategory(null);
      setSelectedYear(null);
      setSelectedPrice(null);
      setSelectedCar(null);
      setShowCarDetails(false);
      setIsTransitioning(false);
    }
  }, [isVisible]);

  const safeStateUpdate = (updater, callback) => {
    if (!isMounted.current || isTransitioning) return;
    setIsTransitioning(true);
    updater();
    setTimeout(() => {
      if (isMounted.current) {
        setIsTransitioning(false);
        if (callback) callback();
      }
    }, 50);
  };

  const nextStep = () => {
    safeStateUpdate(() => setCurrentStep((prev) => Math.min(prev + 1, 4)), null);
  };

  const prevStep = () => {
    if (currentStep > 0) {
      safeStateUpdate(() => setCurrentStep((prev) => prev - 1), null);
    } else {
      onClose();
    }
  };

  const handleBrandSelect = (brand) => {
    safeStateUpdate(() => {
      setSelectedBrand(brand);
      setSelectedModel(null);
    }, nextStep);
  };

  const handleModelSelect = (model) => {
    safeStateUpdate(() => setSelectedModel(model), nextStep);
  };

  const handleCategorySelect = (category) => {
    safeStateUpdate(() => setSelectedCategory(category), nextStep);
  };

  const handleYearSelect = (year) => {
    safeStateUpdate(() => setSelectedYear(year), nextStep);
  };

  const handlePriceSelect = (price) => {
    setSelectedPrice(price);
  };

  const handleFinish = () => {
    const fallbackCar = {
      id: "fallback-1",
      brand: selectedBrand?.name || "Brand",
      model: selectedModel?.name || "Model",
      year: selectedYear || "2023",
      category: selectedCategory?.name || "Category",
      price: 100000,
      image: null,
    };

    let carData = fallbackCar;

    try {
      const filteredCars = carDataService.filterCars({
        brand: selectedBrand?.key,
        model: selectedModel?.key,
        bodyType: selectedCategory?.key,
        year: selectedYear,
        priceRange: selectedPrice,
      });

      if (filteredCars && filteredCars.length > 0) {
        const car = filteredCars[0];
        carData = {
          id: car.id,
          brand: selectedBrand?.name || "Brand",
          model: selectedModel?.name || "Model",
          year: selectedYear || "2023",
          category: selectedCategory?.name || "Category",
          price: car.cashPrice || 100000,
          image: car.image || null,
        };
      }
    } catch (error) {
      console.error("Error filtering cars:", error);
    }

    setSelectedCar(carData);
    onClose();
    setShowCarDetails(true);
  };

  const closeCarDetails = () => {
    setShowCarDetails(false);
  };

  const stepTitles = [
    locale === "ar" ? "اختر العلامة التجارية" : "Choose the brand",
    locale === "ar" ? "اختر الموديل" : "Choose the model",
    locale === "ar" ? "اختر الفئة" : "Choose the category",
    locale === "ar" ? "اختر السنة" : "Choose the year",
    locale === "ar" ? "اختر السعر" : "Choose the price",
  ];

  const renderStepContent = () => {
    if (isTransitioning) return null;
    switch (currentStep) {
      case 0:
        return <BrandSelection selectedBrand={selectedBrand} onSelectBrand={handleBrandSelect} locale={locale} />;
      case 1:
        return <ModelSelection selectedBrand={selectedBrand} selectedModel={selectedModel} onSelectModel={handleModelSelect} locale={locale} />;
      case 2:
        return <CategorySelection selectedCategory={selectedCategory} onSelectCategory={handleCategorySelect} locale={locale} />;
      case 3:
        return <YearSelection selectedYear={selectedYear} onSelectYear={handleYearSelect} locale={locale} />;
      case 4:
        return <PriceSelection selectedPrice={selectedPrice} onSelectPrice={handlePriceSelect} selectedBrand={selectedBrand} selectedModel={selectedModel} selectedCategory={selectedCategory} selectedYear={selectedYear} onFinish={handleFinish} locale={locale} />;
      default:
        return null;
    }
  };

  const getStepLabel = (step) => {
    switch (step) {
      case 0: return selectedBrand?.name || "";
      case 1: return selectedModel?.name || "";
      case 2: return selectedCategory?.name || "";
      case 3: return selectedYear || "";
      case 4: return selectedPrice?.label || "";
      default: return "";
    }
  };

  const HEADER_HEIGHT = 60;
  const FOOTER_HEIGHT = 60;
  const STEP_INDICATOR_HEIGHT = 80;
  const TITLE_HEIGHT = 30;
  const CONTENT_HEIGHT = MODAL_HEIGHT - HEADER_HEIGHT - FOOTER_HEIGHT - STEP_INDICATOR_HEIGHT - TITLE_HEIGHT;

  return (
    <>
      <Modal
        isVisible={isVisible}
        backdropOpacity={0}
        style={{ margin: 0, justifyContent: "center", alignItems: "center" }}
        animationIn="fadeIn"
        animationOut="fadeOut"
        useNativeDriver
        hideModalContentWhileAnimating
        onBackdropPress={onClose}
      >
        <View className="w-full bg-white rounded-t-2xl" style={{ height: MODAL_HEIGHT }}>
          {/* Header */}
          <View className="flex-row items-center justify-between px-6 py-3">
            <TouchableOpacity onPress={prevStep}>
              <Text
                className="text-3xl font-bold text-[#46194F]"
                style={{
                  transform: [{ scaleX: locale === "ar" ? -1 : 1 }],
                  fontFamily: AlmaraiFonts.bold,
                }}
              >
                {locale === "ar" ? ">" : "<"}
              </Text>
            </TouchableOpacity>

            <Text className="text-2xl font-bold text-[#46194F] flex-1" style={{ fontFamily: AlmaraiFonts.bold }}>
              {locale === "ar" ? "استكشف سيارتك" : "Explore Your Car"}
            </Text>

            <TouchableOpacity onPress={onClose} className="w-8 h-8 items-center justify-center">
              <FontAwesome name="times-circle-o" size={30} color="#46194F" />
            </TouchableOpacity>
          </View>

          {/* Step Labels & Progress */}
          <View className="px-10 mt-2">
            <View className="flex-row justify-center pl-24 gap-4 mb-2">
              {[0, 1, 2, 3, 4].map((step) => {
                const label = getStepLabel(step);
                return (
                  <View key={`label-${step}`} style={{ width: 70, alignItems: "center" }}>
                    {step < currentStep && label ? (
                      <View className="rounded-[5px] bg-[#46194F]" style={{ width: "100%", minHeight: 26, justifyContent: "center", alignItems: "center" }}>
                        <Text className="text-white text-xs text-center" style={{ fontFamily: AlmaraiFonts.bold }} numberOfLines={1} ellipsizeMode="tail">
                          {label}
                        </Text>
                      </View>
                    ) : (
                      <View style={{ height: 26 }} />
                    )}
                  </View>
                );
              })}
            </View>

            {/* Step Indicators */}
            {/* Step Indicators */}
<View className="flex-row items-center justify-center">
  {[0, 1, 2, 3, 4].map((step, index, arr) => (
    <View key={`step-${step}`} className="flex-row items-center">
      {/* Dot */}
      <View className="h-7 w-7 items-center justify-center">
        {currentStep > step ? (
          <CheckBoxIcon width={22} height={22} />
        ) : (
          <View className="bg-[#D8C4E1] h-7 w-7 rounded-[5px] items-center justify-center">
            <Text
              className="text-white font-bold text-xs"
              style={{ fontFamily: AlmaraiFonts.bold }}
            >
              {step + 1}
            </Text>
          </View>
        )}
      </View>

      {/* Line (not after the last step) */}
      {step < arr.length - 1 && (
        <View
          className={`h-0.5 ${currentStep > step ? "bg-[#46194F]" : "bg-[#D8C4E1]"}`}
          style={{ minWidth: 60, maxWidth: 40 }}
        />
      )}
    </View>
  ))}
</View>

          </View>

          {/* Title */}
          <View className="px-4 mt-3 mb-2">
            <Text className="text-base gap-2 font-bold text-[#46194F]" style={{ textAlign: locale === "ar" ? "right" : "left", fontFamily: AlmaraiFonts.bold }}>
              {stepTitles[currentStep]}
            </Text>
          </View>

          {/* Content */}
          <ScrollView style={{ height: CONTENT_HEIGHT }} contentContainerStyle={{ paddingHorizontal: 8, paddingBottom: 16 }} showsVerticalScrollIndicator={false}>
            {renderStepContent()}
          </ScrollView>
        </View>
      </Modal>

      {/* Car Details Modal */}
      <CarDetailsModal
        isVisible={showCarDetails}
        onClose={closeCarDetails}
        carData={selectedCar}
        locale={locale}
        navigation={navigation}
        paymentType={paymentType}
      />
    </>
  );
};

export default CarSelectionModal;
