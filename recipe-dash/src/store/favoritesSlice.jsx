import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async Thunk to fetch favorite plate IDs
export const fetchFavoritePlates = createAsyncThunk(
  'favorites/fetchFavoritePlates',
  async (customerId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:8080/favorites/${customerId}`);
      return response.data; // Response should now be a list of plate IDs
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Async Thunk to add a favorite plate
export const addFavoritePlate = createAsyncThunk(
  'favorites/addFavoritePlate',
  async ({ customerId, plateId }, { rejectWithValue }) => {
    try {
      const payload = { customer_id: customerId, plate_id: plateId };
      await axios.post(`http://localhost:8080/favorites/add`, payload);
      return plateId; // Return the added plate ID
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Async Thunk to remove a favorite plate
export const removeFavoritePlate = createAsyncThunk(
  'favorites/removeFavoritePlate',
  async ({ customerId, plateId }, { rejectWithValue }) => {
    try {
      await axios.delete(`http://localhost:8080/favorites/remove`, {
        params: { customerId, plateId },
      });
      return plateId; // Return the removed plate ID
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    favoritePlates: [], // List of plate IDs
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    resetFavoritesState: (state) => {
      state.favoritePlates = [];
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch favorite plates
      .addCase(fetchFavoritePlates.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFavoritePlates.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.favoritePlates = action.payload;
      })
      .addCase(fetchFavoritePlates.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Add a favorite plate
      .addCase(addFavoritePlate.fulfilled, (state, action) => {
        state.favoritePlates.push(action.payload);
      })
      // Remove a favorite plate
      .addCase(removeFavoritePlate.fulfilled, (state, action) => {
        state.favoritePlates = state.favoritePlates.filter(
          (id) => id !== action.payload
        );
      });
  },
});

export const { resetFavoritesState } = favoritesSlice.actions;

export const selectFavoritePlates = (state) => state.favorites.favoritePlates;
export const selectFavoritesStatus = (state) => state.favorites.status;
export const selectFavoritesError = (state) => state.favorites.error;

export default favoritesSlice.reducer;

