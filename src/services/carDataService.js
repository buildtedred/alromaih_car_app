import carsData, { getBrands, getModelsByBrand, getBodyTypes, filterCarsByBrand } from "../mock-data"

// Service to handle all car data operations
export const carDataService = {
  // Get all brands with their logos
  getBrands: (locale = "en") => {
    return getBrands(locale)
  },

  // Get models for a specific brand
  getModelsByBrand: (brandKey, locale = "en") => {
    return getModelsByBrand(brandKey, locale)
  },

  // Get all body types (categories)
  getBodyTypes: (locale = "en") => {
    return getBodyTypes(locale)
  },

  // Get all years from the available cars
  getYears: () => {
    // Extract unique years from cars data
    const yearsSet = new Set(carsData.map((car) => car.specs.year))
    return Array.from(yearsSet).sort((a, b) => b - a) // Sort in descending order
  },

  // Get price ranges
  getPriceRanges: (locale = "en") => {
    return [
      { id: 1, min: 0, max: 100000, label: locale === "ar" ? "أقل من 100,000" : "Less than 100,000" },
      { id: 2, min: 100000, max: 150000, label: "100,000 - 150,000" },
      { id: 3, min: 150000, max: 200000, label: "150,000 - 200,000" },
      {
        id: 4,
        min: 200000,
        max: Number.POSITIVE_INFINITY,
        label: locale === "ar" ? "أكثر من 200,000" : "More than 200,000",
      },
    ]
  },

  // Filter cars based on selected criteria
  filterCars: (criteria) => {
    let filteredCars = [...carsData]

    if (criteria.brand) {
      filteredCars = filterCarsByBrand(criteria.brand)
    }

    if (criteria.model) {
      filteredCars = filteredCars.filter((car) => car.model === criteria.model)
    }

    if (criteria.bodyType) {
      filteredCars = filteredCars.filter((car) => car.bodyType === criteria.bodyType)
    }

    if (criteria.year) {
      filteredCars = filteredCars.filter((car) => car.specs.year === criteria.year)
    }

    if (criteria.priceRange) {
      filteredCars = filteredCars.filter(
        (car) => car.cashPrice >= criteria.priceRange.min && car.cashPrice <= criteria.priceRange.max,
      )
    }

    return filteredCars
  },

  // Get a car by ID
  getCarById: (id) => {
    return carsData.find((car) => car.id === id)
  },
}
