import React from 'react';
import { useFinanceFlow } from '../../contexts/FinanceFlowContext';
import BrandSelectionSheet from './BottomSheets/BrandSelectionSheet';
import ModelSelectionSheet from './BottomSheets/ModelSelectionSheet';
import CategorySelectionSheet from './BottomSheets/CategorySelectionSheet';
import YearSelectionSheet from './BottomSheets/YearSelectionSheet';
import BankSelectionSheet from './BottomSheets/BankSelectionSheet';
import CarDetailSheet from './BottomSheets/CarDetailSheet';

const FinanceFlowNavigator = () => {
  const {
    step,
    flowType,
    nextStep,
    prevStep,
    closeFlow,
    setSelectedBrand,
    setSelectedModel,
    setSelectedCategory,
    setSelectedYear,
    setSelectedBank,
  } = useFinanceFlow();

  if (!flowType) return null;

  return (
    <>
      {step === 'brand' && (
        <BrandSelectionSheet
          isVisible={step === 'brand'}
          onClose={closeFlow}
          onSelectBrand={(brand) => {
            setSelectedBrand(brand);
            setTimeout(nextStep, 10);
          }}
        />
      )}

      {step === 'model' && (
        <ModelSelectionSheet
          isVisible={step === 'model'}
          onClose={closeFlow}
          onBack={prevStep}
          onSelectModel={(model) => {
            setSelectedModel(model);
            setTimeout(nextStep, 10);
          }}
        />
      )}

      {step === 'category' && (
        <CategorySelectionSheet
          isVisible={step === 'category'}
          onClose={closeFlow}
          onBack={prevStep}
          onSelectCategory={(category) => {
            setSelectedCategory(category);
            setTimeout(nextStep, 10);
          }}
        />
      )}

      {step === 'year' && (
        <YearSelectionSheet
          isVisible={step === 'year'}
          onClose={closeFlow}
          onBack={prevStep}
          onSelectYear={(year) => {
            setSelectedYear(year);
            setTimeout(nextStep, 10);
          }}
        />
      )}

      {step === 'bank' && (
        <BankSelectionSheet
          isVisible={step === 'bank'}
          onClose={closeFlow}
          onBack={prevStep}
          onSelectBank={(bank) => {
            setSelectedBank(bank);
            setTimeout(nextStep, 10);
          }}
        />
      )}

      {step === 'carDetail' && (
        <CarDetailSheet
          isVisible={step === 'carDetail'}
          onClose={closeFlow}
          onBack={prevStep}
          onComplete={closeFlow}
        />
      )}
    </>
  );
};

export default FinanceFlowNavigator;