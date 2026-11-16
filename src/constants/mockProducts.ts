import backpackImage from '../assets/sample-backpack.svg';
import headphonesImage from '../assets/sample-headphones.svg';
import sweaterImage from '../assets/sample-sweater.svg';
import mugImage from '../assets/sample-mug.svg';
import type { Product } from '../types/productTypes';

export const mockProducts: Product[] = [
  {
    id: 1,
    title: 'Everyday backpack',
    price: 39.99,
    description: 'A lightweight backpack with a roomy main compartment and a handy front pocket for everyday essentials.',
    category: 'bags',
    image: backpackImage,
    rating: { rate: 3.5, count: 120 },
  },
  {
    id: 2,
    title: 'Wireless over-ear headphones',
    price: 64.99,
    description: 'Comfortable cushioned headphones with wireless listening and a foldable design for easy storage.',
    category: 'electronics',
    image: headphonesImage,
    rating: { rate: 4.7, count: 86 },
  },
  {
    id: 3,
    title: 'Soft knit sweater',
    price: 45,
    description: 'A relaxed-fit crewneck sweater with ribbed cuffs and a soft knit finish for cooler days.',
    category: 'clothing',
    image: sweaterImage,
    rating: { rate: 3.4, count: 52 },
  },
  {
    id: 4,
    title: 'Ceramic everyday mug',
    price: 12.5,
    description: 'A sturdy ceramic mug with a comfortable handle, ready for your morning coffee or evening tea.',
    category: 'home',
    image: mugImage,
    rating: { rate: 4.5, count: 34 },
  },
];
