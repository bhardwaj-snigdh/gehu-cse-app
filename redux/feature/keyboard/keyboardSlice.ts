import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';

interface KeyboardState {
  isVisible: boolean;
}

const initialState: KeyboardState = {
  isVisible: false,
};

export const keyboardSlice = createSlice({
  name: 'keyboard',
  initialState,
  reducers: {
    setVisible: (state, action: PayloadAction<boolean>) => {
      state.isVisible = action.payload;
    },
  },
});

export const { setVisible } = keyboardSlice.actions;

export const selectKeyboardVisible = (state: RootState) => state.keyboard.isVisible;
export const selectKeyboardHidden = (state: RootState) => !state.keyboard.isVisible;

export default keyboardSlice.reducer;
