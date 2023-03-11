import React from 'react';
import { Display, Numpad, Operations, EqualButton } from '../components';
import { addDigit, calculate, chooseOperation } from '../store/CalcSlice';
import { CalcBlocksNames, DraggableItem, Operations as OperationsEnum } from '../types';
import { useAppDispatch, useAppSelector } from '../store';

export const useCalcItemsRender = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state);
  const { visibleValue } = state.calculator;
  const { constructorModeEnable } = state.constructorReducer;

  const handleAddDigit = (value: string) => {
    if (constructorModeEnable) {
      return;
    }
    dispatch(addDigit(value));
  };

  const handleChooseOperation = (value: OperationsEnum) => {
    if (constructorModeEnable) {
      return;
    }
    dispatch(chooseOperation(value));
  };

  const handleCalculate = () => {
    if (constructorModeEnable) {
      return;
    }
    dispatch(calculate());
  };

  const renderElement = (element: DraggableItem) => {
    switch (element.name) {
      case CalcBlocksNames.DISPLAY:
        return <Display value={visibleValue} />;
      case CalcBlocksNames.OPERATIONS:
        return <Operations disabled={constructorModeEnable} onClick={handleChooseOperation} />;
      case CalcBlocksNames.NUMPAD:
        return <Numpad disabled={constructorModeEnable} onClick={handleAddDigit} />;
      case CalcBlocksNames.EQUAL_BUTTON:
        return <EqualButton disabled={constructorModeEnable} onClick={handleCalculate} />;
      default:
        return null;
    }
  };

  return { renderElement };
};

export default useCalcItemsRender;
