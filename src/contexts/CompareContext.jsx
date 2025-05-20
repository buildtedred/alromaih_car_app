"use client"
import { createContext, useState, useContext, useCallback } from "react"

// Create the context
const CompareContext = createContext()

// Provider component
export const CompareProvider = ({ children }) => {
  const [isCompareModalVisible, setCompareModalVisible] = useState(false)
  const [isResultModalVisible, setResultModalVisible] = useState(false)
  const [selectedCarForComparison, setSelectedCarForComparison] = useState(null)
  const [carsToCompare, setCarsToCompare] = useState([])
  const [isSelectingSecondCar, setIsSelectingSecondCar] = useState(false)

  // Open the compare modal with a selected car
  const openCompareModal = useCallback((car) => {
    setSelectedCarForComparison(car)
    setCompareModalVisible(true)
  }, [])

  // Close the compare modal
  const closeCompareModal = useCallback(() => {
    setCompareModalVisible(false)
  }, [])

  // Close the result modal
  const closeResultModal = useCallback(() => {
    setResultModalVisible(false)
    // Clear the selected cars when closing the result modal
    setCarsToCompare([])
    setIsSelectingSecondCar(false)
  }, [])

  // Start selecting the second car directly on the current screen
  const startSelectingSecondCar = useCallback((car) => {
    // Add the first car to compare
    setCarsToCompare([car])
    // Close the modal
    setCompareModalVisible(false)
    // Set the flag to indicate we're selecting the second car
    setIsSelectingSecondCar(true)
  }, [])

  // Add a car to the comparison list
  const addCarToCompare = useCallback(
    (car) => {
      // If we already have this car, don't add it again
      if (carsToCompare.some((c) => c.id === car.id)) {
        return
      }

      // If we're selecting the second car
      if (isSelectingSecondCar) {
        // Add it as the second car
        setCarsToCompare((prev) => [...prev, car])
        // Show the result modal
        setResultModalVisible(true)
        // Exit selection mode
        setIsSelectingSecondCar(false)
      } else {
        // If we already have 2 cars, replace the second one
        if (carsToCompare.length >= 2) {
          setCarsToCompare([carsToCompare[0], car])
        } else {
          setCarsToCompare((prev) => [...prev, car])
        }

        // If this is the second car, show the result modal
        if (carsToCompare.length === 1) {
          setResultModalVisible(true)
        }
      }

      // Close the compare modal
      setCompareModalVisible(false)
    },
    [carsToCompare, isSelectingSecondCar],
  )

  // Cancel selecting the second car
  const cancelSelectingSecondCar = useCallback(() => {
    setIsSelectingSecondCar(false)
    setCarsToCompare([])
  }, [])

  // Clear all cars from comparison
  const clearComparison = useCallback(() => {
    setCarsToCompare([])
    setResultModalVisible(false)
    setIsSelectingSecondCar(false)
  }, [])

  // The context value
  const value = {
    isCompareModalVisible,
    selectedCarForComparison,
    carsToCompare,
    isResultModalVisible,
    isSelectingSecondCar,
    openCompareModal,
    closeCompareModal,
    startSelectingSecondCar,
    addCarToCompare,
    cancelSelectingSecondCar,
    clearComparison,
    closeResultModal,
  }

  return <CompareContext.Provider value={value}>{children}</CompareContext.Provider>
}

// Custom hook to use the compare context
export const useCompare = () => {
  const context = useContext(CompareContext)
  if (!context) {
    throw new Error("useCompare must be used within a CompareProvider")
  }
  return context
}
