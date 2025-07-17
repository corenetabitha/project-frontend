import React, { useState } from "react";
import BookManagement from "../components/admin/BookManagement";
import OrderManagement from "../components/admin/OrderManagement";
import LendingRequests from "../components/admin/LendingRequests";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("books");

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab("books")}
          className={`px-4 py-2 rounded ${
            activeTab === "books" ? "bg-green-600 text-white" : "bg-white shadow"
          }`}
        >
          Book Management
        </button>
        <button
          onClick={() => setActiveTab("orders")}
          className={`px-4 py-2 rounded ${
            activeTab === "orders" ? "bg-green-600 text-white" : "bg-white shadow"
          }`}
        >
          Order Management
        </button>
        <button
          onClick={() => setActiveTab("lending")}
          className={`px-4 py-2 rounded ${
            activeTab === "lending" ? "bg-green-600 text-white" : "bg-white shadow"
          }`}
        >
          Lending Requests
        </button>
      </div>

      {activeTab === "books" && <BookManagement />}
      {activeTab === "orders" && <OrderManagement />}
      {activeTab === "lending" && <LendingRequests />}
    </div>
  );
};

export default Admin;
