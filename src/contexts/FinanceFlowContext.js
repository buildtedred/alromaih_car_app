import React, { createContext, useContext, useReducer } from 'react';

const initialState = {
  flowType: null,
  step: null,
  selectedBrand: null,
  selectedModel: null,
  selectedCategory: null,
  selectedYear: null,
  selectedBank: null
};

function reducer(state, action) {
  switch (action.type) {
    case 'START_FLOW':
      return { ...initialState, flowType: action.payload, step: 'brand' };
    case 'NEXT_STEP':
      const steps = ['brand', 'model', 'category', 'year', 'bank', 'carDetail'];
      const nextIndex = steps.indexOf(state.step) + 1;
      return nextIndex < steps.length 
        ? { ...state, step: steps[nextIndex] } 
        : state;
    case 'PREV_STEP':
      const prevSteps = ['brand', 'model', 'category', 'year', 'bank', 'carDetail'];
      const prevIndex = prevSteps.indexOf(state.step) - 1;
      return prevIndex >= 0 
        ? { ...state, step: prevSteps[prevIndex] } 
        : state;
    case 'SET_BRAND':
      return { ...state, selectedBrand: action.payload };
    case 'SET_MODEL':
      return { ...state, selectedModel: action.payload };
    case 'SET_CATEGORY':
      return { ...state, selectedCategory: action.payload };
    case 'SET_YEAR':
      return { ...state, selectedYear: action.payload };
    case 'SET_BANK':
      return { ...state, selectedBank: action.payload };
    case 'CLOSE_FLOW':
      return initialState;
    default:
      return state;
  }
}

const FinanceFlowContext = createContext();

export function FinanceFlowProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = {
    ...state,
    startFlow: (type) => dispatch({ type: 'START_FLOW', payload: type }),
    nextStep: () => dispatch({ type: 'NEXT_STEP' }),
    prevStep: () => dispatch({ type: 'PREV_STEP' }),
    closeFlow: () => dispatch({ type: 'CLOSE_FLOW' }),
    setSelectedBrand: (brand) => dispatch({ type: 'SET_BRAND', payload: brand }),
    setSelectedModel: (model) => dispatch({ type: 'SET_MODEL', payload: model }),
    setSelectedCategory: (category) => dispatch({ type: 'SET_CATEGORY', payload: category }),
    setSelectedYear: (year) => dispatch({ type: 'SET_YEAR', payload: year }),
    setSelectedBank: (bank) => dispatch({ type: 'SET_BANK', payload: bank }),
  };

  return (
    <FinanceFlowContext.Provider value={value}>
      {children}
    </FinanceFlowContext.Provider>
  );
}

export const useFinanceFlow = () => useContext(FinanceFlowContext);