import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { DEFAULT_PRODUCT_LIMIT, isValidProductLimit } from '../constants/productLimit.ts';

const initialState: number = DEFAULT_PRODUCT_LIMIT;

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setProductLimit(_state, { payload: limit }: PayloadAction<number>) {
      if (!isValidProductLimit(limit)) {
        throw new RangeError('The product limit must be a whole number from 10 to 20.');
      }
      return limit;
    },
  },
});

export const { setProductLimit } = settingsSlice.actions;
export default settingsSlice.reducer;
