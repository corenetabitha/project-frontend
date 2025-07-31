import React, { useEffect, useState } from 'react';
import { fetchOrders, fetchLendings } from '../services/api';

const Library = () => {
  const [approvedOrders, setApprovedOrders] = useState([]);
  const [approvedLendings, setApprovedLendings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const orders = await fetchOrders();
        const lendings = await fetchLendings();

        const filteredOrders = orders.filter(order => order.status === 'Approved');
        const filteredLendings = lendings.filter(lend =>
          ['Approved', 'Lent', 'Returned'].includes(lend.status)
        );

        setApprovedOrders(filteredOrders);
        setApprovedLendings(filteredLendings);
      } catch (err) {
        console.error('Error loading data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return <div className="p-6 text-center">Loading data...</div>;
  }

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-3xl font-extrabold mb-4 text-indigo-600">LIBRARY HISTORY</h2>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-3 text-blue-700">Sold Books (Approved Orders)</h3>
        {approvedOrders.length === 0 ? (
          <p className="text-gray-600">No approved orders available.</p>
        ) : (
          <ul className="space-y-3">
            {approvedOrders.map(order => (
              <li key={order.id} className="border rounded p-4 bg-blue-50 shadow-sm">
                <p><span className="font-semibold">Order ID:</span> {order.id}</p>
                <p><span className="font-semibold">Status:</span> {order.status}</p>
                <p><span className="font-semibold">Total:</span> KES {order.total}</p>
                <p><span className="font-semibold">Date:</span> {new Date(order.order_date).toLocaleDateString()}</p>
                {order.items?.map(item => (
                  <p key={item.id}>
                    <span className="font-semibold">Book:</span> {item.book_title} (x{item.quantity})
                  </p>
                ))}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-3 text-purple-700">Lent Books (Lending Records)</h3>
        {approvedLendings.length === 0 ? (
          <p className="text-gray-600">No lending history available.</p>
        ) : (
          <ul className="space-y-3">
            {approvedLendings.map(lend => (
              <li key={lend.id} className="border rounded p-4 bg-purple-50 shadow-sm">
                <p><span className="font-semibold">Book:</span> {lend.book_title || lend.book?.title || 'N/A'}</p>
                <p><span className="font-semibold">Status:</span> {lend.status}</p>
                <p><span className="font-semibold">Lending Date:</span> {new Date(lend.lending_date).toLocaleDateString()}</p>
                <p><span className="font-semibold">Due Date:</span> {new Date(lend.due_date).toLocaleDateString()}</p>
                <p><span className="font-semibold">Returned:</span> {lend.status === 'Returned' ? 'Yes' : 'No'}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Library;
