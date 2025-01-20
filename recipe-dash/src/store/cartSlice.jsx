import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalPrice: 0,
    totalQuantity: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      const { plate_id, name, price, quantity, plateImage } = action.payload;
      const existingItem = state.items.find((item) => item.plate_id === plate_id);

      if (existingItem) {
        existingItem.quantity += quantity;
        existingItem.total += price * quantity;
      } else {
        state.items.push({
          plate_id,
          name,
          price,
          quantity,
          total: price * quantity,
          plateImage,
        });
      }

      state.totalQuantity += quantity;
      state.totalPrice += price * quantity;
    },
    removeFromCart: (state, action) => {
      const plate_id = action.payload.plate_id;
      const itemIndex = state.items.findIndex((item) => item.plate_id === plate_id);

      if (itemIndex > -1) {
        const item = state.items[itemIndex];
        state.totalQuantity -= item.quantity;
        state.totalPrice -= item.total;
        state.items.splice(itemIndex, 1);
      }
    },
    updateQuantity: (state, action) => {
      const { plate_id, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.plate_id === plate_id);

      if (existingItem) {
        state.totalPrice += (quantity - existingItem.quantity) * existingItem.price;
        state.totalQuantity += quantity - existingItem.quantity;
        existingItem.quantity = quantity;
        existingItem.total = quantity * existingItem.price;
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.totalPrice = 0;
      state.totalQuantity = 0;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export const selectCartItems = (state) => state.cart.items;
export const selectCartTotalPrice = (state) => state.cart.totalPrice;
export const selectCartTotalQuantity = (state) => state.cart.totalQuantity;
export default cartSlice.reducer;
