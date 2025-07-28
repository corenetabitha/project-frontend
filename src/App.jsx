import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./pages/Dashboard/AdminDashboard";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";

import DashboardLayout from "./components/DashboardLayout";
import Library from "./pages/Library";
import Bookstore from "./pages/Bookstore";
import Admin from "./pages/AdminPage";
import Cart from "./pages/Cart";
import CartProvider from "./context/CartProvider";

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/admin-panel"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
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
            <Route path="/admin" element={<Admin />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/library" element={<Library />} />
          </Route>

          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
