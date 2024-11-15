import React from 'react';
import { useStore } from './store';
import { LoginForm } from './components/LoginForm';
import { AdminDashboard } from './components/AdminDashboard';
import { ShopkeeperDashboard } from './components/ShopkeeperDashboard';
import { Toaster } from 'react-hot-toast';

function App() {
  const user = useStore((state) => state.user);

  return (
    <>
      <Toaster position="top-right" />
      {!user ? (
        <LoginForm />
      ) : user.type === 'admin' ? (
        <AdminDashboard />
      ) : (
        <ShopkeeperDashboard />
      )}
    </>
  );
}

export default App;