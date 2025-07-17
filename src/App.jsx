// src/App.jsx
import React, { useState } from 'react';
import BookList from './components/BookList';
import BookForm from './components/BookForm';

function App() {
  // State to trigger BookList refresh. Changing this key will force BookList to remount
  // and re-fetch its data.
  const [refreshListKey, setRefreshListKey] = useState(0);

  // Callback function passed to BookForm, called when a book is successfully added
  const handleBookAdded = () => {
    setRefreshListKey(prevKey => prevKey + 1); // Incrementing the key forces BookList to re-render
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-extrabold text-center mb-10 text-gray-900">My Online Bookstore</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          {/* BookForm component. When a book is added, it calls handleBookAdded */}
          <BookForm onBookAdded={handleBookAdded} />
        </div>
        <div className="lg:col-span-2">
          {/* BookList component. The key prop ensures it re-renders when a new book is added */}
          <BookList key={refreshListKey} />
        </div>
      </div>
    </div>
  );
}

export default App;