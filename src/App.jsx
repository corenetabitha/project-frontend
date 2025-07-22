// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import DashboardLayout from './components/DashboardLayout';
import BookList from './components/BookList';
import Bookstore from './pages/Bookstore';
import Admin from './pages/AdminPage';
import Cart from './pages/Cart';

import CartProvider from './context/CartProvider';

function App() {
  const [refreshListKey, setRefreshListKey] = useState(0);

  const handleBookAdded = () => {
    setRefreshListKey(prevKey => prevKey + 1);
  };

  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route element={<DashboardLayout />}>
            <Route path="/" element={<Bookstore />} />
            <Route path="/books" element={<BookList key={refreshListKey} />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<h1 className="text-center text-2xl mt-10">404 - Page Not Found</h1>} />
          </Route>
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
