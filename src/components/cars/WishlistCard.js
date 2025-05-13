"use client"

import { useState, useRef, useEffect } from "react"
import { View, Image, TouchableOpacity, Animated, Text, PanResponder, Dimensions } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useLocale } from "../../contexts/LocaleContext"
import { useRecentlyViewed } from "../../contexts/RecentlyViewedContext"
import { useWishlist } from "../../contexts/WishlistContext"
import RiyalIcon from "../../assets/Icon/riyal_icon.svg"
import CarIcon from "react-native-vector-icons/FontAwesome5"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import JetourLogo from "../../assets/brands/jetour_logo.svg"
import AlmaraiFonts from "../../constants/fonts"

export default function WishlistCard({ car }) {
  const { locale } = useLocale()
  const navigation = useNavigation()
  const { addToRecentlyViewed } = useRecentlyViewed()
  const { isInWishlist, toggleWishlist, removeFromWishlist } = useWishlist()
  const [scale] = useState(new Animated.Value(1))
  const screenWidth = Dimensions.get("window").width
  const cardWidth = screenWidth * 0.85
  const [isDeleting, setIsDeleting] = useState(false)
  const [isRemoved, setIsRemoved] = useState(false)
  const containerOpacity = useRef(new Animated.Value(1)).current

  // Limit swipe to 30% of card width
  const maxSwipeDistance = cardWidth * 0.3
  const swipeThreshold = cardWidth * 0.1 // Lower threshold for easier activation
  const deleteThreshold = maxSwipeDistance * 0.8 // Threshold to trigger delete

  // Animation values
  const position = useRef(new Animated.Value(0)).current

  const inWishlist = isInWishlist(car.id)
  const getLang = (field) => (typeof field === "object" ? field?.[locale] : field)

  // Reset position when component mounts
  useEffect(() => {
    position.setValue(0)
  }, [])

  const handleDelete = () => {
    setIsDeleting(true)

    // Fade out the entire card container quickly
    Animated.parallel([
      // Animate the card off screen
      Animated.timing(position, {
        toValue: -screenWidth,
        duration: 200,
        useNativeDriver: true,
      }),
      // Fade out the entire container
      Animated.timing(containerOpacity, {
        toValue: 0,
        duration: 150, // Faster fade out
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Mark as removed and remove from wishlist after animation completes
      setIsRemoved(true)
      removeFromWishlist(car.id)
    })
  }

  const handleSave = () => {
    // Reset position after saving
    Animated.spring(position, {
      toValue: 0,
      friction: 5,
      useNativeDriver: true,
    }).start()
  }

  // Configure pan responder for swipe gestures
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      onPressIn()
    },
    onPanResponderMove: (_, gestureState) => {
      if (isDeleting) return // Don't allow movement if deleting

      // Limit the swipe distance to maxSwipeDistance
      const dx = gestureState.dx
      if (dx > 0) {
        // Right swipe (save)
        position.setValue(Math.min(dx, maxSwipeDistance))
      } else {
        // Left swipe (delete)
        position.setValue(Math.max(dx, -maxSwipeDistance))
      }
    },
    onPanResponderRelease: (_, gestureState) => {
      onPressOut()

      if (isDeleting) return // Don't process if already deleting

      // Swiped left (delete)
      if (gestureState.dx < -swipeThreshold) {
        // If swiped far enough, delete the card
        if (gestureState.dx < -deleteThreshold) {
          handleDelete()
        } else {
          // Otherwise, just hold at max left position
          Animated.spring(position, {
            toValue: -maxSwipeDistance,
            friction: 6,
            useNativeDriver: true,
          }).start()
        }
      }
      // Swiped right (save/check)
      else if (gestureState.dx > swipeThreshold) {
        // Hold at max right position
        Animated.spring(position, {
          toValue: maxSwipeDistance,
          friction: 6,
          useNativeDriver: true,
        }).start(() => {
          // After animation, reset position
          handleSave()
        })
      }
      // Not swiped far enough, reset position
      else {
        Animated.spring(position, {
          toValue: 0,
          friction: 5,
          useNativeDriver: true,
        }).start()
      }
    },
    onPanResponderTerminate: () => {
      onPressOut()
      if (!isDeleting) {
        Animated.spring(position, {
          toValue: 0,
          friction: 5,
          useNativeDriver: true,
        }).start()
      }
    },
  })

  const onPressIn = () => {
    Animated.spring(scale, {
      toValue: 1.02,
      useNativeDriver: true,
    }).start()
  }

  const onPressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
    }).start()
  }

  const goToGallery = () => {
    // Only navigate if not swiping
    if (Math.abs(position._value) < 5) {
      addToRecentlyViewed(car)
      navigation.navigate("Gallery", {
        car: {
          ...car,
          brand: car.brand,
          name: car.name,
          specs: car.specs,
          image: car.image,
          cashPrice: car.cashPrice,
          installmentPrice: car.installmentPrice,
          exteriorImages: car.exteriorImages || [car.image],
          interiorImages: car.interiorImages || [car.image],
          features: car.features || {},
          subtext: car.subtext,
        },
      })
    }
  }

  const handleWishlistToggle = (e) => {
    e.stopPropagation()
    toggleWishlist(car)
  }

  const rightActionOpacity = position.interpolate({
    inputRange: [-maxSwipeDistance, -swipeThreshold / 2, 0],
    outputRange: [1, 0.8, 0],
    extrapolate: "clamp",
  })

  const leftActionOpacity = position.interpolate({
    inputRange: [0, swipeThreshold / 2, maxSwipeDistance],
    outputRange: [0, 0.8, 1],
    extrapolate: "clamp",
  })

  // Background colors for card during swipe
  const cardBackgroundColor = position.interpolate({
    inputRange: [-maxSwipeDistance, 0, maxSwipeDistance],
    outputRange: ["rgba(255, 220, 220, 1)", "white", "rgba(220, 220, 255, 1)"],
    extrapolate: "clamp",
  })

  // If the card has been removed, don't render anything
  if (isRemoved) {
    return null
  }

  return (
    <Animated.View
      style={{
        width: "85%",
        alignSelf: "center",
        marginVertical: 4,
        opacity: containerOpacity,
      }}
    >
      {/* Background for right swipe (save/check) - Now on the right side */}
      <Animated.View
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          backgroundColor: "#46194F",
          borderRadius: 12,
          justifyContent: "center",
          alignItems: "flex-end",
          paddingRight: 20,
          opacity: leftActionOpacity,
          zIndex: 1,
        }}
      >
        <TouchableOpacity onPress={handleSave}>
          <Icon name="check-circle" size={30} color="#FFFFFF" />
        </TouchableOpacity>
      </Animated.View>

      {/* Background for left swipe (delete) - Now on the left side */}
      <Animated.View
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          backgroundColor: "#B30000",
          borderRadius: 12,
          justifyContent: "center",
          alignItems: "flex-start",
          paddingLeft: 20,
          opacity: rightActionOpacity,
          zIndex: 1,
        }}
      >
        <TouchableOpacity onPress={handleDelete}>
          <Icon name="trash-can" size={30} color="#FFFFFF" />
        </TouchableOpacity>
      </Animated.View>

      {/* Card content */}
      <Animated.View
        {...panResponder.panHandlers}
        style={{
          transform: [{ translateX: position }, { scale }],
          backgroundColor: cardBackgroundColor,
          borderWidth: 2,
          borderColor: "#46194F",
          borderRadius: 12,
          zIndex: 2,
        }}
      >
        <View style={{ paddingTop: 8, paddingHorizontal: 8, paddingBottom: 4 }} className="relative">
          {/* Top Icons */}
          <View className="absolute top-2 left-2 z-10">
            <CarIcon name="car" size={14} color="#46194F" />
          </View>
          <TouchableOpacity
            onPress={handleWishlistToggle}
            className="absolute top-2 right-2 z-10"
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Icon name={inWishlist ? "heart" : "heart-outline"} size={16} color="#46194F" />
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.95} onPress={goToGallery} style={{ marginTop: 10 }}>
            <View className="flex-row">
              {/* Left Content */}
              <View className="w-[52%] pr-2">
                <View className="flex-row justify-between items-center mb-0.5">
                  <View style={{ flex: 1 }}>
                    <Text
                      numberOfLines={1}
                      style={{
                        fontSize: 14,
                        color: "#46194F",
                        fontFamily: AlmaraiFonts.bold,
                      }}
                    >
                      {getLang(car.name)}
                    </Text>
                    <Text
                      numberOfLines={1}
                      style={{
                        fontSize: 6,
                        color: "#666",
                        fontFamily: AlmaraiFonts.regular,
                      }}
                    >
                      {getLang(car.subtext) || `${car.specs?.year || ""}`}
                    </Text>
                  </View>
                  <JetourLogo width={50} height={14} />
                </View>

                <View className="h-[1px] bg-[#46194F] my-1" />

                <View className="flex-row justify-between items-center">
                  <View className="flex-1">
                    <Text
                      numberOfLines={1}
                      style={{
                        fontSize: 8,
                        color: "#666",
                        fontFamily: AlmaraiFonts.regular,
                        marginBottom: 0.5,
                      }}
                    >
                      {locale === "ar" ? "سعر الكاش" : "Cash Price"}
                    </Text>
                    <View className="flex-row items-center justify-start">
                      <Text
                        style={{
                          fontSize: 12,
                          fontFamily: AlmaraiFonts.bold,
                          color: "#46194F",
                        }}
                      >
                        {car.cashPrice?.toLocaleString()}
                      </Text>
                      <View style={{ marginLeft: 2 }}>
                        <RiyalIcon width={12} height={12} />
                      </View>
                    </View>
                  </View>

                  <View className="w-px h-6 bg-[#46194F] mx-2" />

                  <View className="flex-1">
                    <Text
                      numberOfLines={1}
                      style={{
                        fontSize: 8,
                        color: "#666",
                        fontFamily: AlmaraiFonts.regular,
                        marginBottom: 0.5,
                      }}
                    >
                      {locale === "ar" ? "يبدأ القسط من" : "Installment From"}
                    </Text>
                    <View className="flex-row items-center justify-start">
                      <Text
                        style={{
                          fontSize: 11,
                          fontFamily: AlmaraiFonts.bold,
                          color: "#46194F",
                        }}
                      >
                        {car.installmentPrice?.toLocaleString()}
                      </Text>
                      <View style={{ marginLeft: 2 }}>
                        <RiyalIcon width={12} height={12} />
                      </View>
                    </View>
                  </View>
                </View>
              </View>

              {/* Right Image */}
              <View className="w-[48%] justify-center items-center" style={{ marginBottom: -4 }}>
                <Image source={car.image} style={{ width: 130, height: 85 }} resizeMode="contain" />
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </Animated.View>
  )
}
