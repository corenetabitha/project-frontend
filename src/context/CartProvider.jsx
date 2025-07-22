import React, { createContext, useState } from 'react';

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ purchase: [], borrow: [] });

  const addToCart = (type, book) => {
    setCart(prev => ({
      ...prev,
      [type]: [...prev[type], book]
    }));
  };

  const checkout = (type) => {
    alert(`Checking out ${type} cart...`);
    setCart(prev => ({ ...prev, [type]: [] }));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, checkout }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
