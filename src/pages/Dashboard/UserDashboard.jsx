import React from 'react';
import Navbar from "../../components/Navbar";


const UserDashboard = () => {
  return (

     <div className="min-h-screen flex flex-col">
      <Navbar /> 
  
      <h1 className="text-3xl font-semibold mb-4">User Dashboard</h1>
      <p className="text-gray-700">Welcome to your dashboard. Browse and order books here.</p>
    </div>
  );
};

export default UserDashboard;
