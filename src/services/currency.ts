import type { CartItem } from '../types/productTypes';

export const usdFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

export const calculateTotal = (items: Pick<CartItem, 'price' | 'quantity'>[]) =>
  items.reduce((total, item) => total + Math.round(item.price * 100) * item.quantity, 0) / 100;
