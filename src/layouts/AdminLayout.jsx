import React from "react";
import { Outlet, Link } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-800 text-white p-4">
        <nav className="flex justify-between">
          <span className="font-bold">Admin Dashboard</span>
          <div>
            <Link to="/admin" className="mr-4">Home</Link>
            <Link to="/profile">Profile</Link>
          </div>
        </nav>
      </header>

      <main className="flex-1 p-6 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
