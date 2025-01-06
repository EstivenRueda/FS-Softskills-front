import { User } from '@/types';
import { createSlice } from '@reduxjs/toolkit';
import { set } from 'lodash';


type AuthState = {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
};

const initialState: AuthState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
  accessToken: null,
  refreshToken: null,
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
    setAccessToken: (state, action) =>{
      state.accessToken = action.payload;
    },
    setRefreshToken: (state, action) =>{
      state.refreshToken = action.payload;
    }
  },
});

export const { setAccessToken, setRefreshToken, setIsAuthenticated, setIsLoading, setUser } = authSlice.actions;
export const { reducer: authReducer } = authSlice;
