import axios from "axios";
import { clientId, redirectUri, tokenEndpoint } from "../constants/constants";

export const getToken = async (code: string | null) => {
  if (code) {
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

      return response.data;
    } catch (error) {
      console.error("Error fetching token:", error);
      throw error;
    }
  }
};

export const getRefreshToken = async (refreshToken: string | null) => {
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

    return response.data;
  } catch (error) {
    console.error("Error refreshing token:", error);
    throw error;
  }
};

export const getUserData = async (accessToken: string) => {
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
};

export const getUserSavedAlbums = async (accessToken: string) => {
  try {
    const response = await axios.get("https://api.spotify.com/v1/me/albums", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    console.log("User saved albums:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching user saved albums:", error);
  }
};
