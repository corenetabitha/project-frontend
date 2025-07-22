import React from 'react';

import Navbar from "../../components/Navbar";


const AdminDashboard = () => {
  return (
     <div className="min-h-screen flex flex-col">
      <Navbar /> 

      <h1 className="text-3xl font-semibold mb-4">Admin Dashboard</h1>
      <p className="text-gray-700">Welcome, Admin! Manage books, users, and orders here.</p>
    </div>
  );
};

export default AdminDashboard;
