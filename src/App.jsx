// src/App.jsx
import React, { useState } from 'react'; // Keep useState from both, as it's used in both contexts
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components from book-management
import BookList from './components/BookList';
import BookForm from './components/BookForm';

// Pages from dev
import Homepage from './pages/HomePage';
import Admin from './pages/Admin'; // Assuming Admin page will host book management

function App() {
  // State to trigger BookList refresh. Keep this if BookList is still dynamically refreshed.
  const [refreshListKey, setRefreshListKey] = useState(0);

  // Callback function passed to BookForm, called when a book is successfully added
  const handleBookAdded = () => {
    setRefreshListKey(prevKey => prevKey + 1); // Incrementing the key forces BookList to re-render
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        {/*
          Here, we can decide where BookList and BookForm should live.
          A common pattern is to have them within an /admin route or a dedicated /books-management route.
          For this example, I'm placing them directly in the Admin page for simplicity,
          but you might want to create a dedicated component for book management.
        */}
        <Route path="/admin" element={
          <Admin> {/* Assuming Admin component can take children or has specific slots */}
            <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
              <h1 className="text-4xl font-extrabold text-center mb-10 text-gray-900">BOOKED Admin</h1>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
          </Admin>
        } />
        {/* You might also want a dedicated page for just displaying books to general users, e.g.: */}
        {/* <Route path="/books" element={<BookListPage />} /> */}
      </Routes>
    </Router>
  );
}

export default App;