import React, { useEffect, useState} from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import { fetchLendings } from "../../services/api";
import axiosInstance from "../../services/api";

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
  loadOrders();
}, []);

const loadOrders = async () => {
  try {
    const ordersData = await fetchOrders();
    setOrders(ordersData);
  } catch (error) {
    console.error("Error loading orders:", error);
  }
};

  const updateOrderStatus = (id, newStatus) => {
    axiosInstance.patch(`orders/${id}/`, { status: newStatus })
      .then(() => fetchOrders())
      .catch((err) => console.error("Error updating order:", err));
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Order Management</h2>
      <table className="w-full text-left">
        <thead>
          <tr>
            <th className="border p-2">Order ID</th>
            <th className="border p-2">User ID</th>
            <th className="border p-2">Amount</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Date</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td className="border p-2">{order.id}</td>
              <td className="border p-2">{order.user_id}</td>
              <td className="border p-2">${order.amount}</td>
              <td className="border p-2 text-yellow-600">{order.status}</td>
              <td className="border p-2">{order.date}</td>
              <td className="border p-2 space-x-2">
                <button
                  className="text-green-500 hover:text-green-700"
                  onClick={() => updateOrderStatus(order.id, "Approved")}
                >
                  <FaCheck />
                </button>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => updateOrderStatus(order.id, "Rejected")}
                >
                  <FaTimes />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderManagement;
