import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {
    id: "1",
    email: "demo@gmail.com"
  },
  role: 'admin',
  loading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.loading = false;
    },
    setRole: (state, action) => {
      state.role = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    logout: (state) => {
      // ❌ login page nahi hai, to user null mat karo
      state.user = {
        id: "1",
        email: "demo@gmail.com"
      };
      state.role = 'viewer'; // ya 'admin' bhi rakh sakti ho
    },
  },
});

export const { setUser, setRole, setLoading, logout } = authSlice.actions;
export default authSlice.reducer;