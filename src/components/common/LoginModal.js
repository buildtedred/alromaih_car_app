import { View, Text, Modal, TouchableOpacity, TextInput } from "react-native";
import LogoSvg from "../../assets/Icon/logo.svg";
import GoogleLogo from "../../assets/GoogleLogo.svg";

const LoginModal = ({ isVisible, onClose }) => {
  return (
    <Modal 
      animationType="slide" 
      transparent={true} 
      visible={isVisible} 
      onRequestClose={onClose}
    >
      {/* Main Container - No bottom margin */}
      <View style={{ 
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: "rgba(0,0,0,0.0)"
      }}>
        {/* Modal Content - Absolutely no bottom spacing */}
        <View style={{ 
          width: "100%", 
          height: "80%",
          backgroundColor: "white", 
          borderTopLeftRadius: 20, 
          borderTopRightRadius: 20,
          paddingHorizontal: 15,
          paddingTop: 20,
          paddingBottom: 0, // Zero bottom padding
          alignItems: "center",
          elevation: 0,
          shadowColor: 'transparent',
        }}>
          {/* Logo */}
          <LogoSvg width={130} height={40} />

          {/* Title */}
          <Text style={{ 
            fontSize: 15, 
            fontWeight: "bold", 
            marginBottom: 10, // Only bottom margin
            fontFamily: "Almarai" 
          }}>
            تسجيل الدخول
          </Text>

          {/* Google Button */}
          <TouchableOpacity
            style={{
              backgroundColor: "white",
              borderWidth: 2,
              borderColor: "gray",
              padding: 5,
              width: "90%",
              flexDirection: "row-reverse",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 8,
            }}
          >
            <GoogleLogo width={20} height={20} style={{ marginLeft: 10 }} />
            <Text style={{ fontFamily: "Almarai" }}>المتابعة بجوجل</Text>
          </TouchableOpacity>

          <Text style={{ 
            marginVertical: 5, 
            fontFamily: "Almarai" 
          }}>
            - أو -
          </Text>

          {/* Input Field */}
          <TextInput
            placeholder="ادخل رقم الجوال او الايميل"
            placeholderTextColor="#999"
            style={{
              borderWidth: 2,
              borderColor: "gray",
              width: "90%",
              padding: 7,
              borderRadius: 8,
              marginBottom: 15, // Reduced margin
              textAlign: "center",
              fontSize: 14,
              backgroundColor: "#fff",
              fontFamily: "Almarai",
            }}
          />

          {/* Continue Button */}
          <TouchableOpacity
            style={{
              backgroundColor: "#4B2765",
              padding: 7,
              width: "90%",
              alignItems: "center",
              borderRadius: 8,
              marginBottom: 15, // Reduced margin
            }}
          >
            <Text style={{ 
              color: "white", 
              fontSize: 16, 
              fontWeight: "bold", 
              fontFamily: "Almarai" 
            }}>
              متابعة
            </Text>
          </TouchableOpacity>

          {/* Guest Access - No bottom margin */}
          <TouchableOpacity
            style={{
              borderWidth: 2,
              borderColor: "gray",
              width: "90%",
              padding: 7,
              borderRadius: 8,
              backgroundColor: "#f9f9f9",
              alignItems: "center",
            }}
          >
            <Text style={{ 
              fontSize: 14, 
              color: "#666", 
              fontFamily: "Almarai" 
            }}>
              تصفح كزائر - Guest Access
            </Text>
          </TouchableOpacity>

          {/* Terms - Positioned at bottom with no gap */}
          <View style={{ 
            marginTop: 'auto', // Pushes to bottom
            paddingBottom: 15, // Only padding needed
            paddingHorizontal: 20
          }}>
            <Text style={{ 
              fontSize: 10, 
              color: "gray", 
              textAlign: "center",
              fontFamily: "Almarai",
              lineHeight: 16 
            }}>
              من خلال الاستمرار في استخدام المريح للسيارات، فإنك توافق على شروط الخدمة وسياسة الخصوصية الخاصة بنا
            </Text>
          </View>

          {/* Close Button - Absolute position */}
          <TouchableOpacity 
            onPress={onClose} 
            style={{ 
              position: 'absolute',
              top: 15,
              right: 15
            }}
          >
            <Text style={{ 
              color: "red", 
              fontSize: 16, 
              fontFamily: "Almarai" 
            }}>
              إغلاق
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default LoginModal;