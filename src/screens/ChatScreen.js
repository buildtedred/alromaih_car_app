"use client"

import React from "react"
import { View, Text, ScrollView, StyleSheet, Animated, Easing } from "react-native"
import { useLocale } from "../contexts/LocaleContext"

// Create a component for the circular loader (updated design)
class CircularLoader extends React.Component {
  constructor(props) {
    super(props)
    this.rotateAnim = new Animated.Value(0)
    this.centerRotateAnim = new Animated.Value(0)
  }

  componentDidMount() {
    this.startRotation()
  }

  startRotation = () => {
    // Main circle rotation
    Animated.loop(
      Animated.timing(this.rotateAnim, {
        toValue: 1,
        duration: 1500,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start()

    // Center spinner rotation (slightly faster)
    Animated.loop(
      Animated.timing(this.centerRotateAnim, {
        toValue: 1,
        duration: 1200, // Slightly faster than the outer circle
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start()
  }

  render() {
    const spin = this.rotateAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "360deg"],
    })

    const centerSpin = this.centerRotateAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "360deg"],
    })

    return (
      <View style={styles.loaderContainer}>
        {/* Track Circle */}
        <View style={styles.trackCircle} />

        {/* Animated Indicator */}
        <Animated.View style={[styles.indicatorContainer, { transform: [{ rotate: spin }] }]}>
          <View style={styles.indicator} />
        </Animated.View>

        {/* White center circle */}
        <View style={styles.whiteCenter} />

        {/* Center spinner with dashes */}
        <Animated.View style={[styles.centerSpinner, { transform: [{ rotate: centerSpin }] }]}>
          {/* 8 dashes positioned in a circle */}
          <View style={[styles.dash, { top: 0, left: "50%", marginLeft: -1 }]} />
          <View style={[styles.dash, { top: "14.6%", right: "14.6%", transform: [{ rotate: "45deg" }] }]} />
          <View style={[styles.dash, { top: "50%", right: 0, marginTop: -1, transform: [{ rotate: "90deg" }] }]} />
          <View style={[styles.dash, { bottom: "14.6%", right: "14.6%", transform: [{ rotate: "135deg" }] }]} />
          <View style={[styles.dash, { bottom: 0, left: "50%", marginLeft: -1, transform: [{ rotate: "180deg" }] }]} />
          <View style={[styles.dash, { bottom: "14.6%", left: "14.6%", transform: [{ rotate: "225deg" }] }]} />
          <View style={[styles.dash, { top: "50%", left: 0, marginTop: -1, transform: [{ rotate: "270deg" }] }]} />
          <View style={[styles.dash, { top: "14.6%", left: "14.6%", transform: [{ rotate: "315deg" }] }]} />
        </Animated.View>
      </View>
    )
  }
}

// Create a component for the green checkmark that matches the image
const GreenCheckmark = () => {
  return (
    <View style={styles.checkContainer}>
      {/* Green circle */}
      <View style={styles.greenCircle} />

      {/* White inner circle */}
      <View style={styles.whiteInnerCircle} />

      {/* Green checkmark */}
      <View style={styles.greenCheckmark} />
    </View>
  )
}

export default function ChatScreen() {
  const { locale } = useLocale()
  const isRTL = locale === "ar"

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Cash Card */}
        <View style={styles.card}>
          <CircularLoader />

          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>كاش</Text>
            <Text style={styles.cardSubtitle}>استلام الطلب (بانتظار المراجعة)</Text>
            <View style={styles.carInfoContainer}>
              <Text style={styles.carInfo}>جيتور T2 لكجري فل كامل 2025</Text>
              <View style={styles.toyotaLogo} />
            </View>
          </View>
        </View>

        {/* Finance Card */}
        <View style={styles.card}>
          <GreenCheckmark />

          <View style={styles.cardContent}>
            <Text style={[styles.cardTitle, styles.greenText]}>تمويل</Text>
            <Text style={styles.cardSubtitle}>القرار المالي (موافقة)</Text>
            <View style={styles.carInfoContainer}>
              <Text style={styles.carInfo}>جيتور T2 لكجري فل كامل 2025</Text>
              <View style={styles.jetourLogo} />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  scrollContent: {
    padding: 16,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  // Loader styles
  loaderContainer: {
    width: 56,
    height: 56,
    marginRight: 16,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  trackCircle: {
    position: "absolute",
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 5,
    borderColor: "#f0f0f0",
  },
  indicatorContainer: {
    position: "absolute",
    width: 56,
    height: 56,
  },
  indicator: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 5,
    borderTopColor: "#5D2D84",
    borderRightColor: "#5D2D84",
    borderBottomColor: "transparent",
    borderLeftColor: "transparent",
  },
  whiteCenter: {
    position: "absolute",
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "white",
  },
  centerSpinner: {
    position: "absolute",
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  dash: {
    position: "absolute",
    width: 2,
    height: 4,
    backgroundColor: "#333",
    borderRadius: 1,
  },
  // Green checkmark styles - updated to match the image
  checkContainer: {
    width: 56,
    height: 56,
    marginRight: 16,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  greenCircle: {
    position: "absolute",
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#00C853", // Bright green color to match the image
  },
  whiteInnerCircle: {
    position: "absolute",
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "white",
  },
  greenCheckmark: {
    position: "absolute",
    width: 22,
    height: 12,
    borderRightWidth: 3,
    borderBottomWidth: 3,
    borderColor: "#00C853", // Green checkmark to match the image
    transform: [{ rotate: "45deg" }],
    top: 20,
    left: 17,
  },
  cardContent: {
    flex: 1,
    alignItems: "flex-end",
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#5D2D84",
    marginBottom: 4,
  },
  greenText: {
    color: "#00B74A",
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#888888",
    marginBottom: 4,
  },
  carInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  carInfo: {
    fontSize: 14,
    color: "#555555",
    marginRight: 4,
  },
  toyotaLogo: {
    width: 16,
    height: 16,
    backgroundColor: "#EEEEEE",
    borderRadius: 8,
  },
  jetourLogo: {
    width: 50,
    height: 12,
    backgroundColor: "#EEEEEE",
    borderRadius: 4,
  },
})
