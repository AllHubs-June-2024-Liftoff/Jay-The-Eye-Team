import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import menuReducer from "./menuSlice";
import cartReducer from "./cartSlice";

const store = configureStore({
  reducer: {
    menu: menuReducer,
    user: userReducer,
    cart: cartReducer,
  },
});

export default store;
