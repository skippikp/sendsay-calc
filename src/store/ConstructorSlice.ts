import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DraggableItem } from '../types';

interface ConstructorState {
  constructorModeEnable: boolean;
  dropableSection: null;
  droppedItems: DraggableItem[];
}

const initialState: ConstructorState = {
  constructorModeEnable: true,
  droppedItems: [],
  dropableSection: null,
};

export const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    setConstructorMode: (state, action: PayloadAction<boolean>) => {
      state.constructorModeEnable = action.payload;
    },
    setDroppedItems: (state, action: PayloadAction<DraggableItem[]>) => {
      state.droppedItems = action.payload;
    },
    removeItem: (state, action: PayloadAction<number>) => {
      state.droppedItems = state.droppedItems.filter((item) => item.id !== action.payload);
    },
  },
});

export default constructorSlice.reducer;

export const { setConstructorMode, setDroppedItems, removeItem } = constructorSlice.actions;
