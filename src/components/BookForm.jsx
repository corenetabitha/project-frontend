import React, { useState, useEffect } from 'react';
import { createBook, updateBook, fetchGenres } from '../services/api';
import { toast } from 'react-toastify';

const BookForm = ({ bookToEdit, onSaveSuccess }) => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: '',
    price: '',
    stock_count: '',
    genre: '',
    image_url: '',
    is_available_for_purchase: true,
    is_available_for_lending: true,
  });
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (bookToEdit) {
      setFormData({
        title: bookToEdit.title || '',
        author: bookToEdit.author || '',
        description: bookToEdit.description || '',
        price: bookToEdit.price !== undefined && bookToEdit.price !== null ? String(bookToEdit.price) : '',
        stock_count: bookToEdit.stock_count !== undefined && bookToEdit.stock_count !== null ? String(bookToEdit.stock_count) : '',
        genre: bookToEdit.genre || '',
        image_url: bookToEdit.image_url || '',
        is_available_for_purchase: bookToEdit.is_available_for_purchase,
        is_available_for_lending: bookToEdit.is_available_for_lending,
      });
    } else {
      setFormData({
        title: '',
        author: '',
        description: '',
        price: '',
        stock_count: '',
        genre: '',
        image_url: '',
        is_available_for_purchase: true,
        is_available_for_lending: true,
      });
    }
  }, [bookToEdit]);

  useEffect(() => {
    const getGenres = async () => {
      try {
        const data = await fetchGenres();
        setGenres(Array.isArray(data) ? data : []);
        if (!bookToEdit && Array.isArray(data) && data.length > 0) {
          setFormData(prev => ({ ...prev, genre: data[0].id }));
        }
      } catch (err) {
        console.error("Failed to fetch genres:", err);
        setError("Failed to load genres. Please try again.");
        setGenres([]);
      }
    };
    getGenres();
  }, [bookToEdit]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const dataToSend = {
      ...formData,
      price: parseFloat(formData.price),
      stock_count: parseInt(formData.stock_count, 10),
      genre: formData.genre || null,
    };

    try {
      if (bookToEdit) {
        await updateBook(bookToEdit.id, dataToSend);
        toast.success("Book updated successfully!");
      } else {
        await createBook(dataToSend);
        toast.success("Book added successfully!");
        setFormData({
          title: '', author: '', description: '', price: '', stock_count: '',
          genre: genres.length > 0 ? genres[0].id : '',
          image_url: '', is_available_for_purchase: true, is_available_for_lending: true,
        });
      }
      if (onSaveSuccess) {
        onSaveSuccess();
      }
    } catch (err) {
      console.error("Error saving book:", err);
      const errorMessage = err.response?.data?.detail || err.message || "Failed to save book.";
      setError(errorMessage);
      toast.error(`Error: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">
        {bookToEdit ? 'Edit Book' : 'Add New Book'}
      </h2>
      {error && <div className="text-red-600 mb-4">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="author" className="block text-sm font-medium text-gray-700">Author</label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
          ></textarea>
        </div>
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            step="0.01"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="stock_count" className="block text-sm font-medium text-gray-700">Stock Count</label>
          <input
            type="number"
            id="stock_count"
            name="stock_count"
            value={formData.stock_count}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="genre" className="block text-sm font-medium text-gray-700">Genre</label>
          <select
            id="genre"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Select a Genre</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="image_url" className="block text-sm font-medium text-gray-700">Image URL</label>
          <input
            type="url"
            id="image_url"
            name="image_url"
            value={formData.image_url}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="is_available_for_purchase"
              name="is_available_for_purchase"
              checked={formData.is_available_for_purchase}
              onChange={handleChange}
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <label htmlFor="is_available_for_purchase" className="ml-2 block text-sm text-gray-900">
              Available for Purchase
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="is_available_for_lending"
              name="is_available_for_lending"
              checked={formData.is_available_for_lending}
              onChange={handleChange}
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <label htmlFor="is_available_for_lending" className="ml-2 block text-sm text-gray-900">
              Available for Lending
            </label>
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Saving...' : (bookToEdit ? 'Update Book' : 'Add Book')}
        </button>
      </form>
    </div>
  );
};

export default BookForm;