import { View, Text, I18nManager } from "react-native"
import Icon from "react-native-vector-icons/Ionicons"

const ToyotaLogo = () => (
  <View style={{ width: 16, height: 16 }} className="justify-center items-center">
    <View style={{ width: 14, height: 8, borderRadius: 4 }} className="bg-gray-200 justify-center items-center">
      <View
        style={{ width: 10, height: 5, borderRadius: 2.5, borderWidth: 1 }}
        className="border-gray-300 justify-center items-center"
      >
        <View style={{ width: 6, height: 2.5, borderRadius: 1.25 }} className="bg-gray-300" />
      </View>
    </View>
  </View>
)

// Red X Icon Component - Exactly matching the image
const RejectIcon = () => {
  return (
    <View style={{ width: 48, height: 48, marginLeft: 12 }} className="justify-center items-center">
      {/* Red outer circle */}
      <View style={{ width: 48, height: 48, borderRadius: 24 }} className="bg-red-600 justify-center items-center">
        {/* White inner circle */}
        <View style={{ width: 38, height: 38, borderRadius: 19 }} className="bg-white justify-center items-center">
          {/* Red X mark using vector icon */}
          <Icon name="close" size={20} color="#DC2626" />
        </View>
      </View>
    </View>
  )
}

// Green Checkmark Icon Component - Using React Vector Icon
const ApproveIcon = () => {
  return (
    <View style={{ width: 48, height: 48, marginLeft: 12 }} className="justify-center items-center">
      {/* Green outer circle */}
      <View style={{ width: 48, height: 48, borderRadius: 24 }} className="bg-green-500 justify-center items-center">
        {/* White inner circle */}
        <View style={{ width: 38, height: 38, borderRadius: 19 }} className="bg-white justify-center items-center">
          {/* Green checkmark using vector icon */}
          <Icon name="checkmark" size={24} color="#00C853" />
        </View>
      </View>
    </View>
  )
}

// Card Component
const Card = ({ icon, title, subtitle, carModel }) => {
  return (
    <View
      style={{
        borderRadius: 10,
        borderTopRightRadius: 50,
        borderBottomRightRadius: 50,
        padding: 10,
        marginVertical: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
        height: 80,
      }}
      className="bg-white flex-row items-center mx-auto w-[90%]"
    >
      <View style={{ marginLeft: 8 }} className="flex-1 items-start">
        <Text style={{ fontSize: 16, color: "#5D2D84", marginBottom: 2 }} className="font-bold">
          {title}
        </Text>
        <Text style={{ fontSize: 10, color: "#555555", marginBottom: 2 }} className="font-normal">
          {subtitle}
        </Text>
        <View className="flex-row items-center">
          <ToyotaLogo />
          <Text style={{ fontSize: 10, color: "#666666", marginLeft: 6 }}>{carModel}</Text>
        </View>
      </View>

      {icon}
    </View>
  )
}

const CashFinalDecision = () => {
  // Detect if RTL is enabled
  const isRTL = I18nManager.isRTL

  // Text content based on language direction
  const content = {
    title: isRTL ? "كاش" : "Cash",
    rejectedSubtitle: isRTL ? "القرار النهائي (رفض)" : "Final Decision (Rejected)",
    approvedSubtitle: isRTL ? "القرار النهائي (موافقة)" : "Final Decision (Approved)",
    carModel: isRTL ? "جينور T2 لدكجري فل كامل 2025" : "Jetour T2 Luxury Full Complete 2025",
  }

  return (
    <View style={{ padding: 50, paddingHorizontal: 20 }} className="flex-1 bg-gray-100">
      {/* Rejected Card */}
      <Card
        icon={<RejectIcon />}
        title={content.title}
        subtitle={content.rejectedSubtitle}
        carModel={content.carModel}
      />

      {/* Approved Card */}
      <Card
        icon={<ApproveIcon />}
        title={content.title}
        subtitle={content.approvedSubtitle}
        carModel={content.carModel}
      />
    </View>
  )
}

export default CashFinalDecision
