// src/store/themeSlice.js
import { createSlice } from '@reduxjs/toolkit';

const Auth = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
  },
  reducers: {
    toggleLoggedIn: (state) => {
      state.isLoggedIn = !state.isLoggedIn;
    },
    setLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
  },
});

export const { toggleLoggedIn, setLoggedIn } = Auth.actions;
export default Auth.reducer;
