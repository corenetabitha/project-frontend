import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartProvider';
import { payWithMpesa } from '../services/mpesa';

const CartSection = ({ type }) => {
  const { cart, checkout } = useContext(CartContext);
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const items = cart[type] || [];

  const total = items.reduce((acc, item) => acc + item.price, 0);
  const cartId = cart.id || 1; 

  const handleMpesaPayment = async () => {
    if (!phone) {
      alert("Please enter your phone number.");
      return;
    }

    try {
      setLoading(true);
      const result = await payWithMpesa(phone, total, cartId);
      alert("Payment successful: " + result.message);
      checkout(type);
    } catch (err) {
      alert("Payment failed. Try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-2">
        {type === 'purchase' ? 'Shopping' : 'Library'} Cart
      </h2>

      {items.length === 0 ? (
        <p className="text-gray-500">Cart is empty.</p>
      ) : (
        <>
          {items.map(item => (
            <div key={item.id} className="flex justify-between mb-1">
              <span>{item.title}</span>
              <span>${item.price}</span>
            </div>
          ))}

          <p className="mt-2 font-semibold">Total: ${total}</p>

          <input
            type="tel"
            placeholder="Enter M-Pesa phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full mt-2 p-2 border rounded"
          />

          <button
            onClick={handleMpesaPayment}
            disabled={loading}
            className="bg-green-600 text-white px-4 py-2 mt-3 w-full rounded hover:bg-green-700"
          >
            {loading ? 'Processing...' : 'Pay with M-Pesa'}
          </button>

          <button
            onClick={() => checkout(type)}
            className="bg-blue-600 text-white px-4 py-2 mt-2 w-full rounded hover:bg-blue-700"
          >
            Clear Cart
          </button>
        </>
      )}
    </div>
  );
};

export default CartSection;

