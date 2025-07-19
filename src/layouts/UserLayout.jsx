import React from "react";
import { Outlet, Link } from "react-router-dom";

const UserLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-600 text-white p-4">
        <nav className="flex justify-between">
          <span className="font-bold">User Dashboard</span>
          <div>
            <Link to="/dashboard" className="mr-4">Dashboard</Link>
            <Link to="/profile">Profile</Link>
          </div>
        </nav>
      </header>

      <main className="flex-1 p-6 bg-blue-50">
        <Outlet />
      </main>
    </div>
  );
};

export default UserLayout;
