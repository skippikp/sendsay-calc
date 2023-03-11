import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import calcSlice from './CalcSlice';
import constructorSlice from './ConstructorSlice';

export const store = configureStore({
  reducer: {
    calculator: calcSlice,
    constructorReducer: constructorSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch;