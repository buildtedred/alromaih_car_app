"use client"

import { createContext, useContext, useState } from "react"

const CompareContext = createContext(null)

export function CompareProvider({ children }) {
  const [carsToCompare, setCarsToCompare] = useState([])
  const [isCompareModalVisible, setIsCompareModalVisible] = useState(false)
  const [isCompareResultModalVisible, setIsCompareResultModalVisible] = useState(false)
  const [selectedCarForComparison, setSelectedCarForComparison] = useState(null)

  const addCarToCompare = (car) => {
    if (carsToCompare.length < 2) {
      // Create a simplified car object to avoid large payloads
      const simplifiedCar = {
        id: car.id,
        name: car.name,
        brand: car.brand,
        model: car.model,
        image: car.image,
        cashPrice: car.cashPrice,
        installmentPrice: car.installmentPrice,
        specs: car.specs || {},
      }

      const updatedCars = [...carsToCompare, simplifiedCar]
      setCarsToCompare(updatedCars)

      console.log("Car added to comparison:", simplifiedCar.name || simplifiedCar.id)
      console.log("Cars to compare count:", updatedCars.length)

      // If we now have 2 cars, show the result modal
      if (updatedCars.length === 2) {
        setIsCompareModalVisible(false)

        // Small delay to ensure modal transitions are smooth
        setTimeout(() => {
          setIsCompareResultModalVisible(true)
        }, 300)
      }
    }
  }

  const removeCarFromCompare = (carId) => {
    setCarsToCompare(carsToCompare.filter((car) => car.id !== carId))
  }

  const clearComparison = () => {
    setCarsToCompare([])
    setSelectedCarForComparison(null)
    setIsCompareModalVisible(false)
    setIsCompareResultModalVisible(false)
  }

  const openCompareModal = (car) => {
    // If this is the first car, start fresh
    if (carsToCompare.length === 0) {
      // Create a simplified car object
      const simplifiedCar = {
        id: car.id,
        name: car.name,
        brand: car.brand,
        model: car.model,
        image: car.image,
        cashPrice: car.cashPrice,
        installmentPrice: car.installmentPrice,
        specs: car.specs || {},
      }

      setCarsToCompare([simplifiedCar])
      console.log("First car set for comparison:", simplifiedCar.name || simplifiedCar.id)
    }

    setSelectedCarForComparison(car)
    setIsCompareModalVisible(true)
  }

  const closeCompareModal = () => {
    setIsCompareModalVisible(false)
  }

  const closeCompareResultModal = () => {
    setIsCompareResultModalVisible(false)
  }

  const proceedToCompare = (navigation) => {
    if (carsToCompare.length === 2) {
      try {
        // First close the modal
        closeCompareResultModal()

        // Then navigate with a slight delay
        setTimeout(() => {
          navigation.navigate("CompareDetails", { cars: carsToCompare })
        }, 300)
      } catch (error) {
        console.error("Navigation error:", error)
        // If navigation fails, clear the comparison
        clearComparison()
      }
    }
  }

  return (
    <CompareContext.Provider
      value={{
        carsToCompare,
        addCarToCompare,
        removeCarFromCompare,
        clearComparison,
        isCompareModalVisible,
        openCompareModal,
        closeCompareModal,
        selectedCarForComparison,
        isCompareResultModalVisible,
        closeCompareResultModal,
        proceedToCompare,
      }}
    >
      {children}
    </CompareContext.Provider>
  )
}

export function useCompare() {
  const context = useContext(CompareContext)
  if (!context) {
    throw new Error("useCompare must be used within a CompareProvider")
  }
  return context
}
