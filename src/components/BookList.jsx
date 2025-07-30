import React, { useEffect, useState, useCallback, useContext } from 'react';
import { fetchBooks, fetchGenres } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartProvider';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [genres, setGenres] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedAvailability, setSelectedAvailability] = useState('');
  const [minPrice, setMinPrice] = useState(''); 
  const [maxPrice, setMaxPrice] = useState(''); 
  const [sortOrder, setSortOrder] = useState(''); 

  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const getBooks = useCallback(async () => {
    const params = {};
    if (searchQuery) {
      params.search = searchQuery;
    }
    if (selectedGenre) {
      params.genre = selectedGenre;
    }
    if (selectedAvailability) {
      params.availability = selectedAvailability;
    }
    if (minPrice) {
      params.min_price = minPrice; 
    }
    if (maxPrice) {
      params.max_price = maxPrice;
    }
    if (sortOrder) {
      params.ordering = sortOrder === 'recent' ? '-created_at' : 'created_at';
    }

    try {
      const data = await fetchBooks(params);
      setBooks(data);
    } catch (error) {
      console.error("Failed to fetch books:", error);
      setBooks([]);
    }
  }, [searchQuery, selectedGenre, selectedAvailability, minPrice, maxPrice, sortOrder]); // Add new states to dependency array

  useEffect(() => {
    getBooks();
  }, [getBooks]);

  useEffect(() => {
    const getGenres = async () => {
      try {
        const data = await fetchGenres();
        setGenres(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to fetch genres:", error);
        setGenres([]);
      }
    };
    getGenres();
  }, []);

  const handleAddToCart = (book) => {
    console.log(`Adding book with ID ${book.id} to purchase cart.`);
    addToCart('purchase', book);
    navigate('/cart');
  };

  const handlePutToLend = (book) => {
    console.log(`Adding book with ID ${book.id} to lending cart.`);
    addToCart('borrow', book);
    navigate('/cart');
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-orange-400">Book Catalog</h2>
      <div className="mb-6 space-y-3">
        <input
          type="text"
          placeholder="Search by title or author..."
          className="border p-2 w-full rounded-md focus:ring-blue-500 focus:border-blue-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
          <select
            className="border p-2 rounded-md flex-grow focus:ring-blue-500 focus:border-blue-500"
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
          >
            <option value="">All Genres</option>
            {genres && genres.map((genre) => (
              <option key={genre.id} value={genre.name}>
                {genre.name}
              </option>
            ))}
          </select>
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

        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
          <input
            type="number"
            placeholder="Min Price"
            className="border p-2 rounded-md flex-grow focus:ring-blue-500 focus:border-blue-500"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            min="0"
          />
          <input
            type="number"
            placeholder="Max Price"
            className="border p-2 rounded-md flex-grow focus:ring-blue-500 focus:border-blue-500"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            min="0"
          />
        </div>

        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
          <select
            className="border p-2 rounded-md flex-grow focus:ring-blue-500 focus:border-blue-500"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="">Sort by Date Uploaded</option>
            <option value="recent">Most Recent</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>

      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
        {books.length > 0 ? (
          books.map(book => (
            <div key={book.id} className="p-5 border rounded-lg shadow-md bg-gray-50 hover:shadow-lg transition-shadow duration-200 flex h-full">
              {book.image_url && (
                <div className="flex-shrink-0 w-32 h-48 mr-4 flex items-center justify-center bg-gray-100 rounded-md overflow-hidden self-center">
                  <img
                    src={book.image_url}
                    alt={book.title}
                    className="max-w-full h-auto block object-cover w-full h-full"
                  />
                </div>
              )}

              <div className="flex flex-col flex-grow">
                <h3 className="text-2xl font-bold mb-1 text-blue-700">{book.title}</h3>
                <p className="text-gray-700 text-sm mb-1">by {book.author || 'N/A'}</p>
                <p className="text-lg text-green-600 font-bold mb-2"> ${(book.price && !isNaN(parseFloat(book.price)))? parseFloat(book.price).toFixed(2): 'N/A'}</p>
                <p className="text-gray-600 text-xs mb-3">
                  Genre: <span className="font-medium">{book.genre_name || book.genre?.name || 'N/A'}</span>
                </p>

                {book.description && (
                  <p className="text-sm text-gray-600 flex-grow overflow-hidden line-clamp-6 mb-4">
                    {book.description}
                  </p>
                )}

                <div className="text-xs text-gray-500 mt-auto flex flex-wrap gap-2">
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

                <div className="mt-4 flex flex-col space-y-2">
                  {book.is_available_for_purchase && book.stock_count > 0 && (
                    <button
                      onClick={() => handleAddToCart(book)}
                      className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors shadow-md text-sm w-full"
                    >
                      Add to Cart
                    </button>
                  )}
                  {book.is_available_for_lending && (
                    <button
                      onClick={() => handlePutToLend(book)}
                      className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors shadow-md text-sm w-full"
                    >
                      Lend
                    </button>
                  )}
                </div>
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
