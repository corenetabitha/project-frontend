// src/components/BookForm.jsx
import React, { useState, useEffect } from 'react';
import { addBook, fetchGenres } from '../services/api'; // Changed import from bookApi to api

// onBookAdded prop is a function passed from parent to trigger a refresh in BookList
const BookForm = ({ onBookAdded }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [genres, setGenres] = useState([]); // State to store fetched genres for the dropdown
  const [selectedGenreId, setSelectedGenreId] = useState(''); // State for the selected genre ID
  const [imageUrl, setImageUrl] = useState('');
  const [stockCount, setStockCount] = useState('');
  const [availableForBuy, setAvailableForBuy] = useState(true); // Checkbox state for purchase
  const [availableForLend, setAvailableForLend] = useState(false); // Checkbox state for lending

  // Fetch genres when the component mounts
  useEffect(() => {
    const getGenres = async () => {
      try {
        const data = await fetchGenres();
        setGenres(data);
        // Optionally, set the first genre as default if available
        if (data.length > 0) {
          setSelectedGenreId(data[0].id);
        }
      } catch (error) {
        console.error("Failed to fetch genres for form:", error);
      }
    };
    getGenres();
  }, []); // Empty dependency array means this runs once on mount

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Construct the book object matching backend expectations
    const newBook = {
      title,
      author,
      description,
      price: parseFloat(price),
      genre_id: selectedGenreId || null, // Send the selected genre ID, or null if none
      image_url: imageUrl,
      stock_count: parseInt(stockCount, 10),
      availableForBuy: availableForBuy, // Send boolean directly
      availableForLend: availableForLend, // Send boolean directly
    };

    try {
      await addBook(newBook);
      alert('Book added successfully!');
      // Clear form fields after successful submission
      setTitle('');
      setAuthor('');
      setDescription('');
      setPrice('');
      setImageUrl('');
      setStockCount('');
      setAvailableForBuy(true);
      setAvailableForLend(false);
      // Reset selected genre if you want
      if (genres.length > 0) setSelectedGenreId(genres[0].id); else setSelectedGenreId('');

      // Call the callback to inform parent component (App.jsx) to refresh BookList
      if (onBookAdded) {
        onBookAdded();
      }
    } catch (error) {
      alert('Failed to add book. Check console for details.');
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Add New Book</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input type="text" placeholder="Title" className="block w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500" value={title} onChange={e => setTitle(e.target.value)} required />
        <input type="text" placeholder="Author" className="block w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500" value={author} onChange={e => setAuthor(e.target.value)} />
        <textarea placeholder="Description" className="block w-full p-2 border rounded-md resize-y focus:ring-blue-500 focus:border-blue-500" value={description} onChange={e => setDescription(e.target.value)} rows="3"></textarea>
        <input type="number" step="0.01" placeholder="Price" className="block w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500" value={price} onChange={e => setPrice(e.target.value)} />

        {/* Genre Dropdown */}
        <select className="block w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500" value={selectedGenreId} onChange={e => setSelectedGenreId(e.target.value)}>
          <option value="">Select Genre (Optional)</option>
          {genres.map(genre => (
            <option key={genre.id} value={genre.id}>{genre.name}</option>
          ))}
        </select>

        <input type="url" placeholder="Image URL (optional)" className="block w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500" value={imageUrl} onChange={e => setImageUrl(e.target.value)} />
        <input type="number" placeholder="Stock Count" className="block w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500" value={stockCount} onChange={e => setStockCount(e.target.value)} />

        <div className="flex items-center space-x-4">
          <label className="flex items-center text-gray-700">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-blue-600 rounded"
              checked={availableForBuy}
              onChange={(e) => {
                setAvailableForBuy(e.target.checked);
                // If "Available for Purchase" is checked, uncheck "Available for Lending"
                if (e.target.checked) setAvailableForLend(false);
              }}
            />
            <span className="ml-2">Available for Purchase</span>
          </label>
          <label className="flex items-center text-gray-700">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-purple-600 rounded"
              checked={availableForLend}
              onChange={(e) => {
                setAvailableForLend(e.target.checked);
                // If "Available for Lending" is checked, uncheck "Available for Purchase"
                if (e.target.checked) setAvailableForBuy(false);
              }}
            />
            <span className="ml-2">Available for Lending</span>
          </label>
        </div>

        <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors shadow-md">Add Book</button>
      </form>
    </div>
  );
};

export default BookForm;