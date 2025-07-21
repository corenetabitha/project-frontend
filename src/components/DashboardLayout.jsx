// src/layouts/DashboardLayout.jsx
import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const DashboardLayout = () => {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-6 space-y-4">
        <h1 className="text-2xl font-bold mb-6">Booked</h1>
        <h2 className="text-sm text-gray-400 mb-6">Classic Bookstore</h2>
        <nav className="space-y-2">
          <Link to="/books" className="block hover:text-yellow-400">Store</Link>
          <Link to="/library" className="block hover:text-yellow-400">Library</Link>
          <Link to="/cart" className="block hover:text-yellow-400">Cart</Link>
          <Link to="/admin" className="block hover:text-yellow-400">Admin</Link>
        </nav>
      </aside>


      <main className="flex-1 p-8 bg-gray-50">
        <Outlet /> 
      </main>
    </div>
  );
};

export default DashboardLayout;
