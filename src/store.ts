import { create } from 'zustand';
import { storage, type Product, type Order } from './lib/storage';

interface User {
  type: 'admin' | 'shopkeeper';
  name: string;
}

interface StoreState {
  user: User | null;
  products: Product[];
  orders: Order[];
  login: (username: string, password: string) => boolean;
  loginAsShopkeeper: (name: string) => void;
  logout: () => void;
  loadProducts: () => void;
  loadOrders: () => void;
  addProduct: (name: string, price: number) => void;
  createOrder: (shopkeeperName: string, products: { productId: string; quantity: number }[]) => void;
}

export const useStore = create<StoreState>((set) => ({
  user: null,
  products: [],
  orders: [],

  login: (username, password) => {
    if (username === "udayguru" && password === "radharani") {
      set({ user: { type: 'admin', name: 'Admin' } });
      return true;
    }
    return false;
  },

  loginAsShopkeeper: (name) => {
    set({ user: { type: 'shopkeeper', name } });
  },

  logout: () => {
    set({ user: null });
  },

  loadProducts: () => {
    const products = storage.getAllProducts();
    set({ products });
  },

  loadOrders: () => {
    const orders = storage.getAllOrders();
    set({ orders });
  },

  addProduct: (name, price) => {
    const product = storage.addProduct(name, price);
    set(state => ({
      products: [product, ...state.products],
    }));
  },

  createOrder: (shopkeeperName, products) => {
    const order = storage.createOrder(shopkeeperName, products);
    set(state => ({
      orders: [order, ...state.orders],
    }));
  },
}));