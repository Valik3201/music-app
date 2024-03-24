import { createSlice } from "@reduxjs/toolkit";
import { exchangeToken, refreshToken, fetchUserData } from "./authOperations";

export interface UserData {
  display_name: string;
  id: string;
  images: {
    url: string;
    height: number;
    width: number;
  }[];
  email: string;
  external_urls: { spotify: string };
  product: string;
}

export interface Token {
  access_token: string;
  token_type: string;
  expires_in: string;
  refresh_token: string;
  scope: string;
}

export interface AuthState {
  currentToken: Token | null;
  user: UserData | null;
  isAuthenticated: boolean;
  isSessionExpired: boolean;
  error: string | null;
}

const initialState = {
  currentToken: null,
  user: null,
  isAuthenticated: false,
  isSessionExpired: false,
  error: null,
} satisfies AuthState as AuthState;

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      Object.assign(state, {
        currentToken: null,
        user: null,
        isAuthenticated: false,
      });
    },
    setSessionExpired(state, action) {
      state.isSessionExpired = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(exchangeToken.fulfilled, (state, action) => {
        state.currentToken = action.payload;
        state.error = null;
      })
      .addCase(exchangeToken.rejected, (state, action) => {
        state.error = action.error.message ?? "Exchange token failed";
        state.isAuthenticated = false;
        state.currentToken = null;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.currentToken = action.payload;
        state.error = null;
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.error = action.error.message ?? "Exchange token failed";
        state.isAuthenticated = false;
        state.currentToken = null;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.isSessionExpired = false;
      });
  },
});

export const { logout, setSessionExpired } = authSlice.actions;

export default authSlice.reducer;
