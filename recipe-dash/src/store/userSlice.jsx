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
    login: (state, action) => {
      const { user_id, customer_id, email, nameFirst, nameLast, isChef, address, phone } = action.payload;



      state.loginStatus = true;
      state.user_id = user_id;
      state.customer_id = customer_id;
      state.email = email;
      state.nameFirst = nameFirst;
      state.nameLast = nameLast;
      state.isChef = isChef;
      state.address = address; // Update address
      state.phone = phone;     // Update phone

      // Store user data in localStorage
              localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logout: (state) => {



      state.loginStatus = false;
      state.user_id = null;
      state.customer_id = null;
      state.email = "";
      state.nameFirst = "";
      state.nameLast = "";
      state.isChef = false;
      state.address = ""; // Reset address
      state.phone = "";   // Reset phone

      // Remove user data from localStorage
                localStorage.removeItem("authData");
    },
  },
});

export const { login, logout } = userSlice.actions;
export const selectUser = (state) => state.user;
export default userSlice.reducer;
