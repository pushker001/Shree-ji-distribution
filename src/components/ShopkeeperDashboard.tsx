import React, { useState, useEffect } from 'react';
import { useStore } from '../store';
import { Package, LogOut, ShoppingCart } from 'lucide-react';
import toast from 'react-hot-toast';

export function ShopkeeperDashboard() {
  const { user, logout, products, createOrder, loadProducts } = useStore();
  const [cart, setCart] = useState<{ productId: string; quantity: number }[]>([]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const addToCart = (productId: string) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.productId === productId);
      if (existing) {
        return prev.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { productId, quantity: 1 }];
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) {
      setCart((prev) => prev.filter((item) => item.productId !== productId));
    } else {
      setCart((prev) =>
        prev.map((item) =>
          item.productId === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  const placeOrder = async () => {
    if (cart.length === 0) return;
    try {
      await createOrder(user?.name || '', cart);
      setCart([]);
      toast.success('Order placed successfully!');
    } catch (error) {
      toast.error('Failed to place order');
    }
  };

  const getTotal = () => {
    return cart.reduce((total, item) => {
      const product = products.find((p) => p.id === item.productId);
      return total + (product?.price || 0) * item.quantity;
    }, 0);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Package className="w-8 h-8 text-indigo-600" />
              <span className="ml-2 text-xl font-semibold">
                Welcome, {user?.name}
              </span>
            </div>
            <button
              onClick={logout}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <LogOut className="w-5 h-5 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-semibold mb-6">Available Products</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="p-4 border border-gray-200 rounded-lg hover:border-indigo-500 transition-colors"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">{product.name}</span>
                      <span className="text-indigo-600 font-semibold">
                        ₹{product.price.toFixed(2)}
                      </span>
                    </div>
                    <button
                      onClick={() => addToCart(product.id)}
                      className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                      Add to Cart
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold">Your Cart</h2>
              <ShoppingCart className="w-6 h-6 text-indigo-600" />
            </div>
            <div className="space-y-4">
              {cart.map((item) => {
                const product = products.find((p) => p.id === item.productId);
                return (
                  <div
                    key={item.productId}
                    className="flex justify-between items-center p-4 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <p className="font-medium">{product?.name}</p>
                      <p className="text-sm text-gray-500">
                        ₹{product?.price.toFixed(2)} × {item.quantity}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.productId, item.quantity - 1)
                        }
                        className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full"
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(item.productId, item.quantity + 1)
                        }
                        className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full"
                      >
                        +
                      </button>
                    </div>
                  </div>
                );
              })}
              {cart.length === 0 && (
                <p className="text-gray-500 text-center">Your cart is empty</p>
              )}
              {cart.length > 0 && (
                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-medium">Total:</span>
                    <span className="text-xl font-bold text-indigo-600">
                      ₹{getTotal().toFixed(2)}
                    </span>
                  </div>
                  <button
                    onClick={placeOrder}
                    className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    Place Order
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}