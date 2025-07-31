import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartProvider';
import { payWithMpesa } from '../services/mpesa';
import { createOrder, createLendingRequest } from '../services/api';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CartSection = ({ type }) => {
  const navigate = useNavigate();
  const { cart, checkout, removeFromCart, incrementQuantity, decrementQuantity } = useContext(CartContext);
  const { user, isAuthenticated } = useSelector(state => state.auth);
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const items = cart[type] || [];

  const total = items.reduce((acc, item) => {
    const itemPrice = type === 'purchase' ? parseFloat(item.price) : 0;
    return acc + (itemPrice * (item.quantity || 1));
  }, 0).toFixed(2);

  const handleMpesaPaymentAndOrder = async () => {
    if (!isAuthenticated) {
      console.log("Please log in to complete your purchase.");
      return;
    }
    if (!phone) {
      console.log("Please enter your M-Pesa phone number.");
      return;
    }
    if (items.length === 0) {
      console.log("Your purchase cart is empty. Please add items before proceeding.");
      return;
    }

    setLoading(true);
    try {
      const mpesaCartItems = items.map(item => ({
        book_id: item.id,
        quantity: item.quantity || 1,
      }));

      console.log("Sending M-Pesa STK push:");
      console.log("Phone:", phone);
      console.log("Amount (USD):", total);
      console.log("Cart Items:", mpesaCartItems);

      const mpesaResult = await payWithMpesa(phone, total, mpesaCartItems);
      console.log("M-Pesa response:", mpesaResult);

      const orderItems = items.map(item => ({
        book_id: item.id,
        quantity: item.quantity || 1,
        price: parseFloat(item.price),
      }));

      const orderData = {
        user_id: user.id,
        total_amount: parseFloat(total),
        items: orderItems,
        payment_method: 'M-Pesa (STK Push)',
      };

      const orderResponse = await createOrder(orderData);
      console.log("Order submitted successfully!");
      console.log("Order creation response:", orderResponse);

      checkout(type);
      navigate('/admin/OrderManagement');
    } catch (err) {
      console.error("Payment or order submission failed. Please try again.");
      if (err.response?.data) {
        console.error("Backend Error:", err.response.data.detail || JSON.stringify(err.response.data));
      } else {
        console.error("Axios Error:", err);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRequestLoan = async () => {
    if (!isAuthenticated) {
      console.log("Please log in to request a loan.");
      return;
    }
    if (items.length === 0) {
      console.log("Your lending cart is empty.");
      return;
    }

    setLoading(true);
    try {
      for (const item of items) {
        const requestData = {
          user_id: user.id,
          book_id: item.id,
          quantity: item.quantity || 1,
          due_date: new Date(item.returnDate).toISOString().split('T')[0],
        };
        await createLendingRequest(requestData);
        console.log(`Lending request submitted for book ID: ${item.id}`);
      }

      console.log("All lending requests submitted.");
      checkout(type);
      navigate('/admin/LendingRequests');
    } catch (err) {
      console.error("Lending request failed.", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow bg-white flex flex-col h-full">
      <h2 className="text-2xl font-semibold mb-4 text-blue-700">
        {type === 'purchase' ? 'Shopping' : 'Lending'} Cart
      </h2>

      {items.length === 0 ? (
        <p className="text-gray-500 text-center py-4 flex-grow">Your {type} cart is empty.</p>
      ) : (
        <>
          <div className="space-y-3 mb-4 flex-grow overflow-y-auto max-h-96 pr-2">
            {items.map(item => (
              <div key={item.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-2 last:border-b-0">
                <div className="flex-1 min-w-0 pr-2 mb-2 sm:mb-0">
                  <span className="text-gray-800 font-medium block truncate">{item.title}</span>
                  {type === 'purchase' ? (
                    <span className="text-gray-700 text-sm block">
                      $ {parseFloat(item.price).toFixed(2)} per item
                    </span>
                  ) : (
                    <span className="text-gray-700 text-sm block">Return by: {item.returnDate}</span>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => decrementQuantity(type, item.id)}
                      className="text-gray-600 hover:text-gray-900 text-lg font-bold px-2 py-0.5 rounded-md border border-gray-300 hover:bg-gray-100"
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span className="font-bold text-lg">{item.quantity || 1}</span>
                    <button
                      onClick={() => incrementQuantity(type, item.id)}
                      className="text-gray-600 hover:text-gray-900 text-lg font-bold px-2 py-0.5 rounded-md border border-gray-300 hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(type, item.id)}
                    className="text-red-500 hover:text-red-700 text-sm px-2 py-1 rounded-md border border-red-300 hover:bg-red-50"
                    title="Remove item"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-4 text-xl font-bold text-gray-800 border-t pt-4">Total: $ {total}</p>

          {type === 'purchase' && (
            <>
              <input
                type="tel"
                placeholder="Enter M-Pesa phone number (e.g., 254712345678)"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full mt-4 p-2 border border-gray-300 rounded-md"
              />
              <button
                onClick={handleMpesaPaymentAndOrder}
                disabled={loading || items.length === 0}
                className="bg-green-600 text-white px-4 py-2 mt-3 w-full rounded-md hover:bg-green-700"
              >
                {loading ? 'Processing...' : 'Checkout with M-Pesa'}
              </button>
            </>
          )}

          {type === 'borrow' && (
            <button
              onClick={handleRequestLoan}
              disabled={loading || items.length === 0}
              className="bg-indigo-600 text-white px-4 py-2 mt-3 w-full rounded-md hover:bg-indigo-700"
            >
              {loading ? 'Submitting...' : 'Request Loan'}
            </button>
          )}

          <button
            onClick={() => checkout(type)}
            className="bg-red-600 text-white px-4 py-2 mt-2 w-full rounded-md hover:bg-red-700"
            disabled={items.length === 0 || loading}
          >
            Clear All Items
          </button>
        </>
      )}
    </div>
  );
};

export default CartSection;
