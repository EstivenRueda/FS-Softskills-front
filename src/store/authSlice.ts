import { createSlice } from '@reduxjs/toolkit';
import { User } from '@/types';

type AuthState = {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
};

const initialState: AuthState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setIsAuthenticated, setIsLoading, setUser } = authSlice.actions;
export const { reducer: authReducer } = authSlice;
