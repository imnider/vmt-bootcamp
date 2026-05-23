export interface Cart {
  id: number;
  userId: number;
  total: number;
  discountedTotal: number;
  totalQuantity: number;
  totalProducts: number;
  products: CartProduct[];
}

export interface CartProduct {
  id: number;
  title: string;
  price: number;
  quantity: number;
  total: number;
  discountPercentage: number;
}
