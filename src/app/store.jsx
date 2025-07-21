
import { configureStore } from '@reduxjs/toolkit';
// Import your reducers here
import booksReducer from './features/books/booksSlice'; // Adjust path if necessary

export const store = configureStore({
  reducer: {
    // Add your reducers here
    books: booksReducer, // <--- UNCOMMENTED!
  },
});