import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import menuReducer from "./menuSlice";
import cartReducer from "./cartSlice";
import favoriteReducer from "./favoritesSlice";

const store = configureStore({
  reducer: {
    menu: menuReducer,
    user: userReducer,
    cart: cartReducer,
    favorites: favoriteReducer
  },
});

export default store;
