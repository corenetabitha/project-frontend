import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { initializeUser } from './features/auth/authSlice';

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLayout from "./layouts/AdminLayout";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";

import DashboardLayout from "./components/DashboardLayout";
import Library from "./pages/Library";
import Bookstore from "./pages/Bookstore";
import Admin from "./pages/AdminPage";
import Cart from "./pages/Cart";
import CartProvider from "./context/CartProvider";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeUser());
  }, [dispatch]);

  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Admin />} />
          </Route>

          <Route
            path="/profile"
            element={
              <ProtectedRoute requiredRole="user">
                <ProfilePage />
              </ProtectedRoute>
            }
          />

          <Route element={<DashboardLayout />}>
            <Route path="/" element={<Bookstore />} />
            
            <Route
              path="/cart"
              element={
                <ProtectedRoute requiredRole="user">
                  <Cart />
                </ProtectedRoute>
              }
            />
            <Route
              path="/library"
              element={
                <ProtectedRoute requiredRole="user">
                  <Library />
                </ProtectedRoute>
              }
            />
          </Route>

          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </CartProvider>
  );
}

export default App;