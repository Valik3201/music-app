import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://api.spotify.com/v1";

export const getUserSavedAlbums = createAsyncThunk(
  "albums/getUserSavedAlbums",
  async (accessToken: string) => {
    try {
      const response = await axios.get("/me/albums", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return response.data.items;
    } catch (error) {
      console.error("Error fetching user's saved albums:", error);
    }
  }
);

export const getUserTracks = createAsyncThunk(
  "tracks/getUserTracks",
  async (accessToken: string) => {
    try {
      const response = await axios.get("/me/tracks", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return response.data.items;
    } catch (error) {
      console.error("Error fetching user's saved albums:", error);
    }
  }
);

export const getUserPlaylists = createAsyncThunk(
  "playlists/getUserPlaylists",
  async (accessToken: string) => {
    try {
      const response = await axios.get("/me/playlists", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return response.data.items;
    } catch (error) {
      console.error("Error fetching user's playlists:", error);
    }
  }
);
