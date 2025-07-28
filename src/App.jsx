import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./pages/Dashboard/AdminDashboard";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";

import DashboardLayout from './components/DashboardLayout';
import Library from './pages/Library';
import Bookstore from './pages/Bookstore';
import Cart from './pages/Cart';
import CartProvider from './context/CartProvider';

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route
            path="/profile"
            element={
              <ProtectedRoute requiredRole="user">
                <ProfilePage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminLayout>
                  <AdminDashboard />
                </AdminLayout>
              </ProtectedRoute>
            }
          />

          <Route element={<DashboardLayout />}>
            <Route path="/bookstore" element={<Bookstore />} />
            <Route path="/library" element={<Library />} />
            <Route path="/cart" element={<Cart />} />
          </Route>

          <Route
            path="*"
            element={<h1 className="text-center text-2xl mt-10">404 - Page Not Found</h1>}
          />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
