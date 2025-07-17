// src/features/books/booksSlice.js
import { createSlice } from '@reduxjs/toolkit';

const booksSlice = createSlice({
  name: 'books',
  initialState: [], // or whatever your initial state for books is
  reducers: {
    // your reducer actions here
  },
  // If you're using createAsyncThunk, you'll have extraReducers here
});

export const { /* your actions */ } = booksSlice.actions;
export default booksSlice.reducer; // This is the reducer you need to import