import React, { useContext } from 'react';
import { CartContext } from '../context/CartProvider';

const CartSection = ({ type }) => {
  const { cart, checkout } = useContext(CartContext);
  const items = cart[type];

  const total = items.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="p-4">
      <h2>{type === 'purchase' ? 'Shopping' : 'Library'} Cart</h2>
      {items.map(item => (
        <div key={item.id} className="flex justify-between">
          <span>{item.title}</span>
          <span>${item.price}</span>
        </div>
      ))}
      <p>Total: ${total}</p>
      <button onClick={() => checkout(type)} className="bg-blue-600 text-white px-4 py-2 mt-2">
        Checkout
      </button>
    </div>
  );
};

export default CartSection;
