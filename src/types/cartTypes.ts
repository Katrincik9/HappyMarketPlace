import type { Product } from './productTypes';

export type CartItem = Pick<Product, 'id' | 'title' | 'category' | 'image'> & {
  unitPriceCents: number;
  quantity: number;
};
