import React, { useState } from 'react';
import BookForm from '../components/BookForm';
import BookList from '../components/BookList';

const Bookstore = () => {
  const [refreshListKey, setRefreshListKey] = useState(0);

  const handleBookAdded = () => {
    setRefreshListKey(prevKey => prevKey + 1);
  };

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Welcome to the Bookstore</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="lg:col-span-1">
          <BookForm onBookAdded={handleBookAdded} />
        </div>
        <div className="lg:col-span-2">
          <BookList key={refreshListKey} />
        </div>
      </div>
    </>
  );
};

export default Bookstore;