import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    loginStatus: false,
    email: "",
    nameFirst: "",
    nameLast: "",
    isChef: false,
    user_id: null,
    customer_id: null,
    address: "",
    phone: "",
  },
  reducers: {
    // When login action is dispatched, persist the user data
    login: (state, action) => {
      const { user_id, customer_id, email, nameFirst, nameLast, isChef, address, phone, loginStatus } = action.payload;
      state.loginStatus = true;
      state.user_id = user_id;
      state.customer_id = customer_id;
      state.email = email;
      state.nameFirst = nameFirst;
      state.nameLast = nameLast;
      state.isChef = isChef;
      state.address = address;
      state.phone = phone;

    },
    // Logout will clear all user data and reset loginStatus
    logout: (state) => {
      state.loginStatus = false;
      state.user_id = null;
      state.customer_id = null;
      state.email = "";
      state.nameFirst = "";
      state.nameLast = "";
      state.isChef = false;
      state.address = "";
      state.phone = "";
      localStorage.clear();
    },
  },
});

export const { login, logout } = userSlice.actions;
export const selectUser = (state) => state.user;

export default userSlice.reducer;