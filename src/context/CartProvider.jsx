import React, { createContext, useState } from 'react';

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ purchase: [], borrow: [] });

  const calculateReturnDate = () => {
    const today = new Date();
    today.setDate(today.getDate() + 14);
    return today.toLocaleDateString('en-US');
  };

  const addToCart = (type, book) => {
    setCart(prev => {
      const existingItemIndex = prev[type].findIndex(item => item.id === book.id);
      let updatedItems;

      if (existingItemIndex > -1) {
        updatedItems = prev[type].map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      } else {
        const newItem = { ...book, quantity: 1 };
        if (type === 'borrow') {
          newItem.returnDate = calculateReturnDate();
        }
        updatedItems = [...prev[type], newItem];
      }

      return {
        ...prev,
        [type]: updatedItems
      };
    });
  };

  const removeFromCart = (type, bookId) => {
    setCart(prev => ({
      ...prev,
      [type]: prev[type].filter(item => item.id !== bookId)
    }));
  };

  const incrementQuantity = (type, bookId) => {
    setCart(prev => ({
      ...prev,
      [type]: prev[type].map(item =>
        item.id === bookId ? { ...item, quantity: (item.quantity || 1) + 1 } : item
      )
    }));
  };

  const decrementQuantity = (type, bookId) => {
    setCart(prev => {
      const updatedItems = prev[type].map(item =>
        item.id === bookId ? { ...item, quantity: Math.max(1, (item.quantity || 1) - 1) } : item
      );
      return {
        ...prev,
        [type]: updatedItems
      };
    });
  };

  const checkout = (type) => {
    alert(`Checking out ${type} cart... (This would trigger backend processing)`);
    setCart(prev => ({ ...prev, [type]: [] }));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, incrementQuantity, decrementQuantity, checkout }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;