// src/components/BookList.jsx
import React, { useEffect, useState, useCallback } from 'react';
import { fetchBooks, fetchGenres } from '../services/api'; // Changed import from bookApi to api

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [genres, setGenres] = useState([]); // State for genres to populate filter dropdown
  const [searchQuery, setSearchQuery] = useState(''); // State for search input
  const [selectedGenre, setSelectedGenre] = useState(''); // State for selected genre in filter
  const [selectedAvailability, setSelectedAvailability] = useState(''); // State for selected availability in filter

  // useCallback to memoize the fetch function and avoid re-creating it unnecessarily
  // This function fetches books based on the current filter states
  const getBooks = useCallback(async () => {
    const params = {}; // Object to hold query parameters for the API call
    if (searchQuery) {
      params.search = searchQuery; // Add search parameter if not empty
    }
    if (selectedGenre) {
      params.genre = selectedGenre; // Add genre parameter if not empty
    }
    if (selectedAvailability) {
      params.availability = selectedAvailability; // Add availability parameter if not empty
    }
    try {
      const data = await fetchBooks(params); // Call fetchBooks with the parameters
      setBooks(data);
    } catch (error) {
      console.error("Failed to fetch books:", error);
      // Optionally, show an error message to the user
    }
  }, [searchQuery, selectedGenre, selectedAvailability]); // Dependencies for useCallback

  // Effect to re-fetch books whenever filter states change
  useEffect(() => {
    getBooks();
  }, [getBooks]); // Dependency array includes getBooks

  // Effect to fetch genres once when the component mounts
  useEffect(() => {
    const getGenres = async () => {
      try {
        const data = await fetchGenres();
        setGenres(data);
      } catch (error) {
        console.error("Failed to fetch genres:", error);
      }
    };
    getGenres();
  }, []); // Empty dependency array means this runs only once

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Book Catalog</h2>
      <div className="mb-6 space-y-3">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search by title or author..."
          className="border p-2 w-full rounded-md focus:ring-blue-500 focus:border-blue-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
          {/* Genre Filter Dropdown */}
          <select
            className="border p-2 rounded-md flex-grow focus:ring-blue-500 focus:border-blue-500"
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
          >
            <option value="">All Genres</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.name}>
                {genre.name}
              </option>
            ))}
          </select>
          {/* Availability Filter Dropdown */}
          <select
            className="border p-2 rounded-md flex-grow focus:ring-blue-500 focus:border-blue-500"
            value={selectedAvailability}
            onChange={(e) => setSelectedAvailability(e.target.value)}
          >
            <option value="">All Availability</option>
            <option value="purchase">For Purchase</option>
            <option value="lending">For Lending</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.length > 0 ? (
          books.map(book => (
            <div key={book.id} className="p-5 border rounded-lg shadow-md bg-gray-50 hover:shadow-lg transition-shadow duration-200 flex flex-col">
              <h3 className="text-xl font-semibold mb-2 text-blue-700">{book.title}</h3>
              <p className="text-gray-700 text-sm mb-1">by {book.author || 'N/A'}</p>
              <p className="text-lg text-green-600 font-bold mb-2">${book.price?.toFixed(2) || 'N/A'}</p>
              <p className="text-gray-600 text-xs mb-3">
                Genre: <span className="font-medium">{book.genre_name || 'N/A'}</span> {/* Display genre_name */}
              </p>
              {book.image_url && (
                <div className="flex-shrink-0 mb-4 h-48 flex items-center justify-center bg-gray-100 rounded-md overflow-hidden">
                  <img src={book.image_url} alt={book.title} className="max-h-full max-w-full object-contain" />
                </div>
              )}
              {book.description && (
                <p className="text-sm text-gray-600 mt-2 flex-grow overflow-hidden line-clamp-3">{book.description}</p>
              )}
              <div className="text-xs text-gray-500 mt-4 flex flex-wrap gap-2">
                {book.is_available_for_purchase && book.stock_count > 0 && (
                  <span className="bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded-full font-medium">For Purchase ({book.stock_count})</span>
                )}
                {book.is_available_for_lending && (
                  <span className="bg-purple-100 text-purple-800 px-2.5 py-0.5 rounded-full font-medium">For Lending</span>
                )}
                {!book.is_available_for_purchase && !book.is_available_for_lending && (
                  <span className="bg-red-100 text-red-800 px-2.5 py-0.5 rounded-full font-medium">Unavailable</span>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500 text-lg">No books found. Try adjusting filters or add some from the form!</p>
        )}
      </div>
    </div>
  );
};

export default BookList;