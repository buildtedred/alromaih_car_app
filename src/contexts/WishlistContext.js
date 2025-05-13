"use client"

import { createContext, useState, useContext, useEffect } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"

const WishlistContext = createContext()

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  // Load wishlist from storage on app start
  useEffect(() => {
    const loadWishlist = async () => {
      try {
        const storedWishlist = await AsyncStorage.getItem("wishlist")
        if (storedWishlist) {
          setWishlist(JSON.parse(storedWishlist))
        }
      } catch (error) {
        console.error("Error loading wishlist:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadWishlist()
  }, [])

  // Save wishlist to storage whenever it changes
  useEffect(() => {
    const saveWishlist = async () => {
      try {
        await AsyncStorage.setItem("wishlist", JSON.stringify(wishlist))
      } catch (error) {
        console.error("Error saving wishlist:", error)
      }
    }

    if (!isLoading) {
      saveWishlist()
    }
  }, [wishlist, isLoading])

  // Add car to wishlist
  const addToWishlist = (car) => {
    setWishlist((prevWishlist) => {
      // Check if car is already in wishlist
      if (prevWishlist.some((item) => item.id === car.id)) {
        return prevWishlist
      }
      return [...prevWishlist, car]
    })
  }

  // Remove car from wishlist
  const removeFromWishlist = (carId) => {
    setWishlist((prevWishlist) => prevWishlist.filter((car) => car.id !== carId))
  }

  // Check if car is in wishlist
  const isInWishlist = (carId) => {
    return wishlist.some((car) => car.id === carId)
  }

  // Toggle car in wishlist
  const toggleWishlist = (car) => {
    if (isInWishlist(car.id)) {
      removeFromWishlist(car.id)
    } else {
      addToWishlist(car)
    }
  }

  // Mark car as saved/checked
  const markCarAsSaved = (carId) => {
    // This function could be used to mark a car as saved/checked
    // For now, it's just a placeholder
    console.log(`Car ${carId} marked as saved`)
  }

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        toggleWishlist,
        markCarAsSaved,
      }}
    >
      {children}
    </WishlistContext.Provider>
  )
}

export const useWishlist = () => useContext(WishlistContext)
