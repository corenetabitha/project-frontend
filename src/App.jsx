import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";

import UserDashboard from "./pages/Dashboard/UserDashboard";
import AdminDashboard from "./pages/Dashboard/AdminDashboard";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Protected User Routes */}
      <Route
        element={
          <ProtectedRoute requiredRole="user">
            <UserLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>

      {/* Protected Admin Routes */}
      <Route
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>

      {/* Fallback Route */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
