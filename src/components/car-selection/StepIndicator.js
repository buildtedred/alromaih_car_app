import { View } from "react-native"

const StepIndicator = ({ currentStep, totalSteps = 5 }) => {
  return (
    <View className="flex-row justify-center items-center my-4">
      {Array.from({ length: totalSteps }).map((_, step) => (
        <View key={step} className="flex-row items-center">
          <View
            className={`h-2 w-2 rounded-full ${
              step === currentStep ? "bg-[#46194F]" : step < currentStep ? "bg-[#46194F]" : "bg-gray-300"
            }`}
          />
          {step < totalSteps - 1 && (
            <View className={`h-[2px] w-6 ${step < currentStep ? "bg-[#46194F]" : "bg-gray-300"}`} />
          )}
        </View>
      ))}
    </View>
  )
}

export default StepIndicator
