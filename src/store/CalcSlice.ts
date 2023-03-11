import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { evaluate, INFINITE_VALUE, MAX_NUMBERS_LENGTH, roundBigNumber } from '../utils/claculation';
import { Operations } from '../types';

export interface CalcState {
  visibleValue: string;
  currentOperand: string;
  previousOperand: string;
  operation: Operations | null;
  evaluated: boolean;
}

const initialState: CalcState = {
  visibleValue: '0',
  currentOperand: '',
  previousOperand: '',
  operation: null,
  evaluated: false,
};

export const calcSlice = createSlice({
  name: 'calculator',
  initialState,
  reducers: {
    addDigit: (state, action: PayloadAction<string>) => {
      if (state.evaluated) {
        state.currentOperand = '';
        state.previousOperand = '';
        state.evaluated = false;
        state.operation = null;
      }

      if (state.currentOperand.length > MAX_NUMBERS_LENGTH) {
        state.currentOperand = roundBigNumber(state.currentOperand);
        state.visibleValue = state.currentOperand;
        return;
      }

      if (state.currentOperand === '0' && action.payload !== ',') {
        state.currentOperand = action.payload;
        state.visibleValue = state.currentOperand;
        return;
      }

      if (state.currentOperand === INFINITE_VALUE || state.previousOperand === INFINITE_VALUE) {
        state.currentOperand = action.payload;
        state.visibleValue = state.currentOperand;
        state.previousOperand = '';
        return;
      }

      if (action.payload === ',') {
        if (state.currentOperand.includes(',')) {
          return;
        }
        if (state.operation && state.currentOperand !== '') {
          state.currentOperand += action.payload;
          state.visibleValue = state.currentOperand;
          return;
        }
        if (state.currentOperand === '') {
          state.currentOperand = '0,';
          state.visibleValue = state.currentOperand;
          return;
        }
      }

      state.currentOperand += action.payload;
      state.visibleValue = state.currentOperand;
    },
    chooseOperation: (state, action: PayloadAction<Operations>) => {
      if (state.currentOperand === INFINITE_VALUE) {
        state.previousOperand = '';
        state.currentOperand = '0';
        state.visibleValue = state.currentOperand;
        state.evaluated = false;
        state.operation = action.payload;
        return;
      }
      if (state.evaluated) {
        state.previousOperand = state.currentOperand;
        state.currentOperand = '';
        state.visibleValue = state.previousOperand;
        state.evaluated = false;
        state.operation = action.payload;
        return;
      }
      if (state.currentOperand === '' && state.previousOperand) {
        state.operation = action.payload;
        return;
      }

      if (state.currentOperand && state.previousOperand) {
        state.previousOperand = evaluate(state);
        state.currentOperand = '';
        state.visibleValue = state.previousOperand;
        state.operation = action.payload;
        return;
      }

      if (state.currentOperand && state.previousOperand === '') {
        state.previousOperand = state.currentOperand;
        state.currentOperand = '';
        state.visibleValue = state.previousOperand;
        state.operation = action.payload;
        return;
      }
    },
    calculate: (state) => {
      if (
        state.operation === null ||
        state.currentOperand === '' ||
        state.previousOperand === '' ||
        state.currentOperand === INFINITE_VALUE
      ) {
        return;
      }
      state.evaluated = true;
      state.currentOperand = evaluate(state);
      state.previousOperand = state.currentOperand;
      state.visibleValue = state.previousOperand;
    },
    resetCalc: (state) => {
      state.currentOperand = '';
      state.previousOperand = '';
      state.operation = null;
      state.visibleValue = '0';
      state.evaluated = false;
    },
  },
});

export default calcSlice.reducer;

export const { addDigit, chooseOperation, calculate, resetCalc } = calcSlice.actions;
