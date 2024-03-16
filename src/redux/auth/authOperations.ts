import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  clientId,
  redirectUri,
  tokenEndpoint,
} from "../../constants/constants";
import { Token, UserData } from "./authSlice";

const processTokenResponse = (response: any) => {
  const expiresIn = response.data.expires_in;
  const expirationDate = new Date();
  const expiry = new Date(
    expirationDate.getTime() + parseInt(expiresIn!) * 1000
  );

  const token = {
    ...response.data,
    expires_in: expiry.toString(),
  };

  return token;
};

export const exchangeToken = createAsyncThunk<Token, string>(
  "auth/exchangeToken",
  async (code) => {
    if (!code) return;

    const codeVerifier = localStorage.getItem("code_verifier");

    try {
      const response = await axios.post(
        tokenEndpoint,
        new URLSearchParams({
          client_id: clientId,
          grant_type: "authorization_code",
          code: code,
          redirect_uri: redirectUri,
          code_verifier: codeVerifier!,
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      return processTokenResponse(response);
    } catch (error) {
      console.error("Error fetching token:", error);
      throw error;
    }
  }
);

export const refreshToken = createAsyncThunk<Token, string>(
  "auth/refreshToken",
  async (refreshToken) => {
    try {
      const response = await axios.post(
        tokenEndpoint,
        new URLSearchParams({
          client_id: clientId,
          grant_type: "refresh_token",
          refresh_token: refreshToken!,
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      return processTokenResponse(response);
    } catch (error) {
      console.error("Error refreshing token:", error);
      throw error;
    }
  }
);

export const fetchUserData = createAsyncThunk<UserData, string>(
  "auth/fetchUserData",
  async (accessToken) => {
    try {
      const response = await axios.get("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      });

      return response.data;
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw error;
    }
  }
);
