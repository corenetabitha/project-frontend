import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartProvider';
import { payWithMpesa } from '../services/mpesa';
import { createOrder, createLendingRequest } from '../services/api'; // Import new API functions
import { useSelector } from 'react-redux'; // To get user ID

const CartSection = ({ type }) => {
  const { cart, checkout, removeFromCart, incrementQuantity, decrementQuantity } = useContext(CartContext);
  const { user, isAuthenticated } = useSelector(state => state.auth); // Get user from Redux
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const items = cart[type] || [];

  const total = items.reduce((acc, item) => {
    const itemPrice = type === 'purchase' ? parseFloat(item.price) : 0;
    return acc + (itemPrice * (item.quantity || 1));
  }, 0).toFixed(2);

  const cartId = cart.id || 1;

  const handleMpesaPaymentAndOrder = async () => {
    if (!isAuthenticated) {
      alert("Please log in to complete your purchase.");
      return;
    }
    if (!phone) {
      alert("Please enter your M-Pesa phone number.");
      return;
    }
    if (items.length === 0) {
      alert("Your purchase cart is empty. Please add items before proceeding with payment.");
      return;
    }

    setLoading(true);
    try {
      // 1. Initiate M-Pesa payment
      const mpesaResult = await payWithMpesa(phone, total, cartId);
      alert("M-Pesa payment initiated. Please complete the payment on your phone.");
      console.log("M-Pesa response:", mpesaResult);

      // 2. If M-Pesa initiation is successful, create the order in your backend
      // In a real app, you'd likely confirm payment success via a webhook before creating the order.
      // For this example, we'll proceed assuming M-Pesa initiation means the user will pay.
      const orderItems = items.map(item => ({
        book_id: item.id,
        quantity: item.quantity || 1,
        price: parseFloat(item.price),
        // Add any other necessary item details
      }));

      const orderData = {
        user_id: user.id, // Get user ID from Redux
        total_amount: parseFloat(total),
        items: orderItems,
        payment_method: 'M-Pesa',
        // Add more details like transaction_id from M-Pesa if available
      };

      const orderResponse = await createOrder(orderData);
      alert("Order submitted successfully for admin approval!");
      console.log("Order creation response:", orderResponse);

      // Clear the cart after successful submission
      checkout(type);
    } catch (err) {
      alert("Payment or order submission failed. Please try again.");
      console.error("Payment/Order error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleRequestLoan = async () => {
    if (!isAuthenticated) {
      alert("Please log in to request a loan.");
      return;
    }
    if (items.length === 0) {
      alert("Your lending cart is empty. Please add items before requesting a loan.");
      return;
    }

    setLoading(true);
    try {
      const lendingItems = items.map(item => ({
        book_id: item.id,
        quantity: item.quantity || 1,
        return_date: item.returnDate,
        // Add any other necessary item details
      }));

      const requestData = {
        user_id: user.id, // Get user ID from Redux
        items: lendingItems,
      };

      const response = await createLendingRequest(requestData);
      alert("Lending request submitted successfully for admin approval!");
      console.log("Lending request response:", response);

      // Clear the cart after successful submission
      checkout(type);
    } catch (err) {
      alert("Lending request failed. Please try again.");
      console.error("Lending request error:", err);
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
          <div className="space-y-3 mb-4 flex-grow overflow-y-auto max-h-96 pr-2"> {/* Added scroll and max-height */}
            {items.map(item => (
              <div key={item.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-2 last:border-b-0">
                <div className="flex-1 min-w-0 pr-2 mb-2 sm:mb-0">
                  <span className="text-gray-800 font-medium block truncate">{item.title}</span>
                  {type === 'purchase' ? (
                    <span className="text-gray-700 text-sm block">${parseFloat(item.price).toFixed(2)} per item</span>
                  ) : (
                    <span className="text-gray-700 text-sm block">Return by: {item.returnDate}</span>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => decrementQuantity(type, item.id)}
                      className="text-gray-600 hover:text-gray-900 text-lg font-bold px-2 py-0.5 rounded-md border border-gray-300 hover:bg-gray-100 transition-colors"
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span className="font-bold text-lg">{item.quantity || 1}</span>
                    <button
                      onClick={() => incrementQuantity(type, item.id)}
                      className="text-gray-600 hover:text-gray-900 text-lg font-bold px-2 py-0.5 rounded-md border border-gray-300 hover:bg-gray-100 transition-colors"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(type, item.id)}
                    className="text-red-500 hover:text-red-700 text-sm px-2 py-1 rounded-md border border-red-300 hover:bg-red-50 transition-colors"
                    title="Remove item"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-4 text-xl font-bold text-gray-800 border-t pt-4">Total: ${total}</p>

          {type === 'purchase' && (
            <>
              <input
                type="tel"
                placeholder="Enter M-Pesa phone number (e.g., 2547XXXXXXXX)"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full mt-4 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />

              <button
                onClick={handleMpesaPaymentAndOrder}
                disabled={loading || items.length === 0}
                className="bg-green-600 text-white px-4 py-2 mt-3 w-full rounded-md hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Processing...' : 'Checkout (M-Pesa)'}
              </button>
            </>
          )}

          {type === 'borrow' && (
            <button
              onClick={handleRequestLoan}
              disabled={loading || items.length === 0}
              className="bg-indigo-600 text-white px-4 py-2 mt-3 w-full rounded-md hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Submitting Request...' : 'Request Loan'}
            </button>
          )}

          <button
            onClick={() => checkout(type)} // This remains to clear the local cart
            className="bg-red-600 text-white px-4 py-2 mt-2 w-full rounded-md hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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