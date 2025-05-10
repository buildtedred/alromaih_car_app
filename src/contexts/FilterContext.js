import { createContext, useState, useContext } from "react";

const FilterContext = createContext();

export function FilterProvider({ children }) {
  const [filters, setFilters] = useState({});
  const [filteredCars, setFilteredCars] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);

  const clearFilters = () => {
    setFilters({});
    setFilteredCars([]);
    setIsFiltered(false);
  };

  return (
    <FilterContext.Provider
      value={{
        filters,
        setFilters,
        filteredCars,
        setFilteredCars,
        isFiltered,
        setIsFiltered,
        clearFilters, // Optional utility
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export function useFilters() {
  return useContext(FilterContext);
}
