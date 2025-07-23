import React, { useEffect, useState } from 'react';
import CartSection from '../components/CartSection';
import { fetchBooks } from '../services/api';

function Cart() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks().then(setBooks);
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Booked Bookstore</h1>
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
  );
}

export default Cart;
