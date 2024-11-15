import React, { useState, useEffect } from 'react';
import { useStore } from '../store';
import { Package, LogOut, PlusCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export function AdminDashboard() {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const { logout, addProduct, products, orders, loadProducts, loadOrders } = useStore();

  useEffect(() => {
    loadProducts();
    loadOrders();
  }, [loadProducts, loadOrders]);

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (productName && productPrice) {
      try {
        await addProduct(productName, parseFloat(productPrice));
        setProductName('');
        setProductPrice('');
        toast.success('Product added successfully!');
      } catch (error) {
        toast.error('Failed to add product');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Package className="w-8 h-8 text-indigo-600" />
              <span className="ml-2 text-xl font-semibold">Shree ji Admin</span>
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-semibold mb-6">Add New Product</h2>
            <form onSubmit={handleAddProduct} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Name
                </label>
                <input
                  type="text"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price (₹)
                </label>
                <input
                  type="number"
                  value={productPrice}
                  onChange={(e) => setProductPrice(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  required
                  min="0"
                  step="0.01"
                />
              </div>
              <button
                type="submit"
                className="w-full flex items-center justify-center bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <PlusCircle className="w-5 h-5 mr-2" />
                Add Product
              </button>
            </form>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-semibold mb-6">Product List</h2>
            <div className="space-y-4">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="flex justify-between items-center p-4 bg-gray-50 rounded-lg"
                >
                  <span className="font-medium">{product.name}</span>
                  <span className="text-indigo-600 font-semibold">
                    ₹{product.price.toFixed(2)}
                  </span>
                </div>
              ))}
              {products.length === 0 && (
                <p className="text-gray-500 text-center">No products added yet</p>
              )}
            </div>
          </div>

          <div className="md:col-span-2 bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-semibold mb-6">Recent Orders</h2>
            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="p-4 bg-gray-50 rounded-lg space-y-2"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{order.shopkeeperName}</span>
                    <span className="text-sm text-gray-500">
                      {new Date(order.timestamp).toLocaleString()}
                    </span>
                  </div>
                  <div className="space-y-1">
                    {order.products.map((item) => {
                      const product = products.find((p) => p.id === item.productId);
                      return (
                        <div
                          key={item.productId}
                          className="flex justify-between text-sm"
                        >
                          <span>{product?.name} × {item.quantity}</span>
                          <span>₹{((product?.price || 0) * item.quantity).toFixed(2)}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
              {orders.length === 0 && (
                <p className="text-gray-500 text-center">No orders yet</p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}