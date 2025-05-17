"use client"

import { useState, useEffect, useRef } from "react"
import { View, TouchableOpacity, Dimensions, ScrollView, Text } from "react-native"
import Modal from "react-native-modal"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import BuyerTypeSelection from "./BuyerTypeSelection"
import PersonalInformation from "./PersonalInformation"
import FinancialSection from "./FinancialSection"
import PrintConfirm from "./PrintConfirm"
import AlmaraiFonts from "../../constants/fonts"

const { height } = Dimensions.get("window")
const MODAL_HEIGHT = height * 0.75

const CashFlowModal = ({ isVisible, onClose, locale, navigation, sizeClass }) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [buyerType, setBuyerType] = useState(null) // "individual" or "company"
  const [personalInfo, setPersonalInfo] = useState({
    name: "",
    email: "",
    idNumber: "",
    phone: "",
  })
  const [financialInfo, setFinancialInfo] = useState({
    salary: "",
    bank: "",
    hasObligations: null,
    job: "",
  })
  const [isTransitioning, setIsTransitioning] = useState(false)
  const isMounted = useRef(true)

  useEffect(() => {
    return () => {
      isMounted.current = false
    }
  }, [])

  useEffect(() => {
    if (isVisible) {
      setCurrentStep(0)
      setBuyerType(null)
      setPersonalInfo({
        name: "",
        email: "",
        idNumber: "",
        phone: "",
      })
      setFinancialInfo({
        salary: "",
        bank: "",
        hasObligations: null,
        job: "",
      })
    }
  }, [isVisible])

  const safeStateUpdate = (updater, callback) => {
    if (!isMounted.current || isTransitioning) return
    setIsTransitioning(true)
    updater()
    setTimeout(() => {
      if (isMounted.current) {
        setIsTransitioning(false)
        if (callback) callback()
      }
    }, 50)
  }

  const nextStep = () => {
    safeStateUpdate(() => {
      // For companies, skip the financial section
      if (buyerType === "company" && currentStep === 1) {
        setCurrentStep(3) // Jump to Print & Confirm
      } else {
        setCurrentStep((prev) => prev + 1)
      }
    }, null)
  }

  const prevStep = () => {
    safeStateUpdate(() => {
      // For companies, skip the financial section when going back
      if (buyerType === "company" && currentStep === 3) {
        setCurrentStep(1) // Jump back to Personal Information
      } else {
        setCurrentStep((prev) => Math.max(0, prev - 1))
      }
    }, null)
  }

  const handleBuyerTypeSelect = (type) => {
    safeStateUpdate(() => {
      setBuyerType(type)
    }, nextStep)
  }

  const handlePersonalInfoChange = (info) => {
    setPersonalInfo(info)
  }

  const handleFinancialInfoChange = (info) => {
    setFinancialInfo(info)
  }

  const handleSubmitPersonalInfo = () => {
    nextStep()
  }

  const handleSubmitFinancialInfo = () => {
    nextStep()
  }

  const handlePrint = () => {
    // Handle print functionality
    console.log("Printing form...")
    onClose()
  }

  // Get step titles based on buyer type
  const getStepTitles = () => {
    if (buyerType === "company") {
      return [
        locale === "ar" ? "اختر نوع المشتري" : "Buyer Type",
        locale === "ar" ? "المعلومات الشخصية" : "Personal Information",
        locale === "ar" ? "طباعة ورقية" : "Print & Confirm",
      ]
    }
    return [
      locale === "ar" ? "اختر نوع المشتري" : "Buyer Type",
      locale === "ar" ? "المعلومات الشخصية" : "Personal Information",
      locale === "ar" ? "القسم المالي" : "Financial Section",
      locale === "ar" ? "طباعة ورقية" : "Print & Confirm",
    ]
  }

  // Get current step title
  const getCurrentStepTitle = () => {
    const titles = getStepTitles()
    return titles[currentStep] || ""
  }

  // Get total steps based on buyer type
  const getTotalSteps = () => {
    return buyerType === "company" ? 3 : 4
  }

  const renderStepContent = () => {
    if (isTransitioning) return null

    switch (currentStep) {
      case 0:
        return <BuyerTypeSelection onSelect={handleBuyerTypeSelect} selectedType={buyerType} locale={locale} />
      case 1:
        return (
          <PersonalInformation
            info={personalInfo}
            onChange={handlePersonalInfoChange}
            onSubmit={handleSubmitPersonalInfo}
            locale={locale}
          />
        )
      case 2:
        // For companies, this would be Print & Confirm, but we handle that in nextStep
        return (
          <FinancialSection
            info={financialInfo}
            onChange={handleFinancialInfoChange}
            onSubmit={handleSubmitFinancialInfo}
            locale={locale}
          />
        )
      case 3:
        return (
          <PrintConfirm
            buyerType={buyerType}
            personalInfo={personalInfo}
            financialInfo={financialInfo}
            onPrint={handlePrint}
            locale={locale}
          />
        )
      default:
        return null
    }
  }

  const HEADER_HEIGHT = 60
  const FOOTER_HEIGHT = 60
  const STEP_INDICATOR_HEIGHT = 60
  const TITLE_HEIGHT = 30
  const CONTENT_HEIGHT = MODAL_HEIGHT - HEADER_HEIGHT - FOOTER_HEIGHT - STEP_INDICATOR_HEIGHT - TITLE_HEIGHT

  return (
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
     <View 
  className="w-full bg-white"
  style={{
    height: MODAL_HEIGHT,
    borderTopLeftRadius: 24,  // More rounded top-left corner (increased from 16)
    borderTopRightRadius: 24, // More rounded top-right corner
    borderTopWidth: 1,        // Only top border
    borderTopColor: '#e2e8f0', // Light gray border color
    overflow: 'hidden',       // Ensures rounded corners work properly
    // No shadow properties as per request
  }}
>
        {/* Header */}
        <View className="flex-row items-center justify-between px-6 py-3">
          <TouchableOpacity onPress={prevStep}>
            <Text
              className="text-2xl font-bold text-[#46194F] "
              style={{
                transform: [{ scaleX: locale === "ar" ? -1 : 1 }],
                fontFamily: AlmaraiFonts.bold,
              }}
            >
              {locale === "ar" ? ">" : "<"}
            </Text>
          </TouchableOpacity>

          <Text
            className="text-lg font-bold text-[#46194F] flex-1 text-start ml-4"
            style={{ fontFamily: AlmaraiFonts.bold }}
          >
            {getCurrentStepTitle()}
          </Text>

          <TouchableOpacity
            onPress={onClose}
            className="w-8 h-8  rounded-md items-center justify-center"
          >
            <FontAwesome name="times-circle-o" size={20} color="#46194F" />
          </TouchableOpacity>
        </View>

        {/* Step Indicators */}
        <View className="px-4 mt-2">
          <View className="flex-row items-center justify-center">
            {Array.from({ length: getTotalSteps() }).map((_, step) => (
              <View key={`step-${step}`} className="flex-row items-center">
                <View
                  className={`h-7 w-7 rounded-[5px] items-center justify-center ${
                    currentStep > step ? "bg-[#46194F]" : currentStep === step ? "bg-[#46194F]" : "bg-[#D8C4E1]"
                  }`}
                >
                  {currentStep > step ? (
                    <FontAwesome name="check" size={14} color="#FFFFFF" />
                  ) : (
                    <Text className="text-white font-bold text-xs" style={{ fontFamily: AlmaraiFonts.bold }}>
                      {step + 1}
                    </Text>
                  )}
                </View>
                {step < getTotalSteps() - 1 && (
                  <View
                    className={`h-0.5 ${currentStep > step ? "bg-[#46194F]" : "bg-[#D8C4E1]"}`}
                    style={{ minWidth: 60, maxWidth: 40 }}
                  />
                )}
              </View>
            ))}
          </View>
        </View>

        {/* Content */}
        <ScrollView
          style={{ height: CONTENT_HEIGHT }}
          contentContainerStyle={{ paddingHorizontal: 8, paddingBottom: 16 }}
          showsVerticalScrollIndicator={false}
        >
          {renderStepContent()}
        </ScrollView>

    
      </View>
    </Modal>
  )
}

export default CashFlowModal
