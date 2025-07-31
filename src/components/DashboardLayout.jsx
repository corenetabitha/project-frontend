import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import {Menu,X,Home,BookOpen,ShoppingCart,UserCog,LogOut,LogIn,} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/auth/authSlice';

const navLinks = [
  { label: 'Home', to: '/', icon: <Home className="w-5 h-5 mr-2" /> },
  { label: 'Library', to: '/library', icon: <BookOpen className="w-5 h-5 mr-2" /> },
  { label: 'Cart', to: '/cart', icon: <ShoppingCart className="w-5 h-5 mr-2" /> },
];

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="bg-gray-800 text-white px-4 py-3 flex justify-between items-center md:hidden shadow-md">
        <h1 className="text-4xl font-extrabold text-blue-400 tracking-wider">BOOKED</h1>
        <button onClick={toggleSidebar}>
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      <div className="flex flex-1">
        <aside
          className={`bg-gray-900 text-white w-60 p-6 flex flex-col justify-between transition-transform duration-300 ease-in-out z-50
            ${sidebarOpen ? 'fixed inset-y-0 left-0 transform translate-x-0' : '-translate-x-full'}
            md:translate-x-0 md:relative md:block`}
        >
          <div>
            <div className="flex justify-between items-center md:hidden mb-4">
              <h1 className="text-4xl font-extrabold text-blue-400 tracking-wider ">BOOKED</h1>
              <button onClick={toggleSidebar}>
                <X className="w-6 h-6 text-white" />
              </button>
            </div>

            <div className="hidden md:block mb-6">
              <h1 className="text-4xl font-extrabold text-blue-400 tracking-wider">BOOKED</h1>
              <p className="text-3sm text-gray-400">Classic Bookstore</p>
            </div>

            <nav className="space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={toggleSidebar}
                  className="flex items-center text-3xl font-medium hover:text-yellow-400 transition-colors"
                >
                  {link.icon}
                  {link.label}
                </Link>
              ))}

              {isAuthenticated && user?.role === 'admin' && (
                <Link
                  to="/admin"
                  onClick={toggleSidebar}
                  className="flex items-center text-3xl font-medium hover:text-yellow-400 mt-4"
                >
                  <UserCog className="w-5 h-5 mr-2" />
                  Admin
                </Link>
              )}

              {!isAuthenticated && (
                <Link
                  to="/login"
                  onClick={toggleSidebar}
                  className="flex items-center text-2xl font-medium hover:text-yellow-400 mt-4"
                >
                  <LogIn className="w-5 h-5 mr-2" />
                  Sign In
                </Link>
              )}
            </nav>
          </div>

          {isAuthenticated && (
            <button
              onClick={() => {
                handleLogout();
                toggleSidebar();
              }}
              className="flex items-center text-sm font-medium hover:text-yellow-400 mt-6"
            >
              <LogOut className="w-5 h-5 mr-2" />
              Logout
            </button>
          )}
        </aside>
        <main className="flex-1 p-6 md:p-10 bg-white shadow-inner rounded-md overflow-y-auto">
          <Outlet />
        </main>
      </div>
      <footer className="bg-gray-900 text-white text-center text-sm py-4">
        <p className="text-gray-400">&copy; {new Date().getFullYear()} Booked Bookstore. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default DashboardLayout;