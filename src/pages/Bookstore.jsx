import React, { useState } from 'react';
import BookList from '../components/BookList';

const Bookstore = () => {
  const [refreshListKey, setRefreshListKey] = useState(0);


  return (
    <>
      <h1 className="text-3xl text-orange-600 font-bold mb-6">Welcome to the Bookstore</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="lg:col-span-1">
        </div>
        <div className="lg:col-span-2">
          <BookList key={refreshListKey} />
        </div>
      </div>
    </>
  );
};

export default Bookstore;