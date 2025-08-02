import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  role: 'doctor' | 'staff' | 'accountant';
}

interface AuthState {
  isLoggedIn: boolean;
  token: string | null;
  user: User | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  token: localStorage.getItem('token'),
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<{ token: string; user: User }>) => {
      state.isLoggedIn = true;
      state.token = action.payload.token;
      state.user = action.payload.user;
      localStorage.setItem('token', action.payload.token);
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.token = null;
      state.user = null;
      localStorage.removeItem('token');
    },
    setAuthFromToken: (state, action: PayloadAction<{ user: User }>) => {
      if (state.token) {
        state.isLoggedIn = true;
        state.user = action.payload.user;
      }
    },
  },
});

export const { loginSuccess, logout, setAuthFromToken } = authSlice.actions;
export default authSlice.reducer;