import React from "react";
import Navbar from "../../components/Navbar";


const AdminDashboard = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-1 container mx-auto p-6">
        <h1 className="text-3xl font-semibold mb-6">Admin Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-white rounded-2xl shadow p-5">
            <h2 className="text-xl font-bold mb-2">Books</h2>
            <p className="text-gray-600 mb-4">Add, edit, or delete books from the store.</p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Manage Books
            </button>
          </div>

         
          <div className="bg-white rounded-2xl shadow p-5">
            <h2 className="text-xl font-bold mb-2">Users</h2>
            <p className="text-gray-600 mb-4">View and manage registered users.</p>
            <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
              Manage Users
            </button>
          </div>

          
          <div className="bg-white rounded-2xl shadow p-5">
            <h2 className="text-xl font-bold mb-2">Orders</h2>
            <p className="text-gray-600 mb-4">Track and fulfill book orders.</p>
            <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
              Manage Orders
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
