import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch the menu from the backend
export const fetchMenu = createAsyncThunk("menu/fetchMenu", async () => {
  const response = await axios.get("http://localhost:8080/plates/api");
  return response.data;
});

const menuSlice = createSlice({
  name: "menu",
  initialState: {
    items: [],
    status: "idle", // "idle" | "loading" | "succeeded" | "failed"
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenu.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMenu.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchMenu.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectMenuItems = (state) => state.menu.items;
export const selectMenuStatus = (state) => state.menu.status;

export default menuSlice.reducer;
