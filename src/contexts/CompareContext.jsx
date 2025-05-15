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

      if (updatedCars.length === 2) {
        setIsCompareModalVisible(false)
        setTimeout(() => {
          setIsCompareResultModalVisible(true)
        }, 300)
      }
    }
  }

  const clearComparison = () => {
    setCarsToCompare([])
    setSelectedCarForComparison(null)
    setIsCompareModalVisible(false)
    setIsCompareResultModalVisible(false)
  }

  const openCompareModal = (car) => {
    setCarsToCompare([])
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
    setSelectedCarForComparison(car)
    setIsCompareModalVisible(true)
  }

  const closeCompareModal = () => {
    setIsCompareModalVisible(false)
  }

  const closeCompareResultModal = () => {
    setIsCompareResultModalVisible(false)
  }

  return (
    <CompareContext.Provider
      value={{
        carsToCompare,
        addCarToCompare,
        clearComparison,
        isCompareModalVisible,
        openCompareModal,
        closeCompareModal,
        selectedCarForComparison,
        isCompareResultModalVisible,
        closeCompareResultModal,
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