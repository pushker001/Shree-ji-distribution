import React, { useState } from 'react';
import { useStore } from '../store';
import { Package2 } from 'lucide-react';
import toast from 'react-hot-toast';

export function LoginForm() {
  const [isAdmin, setIsAdmin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [shopkeeperName, setShopkeeperName] = useState('');
  const { login, loginAsShopkeeper } = useStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isAdmin) {
      if (login(username, password)) {
        toast.success('Welcome back, Admin!');
      } else {
        toast.error('Invalid credentials');
      }
    } else {
      if (shopkeeperName.trim()) {
        loginAsShopkeeper(shopkeeperName);
        toast.success(`Welcome, ${shopkeeperName}!`);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="flex items-center justify-center mb-8">
          <Package2 className="w-12 h-12 text-indigo-600" />
        </div>
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Shree ji Wholesale
        </h2>
        
        <div className="flex gap-4 mb-8">
          <button
            className={`flex-1 py-2 rounded-lg ${
              isAdmin
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-600'
            }`}
            onClick={() => setIsAdmin(true)}
          >
            Admin
          </button>
          <button
            className={`flex-1 py-2 rounded-lg ${
              !isAdmin
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-600'
            }`}
            onClick={() => setIsAdmin(false)}
          >
            Shopkeeper
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {isAdmin ? (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  required
                />
              </div>
            </>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Name
              </label>
              <input
                type="text"
                value={shopkeeperName}
                onChange={(e) => setShopkeeperName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                required
              />
            </div>
          )}
          
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            {isAdmin ? 'Login' : 'Continue'}
          </button>
        </form>
      </div>
    </div>
  );
}