import React, { createContext, useContext, useState } from 'react';

const RecentlyViewedContext = createContext();

export const RecentlyViewedProvider = ({ children }) => {
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  const addToRecentlyViewed = (car) => {
    setRecentlyViewed((prev) => {
      const exists = prev.find((c) => c.id === car.id);
      if (exists) return prev;

      return [car, ...prev].slice(0, 10); // Max 10 recent cars
    });
  };

  return (
    <RecentlyViewedContext.Provider value={{ recentlyViewed, addToRecentlyViewed }}>
      {children}
    </RecentlyViewedContext.Provider>
  );
};

export const useRecentlyViewed = () => useContext(RecentlyViewedContext);
