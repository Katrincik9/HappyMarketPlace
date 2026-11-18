export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};

export type CartItem = Pick<Product, 'id' | 'title' | 'category' | 'image' | 'price'> & {
  quantity: number;
};
