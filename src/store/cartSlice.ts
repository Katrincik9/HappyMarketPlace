import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CartItem, Product } from '../types/productTypes';

const initialState: CartItem[] = [];

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, { payload: product }: PayloadAction<Product>) {
      const item = state.find(({ id }) => id === product.id);
      if (item) {
        item.quantity += 1;
      } else {
        state.push({
          id: product.id,
          title: product.title,
          category: product.category,
          image: product.image,
          price: product.price,
          quantity: 1,
        });
      }
    },

    increaseQuantity(state, { payload: id }: PayloadAction<number>) {
      const item = state.find((item) => item.id === id);
      if (item) {
        item.quantity += 1;
      }
    },

    decreaseQuantity(state, { payload: id }: PayloadAction<number>) {
      const item = state.find((item) => item.id === id);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else {
        return state.filter((item) => item.id !== id);
      }
    },
    
    removeItem(state, { payload: id }: PayloadAction<number>) {
      return state.filter((item) => item.id !== id);
    },
  },
});

export const { addItem, increaseQuantity, decreaseQuantity, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
