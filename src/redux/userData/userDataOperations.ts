import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUserSavedAlbums = createAsyncThunk(
  "albums/fetchUserSavedAlbums",
  async (accessToken: string) => {
    try {
      const response = await axios.get("https://api.spotify.com/v1/me/albums", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return response.data.items;
    } catch (error) {
      console.error("Error fetching user saved albums:", error);
    }
  }
);

export const getUserPlaylists = createAsyncThunk(
  "playlists/getUserPlaylists",
  async ({ accessToken, userID }: { accessToken: string; userID: string }) => {
    try {
      const response = await axios.get(
        `https://api.spotify.com/v1/users/${userID}/playlists`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      return response.data.items;
    } catch (error) {
      console.error("Error fetching user playlists:", error);
    }
  }
);
