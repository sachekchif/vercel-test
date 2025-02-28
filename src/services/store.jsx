import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './apiSlice';

export const store = configureStore({
  reducer: {
    // Add the API slice reducer
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  // Add the API slice middleware
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
