// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Cart from './pages/Cart';
import CartProvider from './context/CartProvider';

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Cart />} />
          
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
