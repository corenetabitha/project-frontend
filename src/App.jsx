import React, { useEffect, useState } from 'react';
import CartProvider from './context/CartProvider';
import CartSection from './components/CartSection';
import { fetchBooks } from './services/api';

function App() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks().then(setBooks);
  }, []);

  return (
    <CartProvider>
      <div className="p-8">
        <h1 className="text-3xl font-bold">Vintage Amazon Bookstore</h1>
        <div className="mt-4 grid grid-cols-2 gap-4">
          {books.map(book => (
            <div key={book.id} className="border p-4">
              <h3>{book.title}</h3>
              <p>${book.price}</p>
              <p>Available for: {book.available_for}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-8 mt-8">
          <CartSection type="purchase" />
          <CartSection type="borrow" />
        </div>
      </div>
    </CartProvider>
  );
}

export default App;
