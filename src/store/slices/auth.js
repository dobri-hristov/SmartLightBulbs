import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: false,
  user: null,
  init: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutRequest: (state) => state,
    logoutSuccess: () => ({
      isAuth: false,
      user: null,
      init: true,
    }),
    authRequest: (state) => state,
    authSuccess: (state, { payload: { user } }) => ({
      isAuth: true,
      user,
      init: true,
    }),
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
