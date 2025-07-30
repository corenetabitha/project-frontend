import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/auth/authSlice'; 

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-800 text-white p-4 flex justify-between items-center md:hidden">
        <h1 className="text-xl text-orange-500 font-bold">Booked</h1>
        <button onClick={toggleSidebar}>
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      <div className="flex flex-1">
        <aside
          className={`w-48 bg-gray-800 text-white p-6 space-y-4 transition-all duration-300 ease-in-out
            ${sidebarOpen ? 'block fixed inset-y-0 left-0 z-40' : 'hidden'}
            md:block md:relative md:translate-x-0`}
        >
          <div className="flex justify-end md:hidden">
            <button onClick={toggleSidebar} className="text-white">
              <X className="w-6 h-6" />
            </button>
          </div>

          <h1 className="text-2xl text-orange-600 font-bold mb-6 hidden md:block">Booked</h1>
          <h2 className="text-sm text-gray-400 mb-6 hidden md:block">Classic Bookstore</h2>
          <nav className="space-y-2">
            <Link to="/" className="block font-bold hover:text-yellow-400" onClick={toggleSidebar}>
              Home
            </Link>
            <Link to="/library" className="block font-bold  hover:text-yellow-400" onClick={toggleSidebar}>
              Library
            </Link>
            <Link to="/cart" className="block font-bold hover:text-yellow-400" onClick={toggleSidebar}>
              Cart
            </Link>

            {isAuthenticated && user?.role === 'admin' && (
              <Link to="/admin" className="block font-bold hover:text-yellow-400" onClick={toggleSidebar}>
                Admin
              </Link>
            )}

            {isAuthenticated ? (
              <button
                onClick={() => { handleLogout(); toggleSidebar(); }}
                className="block font-bold text-left w-full hover:text-yellow-400 mt-4"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="block font-bold hover:text-yellow-400 mt-4"
                onClick={toggleSidebar}
              >
                Sign In
              </Link>
            )}
          </nav>
        </aside>

        <main className="flex-1 p-8 bg-gray-50">
          <Outlet />
        </main>
      </div>

      <footer className="bg-gray-800 text-white text-center py-4">
        <p>Booked Bookstore. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default DashboardLayout;
