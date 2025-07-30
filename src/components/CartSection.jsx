import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartProvider';
import { payWithMpesa } from '../services/mpesa'; 

const CartSection = ({ type }) => {
  const { cart, checkout, removeFromCart, incrementQuantity, decrementQuantity } = useContext(CartContext);
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const items = cart[type] || [];

  const total = items.reduce((acc, item) => {
    const itemPrice = type === 'purchase' ? parseFloat(item.price) : 0; 
    return acc + (itemPrice * (item.quantity || 1)); 
  }, 0).toFixed(2); 

  const cartId = cart.id || 1; 

  const handleMpesaPayment = async () => {
    if (!phone) {
      alert("Please enter your M-Pesa phone number.");
      return;
    }
    if (items.length === 0) {
      alert("Your cart is empty. Please add items before proceeding with payment.");
      return;
    }
    if (type === 'borrow') {
      alert("Lending items do not require M-Pesa payment. Please proceed to checkout for lending.");
      return;
    }

    try {
      setLoading(true);
      const result = await payWithMpesa(phone, total, cartId);
      alert("Payment successful: " + result.message);
      checkout(type); 
    } catch (err) {
      alert("Payment failed. Please try again.");
      console.error("M-Pesa payment error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow bg-white">
      <h2 className="text-2xl font-semibold mb-4 text-blue-700">
        {type === 'purchase' ? 'Shopping' : 'Lending'} Cart
      </h2>

      {items.length === 0 ? (
        <p className="text-gray-500 text-center py-4">Your {type} cart is empty.</p>
      ) : (
        <>
          <div className="space-y-3 mb-4">
            {items.map(item => (
              <div key={item.id} className="flex justify-between items-center border-b pb-2 last:border-b-0">
                <span className="text-gray-800 font-medium">{item.title}</span>
                <div className="flex items-center space-x-3">
                  {type === 'purchase' ? (
                    <span className="text-gray-700">${parseFloat(item.price).toFixed(2)}</span>
                  ) : (
                    <span className="text-gray-700 text-sm">Return by: {item.returnDate}</span>
                  )}
                  
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
                onClick={handleMpesaPayment}
                disabled={loading || items.length === 0}
                className="bg-green-600 text-white px-4 py-2 mt-3 w-full rounded-md hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Processing Payment...' : 'Pay with M-Pesa'}
              </button>
            </>
          )}

          <button
            onClick={() => checkout(type)}
            className="bg-red-600 text-white px-4 py-2 mt-2 w-full rounded-md hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={items.length === 0}
          >
            Clear All Items
          </button>
        </>
      )}
    </div>
  );
};

export default CartSection;
