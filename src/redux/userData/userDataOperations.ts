import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://api.spotify.com/v1";

export const getUserSavedAlbums = createAsyncThunk(
  "albums/getUserSavedAlbums",
  async (accessToken: string) => {
    try {
      const response = await axios.get("/me/albums", {
        params: {
          limit: 50,
        },
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
        params: {
          limit: 50,
        },
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
        params: {
          limit: 50,
        },
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
