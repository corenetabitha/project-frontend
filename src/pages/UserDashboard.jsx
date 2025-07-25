// src/pages/UserDashboard.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [lendings, setLendings] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get('http://127.0.0.1:8000/api/orders/');
        setOrders(res.data);
      } catch (err) {
        console.error('Error fetching orders:', err);
      }
    };

    const fetchLendings = async () => {
      try {
        const res = await axios.get('http://127.0.0.1:8000/api/lendings/');
        setLendings(res.data);
      } catch (err) {
        console.error('Error fetching lendings:', err);
      }
    };

    fetchOrders();
    fetchLendings();
  }, []);

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">User Dashboard</h2>

      {/* Orders Section */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2 text-blue-700">Order History</h3>
        {orders.length === 0 ? (
          <p className="text-gray-600">No orders placed yet.</p>
        ) : (
          <ul className="space-y-2">
            {orders.map(order => (
              <li key={order.id} className="border rounded p-3 bg-gray-50">
                <p>Status: <span className="font-semibold">{order.status}</span></p>
                <p>Total: ${order.total}</p>
                <p>Date: {new Date(order.created_at).toLocaleDateString()}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-2 text-purple-700">Lending Records</h3>
        {lendings.length === 0 ? (
          <p className="text-gray-600">No books borrowed yet.</p>
        ) : (
          <ul className="space-y-2">
            {lendings.map(lend => (
              <li key={lend.id} className="border rounded p-3 bg-gray-50">
                <p>Book: <span className="font-semibold">{lend.book_title}</span></p>
                <p>Status: {lend.status}</p>
                <p>Due Date: {new Date(lend.due_date).toLocaleDateString()}</p>
                <p>Returned: {lend.returned ? 'Yes' : 'No'}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
