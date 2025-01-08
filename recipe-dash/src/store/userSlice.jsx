import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loginStatus: false,
  email: "",
  nameFirst: "",
  isChef: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action) {
      state.loginStatus = true;
      state.email = action.payload.email;
      state.nameFirst = action.payload.nameFirst;
      state.isChef = action.payload.isChef;
    },
    logout(state) {
      state.loginStatus = false;
      state.email = "";
      state.nameFirst = "";
      state.isChef = false;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;