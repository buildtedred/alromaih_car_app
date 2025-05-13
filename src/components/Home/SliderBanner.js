"use client"
import { useEffect, useRef, useState, useMemo } from "react"
import { View, FlatList, Image, Dimensions, ActivityIndicator, Text } from "react-native"

export default function SliderBanner({ sizeClass: propSizeClass }) {
  const [slides, setSlides] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [screenWidth, setScreenWidth] = useState(Dimensions.get("window").width)
  const flatListRef = useRef(null)
  const intervalRef = useRef(null)

  // Listen for dimension changes
  useEffect(() => {
    const dimensionsHandler = ({ window }) => {
      setScreenWidth(window.width)
    }

    const subscription = Dimensions.addEventListener("change", dimensionsHandler)

    return () => subscription.remove()
  }, [])

  // Determine size class based on screen width if not provided by parent
  const sizeClass = useMemo(() => {
    if (propSizeClass) return propSizeClass
    if (screenWidth < 360) return "small"
    if (screenWidth < 480) return "medium"
    return "large"
  }, [screenWidth, propSizeClass])

  // Get responsive values based on size class
  const sizes = useMemo(() => {
    switch (sizeClass) {
      case "small":
        return {
          height: 140, // Reduced height
          borderRadius: 8,
          paddingHorizontal: 8,
          marginTop: 2,
          marginBottom: 1,
          loaderSize: "small",
        }
      case "medium":
        return {
          height: 150, // Reduced height
          borderRadius: 10,
          paddingHorizontal: 10,
          marginTop: 3,
          marginBottom: 1.5,
          loaderSize: "large",
        }
      default: // large
        return {
          height: 160, // Reduced height
          borderRadius: 12,
          paddingHorizontal: 12,
          marginTop: 4,
          marginBottom: 2,
          loaderSize: "large",
        }
    }
  }, [sizeClass])

  useEffect(() => {
    fetch("https://67c7bf7cc19eb8753e7a9248.mockapi.io/api/alromaihCarousel")
      .then((res) => res.json())
      .then((data) => {
        setSlides(data)
        setLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching slides:", error)
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    if (slides.length > 1) {
      intervalRef.current = setInterval(() => {
        const nextIndex = (currentIndex + 1) % slides.length
        flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true })
        setCurrentIndex(nextIndex)
      }, 3000) // change every 3 seconds

      return () => clearInterval(intervalRef.current)
    }
  }, [currentIndex, slides])

  // Pagination dots
  const renderPaginationDots = () => {
    return (
      <View className="flex-row justify-center items-center absolute bottom-2 left-0 right-0">
        {slides.map((_, index) => (
          <View
            key={index}
            className={`mx-1 rounded-full ${
              index === currentIndex ? "bg-[#46194F] w-2 h-2" : "bg-gray-300 w-1.5 h-1.5"
            }`}
          />
        ))}
      </View>
    )
  }

  if (loading) {
    return (
      <View
        className="justify-center items-center"
        style={{
          height: sizes.height,
          marginTop: sizes.marginTop,
          marginBottom: sizes.marginBottom,
        }}
      >
        <ActivityIndicator size={sizes.loaderSize} color="#46194F" />
      </View>
    )
  }

  if (!slides.length) {
    return (
      <View
        className="justify-center items-center"
        style={{
          height: sizes.height,
          marginTop: sizes.marginTop,
          marginBottom: sizes.marginBottom,
        }}
      >
        <Text className="text-gray-500">No slides available</Text>
      </View>
    )
  }

  return (
    <View
      style={{
        marginTop: sizes.marginTop,
        marginBottom: sizes.marginBottom,
      }}
    >
      <FlatList
        ref={flatListRef}
        data={slides}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        onMomentumScrollEnd={(event) => {
          const index = Math.round(event.nativeEvent.contentOffset.x / screenWidth)
          setCurrentIndex(index)
        }}
        renderItem={({ item }) => (
          <View
            className="relative"
            style={{
              width: screenWidth,
              paddingHorizontal: sizes.paddingHorizontal,
            }}
          >
            <Image
              source={{ uri: item.avatar }}
              resizeMode="cover"
              className="w-full bg-gray-200"
              style={{
                height: sizes.height,
                borderRadius: sizes.borderRadius,
              }}
              onError={() => console.warn("Image failed to load:", item.avatar)}
            />
          </View>
        )}
      />
      {renderPaginationDots()}
    </View>
  )
}
