import React, { useState } from "react";
import OrderManagement from "../components/admin/OrderManagement";
import LendingRequests from "../components/admin/LendingRequests";
import BookForm from "../components/BookForm";
import BookManagement from "../components/admin/BookManagement";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("books");
  const [refreshListKey, setRefreshListKey] = useState(0);

  const handleBookAdded = () => {
    setRefreshListKey((prevKey) => prevKey + 1);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="mb-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-orange-600">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1 text-sm">Manage your bookstore and library</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-sm text-gray-500">Books</p>
            <h2 className="text-2xl font-bold text-blue-600">Enough</h2>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-sm text-gray-500">Books sold</p>
            <h2 className="text-2xl font-bold text-yellow-600">1M+</h2>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-sm text-gray-500">Books Borrowed</p>
            <h2 className="text-2xl font-bold text-purple-600">100+</h2>
          </div>
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab("books")}
          className={`px-4 py-2 rounded ${activeTab === "books" ? "bg-orange-400 text-white" : "bg-white shadow"}`}
        >
          Book Management
        </button>
        <button
          onClick={() => setActiveTab("orders")}
          className={`px-4 py-2 rounded ${activeTab === "orders" ? "bg-orange-400 text-white" : "bg-white shadow"}`}
        >
          Order Management
        </button>
        <button
          onClick={() => setActiveTab("lending")}
          className={`px-4 py-2 rounded ${activeTab === "lending" ? "bg-orange-400 text-white" : "bg-white shadow"}`}
        >
          Lending Requests
        </button>
      </div>

      {activeTab === "books" && (
        <div className="space-y-8">
          <BookForm onBookAdded={handleBookAdded} />
          <BookManagement key={refreshListKey} />
        </div>
      )}

      {activeTab === "orders" && <OrderManagement />}
      {activeTab === "lending" && <LendingRequests />}
    </div>
  );
};

export default Admin;