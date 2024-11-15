export interface Product {
  id: string;
  name: string;
  price: number;
}

export interface Order {
  id: string;
  shopkeeperName: string;
  products: {
    productId: string;
    quantity: number;
  }[];
  timestamp: number;
}

export interface User {
  type: 'admin' | 'shopkeeper';
  name: string;
}